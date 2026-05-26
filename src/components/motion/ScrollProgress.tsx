"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin progress bar pinned to the top of the viewport.
 * Driven by document scroll position; spring-smoothed so it doesn't jitter.
 * z-index sits above the fixed Navbar (which is z-50) at z-[60].
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-forest"
    />
  );
}
