import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'react-email';
import * as React from 'react';
import { EmailLayout } from './EmailLayout';

interface ContactAdminNotificationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  orderId: string;
  message: string;
}

export const ContactAdminNotification = ({
  firstName = 'John',
  lastName = 'Doe',
  email = 'john@example.com',
  phone = '+91 0000000000',
  subject = 'Order Inquiry',
  orderId = '',
  message = 'This is a test message.',
}: ContactAdminNotificationProps) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission: {subject}</Preview>
    <Body style={main}>
      <EmailLayout previewText="New Contact Form Submission">
        <Section style={contentSection}>
          <Heading style={heading}>New Message Received</Heading>
          
          <div style={detailsBox}>
            <Text style={detailRow}><strong>Name:</strong> {firstName} {lastName}</Text>
            <Text style={detailRow}><strong>Email:</strong> {email}</Text>
            <Text style={detailRow}><strong>Phone:</strong> {phone || 'N/A'}</Text>
            <Text style={detailRow}><strong>Subject:</strong> {subject}</Text>
            <Text style={detailRow}><strong>Order ID:</strong> {orderId || 'N/A'}</Text>
          </div>

          <Text style={subheading}>Message:</Text>
          <div style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </div>
          
        </Section>
      </EmailLayout>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const contentSection = {
  padding: '32px 32px',
  backgroundColor: '#ffffff',
  borderRadius: '0 0 12px 12px',
};

const heading = {
  fontSize: '20px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1a472a',
  padding: '0',
  margin: '0 0 20px 0',
};

const subheading = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#374151',
  margin: '24px 0 8px 0',
};

const detailsBox = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '20px',
};

const detailRow = {
  margin: '0 0 8px 0',
  fontSize: '14px',
  color: '#374151',
};

const messageBox = {
  backgroundColor: '#f3f4f6',
  borderLeft: '4px solid #1a472a',
  padding: '16px',
  borderRadius: '4px',
};

const messageText = {
  margin: '0',
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#374151',
  whiteSpace: 'pre-wrap' as const,
};

export default ContactAdminNotification;
