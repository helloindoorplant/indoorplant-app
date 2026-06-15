import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";

interface EmailLayoutProps {
  children: React.ReactNode;
  previewText?: string;
}

export const EmailLayout = ({ children, previewText }: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      {previewText && <Preview>{previewText}</Preview>}
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            {/* IMPORTANT: Email clients like Gmail block SVG images. 
                Until you have a .PNG or .JPG version of your logo hosted online, 
                we use a styled text logo so it doesn't appear broken. */}
            <Text style={{
              margin: '0',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#ffffff',
              letterSpacing: '1px'
            }}>
              IndoorPlant.in
            </Text>
          </Section>
          
          <Section style={content}>
            {children}
          </Section>

          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerHeading}>Need Help with Your Plants?</Text>
            <Text style={footerText}>
              Contact our experts at <Link href="mailto:support@indoorplant.in" style={footerLink}>support@indoorplant.in</Link><br />
              or call us at <Link href="tel:+917003587996" style={footerLink}>+91 7003587996</Link>.
            </Text>
            
            <Section style={socialSection}>
              <Link href="https://instagram.com/indoorplant.in" style={socialLink}>Instagram</Link>
              <span style={socialDivider}>•</span>
              <Link href="https://facebook.com/indoorplant.in" style={socialLink}>Facebook</Link>
              <span style={socialDivider}>•</span>
              <Link href="https://indoorplant.in" style={socialLink}>Website</Link>
            </Section>

            <Text style={footerAddress}>
              © {new Date().getFullYear()} IndoorPlant.in. All rights reserved.<br />
              Kolkata, India<br />
              <br />
              You are receiving this email because you signed up or made a purchase on our website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailLayout;

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#1B4332", // Deep premium green
  padding: "40px 20px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const content = {
  padding: "40px",
};

const hr = {
  borderColor: "#f0f0f0",
  margin: "0",
};

const footer = {
  backgroundColor: "#FAFAFA",
  padding: "40px",
  textAlign: "center" as const,
};

const footerHeading = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#1B4332",
  margin: "0 0 12px 0",
};

const footerText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#4b5563",
  margin: "0 0 24px 0",
};

const footerLink = {
  color: "#2D6A4F",
  textDecoration: "underline",
  fontWeight: "500",
};

const socialSection = {
  marginBottom: "24px",
};

const socialLink = {
  color: "#1B4332",
  fontSize: "13px",
  fontWeight: "600",
  textDecoration: "none",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};

const socialDivider = {
  color: "#D8F3DC",
  margin: "0 12px",
};

const footerAddress = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#9ca3af",
  margin: "0",
};
