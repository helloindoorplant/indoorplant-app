import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Link,
} from "@react-email/components";

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
    <Html>
      <Head />
      <Preview>Your IndoorPlant.in Order #{orderId} is confirmed! 🌿</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={heading}>Order Confirmed</Heading>
          </Section>
          
          <Section style={content}>
            <Text style={greeting}>Hi {userFirstname},</Text>
            <Text style={paragraph}>
              Thank you for your order! We've received your order and are getting it ready to be shipped. We will send you an email with tracking details as soon as it ships.
            </Text>
            
            <Section style={orderDetailsBox}>
              <Text style={orderIdText}>Order #{orderId}</Text>
              
              <Hr style={hrSmall} />
              
              {items.map((item, index) => (
                <Row key={index} style={itemRow}>
                  <Column style={{ width: '70%' }}>
                    <Text style={itemText}>{item.name} (x{item.quantity})</Text>
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
            
            <Text style={paragraph}>
              You can track your order status anytime from your <Link href="https://indoorplant.in/account/dashboard" style={link}>Account Dashboard</Link>.
            </Text>
            
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

export default OrderPlacedTemplate;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
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
  backgroundColor: "#f0fdf4",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  borderBottom: "1px solid #dcfce7",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0",
  color: "#166534",
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

const orderDetailsBox = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
  border: "1px solid #e5e7eb",
};

const orderIdText = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#111827",
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
  color: "#111827",
  margin: "0",
};

const totalTextValue = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#166534",
  margin: "0",
};

const hrSmall = {
  borderColor: "#e5e7eb",
  margin: "12px 0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const link = {
  color: "#16a34a",
  textDecoration: "underline",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
};
