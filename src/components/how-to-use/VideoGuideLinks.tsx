import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import type { GuideVideo } from "@/data/videos";

/** "Watch the video" cards on product pages, linking into /how-to-use#<id>. */
export function VideoGuideLinks({ videos }: { videos: GuideVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2">
      {videos.map((v) => (
        <Link
          key={v.id}
          href={`/how-to-use#${v.id}`}
          className="group border-line hover:border-forest/30 flex items-center gap-4 rounded-xl border bg-white p-4 pr-5 transition-[transform,border-color] duration-300 [transition-timing-function:var(--ease-out-quint)] hover:-translate-y-0.5"
        >
          <span className="bg-brand-red grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-transform duration-200 group-hover:scale-110">
            <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-forest block font-mono text-[10px] tracking-[0.16em] uppercase">
              Watch the video
            </span>
            <span className="font-display mt-0.5 block text-[16px] leading-snug">{v.title}</span>
          </span>
          <ArrowRight className="text-ink-muted group-hover:text-forest h-4 w-4 shrink-0 transition-[transform,color] duration-200 group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
  );
}
