import Link from "next/link";
import { Download, ArrowUpRight, ArrowDown } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { JourneyTimeline } from "@/components/about/JourneyTimeline";
import { FacilityBlueprint } from "@/components/about/FacilityBlueprint";
import { CERTIFICATIONS } from "@/data/certifications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Specialists in synthetic orthopedic casting since 2005. Tomato M&C is a Korean medical manufacturer trusted by hospitals and distributors in 30+ countries.",
  path: "/about",
});

const TOC = [
  { num: "01", label: "Manifesto", href: "#manifesto" },
  { num: "02", label: "Twenty Years", href: "#journey" },
  { num: "03", label: "Inside the Building", href: "#facility" },
  { num: "04", label: "By the Numbers", href: "#numbers" },
  { num: "05", label: "Quality Dossier", href: "#quality" },
];

const PRESS_NUMBERS = [
  { value: "20", label: "Years in operation", note: "Continuous production since 2005, one facility." },
  { value: "30+", label: "Markets served", note: "Active distribution on five continents." },
  { value: "100%", label: "Supply chain owned", note: "Fiberglass to packaging, all in-house." },
  { value: "6", label: "Quality certifications", note: "ISO, FDA, CE, KGMP across five jurisdictions." },
  { value: "14", label: "Standard colorways", note: "Per cast SKU, plus custom OEM colors." },
  { value: "2", label: "Business-day reply", note: "Sample, distributor, and OEM inquiries." },
];

