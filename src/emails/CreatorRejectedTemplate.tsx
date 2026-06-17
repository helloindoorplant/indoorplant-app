import * as React from "react";
import { Text } from "react-email";
import EmailLayout from "./EmailLayout";

interface CreatorRejectedTemplateProps {
  creatorName: string;
  plantName: string;
}

export const CreatorRejectedTemplate = ({
  creatorName = "Creator",
  plantName = "Plant",
}: CreatorRejectedTemplateProps) => {
  return (
    <EmailLayout previewText={`Update on your Creator Program application 🌿`}>
      <Text style={greeting}>Hey {creatorName} 👋</Text>
      
      <Text style={paragraph}>
        Thank you so much for applying to our <strong>Free Plant Creator Program</strong> and for your interest in collaborating with us.
      </Text>

      <Text style={paragraph}>
        We reviewed your application for the <strong>{plantName}</strong>, and while we love your enthusiasm and content style, we unfortunately cannot approve your application at this time due to a limited number of slots for this specific plant.
      </Text>

      <Text style={paragraph}>
        Please don't be discouraged! Better luck next time — we would love for you to keep sharing your plant journey and try applying again in our next round of applications. We are constantly refreshing our catalog and opening new creator slots.
      </Text>

      <Text style={signoff}>
        Thanks again for your support,<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default CreatorRejectedTemplate;

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

const signoff = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 0 0",
};
