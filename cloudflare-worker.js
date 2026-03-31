/**
 * Cloudflare Worker — Crawler Proxy for eFlip
 * 
 * Routes social media crawlers to the og-meta edge function
 * so they receive proper Open Graph meta tags for each page.
 * Regular users get the normal SPA.
 * 
 * DEPLOYMENT:
 * 1. Go to Cloudflare Dashboard → Workers & Pages → Create Worker
 * 2. Paste this code and deploy
 * 3. Go to your eflip.ie domain → Workers Routes
 * 4. Add route: eflip.ie/* → select this worker
 * 5. Add route: www.eflip.ie/* → select this worker
 */

const OG_META_URL = "https://ffyloqahsmfrmhxvxmtu.supabase.co/functions/v1/og-meta";

const CRAWLER_USER_AGENTS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "Slackbot",
  "WhatsApp",
  "TelegramBot",
  "Discordbot",
  "Pinterestbot",
  "Applebot",
];

function isCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some((bot) => ua.includes(bot.toLowerCase()));
}

export default {
  async fetch(request, env, ctx) {
    const userAgent = request.headers.get("User-Agent") || "";
    
    if (!isCrawler(userAgent)) {
      // Regular user — pass through to origin (normal SPA)
      return fetch(request);
    }

    // Crawler detected — fetch pre-rendered HTML from og-meta edge function
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      const ogUrl = `${OG_META_URL}?path=${encodeURIComponent(path)}`;
      const response = await fetch(ogUrl, {
        headers: {
          "User-Agent": userAgent,
        },
      });

      if (response.ok) {
        const html = await response.text();
        return new Response(html, {
          status: 200,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    } catch (e) {
      // If og-meta fails, fall through to normal SPA
    }

    // Fallback — serve normal SPA
    return fetch(request);
  },
};
