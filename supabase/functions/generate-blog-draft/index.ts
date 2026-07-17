// Generates an AI-authored blog draft from a queued topic.
// Called by pg_cron (Tue/Thu) or manually by admin from /admin.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const LOVABLE_AI_URL = 'https://ai.gateway.lovable.dev/v1/chat/completions'
const AUTHOR = 'Stephen Bray'
const REVIEW_WINDOW_DAYS = 7

interface Topic {
  id: string
  title: string
  category: string
  angle: string | null
  primary_keyword: string | null
  target_audience: string | null
  internal_links: string[] | null
}

interface Draft {
  title: string
  slug: string
  meta_title: string
  meta_description: string
  excerpt: string
  content_html: string
  faq: { question: string; answer: string }[]
  primary_keyword: string
  secondary_keywords: string[]
  tags: string[]
  sources: { title: string; url: string }[]
  read_time_minutes: number
}

const SYSTEM_PROMPT = `You are Stephen Bray, chief editor at eflip (eflip.ie), a design studio in Ireland offering AI, custom web design, print design and game design services. You write for small-business owners and marketing leads in Ireland.

Tone: professional but human. Friendly, smart, occasionally casual. No hype, no fluff, no AI-cliché phrases ("dive in", "in today's fast-paced world", "unlock the power of"). Short paragraphs. Concrete examples. Irish spelling and references where natural.

You write SEO-optimised long-form posts (1400-1800 words) that rank on Google.

Rules for content_html:
- Semantic HTML only: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <a>, <blockquote>. No <h1> (the page renders the title as H1). No <html>/<body>/<head>. No <div>, no inline styles, no classes.
- MUST start with 1–2 standalone <p> intro paragraphs BEFORE the first <h2>. Never merge the intro into a heading.
- Every paragraph is its own <p>. Never run multiple paragraphs together inside one <p>. Never put plain text outside of a block tag.
- 4–6 <h2> sections, each followed by 2–4 <p> paragraphs. Use <h3> for sub-points inside a section when helpful.
- Include at least one <ul> or <ol> list somewhere in the body for scannability.
- Include 2–4 internal links using the internal_links you're given. Anchor text natural, not stuffed. Format: <a href="/path">natural anchor</a>.
- Include 2–4 external links to well-known authoritative sources (major news outlets, .gov.ie, established SaaS blogs, wikipedia). Format: <a href="https://..." target="_blank" rel="noopener noreferrer">source name</a>. Descriptive anchor text — never a bare URL. Only cite sources you're confident exist.
- End the article body (before FAQ) with a short CTA paragraph linking to /contact.

Return STRICT JSON matching this exact schema — no markdown fences, no commentary:
{
  "title": "final post title, ≤65 chars, keyword-front-loaded",
  "slug": "kebab-case-slug-based-on-keyword",
  "meta_title": "≤60 chars, keyword first",
  "meta_description": "≤155 chars, benefit-led, includes primary keyword",
  "excerpt": "1–2 sentence summary, ≤200 chars, hooks the reader",
  "content_html": "the full article body HTML per rules above",
  "faq": [{"question":"...","answer":"plain-text answer 40–90 words"}, ...3–5 items],
  "primary_keyword": "the primary target keyword",
  "secondary_keywords": ["4–6 supporting keywords/phrases"],
  "tags": ["3–5 short tags"],
  "sources": [{"title":"source name","url":"https://..."}, ...2–4 items — the same ones you linked in content_html],
  "read_time_minutes": 7
}`

async function callAI(prompt: string, apiKey: string): Promise<Draft> {
  const res = await fetch(LOVABLE_AI_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-5.5',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`AI gateway ${res.status}: ${body}`)
  }
  const json = await res.json()
  const raw = json.choices?.[0]?.message?.content
  if (!raw) throw new Error('AI returned no content')
  return JSON.parse(raw) as Draft
}

