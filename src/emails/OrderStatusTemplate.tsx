import * as React from "react";
import {
  Section,
  Text,
  Button,
} from "react-email";
import EmailLayout from "./EmailLayout";

type OrderStatus = "processing" | "shipped" | "out_for_delivery" | "delivered";

interface OrderStatusTemplateProps {
  userFirstname: string;
  orderId: string;
  status: OrderStatus;
  trackingLink?: string;
  expectedDeliveryDate?: string;
}

const getStatusMessage = (status: OrderStatus) => {
  switch (status) {
    case "processing":
      return {
        title: "Your order is being processed",
        message: "Our experts are currently handpicking and safely packaging your plants.",
      };
    case "shipped":
      return {
        title: "Your order has shipped! 🚚",
        message: "Great news! Your plants are on their way to you. They have left our nursery and are in transit.",
      };
    case "out_for_delivery":
      return {
        title: "Out for delivery today! 📦",
        message: "Get ready! Your new green friends will be arriving at your doorstep today.",
      };
    case "delivered":
      return {
        title: "Your plants have arrived! 🪴",
        message: "Your order has been delivered successfully. We hope you love your new plants!",
      };
    default:
      return {
        title: "Order Update",
        message: "There has been an update to your order.",
      };
  }
};

export const OrderStatusTemplate = ({
  userFirstname = "Plant Lover",
  orderId = "ORD-12345678",
  status = "shipped",
  trackingLink = "https://indoorplant.in/account/orders",
  expectedDeliveryDate = "June 18, 2026",
}: OrderStatusTemplateProps) => {
  const { title, message } = getStatusMessage(status);

  return (
    <EmailLayout previewText={`${title} - Order #${orderId}`}>
      <Text style={heading}>{title}</Text>
      <Text style={greeting}>Hi {userFirstname},</Text>
      <Text style={paragraph}>{message}</Text>
      
      <Section style={statusBox}>
        <Text style={statusTextLabel}>Order Number</Text>
        <Text style={statusTextValue}>#{orderId}</Text>
        
        {expectedDeliveryDate && status !== "delivered" && (
          <>
            <div style={{ height: "16px" }} />
            <Text style={statusTextLabel}>Expected Delivery</Text>
            <Text style={statusTextValue}>{expectedDeliveryDate}</Text>
          </>
        )}
      </Section>
      
      {trackingLink && (
        <Section style={buttonContainer}>
          <Button style={button} href={trackingLink}>
            Track Your Order
          </Button>
        </Section>
      )}

      {status === "delivered" && (
        <Section style={plantCareBox}>
          <Text style={plantCareTitle}>First Steps with Your New Plants</Text>
          <Text style={plantCareText}>
            Unbox them carefully and give them a small drink of water if the soil is completely dry. Let them acclimate to their new home for a few days before repotting!
          </Text>
        </Section>
      )}
      
      <Text style={signoff}>
        Happy Planting,<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default OrderStatusTemplate;

// Styles
const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1B4332",
  margin: "0 0 24px 0",
};

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

const statusBox = {
  backgroundColor: "#F8FFF9",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
  border: "1px solid #D8F3DC",
  textAlign: "center" as const,
};

const statusTextLabel = {
  fontSize: "14px",
  color: "#4b5563",
  margin: "0 0 4px 0",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const statusTextValue = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1B4332",
  margin: "0",
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

const plantCareBox = {
  backgroundColor: "#ffffff",
  borderLeft: "4px solid #52B788",
  padding: "16px 20px",
  margin: "32px 0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
};

const plantCareTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#2D6A4F",
  margin: "0 0 8px 0",
};

const plantCareText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#4b5563",
  margin: "0",
};

const signoff = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 0 0",
};
