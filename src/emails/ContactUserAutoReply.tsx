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

interface ContactUserAutoReplyProps {
  firstName: string;
}

export const ContactUserAutoReply = ({
  firstName = 'Plant Lover',
}: ContactUserAutoReplyProps) => (
  <Html>
    <Head />
    <Preview>We received your message! 🌱</Preview>
    <Body style={main}>
      <EmailLayout previewText="We've received your message">
        <Section style={contentSection}>
          <Heading style={heading}>Hi {firstName},</Heading>
          <Text style={paragraph}>
            Thank you for reaching out to us at IndoorPlant.in! This is an automated email to let you know that we have successfully received your message.
          </Text>
          <Text style={paragraph}>
            Our team of plant experts is reviewing your inquiry, and we will connect with you as soon as possible.
          </Text>
          <Text style={paragraph}>
            In the meantime, feel free to browse our latest collection of indoor plants or chat with our AI Advisor if you need immediate plant care advice.
          </Text>
          <Text style={signature}>
            Warmly,<br />
            The IndoorPlant.in Team 🌿
          </Text>
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
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1a472a',
  padding: '0',
  margin: '0 0 20px 0',
};

const paragraph = {
  margin: '0 0 16px 0',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
};

const signature = {
  margin: '32px 0 0 0',
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#1a472a',
  fontWeight: '600',
};

export default ContactUserAutoReply;
