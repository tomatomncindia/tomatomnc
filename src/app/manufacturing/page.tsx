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
import { FacilityBlueprint } from "@/components/about/FacilityBlueprint";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Manufacturing",
  description:
    "Korea's only fully automated, one-stop fiberglass casting tape production facility. End-to-end manufacturing under ISO 13485 quality systems.",
  path: "/manufacturing",
});

const PRODUCTION_STEPS = [
  {
    icon: Layers,
    title: "Fabric Feeding",
    body: "Precision-controlled feeding of fiberglass substrate at calibrated tension.",
  },
  {
    icon: Droplets,
    title: "Resin Feeding",
    body: "Proprietary resin metered into the line under climate control.",
  },
  {
    icon: Cog,
    title: "Fabric Coating",
    body: "Uniform resin coating applied across the working width.",
  },
  {
    icon: Scissors,
    title: "Bobbin + Cutting",
    body: "Wound to specified roll length and cut on tension-monitored lines.",
  },
  {
    icon: PackageCheck,
    title: "Automatic Packing",
    body: "Sterile-compatible packaging, export-ready output.",
  },
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
    title: "Fiberglass Resin Formulation",
    body: "Proprietary resin chemistries produced on site for cast set-time and strength consistency.",
  },
  {
    icon: Wind,
    title: "Dehumidification System",
    body: "Climate-controlled environments stabilize resin and consistent cast performance across batches.",
  },
];

const FACILITY_LARGE = {
  src: "/images/facility/line.jpg",
  alt: "Fiberglass knitting and coating line on the Tomato M&C India production floor",
  label: "KNITTING & COATING LINE",
  meta: "LINE / 01",
};

const FACILITY_STACKED = [
  {
    src: "/images/facility/spools.jpg",
    alt: "Fiberglass yarn spooled on the in-house knitting machine",
    label: "FIBERGLASS FABRIC",
  },
  {
    src: "/images/facility/exterior.jpg",
    alt: "Tomato M&C India production facility exterior",
    label: "PRODUCTION FACILITY",
  },
];

