
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer, Header } from "@/components/site-chrome";
import { siteConfig } from "@/lib/site";

import "./globals.css";
import "./studio-v5.css";
import "./edition-v6.css";
import "./assets-v7.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name + " | پورتفولیوی علمی دندان‌پزشکی",
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: "/assets/bioglass/G17_opengraph-main.webp", width: 1672, height: 941, alt: "BioGlass Studio, Dental Research Archive" }],
  },
  twitter: { card: "summary_large_image", images: ["/assets/bioglass/G17_opengraph-main.webp"] },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-dvh antialiased">
        <a href="#main-content" className="skip-link">رفتن به محتوای اصلی</a>
        <div className="page-atmosphere" aria-hidden="true" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
