import * as React from "react";
import {
  Button,
  Section,
  Text,
} from "react-email";
import EmailLayout from "./EmailLayout";

interface CreatorApprovedTemplateProps {
  creatorName: string;
  plantName: string;
  couponCode: string;
}

export const CreatorApprovedTemplate = ({
  creatorName = "Creator",
  plantName = "Plant",
  couponCode = "CREATOR-XXXX",
}: CreatorApprovedTemplateProps) => {
  return (
    <EmailLayout previewText={`You're in! Your free ${plantName} is waiting 🎉`}>
      <Text style={greeting}>Congratulations, {creatorName}! 🎉</Text>
      <Text style={paragraph}>
        Your application for our <strong>Free Plant Creator Program</strong> has been <strong style={{ color: '#059669' }}>approved</strong>. 
        We can't wait to see what you create.
      </Text>
      <Text style={paragraph}>
        Our team will connect with you as soon as possible.
      </Text>

      <Section style={couponContainer}>
        <Text style={couponLabel}>Your Exclusive Coupon</Text>
        <div style={{ ...couponCodeBlock, userSelect: 'all', WebkitUserSelect: 'all' }}>
          <strong>{couponCode}</strong>
        </div>
        <Text style={couponPlant}>
          Valid for: <strong>{plantName}</strong>
        </Text>
        <Text style={couponNote}>
          This code makes your plant 100% free. One-time use only.
        </Text>
      </Section>

      <Text style={subheading}>How to redeem</Text>
      <Section style={stepsContainer}>
        <div style={stepRow}>
          <div style={stepNumber}>1</div>
          <Text style={stepText}>
            Go to the product page for <strong>{plantName}</strong>
          </Text>
        </div>
        <div style={stepRow}>
          <div style={stepNumber}>2</div>
          <Text style={stepText}>
            Add it to your cart and proceed to checkout
          </Text>
        </div>
        <div style={stepRow}>
          <div style={stepNumber}>3</div>
          <Text style={stepText}>
            Enter the coupon code above — the price drops to <strong>₹0</strong>
          </Text>
        </div>
        <div style={stepRow}>
          <div style={stepNumber}>4</div>
          <Text style={stepText}>
            Place your order. No payment needed!
          </Text>
        </div>
      </Section>

      <Section style={buttonContainer}>
        <Button style={button} href="https://indoorplant.in/shop">
          Redeem Now
        </Button>
      </Section>

      <Section style={commitmentBox}>
        <Text style={commitmentTitle}>Your Part of the Deal</Text>
        <Text style={commitmentText}>
          After receiving your plant, create a beautiful, honest video showcasing it. 
          Share it on your Instagram and tag <strong>@indoorplant.in</strong>. 
          That's it — no scripts, no pressure. Just real content.
        </Text>
      </Section>
      
      <Text style={signoff}>
        We're rooting for you (pun intended),<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default CreatorApprovedTemplate;

// Styles
const greeting = {
  fontSize: "22px",
  lineHeight: "30px",
  fontWeight: "700",
  color: "#1B4332",
  margin: "0 0 16px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4b5563",
  margin: "0 0 20px 0",
};

const subheading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1B4332",
  margin: "32px 0 16px 0",
};

const couponContainer = {
  backgroundColor: "#F0FDF4",
  border: "2px solid #BBF7D0",
  borderRadius: "16px",
  padding: "32px",
  textAlign: "center" as const,
  margin: "28px 0",
};

const couponLabel = {
  fontSize: "13px",
  fontWeight: "bold",
  color: "#166534",
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  margin: "0 0 16px 0",
};

const couponCodeBlock = {
  backgroundColor: "#ffffff",
  border: "3px dashed #22C55E",
  borderRadius: "12px",
  padding: "20px 32px",
  fontSize: "28px",
  color: "#1B4332",
  letterSpacing: "5px",
  display: "inline-block",
};

const couponPlant = {
  fontSize: "15px",
  color: "#166534",
  margin: "16px 0 4px 0",
};

const couponNote = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "4px 0 0 0",
};

const stepsContainer = {
  margin: "0 0 8px 0",
};

const stepRow = {
  display: "flex" as const,
  alignItems: "flex-start" as const,
  marginBottom: "12px",
};

const stepNumber = {
  width: "28px",
  height: "28px",
  backgroundColor: "#2D6A4F",
  color: "#ffffff",
  borderRadius: "50%",
  textAlign: "center" as const,
  lineHeight: "28px",
  fontSize: "14px",
  fontWeight: "bold" as const,
  marginRight: "14px",
  flexShrink: 0,
};

const stepText = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#4b5563",
  margin: "0",
  flex: 1,
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#1B4332",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "17px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "18px 40px",
  boxShadow: "0 6px 16px rgba(27, 67, 50, 0.25)",
};

const commitmentBox = {
  backgroundColor: "#FFFBEB",
  border: "1px solid #FDE68A",
  borderRadius: "12px",
  padding: "24px",
  margin: "28px 0",
};

const commitmentTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#92400E",
  margin: "0 0 8px 0",
};

const commitmentText = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#78350F",
  margin: "0",
};

const signoff = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 0 0",
};
