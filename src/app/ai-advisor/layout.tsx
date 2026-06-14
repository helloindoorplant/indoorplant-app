import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI Plant Advisor — Find the Right Indoor Plant for Your Home | IndoorPlant.in",
  description: "Tell our AI your room size, sunlight level, and how often you forget to water — it recommends the right plant for you in under a minute. Free to use.",
  keywords: [
    "AI plant advisor India",
    "indoor plant recommendation India",
    "which plant is right for me",
    "plant finder India",
    "plant quiz India",
    "best plant for my home India",
    "plant recommendation tool India",
    "indoor plant selector India"
  ],
  openGraph: {
    title: "AI Plant Advisor — Find Your Plant in 60 Seconds",
    description: "Answer 3 questions about your space. Get a recommendation that fits your home, light, and lifestyle.",
    url: "https://www.indoorplant.in/ai-advisor"
  }
};

export default function AiAdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
