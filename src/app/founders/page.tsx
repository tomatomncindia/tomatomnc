import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { PortraitPlate } from "@/components/founders/PortraitPlate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Founders",
  description:
    "Blackchip Impex Pvt. Ltd. — the parent company of Tomato M&C India. Founded by Dr. Dilip Shah and Rohan Jain to bridge global innovation and local excellence in healthcare.",
  path: "/founders",
});

const TOC = [
  { num: "01", label: "Philosophy", href: "#philosophy" },
  { num: "02", label: "Our Directors", href: "#directors" },
  { num: "03", label: "Advisory Board", href: "#advisory" },
  { num: "04", label: "The Gold Standard", href: "#standard" },
  { num: "05", label: "Our Promise", href: "#promise" },
];

const SHAH_QUALIFICATIONS = [
  { title: "Masters in Diabetology", short: "MHSC DIABETOLOGY" },
  { title: "Diploma in Diabetology", short: "DIP. DIAB" },
  { title: "Diploma in Orthopedics", short: "D. ORTHO" },
  { title: "Bachelor of Medicine & Surgery", short: "MBBS" },
  { title: "MBA in Hospital Management — New Port University, USA", short: "MBA" },
  { title: "Diploma in Family Medicine", short: "DIP. FM" },
];

const ROHAN_REGISTER = [
  {
    k: "Education",
    v: "Master's in Global Family Managed Business — SP Jain",
  },
  {
    k: "Foundation",
    v: "Family trade legacy, built under the mentorship of Rajesh Jain",
  },
  {
    k: "Mandate",
    v: "Strategic international partnerships; exclusive, high-tier products made accessible",
  },
];

const ADVISORS = [
  {
    index: "01",
    name: "Rajesh Jain",
    epithet: "The Visionary Catalyst.",
    initials: "RJ",
    image: "/images/founders/rajesh.webp",
    paragraphs: [
      "With a business legacy spanning over two decades, Rajesh Jain is the driving force of innovation behind the scenes. He pioneered sourcing and importing in 2005 — a foundation that led him to become the undisputed leader and largest supplier in India's hot stamping foil market.",
      "He doesn't just offer advice; he sparks the ideas that bridge the gap between global sourcing expertise and clinical excellence. Every strategic move is backed by 20+ years of proven business acumen and a relentless pursuit of growth.",
    ],
    chips: ["Sourcing since 2005", "20+ years", "Hot stamping foil — market leader"],
  },
  {
    index: "02",
    name: "Jenil Shah",
    epithet: "Venture Alchemist & Strategic Architect.",
    initials: "JS",
    image: "/images/founders/jenil.webp",
    paragraphs: [
      "A business professional with a career spanning technology, strategy, and venture capital. An alumnus of IIT and INSEAD, and a CFA charterholder, Jenil brings a rare combination of technical rigour, strategic thinking, and growth acumen.",
      "His strategy background sharpened his ability to structure complex problems and deliver pragmatic solutions across industries, while his venture capital stint gave him a front-row seat to building and scaling businesses from the ground up. Grounded in data, he pairs analytical depth with sharp commercial instinct.",
    ],
    chips: ["IIT", "INSEAD", "CFA charterholder", "Venture capital"],
  },
];

const CRITERIA = [
  {
    title: "Superior Biocompatibility",
    body: "Ensuring patient safety is never in question.",
  },
  {
    title: "Predictable Longevity",
    body: "Giving clinicians the confidence that their work will stand the test of time.",
  },
  {
    title: "Intuitive Handling",
    body: "High technology should simplify a doctor's workflow, not complicate it.",
  },
];

const foundersJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Blackchip Impex Pvt. Ltd.",
  description:
    "Parent company of Tomato Medical & Chemical India. A bridge between global innovation and local excellence in healthcare, founded by a practicing clinician and a global sourcing specialist.",
  slogan: "Precision. Trust. Innovation.",
  founder: [
    {
      "@type": "Person",
      name: "Dr. Dilip Shah",
      jobTitle: "Director",
      description:
        "Practicing clinician with 35+ years of frontline experience. MBBS, D. Ortho, Masters in Diabetology, MBA in Hospital Management.",
    },
    {
      "@type": "Person",
      name: "Rohan Jain",
      jobTitle: "Director",
      description:
        "Global sourcing specialist. Master's in Global Family Managed Business, SP Jain.",
    },
  ],
  member: [
    { "@type": "Person", name: "Rajesh Jain", jobTitle: "Advisory Board Member" },
    { "@type": "Person", name: "Jenil Shah", jobTitle: "Advisory Board Member" },
  ],
};

