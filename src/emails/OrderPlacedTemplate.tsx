import * as React from "react";
import {
  Section,
  Text,
  Row,
  Column,
  Link,
  Hr,
  Button,
} from "react-email";
import EmailLayout from "./EmailLayout";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderPlacedTemplateProps {
  userFirstname: string;
  orderId: string;
  orderTotal: number;
  items: OrderItem[];
}

export const OrderPlacedTemplate = ({
  userFirstname = "Plant Lover",
  orderId = "ORD-12345678",
  orderTotal = 1498,
  items = [
    { name: "Monstera Deliciosa", quantity: 1, price: 999 },
    { name: "Snake Plant", quantity: 1, price: 499 }
  ],
}: OrderPlacedTemplateProps) => {
  return (
    <EmailLayout previewText={`Your IndoorPlant.in Order #${orderId} is confirmed! 🌿`}>
      <Text style={heading}>Order Confirmed 🎉</Text>
      <Text style={greeting}>Hi {userFirstname},</Text>
      <Text style={paragraph}>
        Thank you for choosing IndoorPlant.in! We've successfully received your order and our plant experts are carefully selecting and packaging your new green friends.
      </Text>
      
      <Section style={orderDetailsBox}>
        <Text style={orderIdText}>Order #{orderId}</Text>
        
        <Hr style={hrSmall} />
        
        {items.map((item, index) => (
          <Row key={index} style={itemRow}>
            <Column style={{ width: '70%' }}>
              <Text style={itemText}><strong>{item.name}</strong> x{item.quantity}</Text>
            </Column>
            <Column style={{ width: '30%', textAlign: 'right' }}>
              <Text style={itemText}>₹{item.price * item.quantity}</Text>
            </Column>
          </Row>
        ))}
        
        <Hr style={hrSmall} />
        
        <Row style={itemRow}>
          <Column style={{ width: '70%' }}>
            <Text style={totalTextLabel}>Total Amount</Text>
          </Column>
          <Column style={{ width: '30%', textAlign: 'right' }}>
            <Text style={totalTextValue}>₹{orderTotal}</Text>
          </Column>
        </Row>
      </Section>

      <Section style={plantCareBox}>
        <Text style={plantCareTitle}>Preparing for your plants</Text>
        <Text style={plantCareText}>
          While your order is on the way, make sure to find the perfect spot in your home! Most indoor plants thrive in bright, indirect sunlight. Keep an eye out for our upcoming emails with specific care instructions for your new plants.
        </Text>
      </Section>
      
      <Section style={buttonContainer}>
        <Button style={button} href="https://indoorplant.in/account/dashboard">
          Track Your Order
        </Button>
      </Section>
      
      <Text style={signoff}>
        Happy Planting,<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default OrderPlacedTemplate;

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

const orderDetailsBox = {
  backgroundColor: "#F8FFF9",
  borderRadius: "12px",
  padding: "24px",
  margin: "32px 0",
  border: "1px solid #D8F3DC",
};

const orderIdText = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1B4332",
  margin: "0 0 16px 0",
};

const itemRow = {
  padding: "8px 0",
};

const itemText = {
  fontSize: "15px",
  color: "#4b5563",
  margin: "0",
};

const totalTextLabel = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#1B4332",
  margin: "0",
};

const totalTextValue = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#2D6A4F",
  margin: "0",
};

const hrSmall = {
  borderColor: "#D8F3DC",
  margin: "16px 0",
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
