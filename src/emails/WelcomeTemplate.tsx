import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeTemplateProps {
  userFirstname: string;
}

export const WelcomeTemplate = ({
  userFirstname = "Plant Lover",
}: WelcomeTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to IndoorPlant.in! Let's get growing 🌱</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>IndoorPlant.in</Heading>
          </Section>
          
          <Section style={content}>
            <Text style={greeting}>Hi {userFirstname},</Text>
            <Text style={paragraph}>
              Welcome to IndoorPlant.in! We're thrilled to have you join our community of plant enthusiasts.
            </Text>
            <Text style={paragraph}>
              Whether you're looking for your first low-maintenance succulent, or hunting for a rare Monstera Albo, we're here to help you build your indoor jungle.
            </Text>

            <Section style={couponContainer}>
              <Text style={couponHeader}>Your 5% Welcome Gift</Text>
              <Text style={couponText}>Use the code below at checkout to claim your first discount!</Text>
              <div style={couponCodeBlock}>
                <strong>TEST5</strong>
              </div>
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
            
            <Hr style={hr} />
            <Text style={footer}>
              Happy Planting,<br />
              The IndoorPlant.in Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeTemplate;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
  backgroundColor: "#f0fdf4", // Light green background
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  borderBottom: "1px solid #dcfce7",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0",
  color: "#166534", // Dark green
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

const buttonContainer = {
  textAlign: "center" as const,
  margin: "24px 0",
};

const button = {
  backgroundColor: "#16a34a",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 28px",
};

const outlineButton = {
  backgroundColor: "transparent",
  border: "2px solid #16a34a",
  borderRadius: "8px",
  color: "#16a34a",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 26px",
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

const couponContainer = {
  backgroundColor: "#f0fdf4",
  border: "1px dashed #2D6A4F",
  borderRadius: "8px",
  padding: "20px",
  textAlign: "center" as const,
  margin: "32px 0",
};

const couponHeader = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#2D6A4F",
  margin: "0 0 8px 0",
};

const couponText = {
  fontSize: "14px",
  color: "#4b5563",
  margin: "0 0 16px 0",
};

const couponCodeBlock = {
  backgroundColor: "#ffffff",
  border: "2px solid #2D6A4F",
  borderRadius: "6px",
  padding: "12px",
  fontSize: "24px",
  color: "#2D6A4F",
  letterSpacing: "2px",
};
