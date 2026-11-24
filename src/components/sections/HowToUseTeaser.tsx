"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { GUIDE_TEASER, GUIDE_VIDEOS } from "@/data/videos";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Home-page entry point to /how-to-use: links to the three videos, plus a
 * silent looping clip (one shot from each video) that plays while on screen.
 * No poster image — the frame stays a plain panel until the loop is playing,
 * and always under reduced motion.
 */
export function HowToUseTeaser() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLAnchorElement>(null);
  const [live, setLive] = useState(false);

  // Play only while visible; never under reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    const frame = frameRef.current;
    if (!v || !frame) return;
    // The hydration render always reports "no preference" (see
    // useReducedMotion), so make sure a loop that started is stopped.
    if (reduce) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(frame);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <Section tone="white" size="lg" className="border-line border-t">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">How to use</p>
              <h2 className="font-display mt-4 text-[32px] leading-[1.1] tracking-[-0.02em] md:text-[44px]">
                Watch it go on,
                <br />
                <span className="editorial-italic text-forest">start to finish.</span>
              </h2>
              <p className="text-ink-soft mt-5 max-w-md text-[15.5px] leading-relaxed">
                Short videos showing Tomato Cast and Tomato Splint applied step by step.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="border-line mt-8 border-t">
                {GUIDE_VIDEOS.map((v) => (
                  <li key={v.id} className="border-line border-b">
                    <Link
                      href={`/how-to-use#${v.id}`}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="min-w-0">
                        <span className="text-ink-muted block font-mono text-[10px] tracking-[0.14em] uppercase">
                          {v.productName}
                        </span>
                        <span className="font-display group-hover:text-forest mt-0.5 block text-[17px] leading-snug transition-colors">
                          {v.title}
                        </span>
                      </span>
                      <ArrowUpRight className="text-ink-muted group-hover:text-forest h-4 w-4 shrink-0 transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <ButtonLink href="/how-to-use" withArrow size="lg" className="mt-8">
                Watch the videos
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <Link
              ref={frameRef}
              href="/how-to-use"
              aria-label="Watch the application videos"
              className="group border-line bg-paper-warm relative block aspect-video overflow-hidden rounded-2xl border"
            >
              <video
                ref={videoRef}
                src={GUIDE_TEASER.src}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                tabIndex={-1}
                onPlaying={() => setLive(true)}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                  live && !reduce ? "opacity-100" : "opacity-0",
                )}
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="bg-brand-red grid h-16 w-16 place-items-center rounded-full text-white shadow-[0_12px_32px_-8px_rgba(216,12,24,0.55)] transition-transform duration-300 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.08]">
                  <Play className="h-6 w-6 translate-x-[2px]" fill="currentColor" />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
