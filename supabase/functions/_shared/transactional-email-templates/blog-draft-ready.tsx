import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  title?: string
  slug?: string
  topic?: string
  autoPublishDate?: string
  reviewUrl?: string
}

const BlogDraftReadyEmail = ({ title, topic, autoPublishDate, reviewUrl }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New blog draft ready: {title}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>NEW BLOG DRAFT READY</Heading>
        <Text style={subtitle}>Stephen — a fresh AI draft is waiting for your review on eflip.ie.</Text>

        <Section style={card}>
          <Text style={label}>TOPIC</Text>
          <Text style={value}>{topic || '—'}</Text>

          <Text style={label}>DRAFT TITLE</Text>
          <Text style={value}>{title || '—'}</Text>

          <Hr style={hr} />

          <Text style={label}>AUTO-PUBLISHES ON</Text>
          <Text style={value}>{autoPublishDate || '—'}</Text>
          <Text style={note}>
            If you don't review it within 7 days, it goes live automatically.
          </Text>
        </Section>

        <Section style={{ textAlign: 'center' as const, margin: '24px 0' }}>
          <Button href={reviewUrl || 'https://eflip.ie/admin'} style={button}>
            REVIEW DRAFT
          </Button>
        </Section>

        <Text style={footer}>
          Open the admin dashboard to approve, edit, reschedule, or reject this draft.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: BlogDraftReadyEmail,
  subject: (data: Record<string, any>) => `Blog draft ready: ${data?.title || 'new post'}`,
  to: 'info@eflip.ie',
  displayName: 'Blog draft ready — admin review',
  previewData: {
    title: 'How Small Businesses in Ireland Are Using AI in 2026',
    slug: 'ai-small-business-ireland-2026',
    topic: 'How Small Businesses in Ireland Are Using AI in 2026',
    autoPublishDate: 'Tue Jul 23 2026',
    reviewUrl: 'https://eflip.ie/admin',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 'bold', color: '#000', letterSpacing: '0.15em', margin: '0 0 8px' }
const subtitle = { fontSize: '13px', color: '#666', margin: '0 0 24px' }
const card = { border: '1px solid #eaeaea', borderRadius: '6px', padding: '20px 24px', background: '#fafafa' }
const label = { fontSize: '11px', fontWeight: 'bold', color: '#999', letterSpacing: '0.15em', margin: '12px 0 4px' }
const value = { fontSize: '14px', color: '#111', margin: '0 0 8px' }
const note = { fontSize: '12px', color: '#666', margin: '4px 0 0', fontStyle: 'italic' as const }
const hr = { borderColor: '#eaeaea', margin: '20px 0' }
const button = {
  backgroundColor: '#ff5b1f', color: '#fff', padding: '12px 24px', borderRadius: '4px',
  textDecoration: 'none', fontSize: '13px', letterSpacing: '0.15em', fontWeight: 'bold' as const,
}
const footer = { fontSize: '12px', color: '#999', margin: '24px 0 0', textAlign: 'center' as const }
