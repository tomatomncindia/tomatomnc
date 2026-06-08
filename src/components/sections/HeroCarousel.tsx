"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ProductVisual } from "@/components/products/ProductVisual";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/cn";

const INTERVAL = 4000;

/**
 * Homepage hero carousel — cycles through the product lineup with the
 * product name carried inside each slide, below the visual.
 * Auto-advances, pauses on hover/focus, and respects reduced motion.
 */
export function HeroCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setIndex((next + PRODUCTS.length) % PRODUCTS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % PRODUCTS.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const product = PRODUCTS[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Product lineup"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        setPaused(true);
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        setPaused(false);
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 48) goTo(dx < 0 ? index + 1 : index - 1);
      }}
    >
      <div className="relative">
        {/* Brand slogan — stamped over the images, constant across slides */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute top-4 right-5 left-5 z-10 sm:top-5"
        >
          <p className="font-display text-ink text-[24px] leading-none tracking-[-0.015em] sm:text-[30px]">
            You can be{" "}
            <span className="editorial-italic text-forest text-[36px] leading-none sm:text-[46px]">
              No.&thinsp;1
            </span>
            <span
              aria-hidden
              className="bg-brand-red ml-1.5 inline-block h-2 w-2 rounded-full align-baseline sm:h-2.5 sm:w-2.5"
            />
          </p>
          <div className="mt-2.5 flex items-center gap-2.5">
            <span aria-hidden className="bg-forest/50 h-px w-8" />
            <p className="text-ink-muted font-mono text-[9px] tracking-[0.2em] uppercase sm:text-[10px]">
              WITH TOMATO{" "}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={product.slug}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -5 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-forest pointer-events-auto inline-block"
                >
                  {product.heroTag ?? product.name}
                </motion.span>
              </AnimatePresence>
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={product.slug}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <ProductVisual product={product} className="aspect-square" />

            {/* Item name — overlaid on the image, travels with the slide */}
            <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-lg bg-white/95 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:right-5 sm:bottom-5 sm:left-5">
              <div className="min-w-0">
                <p className="text-ink-muted font-mono text-[10px] tracking-[0.16em] uppercase">
                  {product.category}
                </p>
                <p className="font-display truncate text-[15px] font-medium sm:text-base">
                  {product.name}
                </p>
              </div>
              <span aria-hidden className="bg-forest/60 h-1.5 w-1.5 shrink-0 rounded-full" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots — visual pip stays slim; the button provides a ≥24px touch target */}
      <div className="mt-2 flex items-center justify-center gap-1">
        {PRODUCTS.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            aria-label={`Show ${p.name}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className="group/dot flex h-7 items-center px-1"
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "bg-forest w-6" : "bg-ink/20 group-hover/dot:bg-ink/40 w-1.5",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
