import * as React from "react";
import {
  Section,
  Text,
} from "react-email";
import EmailLayout from "./EmailLayout";

interface OtpEmailTemplateProps {
  otpCode: string;
}

export const OtpEmailTemplate = ({
  otpCode = "123456",
}: OtpEmailTemplateProps) => {
  return (
    <EmailLayout previewText="Your Password Reset Code">
      <Text style={greeting}>Hello,</Text>
      <Text style={paragraph}>
        We received a request to access your account. Please use the following 6-digit code to complete the process. This code will expire in 10 minutes.
      </Text>
      
      <Section style={otpContainer}>
        <Text style={otpText}>{otpCode}</Text>
      </Section>
      
      <Text style={paragraph}>
        If you did not request this code, please safely ignore this email. Your account remains secure.
      </Text>
      
      <Text style={signoff}>
        Securely yours,<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default OtpEmailTemplate;

// Styles
const greeting = {
  fontSize: "20px",
  lineHeight: "28px",
  fontWeight: "600",
  color: "#111827",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4b5563",
  margin: "0 0 24px 0",
};

const otpContainer = {
  backgroundColor: "#F8FFF9",
  border: "2px dashed #52B788",
  borderRadius: "12px",
  padding: "32px",
  textAlign: "center" as const,
  margin: "32px 0",
};

const otpText = {
  fontSize: "42px",
  fontWeight: "800",
  letterSpacing: "12px",
  color: "#1B4332",
  margin: "0",
  fontFamily: "monospace",
};

const signoff = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 0 0",
};
