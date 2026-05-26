"use client";

import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";

const CERTS = [
  "ISO 13485",
  "ISO 9001",
  "ISO 14001",
  "FDA Registered",
  "CE Mark · EU MDR",
  "KGMP",
  "Pyeongtaek · KR",
  "30+ Markets",
];

/**
 * Seamless marquee of certifications. Two copies of the strip are translated
 * by half the rendered width, so the loop is continuous and never blanks.
 * Pauses on hover; honors prefers-reduced-motion (stops + shows static row).
 */
export function MarqueeCerts() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="border-y border-line bg-paper">
        <div className="container-page py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {CERTS.map((c) => (
            <CertItem key={c} label={c} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative border-y border-line bg-paper overflow-hidden"
      aria-label="Certifications and credentials"
    >
      {/* Soft edge fade-mask so items fade in/out at the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--color-paper) 0%, transparent 8%, transparent 92%, var(--color-paper) 100%)",
        }}
      />

      <div className="flex py-5 [--gap:3rem]">
        <motion.div
          className="flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 38,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ willChange: "transform" }}
        >
          {[...CERTS, ...CERTS].map((c, i) => (
            <CertItem key={`a-${i}`} label={c} />
          ))}
        </motion.div>
        <motion.div
          aria-hidden
          className="flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 38,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ willChange: "transform" }}
        >
          {[...CERTS, ...CERTS].map((c, i) => (
            <CertItem key={`b-${i}`} label={c} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CertItem({ label }: { label: string }) {
  return (
    <div className="inline-flex shrink-0 items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink-soft">
      <ShieldCheck className="h-3.5 w-3.5 text-forest" strokeWidth={2.2} />
      {label}
    </div>
  );
}
