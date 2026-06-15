"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Factory,
  ClipboardCheck,
  ShieldCheck,
  BadgeCheck,
  Globe,
  Stamp,
  Presentation,
  Handshake,
  type LucideIcon,
} from "lucide-react";

type Milestone = {
  year: string;
  tag: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

// Sourced from the manufacturer's official company history (tomatomnc.com).
const MILESTONES: Milestone[] = [
  {
    year: "2005",
    tag: "ESTABLISHMENT",
    title: "Tomato M&C Co., Ltd. founded.",
    body: "Tomato M&C Co., Ltd. is established in Pyeongtaek, South Korea, as a specialist manufacturer of orthopedic casting and splinting materials.",
    icon: Factory,
  },
  {
    year: "2005",
    tag: "MFG. LICENSE",
    title: "Manufacturing licensed.",
    body: "Korean medical-device manufacturer registration is granted in the founding year, formalizing in-house production.",
    icon: ClipboardCheck,
  },
  {
    year: "2005",
    tag: "KGMP",
    title: "KGMP certified.",
    body: "Korea Good Manufacturing Practice certification is achieved, establishing GMP-grade production discipline from the start.",
    icon: ShieldCheck,
  },
  {
    year: "2007",
    tag: "ISO",
    title: "ISO quality system registered.",
    body: "International ISO quality-management certification is registered, putting documented process control behind every roll.",
    icon: BadgeCheck,
  },
  {
    year: "2008",
    tag: "CHINA · SFDA",
    title: "China SFDA registration.",
    body: "SFDA registration clears the Chinese market — the first major international export approval.",
    icon: Globe,
  },
  {
    year: "2010",
    tag: "USA · FDA",
    title: "US FDA registration.",
    body: "FDA facility registration and device listing complete, opening distribution into the United States.",
    icon: Stamp,
  },
  {
    year: "2016",
    tag: "MEDICA",
    title: "MEDICA, Düsseldorf.",
    body: "Tomato exhibits at MEDICA in Düsseldorf, Germany — the world's largest medical trade fair.",
    icon: Presentation,
  },
  {
    year: "2017",
    tag: "MEDICAL FAIR INDIA",
    title: "Medical Fair, New Delhi.",
    body: "Tomato presents at Medical Fair India in New Delhi, deepening its footprint across South Asia.",
    icon: Presentation,
  },
  {
    year: "2018",
    tag: "ARAB HEALTH",
    title: "Arab Health, Dubai.",
    body: "Tomato exhibits at Arab Health in Dubai, UAE, anchoring distribution across the Middle East.",
    icon: Presentation,
  },
  {
    year: "2026",
    tag: "INDIA · BLACKCHIP",
    title: "Blackchip distributes in India.",
    body: "Blackchip Impex is appointed distributor for Tomato M&C in India, bringing the full casting and splinting catalog to Indian hospitals and clinics.",
    icon: Handshake,
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
              key={`${m.year}-${m.tag}`}
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
