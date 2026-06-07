import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ContactForm } from "./ContactForm";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Tomato M&C India for samples, quotations, or distribution opportunities. We respond to all inquiries within 2 hours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Container className="pt-16 md:pt-24 pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Get in Touch</p>
          <h1 className="mt-4 font-display text-[40px] sm:text-[52px] leading-[1.05] tracking-[-0.02em]">
            Contact Tomato M&amp;C India
          </h1>
          <p className="mt-5 text-[16.5px] leading-relaxed text-ink-soft">
            We respond to all inquiries within 2 hours.
          </p>
        </div>
      </Container>

      <Container className="pb-24">
        {/* Columns stretch to equal height; the maps flex to absorb the
            difference so both sides bottom-align. */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* MAIN — company details card with the map below it */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8 md:p-9">
              <p className="eyebrow">India Office</p>
              <h2 className="mt-3 font-display text-[24px] sm:text-[28px] md:text-[32px] leading-[1.15] tracking-[-0.015em]">
                {SITE.contact.company}
              </h2>

              {/* The address — the main thing */}
              <div className="mt-6 flex items-start gap-3 sm:gap-4 border-l-2 border-forest pl-4 sm:pl-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-forest">
                    ADDRESS
                  </p>
                  <address className="mt-2 not-italic font-display text-[20px] sm:text-[26px] md:text-[30px] leading-[1.25] tracking-[-0.01em] text-ink">
                    {SITE.contact.addressLines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </address>
                </div>
              </div>

              {/* Contact rows */}
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {SITE.contact.phones.map((phone) => (
                  <div key={phone} className="flex items-center gap-3 py-4">
                    <Phone className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.7} />
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted w-16">
                      Tel
                    </dt>
                    <dd className="text-[15px] text-ink tabular-nums">{phone}</dd>
                  </div>
                ))}
                <div className="flex items-center gap-3 py-4">
                  <Mail className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.7} />
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted w-16">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${SITE.contact.salesEmail}`}
                      className="text-[15px] text-ink hover:text-forest underline-offset-4 hover:underline"
                    >
                      {SITE.contact.salesEmail}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3 py-4">
                  <ExternalLink className="h-4 w-4 shrink-0 text-forest" strokeWidth={1.7} />
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted w-16">
                    Web
                  </dt>
                  <dd>
                    <a
                      href={SITE.parentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-ink hover:text-forest underline-offset-4 hover:underline"
                    >
                      Manufacturer · tomatomnc.com
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Certifications */}
              <div className="mt-8">
                <p className="eyebrow">Certifications</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {["ISO 13485", "ISO 9001", "FDA", "CE", "KGMP"].map((b) => (
                    <li
                      key={b}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[12px] font-medium text-ink-soft"
                    >
                      <ShieldCheck className="h-3 w-3 text-forest" strokeWidth={2} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <FacilityMap className="aspect-[5/3] lg:aspect-auto lg:flex-1 lg:min-h-[220px]" />
          </div>

          {/* ASIDE — compact inquiry form */}
          <aside className="lg:col-span-5">
            <ContactForm />
          </aside>
        </div>
      </Container>
    </>
  );
}

function FacilityMap({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-paper-warm",
        className,
      )}
    >
      <iframe
        title="Blackchip Impex Private Limited office location, Mumbai"
        src="https://www.google.com/maps?q=Shiv+CHS+Ltd,+MHB+Colony,+Mahavir+Nagar,+Kandivali+West,+Mumbai+400067&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale-[0.2] contrast-[1.05]"
        style={{ border: 0 }}
      />
      {/* Pin overlay */}
      <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink shadow-[var(--shadow-soft)]">
        <MapPin className="h-3 w-3 text-brand-red" />
        MUMBAI · IN
      </div>
    </div>
  );
}
