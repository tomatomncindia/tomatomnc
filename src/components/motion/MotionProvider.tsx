"use client";

import { MotionConfig } from "motion/react";

/**
 * Site-wide motion settings. `reducedMotion="user"` makes every motion
 * animation honour the OS Reduce Motion setting (transforms and layout
 * animations are skipped; opacity fades remain). It's decided at animation
 * time, not render time, so it can't cause hydration mismatches.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
