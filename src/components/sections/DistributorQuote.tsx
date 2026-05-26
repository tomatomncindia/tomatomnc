"use client";

import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";

/**
 * Editorial pull-quote band from a distributor partner.
 * Sits as a high-trust signal between product and CTA sections.
 *
 * Quote and attribution are static for now; swap with real partner content
 * when sourced (consider rotating with state if multiple quotes exist).
 */
export function DistributorQuote() {
  return (
    <section className="relative overflow-hidden bg-paper-warm">
      {/* Subtle dot grid backdrop */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-ink/[0.06]"
      >
        <defs>
          <pattern id="dq-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dq-dots)" />
      </svg>

      <div className="relative container-page py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-forest">
              PARTNER VOICE
            </p>
            <p className="mt-3 text-[12.5px] font-mono uppercase tracking-[0.14em] text-ink-muted">
              Letter from a distributor / 2024
            </p>
            <div aria-hidden className="mt-6 h-px w-12 bg-ink/30" />
          </Reveal>

          <div className="lg:col-span-9">
            {/* Quote mark */}
            <span
              aria-hidden
              className="block editorial-italic text-forest/40 leading-none text-[120px] md:text-[160px] -ml-2 -mb-12 md:-mb-20"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              &ldquo;
            </span>

            <WordReveal
              as="p"
              stagger={0.04}
              className="editorial-italic text-[28px] md:text-[42px] lg:text-[52px] leading-[1.15] text-ink max-w-4xl"
            >
              We sourced from four manufacturers across Asia for over a decade. Tomato is the only line where every shipment behaves the same: same set time, same set strength, same break feel. That consistency is the product.
            </WordReveal>

            <Reveal delay={0.3}>
              <figcaption className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-ink/15 pt-6">
                <div>
                  <p className="font-display text-[17px] leading-tight">Dr. Aria Vermeer</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                    Procurement Lead · NW Europe Surgical Supply
                  </p>
                </div>
                <div className="ml-auto flex items-baseline gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                      Partner since
                    </p>
                    <p className="mt-1 font-display text-[20px] tabular-nums">2014</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                      Annual volume
                    </p>
                    <p className="mt-1 font-display text-[20px] tabular-nums">~180k rolls</p>
                  </div>
                </div>
              </figcaption>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
