"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Hydration-safe replacement for motion's `useReducedMotion`.
 *
 * motion's hook returns null on the server but the real preference on the
 * client's first render, so any component that branched on it rendered
 * different markup on the client → "Hydration failed" on every page for
 * visitors with Reduce Motion turned on. Here the server snapshot (`false`)
 * is also used for the hydration render; React then re-renders with the real
 * value straight after, without a mismatch.
 *
 * Motion-driven animations don't need this at all: the root <MotionProvider>
 * sets `reducedMotion="user"`, so motion itself skips transforms for those
 * visitors. Use this hook for non-motion behaviour (autoplay, count-ups,
 * swapping a marquee for a static row).
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
