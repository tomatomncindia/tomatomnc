import { CheckCircle2, Download, Package, FlaskConical, ClipboardCheck, FileText, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/layout/Section";
import { AnchorNav } from "@/components/layout/AnchorNav";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { ManifestBar } from "@/components/motion/ManifestBar";
import { ButtonLink } from "@/components/ui/Button";
import { CERTIFICATIONS } from "@/data/certifications";
import { REGIONS, MARKET_CLEARANCES } from "@/data/markets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Global Network",
  description:
    "Tomato M&C supplies hospitals and distributors across 30+ countries. OEM, private-label, raw material supply, and full quality documentation.",
  path: "/network",
});

const OEM_MODES = [
  {
    icon: Package,
    title: "Tomato Branded Products",
    body: "Ready-to-market finished products under the Tomato M&C brand, with full clinical data and regulatory certifications.",
  },
  {
    icon: FileText,
    title: "OEM / Private Label",
    body: "Casting tapes and splints manufactured under your brand name, with custom color, packaging, and labeling.",
  },
  {
    icon: ClipboardCheck,
    title: "Production Line Supply",
    body: "Complete casting tape production lines: machinery, training, and ongoing technical support.",
  },
  {
    icon: FlaskConical,
    title: "Raw Material Supply",
    body: "Yarn, fiberglass fabric, polyurethane resin, and other key materials sold to third-party manufacturers.",
  },
];

const CUSTOMIZATION = [
  "Brand name and logo on each roll",
  "Color range selection (14 standard colors or custom)",
  "Product width and length specifications",
  "MOQ-based pricing (contact for MOQ details)",
  "Label and packaging design",
  "Inner box and outer carton design",
  "Fiberglass or polyester substrate choice",
  "Export documentation and regulatory support",
];

const OEM_PROCESS = [
  { step: "01", title: "Submit Inquiry", body: "Send product requirements, target markets, and quantity estimates." },
  { step: "02", title: "Specification & Sample", body: "Material, size, color, and label specs agreed. Physical samples prepared for approval." },
  { step: "03", title: "Order Confirmation", body: "On sample approval, quantities and lead times agreed. Formal PO issued." },
  { step: "04", title: "Production & Delivery", body: "Manufactured to certified standards. Delivered with full batch records and export documentation." },
];

const QUALITY_STAGES = [
  { title: "Raw Material Inspection", body: "Incoming material verified against internal specifications before production." },
  { title: "In-Process Monitoring", body: "Real-time quality checks during manufacturing to prevent defects at the source." },
  { title: "Finished Product Testing", body: "Mechanical and safety testing of completed units before release." },
  { title: "Pre-Shipment Documentation", body: "Full traceability and compliance documentation generated prior to dispatch." },
];

const TOTAL_COUNTRIES = REGIONS.reduce((acc, r) => acc + r.countries, 0);

