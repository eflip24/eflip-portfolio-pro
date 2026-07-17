import { useEffect, useState } from "react";

export interface TOCItem { id: string; text: string }

export const slugifyHeading = (s: string) =>
  s.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

export const extractTOC = (html: string): TOCItem[] => {
  const items: TOCItem[] = [];
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  let m;
  const seen = new Set<string>();
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]*>/g, "").trim();
    if (!text) continue;
    let id = slugifyHeading(text);
    let i = 2;
    while (seen.has(id)) id = `${slugifyHeading(text)}-${i++}`;
    seen.add(id);
    items.push({ id, text });
  }
  return items;
};

// Inject id="..." on each <h2> matching TOC order
export const injectHeadingIds = (html: string, toc: TOCItem[]): string => {
  let i = 0;
  return html.replace(/<h2([^>]*)>/gi, (_full, attrs) => {
    const id = toc[i]?.id;
    i++;
    if (!id) return `<h2${attrs}>`;
    // don't duplicate id if already present
    if (/\sid=/.test(attrs)) return `<h2${attrs}>`;
    return `<h2${attrs} id="${id}">`;
  });
};

const BlogTOC = ({ items }: { items: TOCItem[] }) => {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    items.forEach(i => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-xs">
      <p className="text-[10px] tracking-widest text-muted-foreground mb-4">ON THIS PAGE</p>
      <ul className="space-y-2 border-l border-border">
        {items.map(item => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  window.history.replaceState(null, "", `#${item.id}`);
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className={`block pl-4 -ml-px border-l tracking-wider transition-colors leading-snug py-1 ${
                active === item.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BlogTOC;