function buildPrompt(topic: Topic): string {
  const links = (topic.internal_links || []).join(', ') || '/services, /contact'
  return `Write the blog post for eflip.ie.

Working title: "${topic.title}"
Category: ${topic.category}
Editorial angle: ${topic.angle || 'practical, plain-spoken'}
Target audience: ${topic.target_audience || 'Irish small-business owners'}
Seed primary keyword (refine if a better variant exists): ${topic.primary_keyword || topic.title}

Internal links you MUST place in the article (choose 2–4, use whichever fit best): ${links}

Publish year is 2026. Reference "2026" in the copy where relevant. If the topic is Ireland-specific, ground examples in Ireland (SEAI, Enterprise Ireland, LEO, Revenue.ie, Dublin/Cork/Galway businesses etc.). If it references estate agents, remember Ireland uses "estate agents" not "realtors".

Return the JSON described in the system prompt. Nothing else.`
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
}

async function ensureUniqueSlug(supabase: ReturnType<typeof createClient>, base: string): Promise<string> {
  let slug = slugify(base)
  let i = 2
  while (true) {
    const { data } = await supabase.from('blog_posts').select('id').eq('slug', slug).maybeSingle()
    if (!data) return slug
    slug = `${slugify(base)}-${i++}`
    if (i > 20) return `${slugify(base)}-${Date.now()}`
  }
}

async function notifyAdmin(
  supabaseUrl: string,
  serviceKey: string,
  template: string,
  data: Record<string, unknown>,
) {
  try {
    await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        templateName: template,
        recipientEmail: 'info@eflip.ie',
        templateData: data,
      }),
    })
  } catch (e) {
    console.error('notifyAdmin failed:', e)
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const lovableKey = Deno.env.get('LOVABLE_API_KEY')
  if (!lovableKey) {
    return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not set' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  const supabase = createClient(supabaseUrl, serviceKey)

  let topicId: string | undefined
  try {
    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}))
      topicId = body?.topic_id
    }
  } catch { /* ignore */ }

  // Select topic
  let topic: Topic | null = null
  if (topicId) {
    const { data } = await supabase.from('blog_topics').select('*').eq('id', topicId).maybeSingle()
    topic = data as Topic | null
  } else {
    const { data } = await supabase
      .from('blog_topics')
      .select('*')
      .eq('status', 'queued')
      .order('priority', { ascending: true })
      .limit(1)
      .maybeSingle()
    topic = data as Topic | null
  }

  if (!topic) {
    return new Response(JSON.stringify({ ok: true, message: 'No queued topics' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Mark drafting
  await supabase.from('blog_topics').update({ status: 'drafting' }).eq('id', topic.id)

  try {
    const draft = await callAI(buildPrompt(topic), lovableKey)

    const slug = await ensureUniqueSlug(supabase, draft.slug || draft.title)
    const scheduledPublishAt = new Date(Date.now() + REVIEW_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString()

    const { data: post, error: insertErr } = await supabase
      .from('blog_posts')
      .insert({
        title: draft.title,
        slug,
        content: draft.content_html,
        excerpt: draft.excerpt,
        seo_title: draft.meta_title,
        seo_description: draft.meta_description,
        tags: draft.tags,
        author: AUTHOR,
        read_time: draft.read_time_minutes,
        published: false,
        is_ai_draft: true,
        topic_id: topic.id,
        scheduled_publish_at: scheduledPublishAt,
        faq: draft.faq,
        keyword_data: {
          primary_keyword: draft.primary_keyword,
          secondary_keywords: draft.secondary_keywords,
        },
        sources: draft.sources,
      })
      .select('id, slug, title')
      .single()

    if (insertErr) throw insertErr

    await supabase
      .from('blog_topics')
      .update({ status: 'drafted', post_id: post.id, last_error: null })
      .eq('id', topic.id)

    await notifyAdmin(supabaseUrl, serviceKey, 'blog-draft-ready', {
      title: post.title,
      slug: post.slug,
      topic: topic.title,
      autoPublishDate: new Date(scheduledPublishAt).toDateString(),
      reviewUrl: `https://eflip.ie/admin`,
    })

    return new Response(JSON.stringify({ ok: true, post_id: post.id, slug: post.slug }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e: any) {
    console.error('generate-blog-draft error:', e)
    await supabase
      .from('blog_topics')
      .update({ status: 'queued', last_error: String(e?.message || e).slice(0, 500) })
      .eq('id', topic.id)
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