export default function FoundersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foundersJsonLd) }}
      />

      {/* ─────────────────────────────────────────────────────────
         REGISTER HERO — leadership dossier treatment
         ───────────────────────────────────────────────────────── */}
      <section className="border-line relative overflow-hidden border-b">
        <Container className="relative pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="text-forest font-mono text-[11px] tracking-[0.18em] uppercase">
                  FOUNDERS — BLACKCHIP IMPEX PVT. LTD.
                </p>
              </Reveal>

              <WordReveal
                as="h1"
                delay={0.1}
                stagger={0.06}
                className="font-display mt-6 text-[clamp(38px,12vw,76px)] leading-[1.06] tracking-[-0.035em] lg:text-[100px]"
              >
                The New Standard
                <br />
                <span className="editorial-italic text-forest">in Healthcare.</span>
              </WordReveal>

              <Reveal delay={0.2}>
                <p className="text-ink-soft mt-8 max-w-xl text-[17px] leading-relaxed">
                  Blackchip Impex Pvt. Ltd., the parent company of Tomato Medical &amp; Chemical India, was
                  formed to act as a bridge between global innovation and local excellence:
                  world-class healthcare technology, vetted by a clinician, delivered by a global
                  sourcing specialist.
                </p>
              </Reveal>
            </div>

            {/* Parent-company lockup */}
            <Reveal delay={0.15} className="lg:col-span-4">
              <div className="border-ink/15 border-t pt-6 text-center lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <p className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                  A venture by
                </p>
                <Image
                  src="/images/products/logos/blackchiplogo.webp"
                  alt="Blackchip Impex Pvt. Ltd."
                  width={4496}
                  height={1248}
                  sizes="(max-width: 1024px) 80vw, 360px"
                  className="mx-auto mt-6 h-auto w-full max-w-[340px] mix-blend-multiply lg:max-w-none"
                />
                <p className="text-forest mt-6 border-ink/15 border-t pt-4 font-mono text-[10px] tracking-[0.14em] uppercase">
                  Precision · Trust · Innovation
                </p>
              </div>
            </Reveal>
          </div>

          {/* Table of contents */}
          <Reveal delay={0.3}>
            <div className="border-ink/15 mt-16 border-t pt-8 md:mt-24">
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <p className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                  TABLE OF CONTENTS
                </p>
                <p className="text-ink-muted hidden items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] uppercase md:inline-flex">
                  SCROLL
                  <ArrowDown className="h-3 w-3" />
                </p>
              </div>
              <ol className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
                {TOC.map((t) => (
                  <li key={t.num} className="border-ink border-t pt-3">
                    <a href={t.href} className="group block">
                      <p className="text-forest font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums">
                        {t.num}
                      </p>
                      <p className="font-display text-ink group-hover:text-forest mt-2 text-[18px] leading-tight transition-colors md:text-[20px]">
                        {t.label}
                      </p>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
         01 / PHILOSOPHY — full-bleed dark editorial
         ───────────────────────────────────────────────────────── */}
      <section id="philosophy" className="bg-ink relative scroll-mt-20 overflow-hidden text-white">
        <svg aria-hidden className="absolute inset-0 h-full w-full text-white/[0.06]">
          <defs>
            <pattern id="phil-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#phil-dots)" />
        </svg>

        <Container className="relative py-24 md:py-36">
          <div className="max-w-5xl">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="text-mid-green font-mono text-[10px] tracking-[0.24em] uppercase tabular-nums">
                  01
                </span>
                <span aria-hidden className="h-px w-12 bg-white/30" />
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/60 uppercase">
                  THE FOUNDER&apos;S PHILOSOPHY
                </span>
              </div>
            </Reveal>

            <WordReveal
              as="p"
              delay={0.1}
              stagger={0.045}
              className="font-display mt-10 text-[clamp(32px,10vw,60px)] leading-[1.06] tracking-[-0.025em] text-white lg:text-[80px]"
            >
              Not &ldquo;selling products.&rdquo;
              <br />
              <span className="editorial-italic text-mid-green">Solving clinical challenges.</span>
            </WordReveal>

            <Reveal delay={0.25}>
              <p className="mt-10 max-w-2xl text-[16px] leading-relaxed text-white/70">
                When a business leader and an experienced practicing clinician come together, the
                focus shifts. Two vantage points, one mandate:
              </p>
            </Reveal>
          </div>

          {/* The duality — clinician / business leader */}
          <StaggerGroup className="mt-12 grid max-w-5xl gap-px border border-white/15 bg-white/15 md:grid-cols-2">
            <StaggerItem className="bg-ink p-7 md:p-9">
              <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase">
                THE CLINICIAN
              </p>
              <p className="font-display mt-3 text-[24px] leading-[1.15] tracking-[-0.01em] text-white md:text-[28px]">
                Dr. Dilip Shah
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-white/70">
                Understands the weight of a practitioner&apos;s hand — and the pain and expectations
                of the patient on the other side of it.
              </p>
            </StaggerItem>
            <StaggerItem className="bg-ink p-7 md:p-9">
              <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase">
                THE BUSINESS LEADER
              </p>
              <p className="font-display mt-3 text-[24px] leading-[1.15] tracking-[-0.01em] text-white md:text-[28px]">
                Rohan Jain
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-white/70">
                Understands the global logistics required to bring the future of healthcare and
                technology to your doorstep.
              </p>
            </StaggerItem>
          </StaggerGroup>

          <Reveal delay={0.15}>
            <p className="editorial-italic mt-12 max-w-3xl text-[22px] leading-[1.35] text-white/90 md:text-[28px]">
              Together, they formed Blackchip Impex Pvt. Ltd. — a bridge between global innovation{" "}
              <span className="text-mid-green">and local excellence.</span>
            </p>
          </Reveal>

          {/* The vision */}
          <Reveal delay={0.1}>
            <div className="mt-16 max-w-3xl border-t border-white/15 pt-8">
              <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase">
                THE VISION
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-white/75">
                At Blackchip, we don&apos;t just supply products; we curate experience and
                excellence. We believe the healthcare sector deserves the world&apos;s most advanced
                technology. Our mission is to put the &ldquo;Gold Standard&rdquo; into the hands of
                every practitioner — ensuring that premium quality is the baseline, not the
                exception.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
         02 / DIRECTORS — editorial profiles with monogram plates
         ───────────────────────────────────────────────────────── */}
      <Section size="lg" tone="white" id="directors" className="scroll-mt-20">
        <Container>
          <div className="mb-16 max-w-4xl md:mb-24">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="text-forest font-mono text-[10px] tracking-[0.24em] uppercase tabular-nums">
                  02
                </span>
                <span aria-hidden className="bg-line-strong h-px w-12" />
                <span className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                  OUR DIRECTORS
                </span>
              </div>
              <h2 className="font-display mt-6 text-[36px] leading-[1.05] tracking-[-0.025em] md:text-[56px] lg:text-[64px]">
                Built on
                <span className="editorial-italic text-forest"> expertise.</span>
              </h2>
              <p className="text-ink-soft mt-5 max-w-xl text-[16px] leading-relaxed">
                Our leadership combines decades of medical wisdom with high-level global
                intelligence.
              </p>
            </Reveal>
          </div>

          {/* Director 01 — Dr. Dilip Shah */}
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <PortraitPlate
                index="01"
                initials="DS"
                role="CLINICAL COMPASS"
                name="Dr. Dilip Shah"
                tag="35+ YEARS"
                image="/images/founders/dilip.webp"
                imageAlt="Dr. Dilip Shah, Director and practicing clinician"
              />
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums">
                  DIRECTOR / 01
                </p>
                <h3 className="font-display mt-4 text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[44px]">
                  Dr. Dilip Shah
                </h3>
                <p className="editorial-italic text-forest mt-2 text-[22px] md:text-[26px]">
                  The Clinical Compass.
                </p>
                <p className="text-ink-soft mt-6 max-w-xl text-[15.5px] leading-relaxed">
                  With 35+ years of frontline experience, Dr. Shah is the guardian of our quality.
                  He vets every product through the eyes of a clinician, ensuring that safety,
                  precision, patient comfort and outcomes are never compromised.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-ink-muted mt-10 font-mono text-[10px] tracking-[0.18em] uppercase">
                  QUALIFICATIONS
                </p>
              </Reveal>
              <StaggerGroup className="border-ink/15 mt-4 border-t">
                {SHAH_QUALIFICATIONS.map((q, i) => (
                  <StaggerItem
                    key={q.short}
                    className="border-ink/15 grid grid-cols-[56px_1fr] items-baseline gap-x-4 border-b py-3.5 sm:grid-cols-[56px_1fr_auto]"
                  >
                    <span className="text-forest font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums">
                      Q/{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink text-[14.5px]">{q.title}</span>
                    <span className="text-ink-muted hidden font-mono text-[10px] tracking-[0.12em] uppercase sm:block">
                      {q.short}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>

          {/* Director 02 — Rohan Jain (mirrored) */}
          <div className="border-line mt-20 grid items-start gap-10 border-t pt-20 md:mt-28 md:pt-28 lg:grid-cols-12 lg:gap-16">
            <div className="lg:order-2 lg:col-span-5">
              <PortraitPlate
                index="02"
                initials="RJ"
                role="GLOBAL ARCHITECT"
                name="Rohan Jain"
                tag="SP JAIN ALUMNUS"
                image="/images/founders/rohan.webp"
                imageAlt="Rohan Jain, Director and Global Architect of Sourcing"
              />
            </div>

            <div className="lg:order-1 lg:col-span-7">
              <Reveal>
                <p className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums">
                  DIRECTOR / 02
                </p>
                <h3 className="font-display mt-4 text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[44px]">
                  Rohan Jain
                </h3>
                <p className="editorial-italic text-forest mt-2 text-[22px] md:text-[26px]">
                  The Global Architect of Sourcing.
                </p>
                <p className="text-ink-soft mt-6 max-w-xl text-[15.5px] leading-relaxed">
                  A forward-thinking entrepreneur with a Master&apos;s in Global Family Managed
                  Business from SP Jain, Rohan brings a sophisticated blend of heritage and
                  innovation to the venture. His roots lie in a successful family business legacy
                  established by his father, Rajesh Jain, where he learned the intricacies of trade
                  and leadership, and built the strategic foundation necessary to scale.
                </p>
                <p className="text-ink-soft mt-4 max-w-xl text-[15.5px] leading-relaxed">
                  Rohan is the driving force behind this mission. As the Global Architect of
                  Sourcing, he is dedicated to scaling the company through strategic international
                  partnerships, transforming the landscape of availability by making exclusive,
                  high-tier products accessible to the wider market.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-ink-muted mt-10 font-mono text-[10px] tracking-[0.18em] uppercase">
                  REGISTER
                </p>
              </Reveal>
              <StaggerGroup className="border-ink/15 mt-4 border-t">
                {ROHAN_REGISTER.map((r) => (
                  <StaggerItem
                    key={r.k}
                    className="border-ink/15 grid grid-cols-[110px_1fr] items-baseline gap-x-4 border-b py-3.5"
                  >
                    <span className="text-forest font-mono text-[10px] tracking-[0.16em] uppercase">
                      {r.k}
                    </span>
                    <span className="text-ink text-[14.5px]">{r.v}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────
         03 / ADVISORY BOARD
         ───────────────────────────────────────────────────────── */}
      <Section size="lg" tone="paper" id="advisory" className="scroll-mt-20">
        <Container>
          <div className="mb-12 max-w-4xl md:mb-16">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="text-forest font-mono text-[10px] tracking-[0.24em] uppercase tabular-nums">
                  03
                </span>
                <span aria-hidden className="bg-line-strong h-px w-12" />
                <span className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                  ADVISORY BOARD
                </span>
              </div>
              <h2 className="font-display mt-6 text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[52px]">
                The minds
                <span className="editorial-italic text-forest"> behind the moves.</span>
              </h2>
            </Reveal>
          </div>

          <div className="bg-line-strong border-line-strong grid gap-px border md:grid-cols-2">
            {ADVISORS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.08}>
                <article className="flex h-full flex-col bg-white p-7 md:p-10">
                  <div className="flex items-center gap-4">
                    {a.image ? (
                      <Image
                        src={a.image}
                        alt={`${a.name}, Advisory Board`}
                        width={120}
                        height={120}
                        sizes="64px"
                        className="border-ink/10 h-16 w-16 shrink-0 rounded-full border object-cover object-top"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="border-ink/10 bg-paper-warm text-ink font-display flex h-16 w-16 shrink-0 items-center justify-center rounded-full border text-[24px] leading-none tracking-[-0.04em]"
                      >
                        {a.initials[0]}
                        <span className="editorial-italic text-forest">{a.initials[1]}</span>
                      </span>
                    )}
                    <p className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums">
                      ADVISOR / {a.index}
                    </p>
                  </div>
                  <h3 className="font-display mt-5 text-[26px] leading-[1.1] tracking-[-0.015em] md:text-[30px]">
                    {a.name}
                  </h3>
                  <p className="editorial-italic text-forest mt-1.5 text-[19px] md:text-[21px]">
                    {a.epithet}
                  </p>
                  <div className="mt-5 space-y-4">
                    {a.paragraphs.map((p) => (
                      <p
                        key={p.slice(0, 24)}
                        className="text-ink-soft text-[14.5px] leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-7">
                    {a.chips.map((c) => (
                      <span
                        key={c}
                        className="border-line-strong text-ink-soft inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────
         04 / THE GOLD STANDARD — selection criteria
         ───────────────────────────────────────────────────────── */}
      <Section size="lg" tone="white" id="standard" className="scroll-mt-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="text-forest font-mono text-[10px] tracking-[0.24em] uppercase tabular-nums">
                    04
                  </span>
                  <span aria-hidden className="bg-line-strong h-px w-12" />
                  <span className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                    OUR STANDARD
                  </span>
                </div>
                <h2 className="font-display mt-6 text-[36px] leading-[1.08] tracking-[-0.02em] md:text-[44px]">
                  The Global
                  <span className="editorial-italic text-forest"> Gold Standard.</span>
                </h2>
                <p className="text-ink-soft mt-5 text-[15.5px] leading-relaxed">
                  Our primary focus is elite materials and machinery from the world&apos;s most
                  sophisticated manufacturing hubs. Every product in our portfolio undergoes a
                  rigorous selection process — three questions, asked every time.
                </p>
              </Reveal>
            </div>

            <StaggerGroup className="lg:col-span-8">
              {CRITERIA.map((c, i) => (
                <StaggerItem
                  key={c.title}
                  className="border-ink grid items-start gap-4 border-t py-8 sm:grid-cols-[120px_1fr] md:py-10"
                >
                  <p className="text-forest font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums">
                    CRITERION
                    <br />/ {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.015em] md:text-[34px]">
                      {c.title}
                    </h3>
                    <p className="text-ink-soft mt-3 max-w-lg text-[15px] leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
              <div className="border-ink border-t" />
            </StaggerGroup>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────
         05 / PROMISE — closing band
         ───────────────────────────────────────────────────────── */}
      <section id="promise" className="bg-forest relative scroll-mt-20 overflow-hidden text-white">
        <svg aria-hidden className="absolute inset-0 h-full w-full text-white/[0.08]">
          <defs>
            <pattern id="promise-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#promise-dots)" />
        </svg>

        <Container className="relative py-20 md:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="text-mid-green font-mono text-[10px] tracking-[0.24em] uppercase tabular-nums">
                    05
                  </span>
                  <span aria-hidden className="h-px w-12 bg-white/30" />
                  <span className="font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase">
                    OUR PROMISE
                  </span>
                </div>
              </Reveal>

              <WordReveal
                as="p"
                delay={0.1}
                stagger={0.04}
                className="editorial-italic mt-8 text-[30px] leading-[1.1] text-white md:text-[48px] lg:text-[56px]"
              >
                We aren&apos;t just supplying a practice —
                <span className="font-display not-italic"> we&apos;re partnering in</span>
                the success of every procedure, and the smile of every patient.
              </WordReveal>

              <Reveal delay={0.25}>
                <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-white/70">
                  From global sourcing to future-ready manufacturing, we thrive on bringing the
                  world&apos;s best to our people. We are more than a company — we are a commitment
                  to elevating the standard of healthcare across the nation.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-8">
              <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase">
                BLACKCHIP IMPEX PVT. LTD.
              </p>
              <StaggerGroup className="mt-4">
                {["Precision.", "Trust.", "Innovation."].map((w) => (
                  <StaggerItem key={w}>
                    <p className="font-display text-[30px] leading-[1.2] tracking-[-0.015em] text-white md:text-[36px]">
                      {w}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <div className="mt-8 flex flex-col gap-2.5">
                <ButtonLink
                  href="/contact?type=distributor"
                  variant="primary"
                  size="lg"
                  withArrow
                  className="w-full justify-between"
                >
                  Partner with Blackchip
                </ButtonLink>
                <Link
                  href="/about"
                  className="group mt-2 inline-flex items-center gap-1.5 text-[13px] text-white/70 transition-colors hover:text-white"
                >
                  Read the Tomato Medical &amp; Chemical India story
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
