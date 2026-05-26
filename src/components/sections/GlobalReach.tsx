"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { REGIONS } from "@/data/markets";
import {
  WORLD_PATH,
  WORLD_VIEWBOX,
  WORLD_WIDTH,
  WORLD_HEIGHT,
  EQUATOR_Y,
  MERIDIAN_X,
  PROJECTED_MARKETS,
  HQ,
} from "./world-map-path";

export function GlobalReach() {
  const reduce = useReducedMotion();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const totalCountries = REGIONS.reduce((acc, r) => acc + r.countries, 0);

  return (
    <Section size="lg" tone="white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 mb-12 items-end">
          <Reveal className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-forest">
              GLOBAL REACH
            </p>
            <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.08] tracking-[-0.02em]">
              Supplying to {totalCountries}+ countries
              <br className="hidden md:block" />
              <span className="editorial-italic text-forest"> across five continents.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <p className="text-[15.5px] leading-relaxed text-ink-soft max-w-md">
              Active distribution across the Americas, Europe, Asia-Pacific, and MENA. Each market entry backed by region-specific regulatory clearance.
            </p>
            <Link
              href="/network#markets"
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-forest hover:text-forest-deep group transition-colors"
            >
              See the full distribution program
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Map — sharp editorial frame */}
        <Reveal>
          <div className="relative border border-line bg-paper-warm p-4 md:p-8 overflow-hidden">
            {/* Top engineering meta */}
            <div className="flex items-baseline justify-between mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              <span>WORLD · EQUAL-EARTH PROJECTION</span>
              <span className="tabular-nums">{PROJECTED_MARKETS.length} ACTIVE MARKETS</span>
            </div>

            <div className="relative">
              <svg
                viewBox={WORLD_VIEWBOX}
                className="w-full h-auto"
                role="img"
                aria-label="World map showing Tomato M&C distribution markets"
              >
                {/* Fine grid backdrop within the map area */}
                <defs>
                  <pattern id="gr-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M40 0 L0 0 L0 40"
                      fill="none"
                      stroke="rgba(15,18,17,0.05)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect x="0" y="0" width={WORLD_WIDTH} height={WORLD_HEIGHT} fill="url(#gr-grid)" />

                {/* Real world map — land polygons */}
                <path
                  d={WORLD_PATH}
                  fill="var(--color-paper)"
                  stroke="var(--color-line-strong)"
                  strokeWidth="0.6"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Equator + prime meridian (faint guides) */}
                <g stroke="rgba(15,18,17,0.08)" strokeWidth="0.5">
                  <line x1="0" y1={EQUATOR_Y} x2={WORLD_WIDTH} y2={EQUATOR_Y} />
                  <line x1={MERIDIAN_X} y1="0" x2={MERIDIAN_X} y2={WORLD_HEIGHT} />
                </g>

                {/* Market markers */}
                {PROJECTED_MARKETS.map((m, i) => {
                  const isHovered = hoveredRegion === m.region;
                  return (
                    <motion.g
                      key={m.name}
                      initial={reduce ? false : { opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + i * 0.018,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Subtle outer ring (highlighted on region hover) */}
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r={isHovered ? 8 : 4}
                        fill="var(--color-forest)"
                        opacity={isHovered ? 0.2 : 0}
                        className="transition-[r,opacity] duration-300"
                      />
                      {/* Marker dot */}
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r="2.2"
                        fill="var(--color-forest)"
                        stroke="var(--color-paper)"
                        strokeWidth="0.6"
                      />
                    </motion.g>
                  );
                })}

                {/* Korea HQ — special treatment */}
                <g>
                  <circle cx={HQ.x} cy={HQ.y} r="12" fill="var(--color-brand-red)" opacity="0.16" />
                  <circle cx={HQ.x} cy={HQ.y} r="7" fill="var(--color-brand-red)" opacity="0.3" />
                  <circle cx={HQ.x} cy={HQ.y} r="3" fill="var(--color-brand-red)" stroke="white" strokeWidth="0.8" />
                </g>
                <text
                  x={HQ.x + 14}
                  y={HQ.y + 3}
                  fontFamily="var(--font-mono)"
                  fontSize="8.5"
                  letterSpacing="0.16em"
                  fill="var(--color-brand-red)"
                  className="uppercase font-medium"
                >
                  HQ · PYEONGTAEK
                </text>
              </svg>
            </div>

            {/* Bottom legend */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
              <div className="flex items-center gap-x-5 gap-y-1 flex-wrap">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-forest" />
                  ACTIVE MARKET
                </span>
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-brand-red" />
                  HEADQUARTERS · KR
                </span>
              </div>
              <span className="tabular-nums">SOURCE · NATURAL EARTH 110M</span>
            </div>
          </div>
        </Reveal>

        {/* Region pills */}
        <Reveal delay={0.1}>
          <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {REGIONS.map((r) => (
              <li key={r.name}>
                <button
                  type="button"
                  onMouseEnter={() => setHoveredRegion(r.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onFocus={() => setHoveredRegion(r.name)}
                  onBlur={() => setHoveredRegion(null)}
                  className="group w-full rounded-xl border border-line bg-white px-4 py-4 text-left transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest [transition-timing-function:var(--ease-out-quint)]"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                      Region
                    </p>
                    <p className="font-mono text-[11px] tabular-nums text-forest">
                      {String(r.countries).padStart(2, "0")}
                    </p>
                  </div>
                  <p className="mt-2 font-display text-[14.5px] leading-tight text-ink">
                    {r.name}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
