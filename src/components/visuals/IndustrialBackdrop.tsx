import { cn } from "@/lib/cn";

/**
 * Industrial backdrop — dot-grid + gradient.
 * Used as a fallback layer behind remote photos so that even on image error
 * the area looks intentional. Also works standalone where photography isn't right.
 */
export function IndustrialBackdrop({
  tone = "ink",
  pattern = "dots",
  className,
}: {
  tone?: "ink" | "forest" | "paper";
  pattern?: "dots" | "grid" | "lines";
  className?: string;
}) {
  const toneCls = {
    ink: "bg-ink text-white",
    forest: "bg-forest text-white",
    paper: "bg-paper-warm text-ink",
  }[tone];

  return (
    <div className={cn("relative overflow-hidden", toneCls, className)}>
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.14]">
        <defs>
          {pattern === "dots" ? (
            <pattern id={`ib-${pattern}-${tone}`} width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" />
            </pattern>
          ) : pattern === "grid" ? (
            <pattern id={`ib-${pattern}-${tone}`} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0 L0 0 L0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          ) : (
            <pattern id={`ib-${pattern}-${tone}`} width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="24" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#ib-${pattern}-${tone})`} />
      </svg>
      {/* Soft directional gradient for depth */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 pointer-events-none",
          tone === "ink"
            ? "bg-gradient-to-br from-white/[0.04] via-transparent to-black/30"
            : tone === "forest"
              ? "bg-gradient-to-br from-white/[0.08] via-transparent to-black/20"
              : "bg-gradient-to-br from-white/40 via-transparent to-black/[0.06]",
        )}
      />
    </div>
  );
}
