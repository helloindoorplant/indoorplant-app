import * as React from "react";
import {
  Section,
  Text,
  Button,
  Hr,
  Row,
  Column,
} from "react-email";
import EmailLayout from "./EmailLayout";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface PaymentConfirmationEmailProps {
  userFirstname: string;
  orderId: string;
  orderTotal: number;
  items: OrderItem[];
}

export const PaymentConfirmationEmail = ({
  userFirstname = "Plant Lover",
  orderId = "ORD-000000",
  orderTotal = 0,
  items = [],
}: PaymentConfirmationEmailProps) => {
  // Simple calculations without GST
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = orderTotal - subtotal; // Calculate shipping dynamically

  return (
    <EmailLayout previewText={`Payment Confirmation for Order #${orderId}`}>
      <Text style={heading}>Thank you for your order!</Text>
      <Text style={paragraph}>
        Hi {userFirstname},
      </Text>
      <Text style={paragraph}>
        Your payment was successful and we have received your order. We are now preparing your plants for shipment.
      </Text>
      <Text style={paragraph}>
        Below is your order summary. You can also download a PDF invoice directly from your account dashboard.
      </Text>

      <Section style={summaryContainer}>
        <Text style={summaryHeader}>Order Summary (Order #{orderId})</Text>
        <Hr style={hr} />
        
        {/* Items */}
        {items.map((item, index) => (
          <Row key={index} style={itemRow}>
            <Column style={itemColumn}>
              <Text style={itemText}>{item.quantity}x {item.name}</Text>
            </Column>
            <Column style={priceColumn}>
              <Text style={itemText}>₹{item.price * item.quantity}</Text>
            </Column>
          </Row>
        ))}

        <Hr style={hr} />

        {/* Totals */}
        <Row style={itemRow}>
          <Column style={itemColumn}>
            <Text style={totalsText}>Subtotal</Text>
          </Column>
          <Column style={priceColumn}>
            <Text style={totalsText}>₹{subtotal}</Text>
          </Column>
        </Row>

        <Row style={itemRow}>
          <Column style={itemColumn}>
            <Text style={totalsText}>Shipping</Text>
          </Column>
          <Column style={priceColumn}>
            <Text style={totalsText}>₹{shipping > 0 ? shipping : 0}</Text>
          </Column>
        </Row>

        <Hr style={hrHeavy} />

        <Row style={itemRow}>
          <Column style={itemColumn}>
            <Text style={finalTotalText}>Total</Text>
          </Column>
          <Column style={priceColumn}>
            <Text style={finalTotalText}>₹{orderTotal}</Text>
          </Column>
        </Row>
      </Section>

      <Section style={buttonContainer}>
        <Button style={button} href={`https://indoorplant.in/account/orders`}>
          View Dashboard
        </Button>
      </Section>
      
      <Text style={signoff}>
        Happy Planting,<br />
        <strong>The IndoorPlant.in Team</strong>
      </Text>
    </EmailLayout>
  );
};

export default PaymentConfirmationEmail;

// Styles
const heading = {
  fontSize: "24px",
  lineHeight: "32px",
  fontWeight: "700",
  color: "#1B4332",
  margin: "0 0 20px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4b5563",
  margin: "0 0 20px 0",
};

const summaryContainer = {
  backgroundColor: "#FAFAFA",
  borderRadius: "8px",
  padding: "24px",
  margin: "32px 0",
  border: "1px solid #eaeaea",
};

const summaryHeader = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#111827",
  margin: "0 0 16px 0",
};

const itemRow = {
  width: "100%",
  display: "table",
};

const itemColumn = {
  width: "70%",
};

const priceColumn = {
  width: "30%",
  textAlign: "right" as const,
};

const itemText = {
  fontSize: "14px",
  color: "#4b5563",
  margin: "8px 0",
};

const totalsText = {
  fontSize: "14px",
  color: "#4b5563",
  margin: "8px 0",
};

const finalTotalText = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#111827",
  margin: "12px 0",
};

const hr = {
  borderColor: "#eaeaea",
  margin: "12px 0",
};

const hrHeavy = {
  borderColor: "#d1d5db",
  margin: "12px 0",
  borderWidth: "1px",
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
};

const signoff = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 0 0",
};
