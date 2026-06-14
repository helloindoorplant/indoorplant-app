import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import dynamic from "next/dynamic";
import { Footer } from "@/components/layout/Footer";
import { FloatingAiWidgetWrapper } from "@/components/shared/FloatingAiWidgetWrapper";
import { AuthProvider } from "@/components/providers/AuthProvider";

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
  icons: {
    icon: "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Indoorplant-Fav-Icon.webp",
    shortcut: "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Indoorplant-Fav-Icon.webp",
    apple: "https://lightgrey-nightingale-217677.hostingersite.com/wp-content/uploads/2026/06/Indoorplant-Fav-Icon.webp",
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col selection:bg-primary/20 selection:text-primary">
        <AuthProvider>
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <FloatingAiWidgetWrapper />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
