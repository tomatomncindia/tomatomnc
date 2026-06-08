"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/cn";

const INTERVAL = 5500;

type Slide = {
  src: string;
  alt: string;
  /** object-position so the subject's face stays in frame across crops. */
  position: string;
};

const SLIDES: Slide[] = [
  {
    src: "/images/home/hero-1.png",
    alt: "A smiling girl colouring at home with a green Tomato cast on her arm",
    position: "58% 35%",
  },
  {
    src: "/images/home/hero-2.png",
    alt: "A boy laughing in class with a pink Tomato arm cast",
    position: "55% 38%",
  },
  {
    src: "/images/home/hero-3.png",
    alt: "A doctor fitting a Tomato product for a mother and her toddler in clinic",
    position: "60% 35%",
  },
  {
    src: "/images/home/hero-4.png",
    alt: "A woman laughing outdoors while recovering with a Tomato cast on her arm",
    position: "62% 40%",
  },
  {
    src: "/images/home/hero-5.png",
    alt: "A doctor applying a Tomato cast to a patient's arm in clinic",
    position: "60% 40%",
  },
];

/**
 * Full-bleed homepage hero. The image IS the section — it runs edge to edge and
 * sits beneath the (overlaid) navbar via the negative top margin that cancels the
 * global `<main>` offset. Auto-advancing crossfade carousel with a slow Ken Burns
 * push; a single minimal "View Products" link is the only chrome.
 */
export function HomeHero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      aria-label="Patients living with Tomato casts"
      aria-roledescription="carousel"
      className="relative -mt-16 min-h-[100svh] w-full overflow-hidden bg-ink"
      onTouchStart={(e) => {
        setPaused(true);
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        setPaused(false);
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 48) go(dx < 0 ? index + 1 : index - 1);
      }}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <motion.div
            key={slide.src}
            aria-hidden={!active}
            className="absolute inset-0"
            style={{ zIndex: active ? 1 : 0 }}
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative h-full w-full"
              initial={false}
              animate={reduce ? undefined : { scale: active ? 1.08 : 1 }}
              transition={{ duration: INTERVAL / 1000 + 1.2, ease: "linear" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.position }}
              />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Scrims — layered so copy reads on any slide, even bright ones.
          Top: navbar + logo legibility. Bottom: vertical anchor for the
          heading/link. Left: diagonal darken under the bottom-left text block. */}
      <div
        aria-hidden
        className="from-ink/85 via-ink/35 pointer-events-none absolute inset-x-0 top-0 z-[2] h-44 bg-gradient-to-b to-transparent"
      />
      <div
        aria-hidden
        className="from-ink/95 via-ink/45 pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[26rem] bg-gradient-to-t to-transparent"
      />
      <div
        aria-hidden
        className="from-ink/70 pointer-events-none absolute inset-y-0 left-0 z-[2] w-full bg-gradient-to-r to-transparent sm:w-3/4 lg:w-2/3"
      />

      {/* Bottom chrome: brand heading, then slim indicators (left) + minimal
          link (right). Lifted clear of the fixed WhatsApp button. */}
      <div className="absolute inset-x-0 bottom-0 z-[3] pb-24 md:pb-16">
        <div className="container-page">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display max-w-[18ch] text-[clamp(30px,8.5vw,56px)] leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.45)]"
          >
            You can be{" "}
            <span className="editorial-italic text-mid-green whitespace-nowrap">
              No.&thinsp;1
              <span
                aria-hidden
                className="bg-brand-red ml-1.5 inline-block h-2 w-2 rounded-full align-baseline sm:h-2.5 sm:w-2.5"
              />
            </span>
            <br />
            with Tomato Orthopedics
          </motion.h1>

          <div className="mt-7 flex items-end justify-between gap-6 md:mt-9">
            <div
              role="tablist"
              aria-label="Choose slide"
              className="flex items-center gap-2"
            >
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
                onClick={() => go(i)}
                className="group/dot py-2"
              >
                <span
                  className={cn(
                    "block h-[3px] rounded-full transition-all duration-500 [transition-timing-function:var(--ease-out-quint)]",
                    i === index
                      ? "w-9 bg-white"
                      : "w-5 bg-white/40 group-hover/dot:bg-white/70",
                  )}
                />
              </button>
            ))}
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-3 text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.4)]"
          >
            <span className="font-display relative text-[19px] leading-none tracking-[-0.01em] md:text-[23px]">
              View Products
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
            </span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/35 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white group-hover:bg-white group-hover:text-ink md:h-10 md:w-10">
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5" />
            </span>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
