import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Specialists in fiberglass orthopedic casting since 2005. Tomato M&C India is a Korean medical manufacturer trusted by hospitals and distributors in 30+ countries.",
  path: "/about",
});

const TOC = [
  { num: "01", label: "Manifesto", href: "#manifesto" },
  { num: "02", label: "Twenty Years", href: "#journey" },
  { num: "03", label: "By the Numbers", href: "#numbers" },
];

const PRESS_NUMBERS = [
  {
    value: "20",
    label: "Years in operation",
    note: "Continuous production since 2005, one facility.",
  },
  { value: "30+", label: "Markets served", note: "Active distribution on five continents." },
  { value: "100%", label: "Supply chain owned", note: "Fiberglass to packaging, all in-house." },
  {
    value: "6",
    label: "Quality certifications",
    note: "ISO, FDA, CE, KGMP across five jurisdictions.",
  },
  { value: "15", label: "Standard colorways", note: "Per cast SKU, plus custom colors." },
  { value: "<2", label: "Hour response", note: "Sample and distributor inquiries." },
];

export default function AboutPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
         DOSSIER HERO — magazine-cover treatment
         ───────────────────────────────────────────────────────── */}
      <section className="border-line relative overflow-hidden border-b">
        <Container className="relative pt-16 pb-12 md:pt-24 md:pb-20">
          {/* Vertical "ISSUE" label */}

          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="text-forest font-mono text-[11px] tracking-[0.18em] uppercase">
                  ABOUT — TOMATO M&amp;C
                </p>
              </Reveal>

              <WordReveal
                as="h1"
                delay={0.1}
                stagger={0.06}
                className="font-display mt-6 text-[clamp(42px,13vw,80px)] leading-[1.08] tracking-[-0.035em] lg:text-[110px]"
              >
                Twenty Years
                <span className="editorial-italic text-forest text-[clamp(48px,14.5vw,88px)] lg:text-[120px]">
                  on One Floor.
                </span>
              </WordReveal>

              <Reveal delay={0.2}>
                <p className="text-ink-soft mt-8 max-w-xl text-[17px] leading-relaxed">
                  An institutional record of Tomato M&amp;C India — the people, the building, the
                  line, and the documents that make up Korea&apos;s only fully automated, one-stop
                  fiberglass-cast operation.
                </p>
              </Reveal>
            </div>

            {/* Cover card with metadata */}
            <Reveal delay={0.15} className="lg:col-span-4">
              <div className="border-ink/15 bg-paper-warm border">
                {/* Header */}
                <div className="border-ink/15 text-ink-muted flex items-center justify-between border-b px-5 py-3 font-mono text-[10px] tracking-[0.18em] uppercase">
                  <span>FILE CARD</span>
                </div>
                {/* Body */}
                <dl className="space-y-3 px-5 py-5 text-[13px]">
                  <Row label="Subject" value="Tomato M&C Co., Ltd." />
                  <Row label="Founded" value="2005" mono />
                  <Row label="Location" value="Pyeongtaek-si, Gyeonggi-do, KR" />
                  <Row label="Category" value="Orthopedic Manufacturing" />
                  <Row label="Output" value="Fiberglass casting tape & splints" />
                  <Row label="Certificates" value="ISO 13485 · FDA · CE · KGMP" mono />
                  <Row label="Distribution" value="30+ countries / 5 continents" />
                </dl>
                {/* Footer */}
                <div className="border-ink/15 flex items-center justify-between border-t px-5 py-3">
                  <span className="text-ink-muted font-mono text-[10px] tracking-[0.16em] uppercase">
                    PAGES
                  </span>
                  <span className="font-display text-[18px] tabular-nums">07</span>
                </div>
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
         01 / MANIFESTO — full-bleed dark editorial quote
         ───────────────────────────────────────────────────────── */}
      <section id="manifesto" className="bg-ink relative scroll-mt-20 overflow-hidden text-white">
        {/* Subtle grain backdrop */}
        <svg aria-hidden className="absolute inset-0 h-full w-full text-white/[0.06]">
          <defs>
            <pattern id="manif-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#manif-dots)" />
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
                  MANIFESTO
                </span>
              </div>
            </Reveal>

            <WordReveal
              as="p"
              delay={0.1}
              stagger={0.045}
              className="editorial-italic mt-10 text-[clamp(34px,10.5vw,64px)] leading-[1.04] tracking-[-0.02em] text-white lg:text-[88px]"
            >
              We don&apos;t make many things.
              <br />
              <span className="font-display not-italic"> We make</span> one thing,
              <br />
              the same way,
              <br />
              <span className="text-mid-green">every shift.</span>
            </WordReveal>

            <Reveal delay={0.3}>
              <div className="mt-14 grid max-w-3xl gap-8 md:grid-cols-3">
                {[
                  { k: "One product", v: "Fiberglass orthopedic casting tape & splints." },
                  { k: "One facility", v: "Pyeongtaek. Twenty years and counting." },
                  { k: "One process", v: "Owned end to end, fiber to packing." },
                ].map((c) => (
                  <div key={c.k}>
                    <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase">
                      {c.k}
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/75">{c.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────
         02 / JOURNEY — vertical timeline
         ───────────────────────────────────────────────────────── */}
      <Section size="lg" tone="white" id="journey" className="scroll-mt-20">
        <Container>
          <div className="mb-16 max-w-4xl md:mb-24">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="text-forest font-mono text-[10px] tracking-[0.24em] uppercase tabular-nums">
                  02
                </span>
                <span aria-hidden className="bg-line-strong h-px w-12" />
                <span className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                  JOURNEY
                </span>
              </div>
              <h2 className="font-display mt-6 text-[36px] leading-[1.05] tracking-[-0.025em] md:text-[56px] lg:text-[64px]">
                Twenty years,
                <span className="editorial-italic text-forest"> ten markers.</span>
              </h2>
              <p className="text-ink-soft mt-5 max-w-xl text-[16px] leading-relaxed">
                A record of the dated moments that shaped how the line runs today.
              </p>
            </Reveal>
          </div>

          <JourneyTimeline />
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────
         03 / PRESS KIT — by the numbers
         ───────────────────────────────────────────────────────── */}
      <Section size="lg" tone="white" id="numbers" className="scroll-mt-20">
        <Container>
          <div className="mb-12 md:mb-16">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="text-forest font-mono text-[10px] tracking-[0.24em] uppercase tabular-nums">
                  03
                </span>
                <span aria-hidden className="bg-line-strong h-px w-12" />
                <span className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase">
                  PRESS KIT · BY THE NUMBERS
                </span>
              </div>
              <h2 className="font-display mt-6 text-[36px] leading-[1.05] tracking-[-0.02em] md:text-[52px]">
                The credible
                <span className="editorial-italic text-forest"> shorthand.</span>
              </h2>
            </Reveal>
          </div>

          <ol className="bg-line-strong border-line-strong grid gap-px border sm:grid-cols-2 lg:grid-cols-3">
            {PRESS_NUMBERS.map((n, i) => (
              <Reveal as="li" key={n.label} delay={i * 0.05}>
                <div className="flex h-full flex-col bg-white p-6 md:p-8">
                  <div className="mb-6 flex items-baseline justify-between">
                    <p className="text-ink-muted font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums">
                      FACT / {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-forest font-mono text-[10px] tracking-[0.16em] uppercase">
                      VERIFIED
                    </p>
                  </div>
                  <dd className="font-display text-ink text-[56px] leading-[0.9] tracking-[-0.03em] sm:text-[72px] md:text-[88px]">
                    <AnimatedNumber value={n.value} />
                  </dd>
                  <dt className="font-display text-ink mt-4 text-[18px]">{n.label}</dt>
                  <p className="text-ink-soft mt-2 text-[13px] leading-relaxed">{n.note}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────
         CLOSING — final mission + dual CTA
         ───────────────────────────────────────────────────────── */}
      <section className="bg-forest relative overflow-hidden text-white">
        <svg aria-hidden className="absolute inset-0 h-full w-full text-white/[0.08]">
          <defs>
            <pattern id="close-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#close-dots)" />
        </svg>

        <Container className="relative py-20 md:py-28">
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="text-mid-green font-mono text-[10px] tracking-[0.24em] uppercase">
                  COLOPHON
                </p>
              </Reveal>
              <WordReveal
                as="p"
                delay={0.1}
                stagger={0.04}
                className="editorial-italic mt-6 text-[32px] leading-[1.08] text-white md:text-[52px] lg:text-[60px]"
              >
                We&apos;re the building, the line, and the people on it.
                <span className="font-display not-italic"> When you write to us,</span>a person on
                that floor reads it.
              </WordReveal>
            </div>

            <Reveal delay={0.2} className="lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-8">
              <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase">
                START
              </p>
              <h2 className="font-display mt-3 text-[28px] leading-[1.1] tracking-[-0.015em] md:text-[32px]">
                Talk to us.
              </h2>
              <div className="mt-6 flex flex-col gap-2.5">
                <ButtonLink
                  href="/contact?type=sample"
                  variant="primary"
                  size="lg"
                  withArrow
                  className="w-full justify-between"
                >
                  Request a Sample
                </ButtonLink>
                <Link
                  href="/manufacturing"
                  className="group mt-2 inline-flex items-center gap-1.5 text-[13px] text-white/70 transition-colors hover:text-white"
                >
                  See the production line
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

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="grid grid-cols-[90px_1fr] items-baseline gap-3">
      <dt className="text-ink-muted font-mono text-[10px] tracking-[0.16em] uppercase">{label}</dt>
      <dd
        className={`text-ink ${mono ? "font-mono text-[12px] tracking-[0.08em] uppercase" : "text-[13.5px]"}`}
      >
        {value}
      </dd>
    </div>
  );
}
