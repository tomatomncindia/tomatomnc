"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { GUIDE_VIDEOS } from "@/data/videos";

/**
 * The /how-to-use video list: one row per video with the browser's own
 * player. Starting a video pauses any other one that's playing.
 * Each row has the video id as its anchor: /how-to-use#<id>.
 */
export function VideoGuideList() {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  const pauseOthers = (current: number) => {
    videos.current.forEach((v, i) => {
      if (i !== current) v?.pause();
    });
  };

  return (
    <div className="border-line divide-line divide-y border-t">
      {GUIDE_VIDEOS.map((v, i) => (
        <Reveal key={v.id}>
          <article
            id={v.id}
            className="grid scroll-mt-24 gap-6 py-10 md:py-14 lg:grid-cols-12 lg:items-center lg:gap-12"
          >
            <div className="lg:col-span-7">
              <video
                ref={(el) => {
                  videos.current[i] = el;
                }}
                // #t=0.1 makes iOS Safari paint the first frame without a poster.
                src={`${v.src}#t=0.1`}
                controls
                preload="metadata"
                playsInline
                onPlay={() => pauseOthers(i)}
                aria-label={`${v.productName}: ${v.title}`}
                className="border-line bg-paper-warm block aspect-video w-full rounded-xl border"
              />
            </div>

            <div className="lg:col-span-5">
              <p className="eyebrow">{v.productName}</p>
              <h2 className="font-display mt-2 text-[26px] leading-[1.15] tracking-[-0.015em] md:text-[32px]">
                {v.title}
              </h2>
              <p className="text-ink-soft mt-3 max-w-md text-[15px] leading-relaxed">
                {v.summary}
              </p>
              <Link
                href={`/products/${v.product}#application-guide`}
                className="group text-forest hover:text-forest-deep mt-5 inline-flex items-center gap-2 text-[14px] font-medium transition-colors"
              >
                <span>{`${v.productName} steps & specs`}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