export default function ManufacturingPage() {
  return (
    <>
      {/* HERO — "Top Management for Tomorrow" company story */}
      <section className="bg-ink relative overflow-hidden text-white">
        <IndustrialBackdrop tone="ink" pattern="dots" className="absolute inset-0" />
        <Container className="relative pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left — messaging */}
            <div className="lg:col-span-6">
              <Reveal>
                <p className="text-mid-green font-mono text-[11px] font-medium tracking-[0.2em] uppercase">
                  TOP MANAGEMENT FOR TOMORROW
                </p>
              </Reveal>
              <WordReveal
                as="h1"
                delay={0.1}
                stagger={0.06}
                className="font-display mt-5 text-[40px] leading-[1.04] tracking-[-0.025em] text-white sm:text-[54px] lg:text-[64px]"
              >
                Fiber cast &amp; splint,
                <br />
                <span className="editorial-italic text-mid-green">made under one roof.</span>
              </WordReveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">
                  Established in 2026, Tomato M&amp;C India is a specialist manufacturer of
                  fiberglass orthopedic cast and splint. We are the only manufacturer producing
                  fiberglass casts on a one-stop, button-operated system with automatic packaging —
                  supplying Tomato-brand products, production facilities, and raw materials to
                  customers in around 30 countries.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {["ISO 13485", "ISO 14001", "ISO 9001", "USA-FDA", "CE", "KGMP"].map((q) => (
                    <li
                      key={q}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[10.5px] tracking-[0.12em] text-white/75 uppercase"
                    >
                      {q}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Right — framed production photo */}
            <Reveal delay={0.1} className="lg:col-span-6">
              <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/facility/line.jpg"
                    alt="Fiberglass knitting and coating line at the Tomato M&C India facility"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="from-ink/70 to-ink/20 absolute inset-0 bg-gradient-to-t via-transparent" />
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 font-mono text-[10px] tracking-[0.18em] text-white/80 uppercase">
                    <span>LINE / 01</span>
                    <span className="tabular-nums">PYEONGTAEK · KR</span>
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase">
                      FIBER GLASS KNITTING & HEATING
                    </p>
                    <p className="font-display mt-1 text-lg leading-tight text-white">
                      Fiberglass resin formulation & dehumidification
                    </p>
                  </figcaption>
                </div>
              </figure>
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
          <div className="relative mt-14">
            {/* Connector line (desktop only) */}
            <div
              aria-hidden
              className="bg-line absolute top-[28px] right-[10%] left-[10%] hidden h-px lg:block"
            />
            <ol className="grid gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
              {PRODUCTION_STEPS.map(({ icon: Icon, title, body }, i) => (
                <Reveal as="li" key={title} delay={i * 0.06} className="relative">
                  <div className="flex items-center gap-4 lg:block">
                    <div className="border-line relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-white">
                      <Icon className="text-forest h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <p className="text-ink-muted font-mono text-[11px] tabular-nums lg:mt-4">
                      STEP {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <h3 className="font-display mt-1 text-lg leading-tight lg:mt-2">{title}</h3>
                  <p className="text-ink-soft mt-1.5 text-[13.5px] leading-relaxed lg:max-w-[180px]">
                    {body}
                  </p>

                  {/* Arrow connector (desktop, between steps) */}
                  {i < PRODUCTION_STEPS.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute top-[22px] right-[-14px] hidden h-3 w-3 items-center justify-center lg:flex"
                    >
                      <svg viewBox="0 0 12 12" className="text-ink-muted h-full w-full">
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
              <div className="border-forest bg-paper-warm mt-14 rounded-xl border-l-2 p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <span className="bg-forest/10 text-forest inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                    <INLINE_INSPECTION.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <p className="text-forest font-mono text-[10px] tracking-[0.16em] uppercase">
                      RUNS PARALLEL · ALL STAGES
                    </p>
                    <h3 className="font-display mt-1.5 text-lg">{INLINE_INSPECTION.title}</h3>
                    <p className="text-ink-soft mt-1.5 max-w-2xl text-[14px] leading-relaxed">
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
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">Vertical Integration</p>
              <h2 className="font-display mt-3 text-[28px] leading-[1.15] tracking-[-0.015em] md:text-[36px]">
                Critical inputs, owned in-house.
              </h2>
              <p className="text-ink-soft mt-4 text-[15px] leading-relaxed">
                Raw fiberglass, resin chemistry, and climate control: each operated on-site rather
                than sourced. Fewer suppliers, fewer variables, tighter tolerances.
              </p>
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-8">
              <dl className="divide-line border-line divide-y border-y">
                {SUPPORT_SYSTEMS.map(({ icon: Icon, title, body }, i) => (
                  <div
                    key={title}
                    className="grid grid-cols-[44px_1fr] items-start gap-5 py-6 md:grid-cols-[60px_220px_1fr] md:gap-8 md:py-7"
                  >
                    <span className="text-ink-muted pt-1 font-mono text-[11px] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="col-span-2 flex items-start gap-3 md:col-span-1">
                      <Icon className="text-forest mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.6} />
                      <h3 className="font-display text-lg leading-tight">{title}</h3>
                    </div>
                    <p className="text-ink-soft col-span-2 text-[14.5px] leading-relaxed md:col-span-1">
                      {body}
                    </p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* INSIDE THE BUILDING — annotated facility blueprint */}
      <Section size="lg">
        <Container>
          <div className="mb-12 grid items-end gap-8 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span aria-hidden className="bg-line-strong h-px w-12" />
                  <span className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                    FACILITY PLAN
                  </span>
                </div>
                <h2 className="font-display mt-6 text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[52px]">
                  Inside the
                  <span className="editorial-italic text-forest"> building.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.05} className="lg:col-span-5">
              <p className="text-ink-soft text-[15.5px] leading-relaxed">
                Seven functional areas under one roof. The plan below maps the production sequence
                left-to-right and the documentation footprint at the bottom. Hover or tap any
                numbered area to read its function.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <FacilityBlueprint />
          </Reveal>
        </Container>
      </Section>

      {/* FACILITY GALLERY */}
      <Section size="lg" tone="paper">
        <Container>
          <Reveal>
            <SectionHeader title="Our Facility" eyebrow="Photographed On-Site" />
          </Reveal>

          {/* Asymmetric photo grid: one large left, two stacked right — sharp edges, tight gaps */}
          <StaggerGroup className="mt-10 grid gap-2 lg:grid-cols-12 lg:items-stretch lg:gap-2">
            <StaggerItem className="lg:col-span-8">
              <div className="bg-paper-warm group relative aspect-[4/5] h-full overflow-hidden sm:aspect-[16/10] lg:aspect-[5/4]">
                <IndustrialBackdrop tone="paper" pattern="dots" className="absolute inset-0" />
                <Image
                  src={FACILITY_LARGE.src}
                  alt={FACILITY_LARGE.alt}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.03]"
                />
                {/* Top engineering meta */}
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 font-mono text-[10px] tracking-[0.18em] text-white/85 uppercase md:p-6">
                  <span>{FACILITY_LARGE.meta}</span>
                  <span className="tabular-nums">PYEONGTAEK · KR</span>
                </div>
                {/* Bottom label gradient */}
                <div className="from-ink via-ink/40 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-5 md:p-7">
                  <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase">
                    01 / FEATURED
                  </p>
                  <p className="font-display mt-1 text-xl leading-tight text-white md:text-2xl">
                    {FACILITY_LARGE.label}
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Stacked column: stretches to match large image height; grid-rows-2 splits evenly */}
            <div className="grid grid-cols-2 gap-2 lg:col-span-4 lg:h-full lg:grid-cols-1 lg:grid-rows-2 lg:gap-2">
              {FACILITY_STACKED.map((img, i) => (
                <StaggerItem key={img.src} className="lg:min-h-0">
                  <div className="bg-paper-warm group relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full">
                    <IndustrialBackdrop tone="paper" pattern="dots" className="absolute inset-0" />
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.05]"
                    />
                    <div className="from-ink/85 via-ink/30 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-4">
                      <p className="font-mono text-[10px] tracking-[0.18em] text-white uppercase">
                        {String(i + 2).padStart(2, "0")} / {img.label}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerGroup>

          <Reveal delay={0.15}>
            <dl className="divide-line border-line mt-14 grid grid-cols-3 divide-x border-y">
              {[
                { value: "1", label: "Integrated facility" },
                { value: "24/7", label: "Climate-controlled" },
                { value: "ISO 13485", label: "Quality standard" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="px-3 py-5 first:pl-0 last:pr-0 sm:px-4 sm:py-6 md:px-8 md:py-7"
                >
                  <dt className="text-ink-muted font-mono text-[10px] tracking-[0.14em] uppercase sm:text-[11px]">
                    {s.label}
                  </dt>
                  <dd className="font-display mt-2 text-2xl sm:text-3xl md:text-4xl">
                    <AnimatedNumber value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* SPEC REQUEST INLINE CARD */}
      <Section size="md">
        <Container>
          <div className="border-line grid gap-8 rounded-2xl border bg-paper-warm p-6 sm:p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12 md:p-10">
            <div>
              <p className="text-forest font-mono text-[11px] tracking-[0.16em] uppercase">
                SPEC REQUEST
              </p>
              <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-[-0.015em] md:text-[32px]">
                Need a sample, custom spec, or quote?
              </h2>
              <p className="text-ink-soft mt-3 max-w-md text-[15px] leading-relaxed">
                Send a list of products, target market, and estimated volume. Sample shipments
                include the relevant specifications and regulatory documentation for your region.
              </p>
              <p className="text-ink-muted mt-4 font-mono text-[12px] tracking-[0.12em] uppercase">
                Response: &lt; 2 hours
              </p>
            </div>
            <div className="space-y-3">
              <ButtonLink
                href="/contact?type=sample"
                variant="primary"
                size="lg"
                withArrow
                className="w-full justify-between"
              >
                Request a Sample
              </ButtonLink>
              <ButtonLink
                href="/products"
                variant="outline"
                size="lg"
                className="w-full justify-between"
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
