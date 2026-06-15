import * as React from "react";
import {
  Button,
  Section,
  Text,
} from "react-email";
import EmailLayout from "./EmailLayout";

export const NewsletterTemplate = () => {
  return (
    <EmailLayout previewText="Welcome to the IndoorPlant.in community! 🌱">
      <Text style={greeting}>Hello Plant Lover!</Text>
      <Text style={paragraph}>
        Thank you for subscribing to IndoorPlant.in! We're absolutely thrilled to have you join our community.
      </Text>
      
      <Text style={paragraph}>
        Get ready to receive exclusive plant care tips, early access to new plant arrivals, and special offers delivered right to your inbox. We promise to only send you the good stuff—no spam, just pure plant joy.
      </Text>

      <Section style={cardContainer}>
        <Text style={cardHeader}>Need Plant Care Advice Now?</Text>
        <Text style={cardText}>Try our brand new AI Plant Advisor. It can help you find the perfect plant or diagnose any issues with your current ones in seconds!</Text>
        <Button style={button} href="https://indoorplant.in/ai-advisor">
          Try AI Advisor Free
        </Button>
      </Section>
      
      <Section style={{ textAlign: "center", marginTop: "32px" }}>
        <Button style={outlineButton} href="https://indoorplant.in/shop">
          Explore Our Plants
        </Button>
      </Section>
      
      <Text style={signoff}>
        Happy Planting,<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default NewsletterTemplate;

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

const cardContainer = {
  backgroundColor: "#F8FFF9",
  border: "1px solid #D8F3DC",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center" as const,
  margin: "32px 0",
};

const cardHeader = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#2D6A4F",
  margin: "0 0 12px 0",
};

const cardText = {
  fontSize: "15px",
  color: "#4b5563",
  margin: "0 0 24px 0",
  lineHeight: "24px",
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
  padding: "14px 28px",
  boxShadow: "0 4px 12px rgba(27, 67, 50, 0.2)",
};

const outlineButton = {
  backgroundColor: "transparent",
  border: "2px solid #2D6A4F",
  borderRadius: "8px",
  color: "#2D6A4F",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 30px",
};

const signoff = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 0 0",
};