export default function AboutPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
         DOSSIER HERO — magazine-cover treatment
         ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line">
        {/* Top metadata strip */}
        <div className="border-b border-line">
          <div className="container-page py-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            <span className="text-forest font-medium">DOSSIER · 001</span>
            <span>EST. 2005</span>
            <span>PYEONGTAEK · GYEONGGI-DO · KR</span>
            <span>ORTHOPEDIC CASTING</span>
            <span className="ml-auto tabular-nums">FILE NO. TMC-2024-001</span>
          </div>
        </div>

        <Container className="relative pt-16 md:pt-24 pb-12 md:pb-20">
          {/* Vertical "ISSUE" label */}
          <div
            aria-hidden
            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted"
          >
            <span>ISSUE · TWENTY YEARS / ONE FLOOR</span>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-forest">
                  ABOUT — TOMATO M&amp;C
                </p>
              </Reveal>

              <WordReveal
                as="h1"
                delay={0.1}
                stagger={0.06}
                className="mt-6 font-display text-[56px] sm:text-[80px] lg:text-[110px] leading-[0.92] tracking-[-0.035em]"
              >
                Twenty Years
                <br />
                <span className="editorial-italic text-forest text-[64px] sm:text-[88px] lg:text-[120px]">
                  on One Floor.
                </span>
              </WordReveal>

              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink-soft">
                  An institutional record of Tomato M&amp;C — the people, the building, the line, and the documents that make up Korea&apos;s only fully automated, one-stop synthetic-cast operation.
                </p>
              </Reveal>
            </div>

            {/* Cover card with metadata */}
            <Reveal delay={0.15} className="lg:col-span-4">
              <div className="border border-ink/15 bg-paper-warm">
                {/* Header */}
                <div className="border-b border-ink/15 px-5 py-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  <span>FILE CARD</span>
                  <span className="tabular-nums">REV.2024</span>
                </div>
                {/* Body */}
                <dl className="px-5 py-5 space-y-3 text-[13px]">
                  <Row label="Subject" value="Tomato M&C Co., Ltd." />
                  <Row label="Founded" value="2005" mono />
                  <Row label="Location" value="Pyeongtaek-si, Gyeonggi-do, KR" />
                  <Row label="Category" value="Orthopedic Manufacturing" />
                  <Row label="Output" value="Synthetic casting tape & splints" />
                  <Row label="Certifications" value="ISO 13485 · FDA · CE · KGMP" mono />
                  <Row label="Distribution" value="30+ countries / 5 continents" />
                </dl>
                {/* Footer */}
                <div className="border-t border-ink/15 px-5 py-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    PAGES
                  </span>
                  <span className="font-display text-[18px] tabular-nums">07</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Table of contents */}
          <Reveal delay={0.3}>
            <div className="mt-16 md:mt-24 border-t border-ink/15 pt-8">
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  TABLE OF CONTENTS
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted hidden md:inline-flex items-center gap-1.5">
                  SCROLL
                  <ArrowDown className="h-3 w-3" />
                </p>
              </div>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-4">
                {TOC.map((t) => (
                  <li key={t.num} className="border-t border-ink pt-3">
                    <a
                      href={t.href}
                      className="group block"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-forest tabular-nums">
                        {t.num}
                      </p>
                      <p className="mt-2 font-display text-[18px] md:text-[20px] leading-tight text-ink group-hover:text-forest transition-colors">
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
      <section
        id="manifesto"
        className="relative bg-ink text-white overflow-hidden scroll-mt-20"
      >
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
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-mid-green tabular-nums">
                  01
                </span>
                <span aria-hidden className="h-px w-12 bg-white/30" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                  MANIFESTO
                </span>
              </div>
            </Reveal>

            <WordReveal
              as="p"
              delay={0.1}
              stagger={0.045}
              className="mt-10 editorial-italic text-[42px] sm:text-[64px] lg:text-[88px] leading-[1.04] tracking-[-0.02em] text-white"
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
              <div className="mt-14 grid gap-8 md:grid-cols-3 max-w-3xl">
                {[
                  { k: "One product", v: "Synthetic orthopedic casting tape & splints." },
                  { k: "One facility", v: "Pyeongtaek. Twenty years and counting." },
                  { k: "One process", v: "Owned end to end, fiber to packing." },
                ].map((c) => (
                  <div key={c.k}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mid-green">
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
          <div className="mb-16 md:mb-24 max-w-4xl">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-forest tabular-nums">
                  02
                </span>
                <span aria-hidden className="h-px w-12 bg-line-strong" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  JOURNEY
                </span>
              </div>
              <h2 className="mt-6 font-display text-[36px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.025em]">
                Twenty years,
                <span className="editorial-italic text-forest"> ten markers.</span>
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-soft">
                A record of the dated moments that shaped how the line runs today.
              </p>
            </Reveal>
          </div>

          <JourneyTimeline />
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────
         03 / FACILITY — annotated blueprint
         ───────────────────────────────────────────────────────── */}
      <Section size="lg" tone="paper" id="facility" className="scroll-mt-20">
        <Container>
          <div className="mb-12 md:mb-16 grid gap-8 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-forest tabular-nums">
                    03
                  </span>
                  <span aria-hidden className="h-px w-12 bg-line-strong" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    FACILITY
                  </span>
                </div>
                <h2 className="mt-6 font-display text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.02em]">
                  Inside the
                  <span className="editorial-italic text-forest"> building.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.05} className="lg:col-span-5">
              <p className="text-[15.5px] leading-relaxed text-ink-soft">
                Seven functional areas under one roof. The plan below shows the production sequence
                left-to-right and the documentation footprint at the bottom. Hover any numbered area
                to read its function.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <FacilityBlueprint />
          </Reveal>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────
         04 / PRESS KIT — by the numbers
         ───────────────────────────────────────────────────────── */}
      <Section size="lg" tone="white" id="numbers" className="scroll-mt-20">
        <Container>
          <div className="mb-12 md:mb-16">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-forest tabular-nums">
                  04
                </span>
                <span aria-hidden className="h-px w-12 bg-line-strong" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  PRESS KIT · BY THE NUMBERS
                </span>
              </div>
              <h2 className="mt-6 font-display text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.02em]">
                The credible
                <span className="editorial-italic text-forest"> shorthand.</span>
              </h2>
            </Reveal>
          </div>

          <ol className="grid gap-px bg-line-strong border border-line-strong sm:grid-cols-2 lg:grid-cols-3">
            {PRESS_NUMBERS.map((n, i) => (
              <Reveal as="li" key={n.label} delay={i * 0.05}>
                <div className="bg-white p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-baseline justify-between mb-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted tabular-nums">
                      FACT / {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-forest">
                      VERIFIED
                    </p>
                  </div>
                  <dd className="font-display text-[72px] md:text-[88px] leading-[0.9] tracking-[-0.03em] text-ink">
                    <AnimatedNumber value={n.value} />
                  </dd>
                  <dt className="mt-4 font-display text-[18px] text-ink">{n.label}</dt>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{n.note}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────
         05 / QUALITY DOSSIER — filed-document cert presentation
         ───────────────────────────────────────────────────────── */}
      <Section size="lg" tone="paper" id="quality" className="scroll-mt-20">
        <Container>
          <div className="mb-12 md:mb-16 grid gap-8 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-forest tabular-nums">
                    05
                  </span>
                  <span aria-hidden className="h-px w-12 bg-line-strong" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    QUALITY DOSSIER
                  </span>
                </div>
                <h2 className="mt-6 font-display text-[36px] md:text-[52px] leading-[1.05] tracking-[-0.02em]">
                  Documents
                  <span className="editorial-italic text-forest"> on file.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.05} className="lg:col-span-5">
              <p className="text-[15.5px] leading-relaxed text-ink-soft">
                Six certifications across five jurisdictions. Documentation is downloadable directly —
                no login, no form, no waiting on a sales rep.
              </p>
            </Reveal>
          </div>

          {/* Filed cert cards */}
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 0.04}>
                <article className="group h-full bg-white border border-line transition-[border-color,transform] duration-300 [transition-timing-function:var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-[var(--shadow-card)] flex flex-col">
                  {/* Document header */}
                  <header className="flex items-center justify-between border-b border-line px-5 py-2.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted tabular-nums">
                      DOC · {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-forest">
                      {c.region}
                    </p>
                  </header>
                  {/* Body */}
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-[26px] leading-tight tracking-[-0.01em] text-ink">
                      {c.body}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-forest font-medium">{c.scope}</p>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-ink-soft flex-1">
                      {c.description}
                    </p>
                  </div>
                  {/* Document footer */}
                  <footer className="border-t border-line px-5 py-3 flex items-center justify-between">
                    {c.pdf ? (
                      <a
                        href={c.pdf}
                        className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink hover:text-forest transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        DOWNLOAD
                      </a>
                    ) : (
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-muted">
                        ON REQUEST
                      </span>
                    )}
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted tabular-nums">
                      {c.id.toUpperCase()}
                    </span>
                  </footer>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────
         CLOSING — final mission + dual CTA
         ───────────────────────────────────────────────────────── */}
      <section className="relative bg-forest text-white overflow-hidden">
        <svg aria-hidden className="absolute inset-0 h-full w-full text-white/[0.08]">
          <defs>
            <pattern id="close-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#close-dots)" />
        </svg>

        <Container className="relative py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mid-green">
                  COLOPHON
                </p>
              </Reveal>
              <WordReveal
                as="p"
                delay={0.1}
                stagger={0.04}
                className="mt-6 editorial-italic text-[32px] md:text-[52px] lg:text-[60px] leading-[1.08] text-white"
              >
                We&apos;re the building, the line, and the people on it.
                <span className="font-display not-italic"> When you write to us,</span>
                a person on that floor reads it.
              </WordReveal>
            </div>

            <Reveal delay={0.2} className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-white/15">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mid-green">
                START
              </p>
              <h2 className="mt-3 font-display text-[28px] md:text-[32px] leading-[1.1] tracking-[-0.015em]">
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
                <ButtonLink
                  href="/contact?type=oem"
                  variant="ghost"
                  size="lg"
                  className="w-full justify-between text-white border border-white/20 hover:bg-white/10"
                >
                  <span>OEM &amp; Partnership</span>
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                <Link
                  href="/manufacturing"
                  className="mt-2 group inline-flex items-center gap-1.5 text-[13px] text-white/70 hover:text-white transition-colors"
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
    <div className="grid grid-cols-[90px_1fr] gap-3 items-baseline">
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </dt>
      <dd
        className={`text-ink ${mono ? "font-mono text-[12px] uppercase tracking-[0.08em]" : "text-[13.5px]"}`}
      >
        {value}
      </dd>
    </div>
  );
}
