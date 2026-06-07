import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomatomncindia.com";
const SITE_NAME = "Tomato M&C India";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tomato M&C India · Orthopedic Casting Tape & Splint Supplier in India",
    template: "%s · Tomato M&C India",
  },
  description:
    "Premium Korean-manufactured fiberglass orthopedic casting tape, fiberglass casts, and splints for the Indian healthcare market. ISO 13485, FDA, CE & KGMP certified. Trusted supplier to hospitals and distributors across India.",
  applicationName: SITE_NAME,
  authors: [{ name: "Tomato M&C Co., Ltd." }],
  creator: "Tomato M&C Co., Ltd.",
  publisher: "Tomato M&C Co., Ltd.",
  category: "Medical Devices",
  keywords: [
    // Product / India market intent
    "orthopedic casting tape India",
    "fiberglass cast supplier India",
    "fiberglass casting tape India",
    "polyester casting tape India",
    "orthopedic splint India",
    "casting tape distributor India",
    "orthopedic immobilization products India",
    "POP cast alternative India",
    "medical casting supplies India",
    "hospital casting supplies India",
    // Product generic
    "fiberglass cast",
    "polyester cast",
    // Sourcing / B2B
    "Korean orthopedic casting tape",
    "ISO 13485 casting tape",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Tomato M&C India · Orthopedic Casting Tape & Splint Supplier",
    description:
      "Premium Korean-manufactured fiberglass orthopedic casting tape and splints for hospitals and distributors across India. ISO 13485, CE & FDA certified.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomato M&C India",
    description:
      "Premium Korean-manufactured fiberglass orthopedic casting tape and splints for the Indian healthcare market. ISO 13485, CE & FDA certified.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { title, description, card: "summary_large_image" },
  };
}
