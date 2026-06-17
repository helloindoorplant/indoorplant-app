import * as React from "react";
import {
  Button,
  Section,
  Text,
} from "react-email";
import EmailLayout from "./EmailLayout";

interface CreatorWelcomeTemplateProps {
  creatorName: string;
  plantName: string;
}

export const CreatorWelcomeTemplate = ({
  creatorName = "Creator",
  plantName = "Plant",
}: CreatorWelcomeTemplateProps) => {
  return (
    <EmailLayout previewText={`Application received! We're reviewing your request for ${plantName} 🌿`}>
      <Text style={greeting}>Hey {creatorName} 👋</Text>
      <Text style={paragraph}>
        We just received your application for our <strong>Free Plant Creator Program</strong>, and we're genuinely excited you want to collaborate with us.
      </Text>

      <Section style={highlightBox}>
        <Text style={highlightTitle}>Your Application</Text>
        <Text style={highlightDetail}>
          <strong>Plant requested:</strong> {plantName}
        </Text>
        <Text style={highlightStatus}>
          Status: <span style={{ color: '#D97706', fontWeight: 'bold' }}>Under Review</span>
        </Text>
      </Section>
      
      <Text style={paragraph}>
        Our team will review your profile and get back to you within <strong>48 hours</strong>. If approved, you'll receive a unique coupon code to get your plant completely free.
      </Text>

      <Text style={paragraph}>
        <strong>What happens after approval?</strong>
      </Text>
      <Text style={listItem}>1. You'll receive a personal coupon code via email</Text>
      <Text style={listItem}>2. Use it at checkout — the plant will be 100% free</Text>
      <Text style={listItem}>3. Create a beautiful video featuring your new plant</Text>
      <Text style={listItem}>4. Share it and tag us — that's it!</Text>
      
      <Section style={buttonContainer}>
        <Button style={button} href="https://indoorplant.in/shop">
          Explore More Plants
        </Button>
      </Section>
      
      <Text style={signoff}>
        Talk soon,<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default CreatorWelcomeTemplate;

// Styles
const greeting = {
  fontSize: "20px",
  lineHeight: "28px",
  fontWeight: "600",
  color: "#1B4332",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4b5563",
  margin: "0 0 20px 0",
};

const highlightBox = {
  backgroundColor: "#FFF7ED",
  border: "1px solid #FED7AA",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px 0",
};

const highlightTitle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#92400E",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0 0 12px 0",
};

const highlightDetail = {
  fontSize: "16px",
  color: "#1B4332",
  margin: "0 0 8px 0",
};

const highlightStatus = {
  fontSize: "15px",
  color: "#4b5563",
  margin: "0",
};

const listItem = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#4b5563",
  margin: "0 0 4px 0",
  paddingLeft: "8px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#1B4332",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
  boxShadow: "0 4px 12px rgba(27, 67, 50, 0.2)",
};

const signoff = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 0 0",
};
