import * as React from "react";
import {
  Button,
  Section,
  Text,
} from "react-email";
import EmailLayout from "./EmailLayout";

interface WelcomeTemplateProps {
  userFirstname: string;
}

export const WelcomeTemplate = ({
  userFirstname = "Plant Lover",
}: WelcomeTemplateProps) => {
  return (
    <EmailLayout previewText="Welcome to IndoorPlant.in! Let's get growing 🌱">
      <Text style={greeting}>Hi {userFirstname},</Text>
      <Text style={paragraph}>
        Welcome to IndoorPlant.in! We're thrilled to have you join our community of plant enthusiasts.
      </Text>

      <Section style={couponContainer}>
        <Text style={couponHeader}>Your 5% Welcome Gift</Text>
        <Text style={couponText}>Use the code below at checkout to claim your first discount!</Text>
        <div style={{ ...couponCodeBlock, userSelect: 'all', WebkitUserSelect: 'all' }}>
          <strong>TEST5</strong>
          <img 
            src="https://img.icons8.com/material-rounded/24/1b4332/copy.png" 
            alt="Copy icon" 
            style={{ width: '20px', height: '20px', verticalAlign: 'middle', marginLeft: '12px', cursor: 'pointer' }}
            title="Copy coupon code"
          />
        </div>
        <Text style={{ fontSize: '13px', color: '#6b7280', marginTop: '12px' }}>
          *(Tap the code to instantly select and copy)*
        </Text>
      </Section>
      
      <Section style={buttonContainer}>
        <Button style={button} href="https://indoorplant.in/shop">
          Shop Our Plants
        </Button>
      </Section>
      
      <Text style={paragraph}>
        <strong>Not sure where to start?</strong> Try chatting with our AI Plant Advisor! It will recommend the perfect plant based on your room's light and your lifestyle.
      </Text>
      
      <Section style={buttonContainer}>
        <Button style={outlineButton} href="https://indoorplant.in/ai-advisor">
          Try AI Advisor
        </Button>
      </Section>
      
      <Text style={signoff}>
        Happy Planting,<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default WelcomeTemplate;

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

const couponContainer = {
  backgroundColor: "#F8FFF9",
  border: "1px solid #D8F3DC",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center" as const,
  margin: "32px 0",
};

const couponHeader = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#2D6A4F",
  margin: "0 0 8px 0",
};

const couponText = {
  fontSize: "15px",
  color: "#4b5563",
  margin: "0 0 20px 0",
};

const couponCodeBlock = {
  backgroundColor: "#ffffff",
  border: "2px dashed #52B788",
  borderRadius: "8px",
  padding: "16px",
  fontSize: "24px",
  color: "#1B4332",
  letterSpacing: "4px",
  display: "inline-block",
};
