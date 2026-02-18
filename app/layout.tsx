import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowkart.io"),
  title: "Flowkart — AI-Native Engineering Agency",
  description:
    "Architecting the intelligence layer your business is missing. Production-grade agentic workflows, enterprise RAG systems, and custom AI infrastructure.",
  keywords: [
    "AI agency",
    "agentic workflows",
    "RAG systems",
    "AI integration",
    "AI consulting",
    "custom AI",
    "production AI",
  ],
  authors: [{ name: "Flowkart" }],
  openGraph: {
    title: "Flowkart — AI-Native Engineering Agency",
    description:
      "Stop decorating with AI. Start building with it.",
    url: "https://flowkart.io",
    siteName: "Flowkart",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowkart — AI-Native Engineering Agency",
    description:
      "Stop decorating with AI. Start building with it.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Flowkart",
  description:
    "AI-Native Agency — We architect production-grade agentic workflows and custom AI infrastructure.",
  url: "https://flowkart.io",
  founder: {
    "@type": "Person",
    name: "Harsh Sahrawat",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var ua=navigator.userAgent;
            var iOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
            if(iOS)document.documentElement.classList.add("ios");
          })();
        `}} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
