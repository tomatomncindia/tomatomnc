import Link from "next/link";
import {
  Layers,
  Droplets,
  Paintbrush,
  Scissors,
  PackageCheck,
  ArrowUpRight,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  { icon: Layers, title: "Fabric Feeding", body: "Fiberglass substrate fed at calibrated tension." },
  { icon: Droplets, title: "Resin Feeding", body: "Proprietary resin metered into the line." },
  { icon: Paintbrush, title: "Fabric Coating", body: "Uniform coating across the working width." },
  { icon: Scissors, title: "Bobbin + Cutting", body: "Wound and cut to specified roll length." },
  { icon: PackageCheck, title: "Automatic Packing", body: "Sterile-compatible packaging for export." },
];

/**
 * 5-step production flow preview for the home page.
 * Designed as a horizontal connected flow on desktop, vertical stack on mobile.
 * Sits between the cert band and the next major section as the
 * "we make this ourselves" credibility statement.
 */
export function ProductionFlowPreview() {
  return (
    <Section tone="forest" size="lg" className="relative overflow-hidden">
      {/* Subtle dot grid backdrop */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-white/[0.08]"
      >
        <defs>
          <pattern id="pf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pf-dots)" />
      </svg>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end mb-14">
          <Reveal className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mid-green">
              MANUFACTURING DIFFERENTIATOR
            </p>
            <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.02em] text-white">
              Korea&apos;s only fully automated,
              <br className="hidden md:block" />
              <span className="editorial-italic"> one-stop production line.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <p className="text-[15.5px] leading-relaxed text-white/75 max-w-md">
              Five stages, one facility, one accountable line. No external coaters, no third-party fabric, no outsourced QA.
            </p>
            <Link
              href="/manufacturing"
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-white hover:text-mid-green group transition-colors"
            >
              See the full production system
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Horizontal flow */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[34px] left-[7%] right-[7%] h-px bg-white/15"
          />

          <ol className="grid grid-cols-1 gap-y-10 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 0.07} className="relative">
                <div className="relative flex items-center gap-4 lg:block">
                  {/* Numbered medallion — white face for high contrast */}
                  <div className="relative shrink-0 z-10">
                    <div className="inline-flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] ring-4 ring-forest">
                      <Icon className="h-6 w-6 text-forest" strokeWidth={1.8} />
                    </div>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mid-green lg:mt-5 tabular-nums">
                    STEP {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="mt-1 lg:mt-2 font-display text-[18px] leading-tight text-white">
                  {title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/65 lg:max-w-[170px]">
                  {body}
                </p>

                {/* Arrow connector (desktop only, between steps) */}
                {i < STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden lg:flex absolute top-[26px] right-[-14px] z-20 h-4 w-4 items-center justify-center"
                  >
                    <svg viewBox="0 0 16 16" className="h-full w-full text-white/40">
                      <path
                        d="M4 4 L10 8 L4 12"
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
        </div>
      </Container>
    </Section>
  );
}
