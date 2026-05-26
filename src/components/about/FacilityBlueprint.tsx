"use client";

import { useState } from "react";

type Area = {
  id: number;
  code: string;
  name: string;
  area: string;
  body: string;
  // SVG rect coords in viewBox 1000x600
  x: number;
  y: number;
  w: number;
  h: number;
};

const AREAS: Area[] = [
  {
    id: 1,
    code: "A · KNITTING",
    name: "Fabric Knitting",
    area: "~180 m²",
    body: "Fiberglass and polyester substrates woven in-house. The most critical raw material is produced under the same roof.",
    x: 60, y: 70, w: 220, h: 180,
  },
  {
    id: 2,
    code: "B · RESIN LAB",
    name: "Resin Formulation",
    area: "~120 m²",
    body: "Proprietary polyurethane resin chemistry. Set-time and break strength are tuned here, not sourced.",
    x: 60, y: 270, w: 220, h: 130,
  },
  {
    id: 3,
    code: "C · COATING LINE",
    name: "Coating Line",
    area: "~260 m²",
    body: "Resin metered onto the substrate at calibrated tension. Uniformity across the entire working width.",
    x: 300, y: 70, w: 380, h: 200,
  },
  {
    id: 4,
    code: "D · CUTTING + WINDING",
    name: "Bobbin + Cutting",
    area: "~220 m²",
    body: "Tension-monitored winding and cutting to spec roll lengths. Computer-guided cutting for every variant.",
    x: 300, y: 290, w: 380, h: 180,
  },
  {
    id: 5,
    code: "E · QA",
    name: "Climate-Controlled QA",
    area: "~150 m²",
    body: "In-line and end-of-line inspection. Climate control protects resin stability batch over batch.",
    x: 700, y: 70, w: 240, h: 220,
  },
  {
    id: 6,
    code: "F · PACKING + EXPORT",
    name: "Packing & Export",
    area: "~190 m²",
    body: "Sterile-compatible packing, batch records, and region-specific documentation kits assembled per shipment.",
    x: 700, y: 310, w: 240, h: 160,
  },
  {
    id: 7,
    code: "G · DOCS",
    name: "Documentation Archive",
    area: "~50 m²",
    body: "Batch records, COA library, regulatory filings. Where the traceability lives.",
    x: 60, y: 420, w: 620, h: 50,
  },
];

export function FacilityBlueprint() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-start">
      {/* Blueprint */}
      <div className="lg:col-span-8 relative border border-ink/15 bg-paper-warm overflow-hidden">
        {/* Top engineering meta */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between border-b border-ink/10 bg-paper-warm/80 backdrop-blur-sm px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          <span>FACILITY PLAN · TOMATO M&amp;C · PYEONGTAEK</span>
          <span className="tabular-nums">SCALE 1:N · NTS</span>
        </div>

        <svg
          viewBox="0 0 1000 540"
          className="w-full aspect-[1000/540]"
          role="img"
          aria-label="Facility floor plan with 7 numbered production areas"
        >
          {/* Background dot grid */}
          <defs>
            <pattern id="bp-dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill="rgba(15,18,17,0.18)" />
            </pattern>
            <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 L0 40" fill="none" stroke="rgba(15,18,17,0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1000" height="540" fill="url(#bp-grid)" />
          <rect x="0" y="0" width="1000" height="540" fill="url(#bp-dots)" opacity="0.3" />

          {/* Building outer wall */}
          <rect
            x="40" y="50" width="920" height="440"
            fill="none"
            stroke="rgba(15,18,17,0.65)"
            strokeWidth="2"
          />

          {/* Area rooms */}
          {AREAS.map((a) => {
            const isActive = active === a.id;
            return (
              <g
                key={a.id}
                onMouseEnter={() => setActive(a.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(a.id)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="button"
                aria-label={`${a.code} ${a.name}`}
                className="cursor-pointer focus:outline-none"
              >
                <rect
                  x={a.x}
                  y={a.y}
                  width={a.w}
                  height={a.h}
                  fill={isActive ? "var(--color-forest)" : "rgba(255,255,255,0.7)"}
                  stroke={isActive ? "var(--color-forest)" : "rgba(15,18,17,0.4)"}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-[fill,stroke] duration-200"
                />
                {/* Diagonal line pattern in non-active rooms */}
                {!isActive ? (
                  <g clipPath={`inset(0 round 0)`}>
                    {Array.from({ length: 20 }).map((_, idx) => (
                      <line
                        key={idx}
                        x1={a.x + idx * 18 - a.h}
                        y1={a.y + a.h}
                        x2={a.x + idx * 18}
                        y2={a.y}
                        stroke="rgba(15,18,17,0.05)"
                        strokeWidth="0.6"
                      />
                    ))}
                  </g>
                ) : null}
                {/* Number badge */}
                <circle
                  cx={a.x + 22}
                  cy={a.y + 22}
                  r="13"
                  fill={isActive ? "white" : "var(--color-ink)"}
                  stroke={isActive ? "var(--color-forest)" : "white"}
                  strokeWidth="2"
                />
                <text
                  x={a.x + 22}
                  y={a.y + 26}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight="600"
                  fill={isActive ? "var(--color-forest)" : "white"}
                  className="tabular-nums"
                >
                  {String(a.id).padStart(2, "0")}
                </text>
                {/* Room code */}
                <text
                  x={a.x + 44}
                  y={a.y + 27}
                  fontFamily="var(--font-mono)"
                  fontSize="9"
                  letterSpacing="0.12em"
                  fill={isActive ? "white" : "rgba(15,18,17,0.7)"}
                  className="uppercase font-medium"
                >
                  {a.code}
                </text>
              </g>
            );
          })}

          {/* Compass + scale */}
          <g transform="translate(900 470)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(15,18,17,0.4)" strokeWidth="0.8" />
            <line x1="0" y1="-14" x2="0" y2="-4" stroke="var(--color-brand-red)" strokeWidth="1.5" />
            <line x1="0" y1="4" x2="0" y2="14" stroke="rgba(15,18,17,0.4)" strokeWidth="1.5" />
            <text x="0" y="-20" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-brand-red)">N</text>
          </g>
        </svg>

        {/* Bottom engineering meta */}
        <div className="border-t border-ink/10 px-4 py-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          <span>7 AREAS / SINGLE FACILITY</span>
          <span className="tabular-nums">REV.2024 · DRWG.AB-07</span>
        </div>
      </div>

      {/* Side detail panel */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-forest">
          AREA LEGEND
        </p>
        <p className="text-[13px] text-ink-muted">
          Hover or focus a numbered area on the plan to see its function.
        </p>
        <ul className="mt-4 space-y-1">
          {AREAS.map((a) => {
            const isActive = active === a.id;
            return (
              <li
                key={a.id}
                onMouseEnter={() => setActive(a.id)}
                onMouseLeave={() => setActive(null)}
                className={`group cursor-default border-l-2 pl-4 py-3 transition-[border-color,background-color,padding] duration-200 ${
                  isActive
                    ? "border-forest bg-forest/[0.04] pl-5"
                    : "border-line"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    {a.code}
                  </p>
                  <span
                    className={`font-mono text-[10px] tabular-nums ${
                      isActive ? "text-forest" : "text-ink-muted"
                    }`}
                  >
                    {String(a.id).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 font-display text-[16px] leading-tight text-ink">
                  {a.name}
                </p>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
                    isActive ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="text-[12.5px] leading-relaxed text-ink-soft">{a.body}</p>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted tabular-nums">
                      {a.area}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
