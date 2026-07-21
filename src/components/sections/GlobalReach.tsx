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
  BLACKCHIP_HQ,
} from "./world-map-path";

// Blackchip (India) HQ accent — a saffron amber, distinct from the Korea HQ red.
const BLACKCHIP_COLOR = "#E08A1E";

export function GlobalReach() {
  const reduce = useReducedMotion();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const totalCountries = REGIONS.reduce((acc, r) => acc + r.countries, 0);

  return (
    <Section size="lg" tone="white">
      <Container>
        <div className="mb-12 grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p className="text-forest font-mono text-[11px] tracking-[0.18em] uppercase">
              GLOBAL REACH
            </p>
            <h2 className="font-display mt-4 text-[32px] leading-[1.08] tracking-[-0.02em] md:text-[44px]">
              Supplying to {totalCountries}+ countries
              <br className="hidden md:block" />
              <span className="editorial-italic text-forest"> across five continents.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5">
            <p className="text-ink-soft max-w-md text-[15.5px] leading-relaxed">
              Manufactured in Pyeongtaek, South Korea, and shipped to the United States, Japan,
              China, Southeast Asia, MENA, Europe, and South America. In India,{" "}
              <span className="text-ink font-medium">Blackchip Impex Pvt. Ltd.</span>{" "} operates as the exclusive distributor of
              Tomato M&amp;C.
            </p>
            <Link
              href="/network#markets"
              className="text-forest hover:text-forest-deep group mt-5 inline-flex items-center gap-2 text-[14px] font-medium transition-colors"
            >
              See the full distribution program
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Map — sharp editorial frame */}
        <Reveal>
          <div className="border-line bg-paper-warm relative overflow-hidden border p-4 md:p-8">
            {/* Top engineering meta */}
            <div className="text-ink-muted mb-4 flex items-baseline justify-between font-mono text-[10px] tracking-[0.18em] uppercase">
              <span>WORLD · EQUAL-EARTH PROJECTION</span>
              <span className="tabular-nums">{PROJECTED_MARKETS.length} ACTIVE MARKETS</span>
            </div>

            {/* Below sm the map pans horizontally so markers and labels stay
                legible instead of shrinking to ~300px wide. */}
            <div className="relative overflow-x-auto">
              <svg
                viewBox={WORLD_VIEWBOX}
                className="h-auto w-full min-w-[560px] sm:min-w-0"
                role="img"
                aria-label="World map showing Tomato M&C India distribution markets"
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
                      // Safari leaves SVG <g> stuck at the `initial` state when the
                      // reveal is driven by whileInView (its IntersectionObserver is
                      // unreliable for SVG children) — the dots never appeared. Drive
                      // the reveal with `animate` so it can't get stuck, and pin
                      // transform-box/origin so the scale pops from the dot's own
                      // centre rather than the SVG canvas origin in Safari.
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      initial={reduce ? false : { opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
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
                  <circle
                    cx={HQ.x}
                    cy={HQ.y}
                    r="3"
                    fill="var(--color-brand-red)"
                    stroke="white"
                    strokeWidth="0.8"
                  />
                </g>
                <text
                  x={HQ.x + 14}
                  y={HQ.y + 3}
                  fontFamily="var(--font-mono)"
                  fontSize="8.5"
                  letterSpacing="0.16em"
                  fill="var(--color-brand-red)"
                  className="font-medium uppercase"
                >
                  HQ · PYEONGTAEK
                </text>

                {/* Blackchip — India operations / distributor */}
                <g>
                  <circle
                    cx={BLACKCHIP_HQ.x}
                    cy={BLACKCHIP_HQ.y}
                    r="12"
                    fill={BLACKCHIP_COLOR}
                    opacity="0.16"
                  />
                  <circle
                    cx={BLACKCHIP_HQ.x}
                    cy={BLACKCHIP_HQ.y}
                    r="7"
                    fill={BLACKCHIP_COLOR}
                    opacity="0.32"
                  />
                  <circle
                    cx={BLACKCHIP_HQ.x}
                    cy={BLACKCHIP_HQ.y}
                    r="3"
                    fill={BLACKCHIP_COLOR}
                    stroke="white"
                    strokeWidth="0.8"
                  />
                </g>
                <text
                  x={BLACKCHIP_HQ.x - 14}
                  y={BLACKCHIP_HQ.y + 18}
                  textAnchor="end"
                  fontFamily="var(--font-mono)"
                  fontSize="8.5"
                  letterSpacing="0.16em"
                  fill={BLACKCHIP_COLOR}
                  className="font-medium uppercase"
                >
                  BLACKCHIP · INDIA
                </text>
              </svg>
            </div>

            {/* Bottom legend */}
            <div className="text-ink-muted mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.16em] uppercase">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden className="bg-forest inline-block h-2 w-2 rounded-full" />
                  ACTIVE MARKET
                </span>
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden className="bg-brand-red inline-block h-2 w-2 rounded-full" />
                  HEADQUARTERS · KR
                </span>
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: BLACKCHIP_COLOR }}
                  />
                  BLACKCHIP · IN
                </span>
              </div>
              <span className="tabular-nums">SOURCE · NATURAL EARTH 110M</span>
            </div>
          </div>
        </Reveal>

        {/* Region pills */}
        <Reveal delay={0.1}>
          <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {REGIONS.map((r) => (
              <li key={r.name}>
                <button
                  type="button"
                  onMouseEnter={() => setHoveredRegion(r.name)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  onFocus={() => setHoveredRegion(r.name)}
                  onBlur={() => setHoveredRegion(null)}
                  className="group focus-visible:outline-forest w-full rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <div className="border-line rounded-xl border bg-white px-4 py-4 transition-[border-color,transform,box-shadow] duration-300 [transition-timing-function:var(--ease-out-quint)] group-hover:-translate-y-0.5 group-hover:border-forest/40 group-hover:shadow-[var(--shadow-card)]">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-ink-muted font-mono text-[10px] tracking-[0.14em] uppercase">
                        Region
                      </p>
                      <p className="text-forest font-mono text-[11px] tabular-nums">
                        {String(r.countries).padStart(2, "0")}
                      </p>
                    </div>
                    <p className="font-display text-ink mt-2 text-[14.5px] leading-tight">{r.name}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
