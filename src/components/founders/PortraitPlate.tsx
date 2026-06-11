"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Typographic portrait plate for leadership profiles.
 *
 * When a photograph exists it fills the plate; otherwise the plate treats the
 * monogram as the portrait: an oversized Fraunces pair on warm paper, revealed
 * with a top-down clip-path wipe (the same "typeset into place" feeling as the
 * WordReveal heroes). The inner monogram settles from a slight overscale so the
 * wipe never feels like a flat curtain.
 */
export function PortraitPlate({
  index,
  initials,
  role,
  name,
  tag,
  image,
  imageAlt,
}: {
  /** Two-digit register index, e.g. "01" */
  index: string;
  /** Exactly two letters, e.g. "DS" */
  initials: string;
  /** Short epithet for the top rail, e.g. "CLINICAL COMPASS" */
  role: string;
  name: string;
  /** Mono tag for the bottom rail, e.g. "35+ YEARS" */
  tag: string;
  /** Optional portrait photograph; falls back to the monogram when absent */
  image?: string;
  imageAlt?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="group relative border border-ink/15 bg-paper-warm"
    >
      {/* Dot grain, consistent with the manifesto/closing bands */}
      <svg aria-hidden className="absolute inset-0 h-full w-full text-ink/[0.05]">
        <defs>
          <pattern
            id={`plate-dots-${index}`}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#plate-dots-${index})`} />
      </svg>

      {/* Top rail */}
      <div className="relative flex items-center justify-between gap-3 border-b border-ink/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        <span className="tabular-nums">DIRECTOR / {index}</span>
        <span className="text-forest text-right">{role}</span>
      </div>

      {/* Portrait — photograph when available, monogram otherwise */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden lg:aspect-[5/5.4]">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? name}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-top transition-transform duration-500 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.03]"
          />
        ) : (
          <motion.p
            aria-hidden
            initial={reduce ? false : { scale: 1.08, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="select-none font-display text-[110px] leading-none tracking-[-0.05em] text-ink transition-transform duration-500 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.03] lg:text-[150px]"
          >
            {initials[0]}
            <span className="editorial-italic text-forest">{initials[1]}</span>
          </motion.p>
        )}
      </div>

      {/* Bottom rail */}
      <div className="relative flex items-center justify-between gap-3 border-t border-ink/15 px-5 py-3">
        <span className="font-display text-[16px] text-ink">{name}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          {tag}
        </span>
      </div>
    </motion.div>
  );
}
