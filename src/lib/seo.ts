import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomatomnc-mc.com";
const SITE_NAME = "Tomato M&C";

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tomato M&C · Synthetic Orthopedic Casting & Splint Manufacturer",
    template: "%s · Tomato M&C",
  },
  description:
    "Korea's leading manufacturer of synthetic orthopedic casting tape, splints, and immobilization accessories. ISO 13485, FDA, CE, KGMP certified. Supplying 30+ countries since 2005.",
  applicationName: SITE_NAME,
  authors: [{ name: "Tomato M&C Co., Ltd." }],
  keywords: [
    "synthetic cast",
    "orthopedic casting tape",
    "fiberglass cast",
    "polyester cast",
    "orthopedic splint",
    "medical manufacturer Korea",
    "ISO 13485",
    "OEM private label casting",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Tomato M&C · Synthetic Orthopedic Casting & Splint Manufacturer",
    description:
      "Premium medical-grade synthetic casting and splint solutions, manufactured in Korea since 2005.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomato M&C",
    description:
      "Premium medical-grade synthetic casting and splint solutions, manufactured in Korea since 2005.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
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
