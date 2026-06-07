import { cn } from "@/lib/cn";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";

export function StatStrip({
  stats,
  tone = "light",
  className,
}: {
  stats: { value: string; label: string }[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-3 divide-x",
        tone === "dark" ? "divide-white/10 text-white" : "divide-line text-ink",
        className,
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="px-3 py-5 sm:px-4 sm:py-6 md:px-8 md:py-7 first:pl-0 last:pr-0 min-w-0">
          <dt
            className={cn(
              "font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-medium",
              tone === "dark" ? "text-white/60" : "text-ink-muted",
            )}
          >
            {s.label}
          </dt>
          <dd className="mt-2 font-display text-xl sm:text-3xl md:text-5xl font-medium tracking-tight">
            <AnimatedNumber value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
