import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  title?: string
  slug?: string
  liveUrl?: string
}

const BlogAutoPublishedEmail = ({ title, liveUrl }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Blog post auto-published: {title}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>POST AUTO-PUBLISHED</Heading>
        <Text style={subtitle}>
          The 7-day review window elapsed, so this AI-drafted post has gone live on eflip.ie.
        </Text>

        <Section style={card}>
          <Text style={label}>TITLE</Text>
          <Text style={value}>{title || '—'}</Text>
        </Section>

        <Section style={{ textAlign: 'center' as const, margin: '24px 0' }}>
          <Button href={liveUrl || 'https://eflip.ie/blog'} style={button}>
            VIEW LIVE POST
          </Button>
        </Section>

        <Text style={footer}>
          You can still edit or unpublish it from the admin dashboard at any time.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: BlogAutoPublishedEmail,
  subject: (data: Record<string, any>) => `Auto-published: ${data?.title || 'new post'}`,
  to: 'info@eflip.ie',
  displayName: 'Blog post auto-published',
  previewData: {
    title: 'How Small Businesses in Ireland Are Using AI in 2026',
    slug: 'ai-small-business-ireland-2026',
    liveUrl: 'https://eflip.ie/blog/ai-small-business-ireland-2026',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 'bold', color: '#000', letterSpacing: '0.15em', margin: '0 0 8px' }
const subtitle = { fontSize: '13px', color: '#666', margin: '0 0 24px' }
const card = { border: '1px solid #eaeaea', borderRadius: '6px', padding: '20px 24px', background: '#fafafa' }
const label = { fontSize: '11px', fontWeight: 'bold', color: '#999', letterSpacing: '0.15em', margin: '12px 0 4px' }
const value = { fontSize: '14px', color: '#111', margin: '0 0 8px' }
const button = {
  backgroundColor: '#ff5b1f', color: '#fff', padding: '12px 24px', borderRadius: '4px',
  textDecoration: 'none', fontSize: '13px', letterSpacing: '0.15em', fontWeight: 'bold' as const,
}
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0', textAlign: 'center' as const }
