import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "SKYX Digi Solutions | High-Performance Digital & AI Engineering",
  description:
    "SKYX Digi Solutions helps ambitious businesses scale through high-performance web engineering, AI-driven performance marketing, custom software architecture, WhatsApp API automation and digital transformation.",
  keywords: "digital marketing, website development, mobile app, software, WhatsApp API, AI, SEO, branding, Krishnagiri, tech agency",
  authors: [{ name: "SKYX Digi Solutions" }],
  openGraph: {
    title: "SKYX Digi Solutions | High-Performance Digital & AI Engineering",
    description: "Architecting Digital Dominance for Ambitious Enterprises.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SKYX Digi Solutions",
    description: "High-Performance Digital & AI Engineering",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080B09] text-[#F1F5F9] antialiased selection:bg-[#10B981]/30 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

