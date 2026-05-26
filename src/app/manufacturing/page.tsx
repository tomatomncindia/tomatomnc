import Image from "next/image";
import {
  Cog,
  Layers,
  Scissors,
  ClipboardCheck,
  PackageCheck,
  Droplets,
  FlaskConical,
  Wind,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { ButtonLink } from "@/components/ui/Button";
import { IndustrialBackdrop } from "@/components/visuals/IndustrialBackdrop";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Manufacturing",
  description:
    "Korea's only fully automated, one-stop synthetic casting tape production facility. End-to-end manufacturing under ISO 13485 quality systems.",
  path: "/manufacturing",
});

const PRODUCTION_STEPS = [
  { icon: Layers, title: "Fabric Feeding", body: "Precision-controlled feeding of fiberglass substrate at calibrated tension." },
  { icon: Droplets, title: "Resin Feeding", body: "Proprietary resin metered into the line under climate control." },
  { icon: Cog, title: "Fabric Coating", body: "Uniform resin coating applied across the working width." },
  { icon: Scissors, title: "Bobbin + Cutting", body: "Wound to specified roll length and cut on tension-monitored lines." },
  { icon: PackageCheck, title: "Automatic Packing", body: "Sterile-compatible packaging, export-ready output." },
];

const INLINE_INSPECTION = {
  icon: ClipboardCheck,
  title: "In-line Quality Inspection",
  body: "Continuous QA runs alongside every stage. Defects rejected at the source, not at the end of the line.",
};

const SUPPORT_SYSTEMS = [
  {
    icon: Layers,
    title: "Fiberglass Knitting & Weaving",
    body: "In-house substrate production enables tight quality control of the most critical raw material.",
  },
  {
    icon: FlaskConical,
    title: "Synthetic Resin Formulation",
    body: "Proprietary resin chemistries produced on site for cast set-time and strength consistency.",
  },
  {
    icon: Wind,
    title: "Dehumidification System",
    body: "Climate-controlled environments stabilize resin and consistent cast performance across batches.",
  },
];

const FACILITY_LARGE = {
  src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85",
  alt: "Fabric inspection on the production floor",
  label: "PRODUCTION FLOOR",
  meta: "LINE / 01",
};

