import * as React from "react";
import { Button, Section, Text } from "react-email";
import EmailLayout from "./EmailLayout";

interface CreatorPendingTemplateProps {
  creatorName: string;
  plantName: string;
}

export const CreatorPendingTemplate = ({
  creatorName = "Creator",
  plantName = "Plant",
}: CreatorPendingTemplateProps) => {
  return (
    <EmailLayout previewText={`Your Creator Program application status is pending ⏳`}>
      <Text style={greeting}>Hey {creatorName} 👋</Text>
      
      <Text style={paragraph}>
        This is a quick update regarding your application for our <strong>Free Plant Creator Program</strong> for the <strong>{plantName}</strong>.
      </Text>

      <Text style={paragraph}>
        Your application status is currently <strong style={{ color: '#D97706' }}>Pending</strong>. Our team is currently reviewing the available inventory and slots for this plant, and we will update you as soon as we make a final decision.
      </Text>

      <Text style={paragraph}>
        In the meantime, feel free to browse our catalog to see what other beautiful indoor plants we offer!
      </Text>

      <Section style={buttonContainer}>
        <Button style={button} href="https://indoorplant.in/shop">
          Explore Our Shop
        </Button>
      </Section>

      <Text style={signoff}>
        Talk soon,<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default CreatorPendingTemplate;

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
