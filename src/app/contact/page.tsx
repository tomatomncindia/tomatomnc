import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ContactForm } from "./ContactForm";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Tomato M&C for samples, quotations, distribution opportunities, or OEM partnerships. We respond to all inquiries within 2 business days.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Container className="pt-16 md:pt-24 pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Get in Touch</p>
          <h1 className="mt-4 font-display text-[40px] sm:text-[52px] leading-[1.05] tracking-[-0.02em]">
            Contact Tomato M&amp;C
          </h1>
          <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">
            We respond to all inquiries within 2 business days.
          </p>
        </div>
      </Container>

      <Container className="pb-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-line bg-paper p-6 md:p-7">
              <h2 className="font-display text-xl">Company Details</h2>
              <dl className="mt-5 space-y-4 text-[14.5px]">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-forest" strokeWidth={1.7} />
                  <div>
                    <dt className="font-medium">{SITE.legalName}</dt>
                    <dd className="mt-0.5 text-ink-soft leading-relaxed">
                      {SITE.contact.addressLines.map((l) => (
                        <span key={l} className="block">{l}</span>
                      ))}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-forest" strokeWidth={1.7} />
                  <div className="text-ink-soft">
                    <div>{SITE.contact.phone}</div>
                    <div>{SITE.contact.fax} (fax)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-forest" strokeWidth={1.7} />
                  <a href={`mailto:${SITE.contact.salesEmail}`} className="text-ink-soft hover:text-ink underline-offset-4 hover:underline">
                    {SITE.contact.salesEmail}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <ExternalLink className="mt-0.5 h-4 w-4 text-forest" strokeWidth={1.7} />
                  <a
                    href={SITE.parentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-soft hover:text-ink underline-offset-4 hover:underline"
                  >
                    Parent company · tomatomnc.com
                  </a>
                </div>
              </dl>
            </div>

            <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-line bg-paper-warm">
              <iframe
                title="Tomato M&C facility location, Pyeongtaek-si"
                src="https://www.google.com/maps?q=Pyeongtaek-si,+Gyeonggi-do,+South+Korea&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.2] contrast-[1.05]"
                style={{ border: 0 }}
              />
              {/* Pin overlay */}
              <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink shadow-[var(--shadow-soft)]">
                <MapPin className="h-3 w-3 text-brand-red" />
                PYEONGTAEK · KR
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <p className="eyebrow">Certifications</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["ISO 13485", "ISO 9001", "FDA", "CE", "KGMP"].map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-[12px] font-medium text-ink-soft"
                  >
                    <ShieldCheck className="h-3 w-3 text-forest" strokeWidth={2} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
