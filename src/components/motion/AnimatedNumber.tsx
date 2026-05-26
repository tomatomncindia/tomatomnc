"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Counts up to a numeric target when the element enters the viewport.
 *
 * Handles three input formats:
 *   - Pure numbers       → "30+", "20", "100%" (rendered as suffix)
 *   - Years              → "2005" (no suffix; counts up)
 *   - Plain integer      → "1", "6"
 *
 * Animation uses a spring with stiff response so it lands cleanly without
 * the bouncy overshoot that reads as toy-like. Respects prefers-reduced-motion.
 */
export function AnimatedNumber({
  value,
  className,
  duration = 1.2,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  const { numeric, prefix, suffix, hasNumber } = parseValue(value);

  const motionVal = useMotionValue(reduce ? numeric : 0);
  const spring = useSpring(motionVal, {
    stiffness: 60,
    damping: 22,
    duration: duration * 1000,
  });
  const [display, setDisplay] = useState<number>(reduce ? numeric : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(numeric);
      return;
    }
    motionVal.set(numeric);
  }, [inView, numeric, motionVal, reduce]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return () => unsub();
  }, [spring]);

  // Render verbatim when the value isn't a count-up candidate:
  //   - no digits at all (e.g. "FDA · CE")
  //   - 4+ consecutive digits indicate an identifier/code (e.g. "ISO 13485", "ISO 9001"),
  //     not a quantity worth animating
  if (!hasNumber || numeric > 999) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{display}</span>
      {suffix}
    </span>
  );
}

function parseValue(value: string): {
  numeric: number;
  prefix: string;
  suffix: string;
  hasNumber: boolean;
} {
  // Match optional non-digit prefix, digits, optional non-digit suffix
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return { numeric: 0, prefix: value, suffix: "", hasNumber: false };
  return {
    numeric: parseInt(match[2], 10),
    prefix: match[1] ?? "",
    suffix: match[3] ?? "",
    hasNumber: true,
  };
}
