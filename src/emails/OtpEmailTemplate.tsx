import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OtpEmailTemplateProps {
  otpCode: string;
}

export const OtpEmailTemplate = ({
  otpCode = "123456",
}: OtpEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Password Reset Code</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>IndoorPlant.in</Heading>
          </Section>
          
          <Section style={content}>
            <Text style={greeting}>Hello,</Text>
            <Text style={paragraph}>
              We received a request to reset your password. Please use the following 6-digit code to complete the reset process. This code will expire in 10 minutes.
            </Text>
            
            <Section style={otpContainer}>
              <Text style={otpText}>{otpCode}</Text>
            </Section>
            
            <Text style={paragraph}>
              If you did not request a password reset, please ignore this email. Your password will remain unchanged.
            </Text>
            
            <Hr style={hr} />
            <Text style={footer}>
              Securely yours,<br />
              The IndoorPlant.in Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OtpEmailTemplate;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  maxWidth: "600px",
};

const header = {
  padding: "32px",
  textAlign: "center" as const,
  backgroundColor: "#f0fdf4",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  borderBottom: "1px solid #dcfce7",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0",
  color: "#2D6A4F",
  fontFamily: "Playfair Display, serif",
};

const content = {
  padding: "32px",
};

const greeting = {
  fontSize: "20px",
  lineHeight: "28px",
  fontWeight: "600",
  color: "#111827",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4b5563",
};

const otpContainer = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "24px",
  textAlign: "center" as const,
  margin: "32px 0",
};

const otpText = {
  fontSize: "36px",
  fontWeight: "bold",
  letterSpacing: "8px",
  color: "#1B4332",
  margin: "0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
};
