"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Factory,
  ShieldCheck,
  Layers,
  FlaskConical,
  Globe,
  Cog,
  Stamp,
  Rocket,
  type LucideIcon,
} from "lucide-react";

type Milestone = {
  year: string;
  tag: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

const MILESTONES: Milestone[] = [
  {
    year: "2005",
    tag: "FOUNDED",
    title: "First roll, first floor.",
    body: "Tomato M&C is established in Pyeongtaek as a specialist manufacturer of synthetic orthopedic casting tape. One product family, one team.",
    icon: Factory,
  },
  {
    year: "2007",
    tag: "ISO 9001",
    title: "Quality management certified.",
    body: "First international quality management certification. Process discipline becomes documented infrastructure.",
    icon: Stamp,
  },
  {
    year: "2009",
    tag: "VERTICAL",
    title: "In-house fiberglass weaving.",
    body: "Vertical integration begins. The most critical raw material moves under the roof to remove supplier variability.",
    icon: Layers,
  },
  {
    year: "2012",
    tag: "ISO 13485",
    title: "Medical device QMS.",
    body: "Medical-device-specific quality management system certified. The line is officially fit for regulated markets.",
    icon: ShieldCheck,
  },
  {
    year: "2014",
    tag: "FDA",
    title: "US registration.",
    body: "FDA facility registration and device listing complete. The first North American shipments leave the line.",
    icon: Globe,
  },
  {
    year: "2016",
    tag: "RESIN",
    title: "Proprietary resin lab.",
    body: "In-house resin formulation opens. Cast set-time and strength become a question of chemistry, not supply chain.",
    icon: FlaskConical,
  },
  {
    year: "2018",
    tag: "CE · EU MDR",
    title: "Europe cleared.",
    body: "CE Mark and full EU MDR conformity for the primary product lines. The European distributor network forms.",
    icon: Stamp,
  },
  {
    year: "2020",
    tag: "AUTOMATION",
    title: "Fully automated line.",
    body: "End-to-end automation completes. Every step from fabric feed to packing runs on a single instrumented line.",
    icon: Cog,
  },
  {
    year: "2022",
    tag: "30 MARKETS",
    title: "Five continents.",
    body: "Active distribution crosses 30 countries on five continents. Regional documentation packs become standard.",
    icon: Globe,
  },
  {
    year: "2024",
    tag: "OEM EXPANSION",
    title: "Private-label program.",
    body: "OEM and private-label program launches at scale. KGMP coverage expands. The line is open for partner brands.",
    icon: Rocket,
  },
];

export function JourneyTimeline() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* Center vertical line (desktop) */}
      <div
        aria-hidden
        className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-line-strong -translate-x-1/2"
      />
      {/* Left-edge line (mobile) */}
      <div
        aria-hidden
        className="lg:hidden absolute left-[18px] top-0 bottom-0 w-px bg-line-strong"
      />

      <ol className="space-y-12 lg:space-y-20">
        {MILESTONES.map((m, i) => {
          const isLeft = i % 2 === 0;
          const Icon = m.icon;
          return (
            <motion.li
              key={m.year}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`relative grid lg:grid-cols-2 lg:gap-16 items-center`}
            >
              {/* Center medallion (desktop) — sits on the line */}
              <div
                aria-hidden
                className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-14 w-14 items-center justify-center rounded-full bg-white border border-line-strong shadow-[var(--shadow-soft)]"
              >
                <Icon className="h-5 w-5 text-forest" strokeWidth={1.7} />
              </div>

              {/* Mobile marker */}
              <div
                aria-hidden
                className="lg:hidden absolute left-[10px] top-1 z-10 h-4 w-4 rounded-full bg-white border-2 border-forest"
              />

              {/* Mobile: single column, content offset right */}
              <div className="lg:hidden pl-12">
                <MilestoneCard milestone={m} side="left" />
              </div>

              {/* Desktop: alternating sides */}
              <div className={`hidden lg:block ${isLeft ? "lg:col-start-1 lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"}`}>
                <MilestoneCard milestone={m} side={isLeft ? "left" : "right"} />
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function MilestoneCard({ milestone, side }: { milestone: Milestone; side: "left" | "right" }) {
  const alignment = side === "left" ? "lg:items-end" : "lg:items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-5xl md:text-6xl leading-none tabular-nums tracking-[-0.02em] text-ink">
          {milestone.year}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-forest">
          / {milestone.tag}
        </span>
      </div>
      <h3 className="font-display text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.01em] text-ink">
        {milestone.title}
      </h3>
      <p className={`text-[14.5px] leading-relaxed text-ink-soft max-w-md ${side === "left" ? "lg:ml-auto" : ""}`}>
        {milestone.body}
      </p>
    </div>
  );
}
