// Auto-publishes AI-drafted blog posts whose 7-day review window has elapsed.
// Called daily by pg_cron.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

async function notifyAdmin(
  supabaseUrl: string,
  serviceKey: string,
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
        templateName: 'blog-auto-published',
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
  const supabase = createClient(supabaseUrl, serviceKey)

  const nowIso = new Date().toISOString()

  const { data: due, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, topic_id')
    .eq('is_ai_draft', true)
    .eq('published', false)
    .lte('scheduled_publish_at', nowIso)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const published: { id: string; slug: string; title: string }[] = []
  for (const post of due || []) {
    const { error: upErr } = await supabase
      .from('blog_posts')
      .update({ published: true })
      .eq('id', post.id)
    if (upErr) {
      console.error('publish failed', post.id, upErr)
      continue
    }
    if (post.topic_id) {
      await supabase.from('blog_topics').update({ status: 'published' }).eq('id', post.topic_id)
    }
    published.push({ id: post.id, slug: post.slug, title: post.title })
    await notifyAdmin(supabaseUrl, serviceKey, {
      title: post.title,
      slug: post.slug,
      liveUrl: `https://eflip.ie/blog/${post.slug}`,
    })
  }

  return new Response(JSON.stringify({ ok: true, published_count: published.length, published }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
