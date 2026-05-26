"use client";

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * Bar that fills from 0 → width when its parent enters the viewport.
 * Used for the Distribution Manifest panel on the Network page.
 */
export function ManifestBar({
  percent,
  delay = 0,
  className = "",
}: {
  percent: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const target = Math.max(0, Math.min(100, percent));

  return (
    <div
      ref={ref}
      className={`relative h-[3px] w-full overflow-hidden rounded-full bg-white/10 ${className}`}
    >
      <motion.div
        initial={{ width: reduce ? `${target}%` : "0%" }}
        animate={inView ? { width: `${target}%` } : { width: "0%" }}
        transition={{
          duration: reduce ? 0 : 0.9,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-y-0 left-0 bg-mid-green"
      />
    </div>
  );
}

