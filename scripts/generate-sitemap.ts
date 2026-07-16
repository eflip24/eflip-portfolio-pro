// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
// Queries Lovable Cloud for published projects + blog posts and merges with static routes.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://eflip.ie";
const SUPABASE_URL = "https://ffyloqahsmfrmhxvxmtu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmeWxvcWFoc21mcm1oeHZ4bXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NjkxMjksImV4cCI6MjA4ODU0NTEyOX0.A3BKUuddSBIiGw77Fv-il_2UuCFnRmmnaKQj7GsmdM0";

interface Entry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().slice(0, 10);

const staticEntries: Entry[] = [
  { path: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
  { path: "/portfolio", lastmod: today, changefreq: "weekly", priority: "0.9" },
  { path: "/services", lastmod: today, changefreq: "monthly", priority: "0.8" },
  { path: "/ai", lastmod: today, changefreq: "monthly", priority: "0.8" },
  { path: "/print-design", lastmod: today, changefreq: "monthly", priority: "0.8" },
  { path: "/blog", lastmod: today, changefreq: "weekly", priority: "0.8" },
  { path: "/about", lastmod: today, changefreq: "monthly", priority: "0.7" },
  { path: "/contact", lastmod: today, changefreq: "monthly", priority: "0.7" },
];

async function fetchRows(
  table: string,
  select: string,
  filter: string,
): Promise<Array<Record<string, string>>> {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=${select}&${filter}`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) {
    console.warn(`[sitemap] failed to fetch ${table}: ${res.status}`);
    return [];
  }
  return res.json();
}

function toEntry(prefix: string, row: Record<string, string>, priority: string): Entry {
  const lastmod = (row.updated_at || row.created_at || "").slice(0, 10) || today;
  return {
    path: `${prefix}/${row.slug}`,
    lastmod,
    changefreq: "monthly",
    priority,
  };
}

function renderSitemap(entries: Entry[]): string {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

async function main() {
  const [projects, posts] = await Promise.all([
    fetchRows("projects", "slug,created_at", "published=eq.true"),
    fetchRows("blog_posts", "slug,updated_at,created_at", "published=eq.true"),
  ]);

  const entries: Entry[] = [
    ...staticEntries,
    ...projects.map((r) => toEntry("/portfolio", r, "0.7")),
    ...posts.map((r) => toEntry("/blog", r, "0.6")),
  ];

  writeFileSync(resolve("public/sitemap.xml"), renderSitemap(entries));
  console.log(
    `[sitemap] wrote ${entries.length} entries (${projects.length} projects, ${posts.length} blog posts)`,
  );
}

main().catch((err) => {
  console.error("[sitemap] generation failed:", err);
  process.exit(0); // never break the build
});
