import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'eFlip'

interface ContactInquiryAdminProps {
  name?: string
  email?: string
  serviceType?: string
  budgetRange?: string
  message?: string
}

const ContactInquiryAdminEmail = ({
  name, email, serviceType, budgetRange, message,
}: ContactInquiryAdminProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New inquiry from {name || 'website visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>NEW CONTACT INQUIRY</Heading>
        <Text style={subtitle}>You have received a new message via {SITE_NAME}.ie</Text>

        <Section style={card}>
          <Text style={label}>NAME</Text>
          <Text style={value}>{name || '—'}</Text>

          <Text style={label}>EMAIL</Text>
          <Text style={value}>
            {email ? <Link href={`mailto:${email}`} style={link}>{email}</Link> : '—'}
          </Text>

          {serviceType && (
            <>
              <Text style={label}>SERVICE TYPE</Text>
              <Text style={value}>{serviceType}</Text>
            </>
          )}

          {budgetRange && (
            <>
              <Text style={label}>BUDGET</Text>
              <Text style={value}>{budgetRange}</Text>
            </>
          )}

          <Hr style={hr} />

          <Text style={label}>MESSAGE</Text>
          <Text style={messageStyle}>{message || '—'}</Text>
        </Section>

        <Text style={footer}>
          Reply directly to this email or manage inquiries in the {SITE_NAME} admin dashboard.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactInquiryAdminEmail,
  subject: (data: Record<string, any>) =>
    `New inquiry from ${data?.name || 'website visitor'}`,
  to: 'info@eflip.ie',
  displayName: 'Contact inquiry — admin notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    serviceType: 'WEB DESIGN',
    budgetRange: '£10,000 – £25,000',
    message: 'Hi, I would love to chat about a new website for my business.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = {
  fontSize: '20px', fontWeight: 'bold', color: '#000000',
  letterSpacing: '0.15em', margin: '0 0 8px',
}
const subtitle = {
  fontSize: '13px', color: '#666666', margin: '0 0 24px', letterSpacing: '0.05em',
}
const card = {
  border: '1px solid #eaeaea', borderRadius: '6px', padding: '20px 24px', background: '#fafafa',
}
const label = {
  fontSize: '11px', fontWeight: 'bold', color: '#999999',
  letterSpacing: '0.15em', margin: '12px 0 4px',
}
const value = { fontSize: '14px', color: '#111111', margin: '0 0 8px' }
const messageStyle = {
  fontSize: '14px', color: '#111111', margin: '0', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const,
}
const hr = { borderColor: '#eaeaea', margin: '20px 0' }
const link = { color: '#ff5b1f', textDecoration: 'underline' }
const footer = {
  fontSize: '12px', color: '#999999', margin: '24px 0 0', textAlign: 'center' as const,
}