const FACILITY_STACKED = [
  {
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80",
    alt: "Resin chemistry",
    label: "RESIN LAB",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    alt: "Automated control systems",
    label: "AUTOMATION",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-white overflow-hidden">
        <IndustrialBackdrop tone="ink" pattern="dots" className="absolute inset-0" />
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565687981296-535f09db714e?auto=format&fit=crop&w=1800&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        </div>
        <Container className="relative pt-20 md:pt-28 pb-20 md:pb-28">
          <div className="max-w-3xl">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] font-medium text-mid-green">
                ONE ROOF / END TO END
              </p>
            </Reveal>
            <WordReveal
              as="h1"
              delay={0.1}
              stagger={0.08}
              className="mt-5 font-display text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.03] tracking-[-0.025em]"
            >
              Fully automated.
              <br />
              <span className="editorial-italic text-mid-green text-[50px] sm:text-[70px] lg:text-[88px] leading-[0.98]">
                Consistently precise.
              </span>
            </WordReveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-[16.5px] leading-relaxed text-white/75">
                A state-of-the-art, one-stop automated facility built for industrial reliability. Our production system eliminates supplier variability and standardizes every roll that leaves the line.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PRODUCTION TIMELINE */}
      <Section size="lg">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Production Process"
              title="End-to-End Production in One Facility"
              description="Every step from raw fiberglass to packaged product runs on a single automated line under unified quality systems."
            />
          </Reveal>

          {/* Horizontal numbered timeline — 5 steps with connectors */}
          <div className="mt-14 relative">
            {/* Connector line (desktop only) */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-px bg-line"
            />
            <ol className="grid gap-y-10 lg:gap-y-0 lg:grid-cols-5 lg:gap-x-6">
              {PRODUCTION_STEPS.map(({ icon: Icon, title, body }, i) => (
                <Reveal as="li" key={title} delay={i * 0.06} className="relative">
                  <div className="flex items-center gap-4 lg:block">
                    <div className="relative shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-full border border-line bg-white">
                      <Icon className="h-5 w-5 text-forest" strokeWidth={1.6} />
                    </div>
                    <p className="font-mono text-[11px] text-ink-muted tabular-nums lg:mt-4">
                      STEP {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <h3 className="mt-1 lg:mt-2 font-display text-lg leading-tight">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft lg:max-w-[180px]">
                    {body}
                  </p>

                  {/* Arrow connector (desktop, between steps) */}
                  {i < PRODUCTION_STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      className="hidden lg:flex absolute top-[22px] right-[-14px] h-3 w-3 items-center justify-center"
                    >
                      <svg viewBox="0 0 12 12" className="h-full w-full text-ink-muted">
                        <path
                          d="M3 2 L8 6 L3 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}
                </Reveal>
              ))}
            </ol>

            {/* Inline inspection callout */}
            <Reveal delay={0.4}>
              <div className="mt-14 rounded-xl border-l-2 border-forest bg-paper-warm p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-forest/10 text-forest">
                    <INLINE_INSPECTION.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-forest">
                      RUNS PARALLEL · ALL STAGES
                    </p>
                    <h3 className="mt-1.5 font-display text-lg">{INLINE_INSPECTION.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft max-w-2xl">
                      {INLINE_INSPECTION.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* SUPPORT SYSTEMS */}
      <Section size="md" tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">Vertical Integration</p>
              <h2 className="mt-3 font-display text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.015em]">
                Critical inputs, owned in-house.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Raw fiberglass, resin chemistry, and climate control: each operated on-site rather than sourced. Fewer suppliers, fewer variables, tighter tolerances.
              </p>
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-8">
              <dl className="divide-y divide-line border-y border-line">
                {SUPPORT_SYSTEMS.map(({ icon: Icon, title, body }, i) => (
                  <div key={title} className="grid grid-cols-[44px_1fr] gap-5 py-6 md:grid-cols-[60px_220px_1fr] md:gap-8 md:py-7 items-start">
                    <span className="font-mono text-[11px] text-ink-muted tabular-nums pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="col-span-2 md:col-span-1 flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 text-forest shrink-0" strokeWidth={1.6} />
                      <h3 className="font-display text-lg leading-tight">{title}</h3>
                    </div>
                    <p className="col-span-2 md:col-span-1 text-[14.5px] leading-relaxed text-ink-soft">
                      {body}
                    </p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FACILITY GALLERY */}
      <Section size="lg">
        <Container>
          <Reveal>
            <SectionHeader title="Our Facility" />
          </Reveal>

          {/* Asymmetric photo grid: one large left, two stacked right — sharp edges, tight gaps */}
          <StaggerGroup className="mt-10 grid gap-2 lg:grid-cols-12 lg:gap-2 lg:items-stretch">
            <StaggerItem className="lg:col-span-8">
              <div className="relative overflow-hidden bg-paper-warm group aspect-[4/5] sm:aspect-[16/10] lg:aspect-[5/4] h-full">
                <IndustrialBackdrop tone="paper" pattern="dots" className="absolute inset-0" />
                <Image
                  src={FACILITY_LARGE.src}
                  alt={FACILITY_LARGE.alt}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.03]"
                />
                {/* Top engineering meta */}
                <div className="absolute inset-x-0 top-0 p-5 md:p-6 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/85">
                  <span>{FACILITY_LARGE.meta}</span>
                  <span className="tabular-nums">PYEONGTAEK · KR</span>
                </div>
                {/* Bottom label gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/40 to-transparent p-5 md:p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mid-green">
                    01 / FEATURED
                  </p>
                  <p className="mt-1 font-display text-xl md:text-2xl text-white leading-tight">
                    {FACILITY_LARGE.label}
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Stacked column: stretches to match large image height; grid-rows-2 splits evenly */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-2 lg:h-full">
              {FACILITY_STACKED.map((img, i) => (
                <StaggerItem key={img.src} className="lg:min-h-0">
                  <div className="relative overflow-hidden bg-paper-warm group aspect-[4/3] lg:aspect-auto lg:h-full">
                    <IndustrialBackdrop tone="paper" pattern="dots" className="absolute inset-0" />
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                        {String(i + 2).padStart(2, "0")} / {img.label}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerGroup>

          <Reveal delay={0.15}>
            <dl className="mt-14 grid grid-cols-3 divide-x divide-line border-y border-line">
              {[
                { value: "1", label: "Integrated facility" },
                { value: "24/7", label: "Climate-controlled" },
                { value: "ISO 13485", label: "Quality standard" },
              ].map((s) => (
                <div key={s.label} className="px-3 py-5 sm:px-4 sm:py-6 md:px-8 md:py-7 first:pl-0 last:pr-0">
                  <dt className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl">
                    <AnimatedNumber value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* INLINE VISIT CTA */}
      <Section size="md" tone="paper">
        <Container>
          <div className="rounded-2xl bg-ink text-white p-8 md:p-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mid-green">
                FACILITY VISITS
              </p>
              <h2 className="mt-3 font-display text-[26px] md:text-[34px] leading-[1.15] tracking-[-0.015em]">
                Tour the line in Pyeongtaek.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                OEM and private-label partners welcome to schedule a capability briefing and a walk-through of the active production line.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact?type=oem" variant="primary" size="lg" withArrow>
                Schedule a visit
              </ButtonLink>
              <ButtonLink
                href="/products"
                variant="ghost"
                size="lg"
                className="text-white border border-white/20 hover:bg-white/10"
              >
                View products
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
