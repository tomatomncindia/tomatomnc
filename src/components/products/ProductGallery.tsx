"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { Product } from "@/data/products";
import { ProductVisual } from "@/components/products/ProductVisual";
import { cn } from "@/lib/cn";

const INTERVAL = 4000;

/**
 * Product-page hero gallery — the catalog photograph plus lifestyle shots
 * (patients wearing the branded product) cycling as a carousel.
 * Auto-advances, pauses on hover/focus, and respects reduced motion.
 * Falls back to the static ProductVisual when there are no lifestyle images.
 */
export function ProductGallery({
  product,
  className,
  priority = false,
  sizes,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const slides = [
    { src: product.image, alt: product.name },
    ...(product.lifestyle ?? []),
  ];

  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused || slides.length < 2) return;
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, slides.length]);

  if (slides.length < 2) {
    return <ProductVisual product={product} className={className} priority={priority} sizes={sizes} />;
  }

  const slide = slides[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${product.name} gallery`}
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
      <div className={cn("relative isolate overflow-hidden rounded-2xl bg-paper-warm", className)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slide.src}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={priority && index === 0}
              sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Corner brackets — engineering drawing feel, matches ProductVisual */}
        <div aria-hidden className="pointer-events-none absolute inset-3 z-10">
          <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-ink/25" />
          <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-ink/25" />
          <span className="absolute left-0 bottom-0 h-2 w-2 border-l border-b border-ink/25" />
          <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-ink/25" />
        </div>
      </div>

      {/* Dots — visual pip stays slim; the button provides a ≥24px touch target */}
      <div className="mt-2 flex items-center justify-center gap-1">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show image ${i + 1} of ${slides.length}`}
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
