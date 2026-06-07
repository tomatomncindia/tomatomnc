import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

import { LegalShell, LegalSection } from "@/components/legal/LegalShell";
import { CERTIFICATIONS } from "@/data/certifications";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Compliance",
  description:
    "Quality systems and regulatory certifications behind Tomato M&C orthopedic casting products — ISO 13485, ISO 9001, ISO 14001, CE, FDA registration, and KGMP.",
  path: "/compliance",
});

export default function CompliancePage() {
  return (
    <LegalShell
      eyebrow="Quality & Regulatory"
      title="Compliance"
      intro="The products distributed through this website are manufactured by Tomato M&C Co., Ltd. at its facility in Pyeongtaek, South Korea, under an ISO 13485 quality management system, and distributed in India by Blackchip Impex Private Limited."
    >
      <LegalSection number="01" title="Quality management">
        <p>
          Tomato M&amp;C Co., Ltd. has manufactured fiberglass orthopedic casting products since
          2005 and controls its supply chain end-to-end — from fiberglass fabric and polyurethane
          coating resin through finished casting tape and splints. Manufacturing operates under the
          certified management systems listed below.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Certifications">
        <p>Certifications held by the manufacturer, Tomato M&amp;C Co., Ltd.:</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {CERTIFICATIONS.map((c) => (
            <div key={c.id} className="rounded-xl border border-line bg-paper p-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-forest" strokeWidth={2} />
                <p className="font-display text-[17px] text-ink">{c.body}</p>
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                {c.scope} · {c.region}
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </LegalSection>

      <LegalSection number="03" title="Documentation on request">
        <p>
          Copies of certificates, declarations of conformity, and product-specific regulatory
          documentation are available to qualified hospitals, institutions, and distribution
          partners. Request them through the{" "}
          <Link href="/contact" className="text-ink underline underline-offset-4 hover:text-forest">
            contact page
          </Link>{" "}
          or by email at{" "}
          <a
            href={`mailto:${SITE.contact.email}`}
            className="text-ink underline underline-offset-4 hover:text-forest"
          >
            {SITE.contact.email}
          </a>
          . Sample shipments include full specifications and the regulatory documentation relevant
          to your market.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Product use">
        <p>
          All products presented on this website are intended for application by trained medical
          personnel, following the labeling and instructions for use supplied with each product.
          Product specifications and ordering codes are published on the individual{" "}
          <Link href="/products" className="text-ink underline underline-offset-4 hover:text-forest">
            product pages
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection number="05" title="Learn more">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/manufacturing"
            className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-ink hover:text-forest"
          >
            Inside the manufacturing line
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/network#quality"
            className="group inline-flex items-center gap-2 text-[14.5px] font-medium text-ink hover:text-forest"
          >
            Certifications across our network
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </LegalSection>
    </LegalShell>
  );
}
