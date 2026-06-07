import Link from "next/link";
import { Layers, Droplets, Paintbrush, Scissors, PackageCheck, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  {
    icon: Layers,
    title: "Fabric Feeding",
    body: "Fiberglass substrate fed at calibrated tension.",
  },
  { icon: Droplets, title: "Resin Feeding", body: "Proprietary resin metered into the line." },
  { icon: Paintbrush, title: "Fabric Coating", body: "Uniform coating across the working width." },
  { icon: Scissors, title: "Bobbin + Cutting", body: "Wound and cut to specified roll length." },
  {
    icon: PackageCheck,
    title: "Automatic Packing",
    body: "Sterile-compatible packaging for export.",
  },
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
      <svg aria-hidden className="absolute inset-0 h-full w-full text-white/[0.08]">
        <defs>
          <pattern id="pf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pf-dots)" />
      </svg>

      <Container className="relative">
        <div className="mb-14 grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p className="text-mid-green font-mono text-[11px] tracking-[0.18em] uppercase">
              MANUFACTURING DIFFERENTIATOR
            </p>
            <h2 className="font-display mt-4 text-[32px] leading-[1.1] tracking-[-0.02em] text-white md:text-[44px]">
              Korea&apos;s only fully automated,
              <br className="hidden md:block" />
              <span className="editorial-italic"> one-stop production line.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <p className="max-w-md text-[15.5px] leading-relaxed text-white/75">
              Five stages, one facility, one accountable line. No external coaters, no third-party
              fabric, no outsourced QA.
            </p>
            <Link
              href="/manufacturing"
              className="hover:text-mid-green group mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-white transition-colors"
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
            className="absolute top-[34px] right-[7%] left-[7%] hidden h-px bg-white/15 lg:block"
          />

          <ol className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 0.07} className="relative">
                <div className="relative flex items-center gap-4 lg:block">
                  {/* Numbered medallion — white face for high contrast */}
                  <div className="relative z-10 shrink-0">
                    <div className="ring-forest inline-flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] ring-4">
                      <Icon className="text-forest h-6 w-6" strokeWidth={1.8} />
                    </div>
                  </div>
                  <p className="text-mid-green font-mono text-[10px] tracking-[0.18em] uppercase tabular-nums lg:mt-5">
                    STEP {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="font-display mt-1 text-[18px] leading-tight text-white lg:mt-2">
                  {title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/65 lg:max-w-[170px]">
                  {body}
                </p>

                {/* Arrow connector (desktop only, between steps) */}
                {i < STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute top-[26px] right-[-14px] z-20 hidden h-4 w-4 items-center justify-center lg:flex"
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
