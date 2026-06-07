import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "@/styles/globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { baseMetadata, SITE_URL } from "@/lib/seo";
import { SITE } from "@/data/site";

// Editorial display serif. Used for h1, h2, large display moments.
// Variable font — opsz axis pulls finer details at large sizes; SOFT axis softens the cut.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
});

// Body & UI sans. Tight tabular and ss feature set.
const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

// Industrial labels, step numbers, codes, manifest data.
// JetBrains Mono has more character than Geist Mono for technical labels.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
});

// Editorial italic accent. Used for pull quotes, mission, oversized display.
// Pairs with Fraunces as a counter-voice when a single italic isn't strong enough.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.legalName,
  alternateName: "Tomato M&C India",
  url: SITE_URL,
  logo: `${SITE_URL}/tomato_mnc_india_logo.png`,
  description:
    "Korean manufacturer of fiberglass orthopedic casting tape, splints, and supporting products, supplying hospitals and distributors across India.",
  foundingDate: "2005",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressRegion: "Gyeonggi-do",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "South Korea" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.contact.salesEmail,
      telephone: SITE.contact.phone,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Korean"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