export default function NetworkPage() {
  return (
    <>
      <Container className="pt-16 md:pt-24 pb-10">
        <div className="max-w-3xl">
          <p className="eyebrow">Global Network</p>
          <h1 className="mt-4 font-display text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.05] tracking-[-0.02em]">
            Distribution, partnership, and quality: one program.
          </h1>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink-soft">
            Tomato M&amp;C supplies hospitals, distributors, and OEM partners across {TOTAL_COUNTRIES}+ countries, with full quality documentation behind every market entry.
          </p>
        </div>
      </Container>

      <AnchorNav
        items={[
          { id: "markets", label: "Global Markets" },
          { id: "oem", label: "OEM / Private Label" },
          { id: "quality", label: "Quality & Certifications" },
        ]}
      />

      {/* ─── MARKETS ─────────────────────────────────────────────── */}
      <Section id="markets" size="lg" tone="white" className="scroll-mt-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Global Distribution</p>
              <h2 className="mt-3 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.015em]">
                Supplying {TOTAL_COUNTRIES}+ countries across five continents.
              </h2>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft max-w-md">
                Active distribution across the Americas, Europe, Asia-Pacific, and MENA. Each market entry backed by region-specific regulatory clearance.
              </p>
              <dl className="mt-8 grid grid-cols-3 divide-x divide-line border-y border-line">
                {[
                  { value: TOTAL_COUNTRIES.toString(), label: "Markets" },
                  { value: REGIONS.length.toString(), label: "Regions" },
                  { value: MARKET_CLEARANCES.length.toString(), label: "Clearances" },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-5 first:pl-0 last:pr-0">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                      {s.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-2xl md:text-3xl">
                      <AnimatedNumber value={s.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* DISTRIBUTION MANIFEST PANEL */}
            <Reveal delay={0.05} className="lg:col-span-7">
              <DistributionManifest />
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16">
              <h3 className="font-display text-2xl">Market Clearances</h3>
              <p className="mt-2 text-[14.5px] text-ink-soft max-w-xl">
                Region-specific regulatory documentation supporting market entry.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {MARKET_CLEARANCES.map((m) => (
                  <div key={m.region} className="rounded-xl border border-line bg-paper p-5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-forest" strokeWidth={2} />
                      <p className="font-medium">{m.region}</p>
                    </div>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{m.body}</p>
                    <p className="mt-2 text-[13.5px] text-ink-soft leading-relaxed">{m.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ─── OEM ─────────────────────────────────────────────────── */}
      <Section id="oem" size="lg" tone="paper" className="scroll-mt-32">
        <Container>
          <Reveal>
            <p className="eyebrow">OEM &amp; Private Label</p>
            <h2 className="mt-3 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.015em]">
              Your brand. Our manufacturing.
            </h2>
            <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft">
              OEM products, private-label casting tape and splints, production equipment, and raw materials shipped to manufacturers worldwide. Certified under ISO 13485, ready for any market.
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2">
            {OEM_MODES.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-xl border border-line bg-white p-6 md:p-7">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-forest/10 text-forest">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-lg">{title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <div className="mt-14 rounded-2xl border border-line bg-white p-6 md:p-10">
              <h3 className="font-display text-2xl">Customization Options</h3>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {CUSTOMIZATION.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[14.5px] text-ink-soft">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={2.2} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* OEM PROCESS — connected numbered run-on */}
          <Reveal delay={0.15}>
            <div className="mt-16">
              <h3 className="font-display text-2xl">OEM Process</h3>
              <ol className="mt-8 relative">
                <div
                  aria-hidden
                  className="hidden lg:block absolute top-[14px] left-0 right-0 h-px bg-line-strong"
                />
                <div className="grid gap-y-8 lg:gap-y-0 lg:grid-cols-4 lg:gap-x-8">
                  {OEM_PROCESS.map((p, i) => (
                    <li key={p.step} className="relative">
                      <div className="flex items-center gap-3 lg:block">
                        <div className="relative shrink-0 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-ink text-white font-mono text-[11px] tabular-nums px-2">
                          {p.step}
                        </div>
                        <p className="lg:mt-5 font-display text-base">{p.title}</p>
                      </div>
                      <p className="mt-1.5 lg:mt-2 text-[13.5px] leading-relaxed text-ink-soft lg:max-w-[230px]">
                        {p.body}
                      </p>
                      {i < OEM_PROCESS.length - 1 ? (
                        <ArrowUpRight
                          aria-hidden
                          className="hidden lg:block absolute -top-0.5 -right-5 h-3.5 w-3.5 text-ink-muted rotate-45"
                        />
                      ) : null}
                    </li>
                  ))}
                </div>
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href="/contact?type=oem" variant="primary" withArrow>
                Submit an OEM inquiry
              </ButtonLink>
              <p className="text-[13px] text-ink-muted">
                We respond within 2 business days.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ─── QUALITY ─────────────────────────────────────────────── */}
      <Section id="quality" size="lg" tone="white" className="scroll-mt-32">
        <Container>
          <Reveal>
            <p className="eyebrow">Quality Management</p>
            <h2 className="mt-3 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.015em]">
              Certified to the standards that matter.
            </h2>
            <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft">
              A multi-layered quality management system covering medical devices, environmental responsibility, and international regulatory compliance.
            </p>
          </Reveal>

          {/* CERTIFICATIONS — document list */}
          <Reveal delay={0.1}>
            <div className="mt-12 border-y border-line">
              {/* Header row */}
              <div className="hidden md:grid grid-cols-[1.2fr_0.8fr_2fr_auto] gap-6 py-3 border-b border-line text-[11px] font-mono uppercase tracking-[0.14em] text-ink-muted">
                <div>Certification</div>
                <div>Region</div>
                <div>Scope</div>
                <div>Document</div>
              </div>
              <ul className="divide-y divide-line">
                {CERTIFICATIONS.map((c, i) => (
                  <li
                    key={c.id}
                    className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_2fr_auto] gap-3 md:gap-6 py-6 md:py-5 items-start md:items-center"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] text-ink-muted tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg leading-tight">{c.body}</h3>
                    </div>
                    <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft">
                      {c.region}
                    </p>
                    <div>
                      <p className="text-[13.5px] text-forest font-medium">{c.scope}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft max-w-xl">
                        {c.description}
                      </p>
                    </div>
                    {c.pdf ? (
                      <a
                        href={c.pdf}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-3 py-2 text-[12.5px] font-medium text-ink hover:bg-ink hover:text-white hover:border-ink transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        PDF
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16">
              <h3 className="font-display text-2xl">Quality Control at Every Stage</h3>
              <p className="mt-2 text-[14.5px] text-ink-soft max-w-xl">
                Process control from raw material intake through international shipment.
              </p>
              <ol className="mt-8 relative">
                <div
                  aria-hidden
                  className="hidden lg:block absolute top-[14px] left-0 right-0 h-px bg-line-strong"
                />
                <div className="grid gap-y-8 lg:gap-y-0 lg:grid-cols-4 lg:gap-x-8">
                  {QUALITY_STAGES.map((q, i) => (
                    <li key={q.title}>
                      <div className="flex items-center gap-3 lg:block">
                        <div className="relative shrink-0 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-forest text-white font-mono text-[11px] tabular-nums px-2">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <p className="lg:mt-5 font-display text-base">{q.title}</p>
                      </div>
                      <p className="mt-1.5 lg:mt-2 text-[13.5px] leading-relaxed text-ink-soft lg:max-w-[230px]">
                        {q.body}
                      </p>
                    </li>
                  ))}
                </div>
              </ol>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* INLINE NETWORK CTA */}
      <Section size="md" tone="paper">
        <Container>
          <div className="rounded-2xl border border-line bg-white p-8 md:p-12 grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12 items-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-forest">
                START A PROGRAM
              </p>
              <h2 className="mt-3 font-display text-[26px] md:text-[34px] leading-[1.15] tracking-[-0.015em]">
                Partner with a manufacturer that meets every standard.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft max-w-md">
                Finished products, OEM manufacturing, or raw materials: we&apos;ll tailor the right program. Sample requests and OEM inquiries answered within 2 business days.
              </p>
            </div>
            <div className="space-y-3">
              <ButtonLink href="/contact?type=oem" variant="primary" size="lg" withArrow className="w-full justify-between">
                Start an OEM conversation
              </ButtonLink>
              <ButtonLink href="/contact?type=distributor" variant="outline" size="lg" className="w-full justify-between">
                Become a distributor
              </ButtonLink>
              <ButtonLink href="/products?tab=downloads" variant="ghost" size="lg" className="w-full justify-between">
                Download catalog
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ─── Distribution Manifest (industrial panel) ───────────────────── */
function DistributionManifest() {
  const max = Math.max(...REGIONS.map((r) => r.countries));
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink text-white">
      {/* Dot grid background */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-[0.14]"
      >
        <defs>
          <pattern id="dist-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dist-dots)" />
      </svg>

      <div className="relative p-6 md:p-8">
        {/* Manifest header */}
        <div className="flex items-end justify-between border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mid-green">
              ACTIVE MARKETS
            </p>
            <p className="mt-1 font-display text-3xl md:text-4xl">
              <AnimatedNumber value={String(TOTAL_COUNTRIES)} duration={1.6} />
              <span className="ml-1 text-[14px] font-mono text-white/50 uppercase tracking-[0.12em]">
                / countries
              </span>
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            REV.2025
          </p>
        </div>

        {/* Region rows with bar chart */}
        <ul className="mt-5 space-y-3.5">
          {REGIONS.map((r, i) => (
            <li key={r.name} className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/85">
                    {r.name}
                  </p>
                  <p className="font-mono text-[11px] text-white/40 tabular-nums">
                    {String(r.countries).padStart(2, "0")} ▮
                  </p>
                </div>
                <ManifestBar
                  percent={(r.countries / max) * 100}
                  delay={0.35 + i * 0.08}
                  className="mt-1.5"
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
            FDA · CE · KGMP · ISO 13485
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 tabular-nums">
            5 CONTINENTS
          </p>
        </div>
      </div>
    </div>
  );
}
