import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnchorNav } from "@/components/layout/AnchorNav";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { ManifestBar } from "@/components/motion/ManifestBar";
import { ButtonLink } from "@/components/ui/Button";
import { CERTIFICATIONS } from "@/data/certifications";
import { REGIONS, MARKET_CLEARANCES } from "@/data/markets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Global Network",
  description:
    "Tomato M&C India supplies hospitals and distributors across 30+ countries, with full quality documentation behind every market entry.",
  path: "/network",
});

const QUALITY_STAGES = [
  {
    title: "Raw Material Inspection",
    body: "Incoming material verified against internal specifications before production.",
  },
  {
    title: "In-Process Monitoring",
    body: "Real-time quality checks during manufacturing to prevent defects at the source.",
  },
  {
    title: "Finished Product Testing",
    body: "Mechanical and safety testing of completed units before release.",
  },
  {
    title: "Pre-Shipment Documentation",
    body: "Full traceability and compliance documentation generated prior to dispatch.",
  },
];

const TOTAL_COUNTRIES = REGIONS.reduce((acc, r) => acc + r.countries, 0);

export default function NetworkPage() {
  return (
    <>
      <Container className="pt-16 pb-10 md:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow">Global Network</p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.05] tracking-[-0.02em] sm:text-[52px] lg:text-[60px]">
            Distribution, partnership, and quality: one program.
          </h1>
          <p className="text-ink-soft mt-5 max-w-2xl text-[16.5px] leading-relaxed">
            Tomato M&amp;C India supplies hospitals and distributors across {TOTAL_COUNTRIES}+
            countries, with full quality documentation behind every market entry.
          </p>
        </div>
      </Container>

      <AnchorNav
        items={[
          { id: "markets", label: "Global Markets" },
          { id: "quality", label: "Quality & Certifications" },
        ]}
      />

      {/* ─── MARKETS ─────────────────────────────────────────────── */}
      <Section id="markets" size="lg" tone="white" className="scroll-mt-32">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Global Distribution</p>
              <h2 className="font-display mt-3 text-[32px] leading-[1.1] tracking-[-0.015em] md:text-[44px]">
                Supplying {TOTAL_COUNTRIES}+ countries across five continents.
              </h2>
              <p className="text-ink-soft mt-5 max-w-md text-[15.5px] leading-relaxed">
                Active distribution across the Americas, Europe, Asia-Pacific, and MENA. In India,
                Blackchip operates as the distributor of Tomato M&amp;C India. Each market entry
                backed by region-specific regulatory clearance.
              </p>
              <dl className="divide-line border-line mt-8 grid grid-cols-3 divide-x border-y">
                {[
                  { value: TOTAL_COUNTRIES.toString(), label: "Markets" },
                  { value: REGIONS.length.toString(), label: "Regions" },
                  { value: MARKET_CLEARANCES.length.toString(), label: "Clearances" },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-5 first:pl-0 last:pr-0">
                    <dt className="text-ink-muted font-mono text-[10px] tracking-[0.16em] uppercase">
                      {s.label}
                    </dt>
                    <dd className="font-display mt-1.5 text-2xl md:text-3xl">
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
              <p className="text-ink-soft mt-2 max-w-xl text-[14.5px]">
                Region-specific regulatory documentation supporting market entry.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {MARKET_CLEARANCES.map((m) => (
                  <div key={m.region} className="border-line bg-paper rounded-xl border p-5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-forest h-4 w-4" strokeWidth={2} />
                      <p className="font-medium">{m.region}</p>
                    </div>
                    <p className="text-ink-muted mt-2 font-mono text-[11px] tracking-[0.14em] uppercase">
                      {m.body}
                    </p>
                    <p className="text-ink-soft mt-2 text-[13.5px] leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ─── QUALITY ─────────────────────────────────────────────── */}
      <Section id="quality" size="lg" tone="paper" className="scroll-mt-32">
        <Container>
          <Reveal>
            <p className="eyebrow">Quality Management</p>
            <h2 className="font-display mt-3 text-[32px] leading-[1.1] tracking-[-0.015em] md:text-[44px]">
              Certified to the standards that matter.
            </h2>
            <p className="text-ink-soft mt-5 max-w-2xl text-[15.5px] leading-relaxed">
              A multi-layered quality management system covering medical devices, environmental
              responsibility, and international regulatory compliance.
            </p>
          </Reveal>

          {/* CERTIFICATIONS — document list */}
          <Reveal delay={0.1}>
            <div className="border-line mt-12 border-y">
              {/* Header row */}
              <div className="border-line text-ink-muted hidden grid-cols-[1.2fr_0.8fr_2fr] gap-6 border-b py-3 font-mono text-[11px] tracking-[0.14em] uppercase md:grid">
                <div>Certification</div>
                <div>Region</div>
                <div>Scope</div>
              </div>
              <ul className="divide-line divide-y">
                {CERTIFICATIONS.map((c, i) => (
                  <li
                    key={c.id}
                    className="grid grid-cols-1 items-start gap-3 py-6 md:grid-cols-[1.2fr_0.8fr_2fr] md:items-center md:gap-6 md:py-5"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-ink-muted font-mono text-[11px] tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg leading-tight">{c.body}</h3>
                    </div>
                    <p className="text-ink-soft font-mono text-[12px] tracking-[0.12em] uppercase">
                      {c.region}
                    </p>
                    <div>
                      <p className="text-forest text-[13.5px] font-medium">{c.scope}</p>
                      <p className="text-ink-soft mt-1 max-w-xl text-[13.5px] leading-relaxed">
                        {c.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16">
              <h3 className="font-display text-2xl">Quality Control at Every Stage</h3>
              <p className="text-ink-soft mt-2 max-w-xl text-[14.5px]">
                Process control from raw material intake through international shipment.
              </p>
              <ol className="relative mt-8">
                <div
                  aria-hidden
                  className="bg-line-strong absolute top-[14px] right-0 left-0 hidden h-px lg:block"
                />
                <div className="grid gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                  {QUALITY_STAGES.map((q, i) => (
                    <li key={q.title}>
                      <div className="flex items-center gap-3 lg:block">
                        <div className="bg-forest relative inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full px-2 font-mono text-[11px] text-white tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <p className="font-display text-base lg:mt-5">{q.title}</p>
                      </div>
                      <p className="text-ink-soft mt-1.5 text-[13.5px] leading-relaxed lg:mt-2 lg:max-w-[230px]">
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
          <div className="border-line grid gap-8 rounded-2xl border bg-white p-6 sm:p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12 md:p-12">
            <div>
              <p className="text-forest font-mono text-[11px] tracking-[0.16em] uppercase">
                START A PROGRAM
              </p>
              <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-[-0.015em] md:text-[34px]">
                Partner with a manufacturer that meets every standard.
              </h2>
              <p className="text-ink-soft mt-3 max-w-md text-[15px] leading-relaxed">
                Finished products or distribution partnerships: we&apos;ll tailor the right program.
                Sample and distributor inquiries answered within 2 hours.
              </p>
            </div>
            <div className="space-y-3">
              <ButtonLink
                href="/contact?type=distributor"
                variant="primary"
                size="lg"
                withArrow
                className="w-full justify-between"
              >
                Become a distributor
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
    <div className="bg-ink relative overflow-hidden rounded-2xl text-white">
      {/* Dot grid background */}
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.14]">
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
            <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase">
              ACTIVE MARKETS
            </p>
            <p className="font-display mt-1 text-3xl md:text-4xl">
              <AnimatedNumber value={String(TOTAL_COUNTRIES)} duration={1.6} />
              <span className="ml-1 font-mono text-[14px] tracking-[0.12em] text-white/50 uppercase">
                / countries
              </span>
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">
            REV.2025
          </p>
        </div>

        {/* Region rows with bar chart */}
        <ul className="mt-5 space-y-3.5">
          {REGIONS.map((r, i) => (
            <li key={r.name} className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[12px] tracking-[0.12em] text-white/85 uppercase">
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
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <p className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase">
            FDA · CE · KGMP · ISO 13485
          </p>
          <p className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase tabular-nums">
            5 CONTINENTS
          </p>
        </div>
      </div>
    </div>
  );
}
