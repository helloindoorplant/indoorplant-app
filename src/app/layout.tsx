import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { FloatingAiWidgetWrapper } from "@/components/shared/FloatingAiWidgetWrapper";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | IndoorPlant.in',
    default: 'IndoorPlant.in | Bring Nature Inside',
  },
  description: "AI-Powered Indoor Plant E-Commerce Platform. Discover the perfect plants for your home and office.",
  keywords: ["indoor plants", "buy plants online", "houseplants", "plant delivery India", "plant care", "AI plant advisor"],
  authors: [{ name: "IndoorPlant.in" }],
  openGraph: {
    title: "IndoorPlant.in | Bring Nature Inside",
    description: "AI-Powered Indoor Plant E-Commerce Platform. Discover the perfect plants for your home and office.",
    url: "https://indoorplant.in",
    siteName: "IndoorPlant.in",
    images: [
      {
        url: "https://images.unsplash.com/photo-1545241047-6083a36cb15f?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "IndoorPlant.in Hero",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndoorPlant.in | Bring Nature Inside",
    description: "AI-Powered Indoor Plant E-Commerce Platform. Discover the perfect plants for your home and office.",
    images: ["https://images.unsplash.com/photo-1545241047-6083a36cb15f?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Crucial for preventing iOS input zoom
  userScalable: false,
  themeColor: "#2D6A4F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IndoorPlant.in",
    "url": "https://www.indoorplant.in",
    "logo": "https://www.indoorplant.in/Indoorplant-Logo.svg",
    "description": "IndoorPlant.in is an online plant store that delivers fresh indoor plants across India with AI-powered plant recommendations and expert care guides.",
    "foundingLocation": "India",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 7003587996",
      "email": "helloindoorplant@gmail.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.instagram.com/indoorplant.in",
      "https://www.facebook.com/indoorplant.in"
    ]
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="d0470d23-781d-4dcd-a3c0-582b163f82c9"></script>
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col selection:bg-primary/20 selection:text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <AuthProvider>
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <FloatingAiWidgetWrapper />
          <Footer />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
