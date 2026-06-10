"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/cn";

const INTERVAL = 4500;

type Frame = {
  src: string;
  alt: string;
  caption: string;
};

/** Facility & production-line photography from the Tomato M&C plant. */
const FRAMES: Frame[] = [
  {
    src: "/images/facility/exterior.webp",
    alt: "Exterior of the Tomato M&C India fiberglass casting facility",
    caption: "The facility — twenty years on one floor.",
  },
  {
    src: "/images/facility/line.webp",
    alt: "Fiberglass casting-tape rolls advancing along the production line",
    caption: "Casting tape on the production line.",
  },
  {
    src: "/images/facility/spools.webp",
    alt: "Fiberglass yarn spooled on the in-house knitting machine",
    caption: "Fiberglass, knitted in-house.",
  },
];

/**
 * Dossier-style carousel that replaces the static file card in the About hero.
 * Crossfading facility/production photography in a bordered frame, with a mono
 * header label and a slide counter that mirrors the original card chrome.
 */
export function FacilityCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + FRAMES.length) % FRAMES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % FRAMES.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="border-ink/15 bg-paper-warm border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <div className="border-ink/15 text-ink-muted flex items-center justify-between border-b px-5 py-3 font-mono text-[10px] tracking-[0.18em] uppercase">
        <span>FROM THE FLOOR</span>
        <span className="tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(FRAMES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Image stage */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-ink"
        role="group"
        aria-roledescription="carousel"
        aria-label="Facility and production photography"
        onTouchStart={(e) => {
          setPaused(true);
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          setPaused(false);
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
        }}
      >
        {FRAMES.map((frame, i) => {
          const active = i === index;
          return (
            <motion.div
              key={frame.src}
              aria-hidden={!active}
              className="absolute inset-0"
              style={{ zIndex: active ? 1 : 0 }}
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={reduce ? undefined : { scale: active ? 1.06 : 1 }}
                transition={{ duration: INTERVAL / 1000 + 1, ease: "linear" }}
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </motion.div>
            </motion.div>
          );
        })}

        {/* Bottom scrim + caption */}
        <div
          aria-hidden
          className="from-ink/80 pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t to-transparent"
        />
        <motion.p
          key={index}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 z-[3] px-5 pb-4 text-[12.5px] leading-snug text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]"
        >
          {FRAMES[index].caption}
        </motion.p>
      </div>

      {/* Footer — slim indicators */}
      <div className="border-ink/15 flex items-center justify-between border-t px-5 py-3">
        <span className="text-ink-muted font-mono text-[10px] tracking-[0.16em] uppercase">
          FACILITY
        </span>
        <div role="tablist" aria-label="Choose photo" className="flex items-center gap-2">
          {FRAMES.map((frame, i) => (
            <button
              key={frame.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show photo ${i + 1} of ${FRAMES.length}`}
              onClick={() => go(i)}
              className="group/dot py-2"
            >
              <span
                className={cn(
                  "block h-[3px] rounded-full transition-all duration-500 [transition-timing-function:var(--ease-out-quint)]",
                  i === index
                    ? "bg-forest w-6"
                    : "bg-ink/20 group-hover/dot:bg-ink/40 w-3.5",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
