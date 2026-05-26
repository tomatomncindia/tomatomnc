import type { Product, ProductCategory } from "@/data/products";
import { cn } from "@/lib/cn";

// Forest accent color used as the primary product hue when none is specified.
const ACCENT = "#1FA37A";
const ACCENT_DEEP = "#0E7B5C";
const SHADOW = "#0a3a2c";

const COLOR_TOKENS: Record<string, { fill: string; deep: string }> = {
  white: { fill: "#F2EFE7", deep: "#D4D0C4" },
  navy: { fill: "#1E3A6B", deep: "#0F1F40" },
  "royal-blue": { fill: "#1E5BB8", deep: "#103C82" },
  "sky-blue": { fill: "#5BB0E6", deep: "#2C7AB3" },
  red: { fill: "#D9352E", deep: "#A11F1A" },
  burgundy: { fill: "#6B1F2A", deep: "#3F0F18" },
  pink: { fill: "#E58FB1", deep: "#B05A82" },
  purple: { fill: "#7B4FB8", deep: "#4C2C80" },
  green: { fill: ACCENT, deep: ACCENT_DEEP },
  teal: { fill: "#1FA38E", deep: "#0E7B6B" },
  orange: { fill: "#E07A2E", deep: "#A85317" },
  yellow: { fill: "#E5C046", deep: "#A8862E" },
  black: { fill: "#262626", deep: "#0A0A0A" },
  grey: { fill: "#8A8A8A", deep: "#5C5C5C" },
};

function resolveColor(product: Product) {
  const slugMap: Record<string, string> = {
    "tomato-cast": "green",
    "tomato-soft-cast": "sky-blue",
    "tomato-splint": "white",
    "2in1-safe-pad": "pink",
    "cotton-pad": "white",
    "elastic-bandage": "navy",
    shockinet: "grey",
  };
  const colorKey = slugMap[product.slug] ?? "green";
  return COLOR_TOKENS[colorKey] ?? COLOR_TOKENS.green;
}

export function ProductVisual({
  product,
  className,
  withRefCode = true,
}: {
  product: Product;
  className?: string;
  withRefCode?: boolean;
}) {
  const tint = resolveColor(product);
  const code = product.specs[0]?.refCode ?? product.slug.toUpperCase();
  const dimensions = product.specs[0]?.width ?? "";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-paper-warm",
        className,
      )}
    >
      {/* Industrial dot grid background */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full text-ink/[0.06]"
      >
        <defs>
          <pattern id={`pv-dots-${product.slug}`} width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pv-dots-${product.slug})`} />
      </svg>

      {/* The product illustration */}
      <div className="relative h-full w-full flex items-center justify-center p-6">
        {renderVisual(product.category, product.slug, tint)}
      </div>

      {/* Industrial overlay: ref code + dimensions */}
      {withRefCode ? (
        <div className="absolute left-4 top-4 right-4 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
          <span>REF · {code}</span>
          {dimensions ? <span className="tabular-nums">{dimensions.split(" ")[0]} {dimensions.split(" ")[1]?.toUpperCase()}</span> : null}
        </div>
      ) : null}

      {/* Bottom-right brand mark */}
      <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
        TMC
      </div>

      {/* Corner brackets — engineering drawing feel */}
      <CornerBrackets />
    </div>
  );
}

function renderVisual(category: ProductCategory, slug: string, tint: { fill: string; deep: string }) {
  if (category === "Cast") {
    if (slug === "tomato-soft-cast") return <SoftCastRoll tint={tint} />;
    return <CastRoll tint={tint} />;
  }
  if (category === "Splint") return <SplintStrip tint={tint} />;
  // Accessory variants
  if (slug === "2in1-safe-pad") return <PaddedRoll tint={tint} />;
  if (slug === "elastic-bandage") return <BandageRoll tint={tint} />;
  if (slug === "shockinet") return <Stockinet tint={tint} />;
  return <PaddedRoll tint={tint} />;
}

/* ─── Visuals ─────────────────────────────────────────────────── */

function CastRoll({ tint }: { tint: { fill: string; deep: string } }) {
  // Front-facing cylindrical roll, slightly angled
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full max-h-[200px]" aria-hidden>
      <defs>
        <linearGradient id="cast-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tint.fill} />
          <stop offset="1" stopColor={tint.deep} />
        </linearGradient>
        <pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
          <line x1="3" y1="0" x2="3" y2="6" stroke="rgba(0,0,0,0.12)" strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* Shadow */}
      <ellipse cx="120" cy="180" rx="80" ry="6" fill={SHADOW} opacity="0.18" />

      {/* Roll cylinder body */}
      <g>
        {/* Outer body */}
        <rect x="40" y="60" width="160" height="100" rx="6" fill="url(#cast-body)" />
        {/* Weave overlay */}
        <rect x="40" y="60" width="160" height="100" rx="6" fill="url(#weave)" />
        {/* Top elliptical cap */}
        <ellipse cx="120" cy="60" rx="80" ry="14" fill={tint.deep} />
        <ellipse cx="120" cy="58" rx="80" ry="14" fill={tint.fill} />
        {/* Inner hole */}
        <ellipse cx="120" cy="58" rx="22" ry="4" fill={SHADOW} opacity="0.6" />
        <ellipse cx="120" cy="57" rx="22" ry="4" fill="#F8F5EC" />

        {/* End strip — tape edge */}
        <path d="M40 130 Q 60 124 80 132 L 80 160 L 40 160 Z" fill={tint.deep} opacity="0.8" />
      </g>

      {/* Highlight rim */}
      <ellipse cx="120" cy="55" rx="78" ry="12" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
    </svg>
  );
}

function SoftCastRoll({ tint }: { tint: { fill: string; deep: string } }) {
  // Roll seen from a 3/4 angle, softer texture, less defined edges
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full max-h-[200px]" aria-hidden>
      <defs>
        <linearGradient id="soft-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tint.fill} />
          <stop offset="1" stopColor={tint.deep} />
        </linearGradient>
        <pattern id="soft-weave" width="8" height="2" patternUnits="userSpaceOnUse">
          <line x1="0" y1="1" x2="8" y2="1" stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <ellipse cx="120" cy="180" rx="78" ry="5" fill={SHADOW} opacity="0.18" />

      <g>
        <rect x="44" y="70" width="152" height="90" rx="14" fill="url(#soft-body)" />
        <rect x="44" y="70" width="152" height="90" rx="14" fill="url(#soft-weave)" />
        <ellipse cx="120" cy="70" rx="76" ry="12" fill={tint.deep} />
        <ellipse cx="120" cy="68" rx="76" ry="12" fill={tint.fill} />
        <ellipse cx="120" cy="67" rx="20" ry="3.5" fill="#F8F5EC" />

        {/* Loose end peeling */}
        <path d="M196 110 Q 215 115 220 130 Q 215 140 200 138 Z" fill={tint.deep} opacity="0.9" />
      </g>

      {/* Soft texture stripes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="46"
          x2="194"
          y1={92 + i * 14}
          y2={92 + i * 14}
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}

function SplintStrip({ tint }: { tint: { fill: string; deep: string } }) {
  // A long padded rectangular splint — layered cross-section visible
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full max-h-[200px]" aria-hidden>
      <defs>
        <linearGradient id="splint-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tint.fill} />
          <stop offset="0.6" stopColor={tint.fill} />
          <stop offset="1" stopColor={tint.deep} />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="180" rx="85" ry="4" fill={SHADOW} opacity="0.15" />

      {/* Padded outer layer */}
      <rect x="30" y="80" width="180" height="60" rx="6" fill="#F4F2EC" />
      {/* Stockinet layer (visible at left edge) */}
      <rect x="30" y="80" width="14" height="60" fill={tint.fill} opacity="0.4" />
      {/* Fiberglass core layer */}
      <rect x="44" y="92" width="166" height="36" fill="url(#splint-body)" />
      {/* Weave hint */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line
          key={i}
          x1={50 + i * 20}
          y1="92"
          x2={50 + i * 20}
          y2="128"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.6"
        />
      ))}
      {/* Layer labels (engineering callout) */}
      <g fontFamily="ui-monospace, monospace" fontSize="7" fill="#6B6B6B" letterSpacing="0.05em">
        <text x="32" y="74">PAD</text>
        <text x="46" y="74">FIBERGLASS CORE</text>
        <text x="186" y="74">PAD</text>
      </g>
      {/* Callout brackets */}
      <line x1="32" y1="76" x2="44" y2="76" stroke="#9A9A9A" strokeWidth="0.5" />
      <line x1="46" y1="76" x2="180" y2="76" stroke="#9A9A9A" strokeWidth="0.5" />

      {/* Edge tab */}
      <path d="M210 100 L 220 110 L 210 120 Z" fill={tint.deep} opacity="0.6" />
    </svg>
  );
}

function PaddedRoll({ tint }: { tint: { fill: string; deep: string } }) {
  // Soft padded roll — cottony, two-layer hint
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full max-h-[200px]" aria-hidden>
      <ellipse cx="120" cy="180" rx="78" ry="5" fill={SHADOW} opacity="0.15" />

      <g>
        <rect x="48" y="74" width="144" height="86" rx="10" fill={tint.fill} opacity="0.85" />
        <ellipse cx="120" cy="74" rx="72" ry="11" fill={tint.deep} opacity="0.9" />
        <ellipse cx="120" cy="72" rx="72" ry="11" fill={tint.fill} />
        <ellipse cx="120" cy="71" rx="20" ry="3.5" fill="#F8F5EC" />

        {/* Cotton texture — small noise circles */}
        {Array.from({ length: 18 }).map((_, i) => {
          const x = 56 + (i % 9) * 16;
          const y = 90 + Math.floor(i / 9) * 24;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={2.2}
              fill="rgba(255,255,255,0.45)"
            />
          );
        })}
      </g>
    </svg>
  );
}

function BandageRoll({ tint }: { tint: { fill: string; deep: string } }) {
  // Woven elastic bandage roll, with metal clip
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full max-h-[200px]" aria-hidden>
      <defs>
        <pattern id="elastic-weave" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill={tint.fill} />
          <line x1="0" y1="0" x2="3" y2="3" stroke="rgba(255,255,255,0.25)" strokeWidth="0.4" />
        </pattern>
      </defs>

      <ellipse cx="120" cy="180" rx="76" ry="5" fill={SHADOW} opacity="0.15" />

      <rect x="50" y="74" width="140" height="86" rx="8" fill="url(#elastic-weave)" />
      <rect x="50" y="74" width="140" height="86" rx="8" fill={tint.fill} opacity="0" />
      <ellipse cx="120" cy="74" rx="70" ry="10" fill={tint.deep} />
      <ellipse cx="120" cy="72" rx="70" ry="10" fill={tint.fill} />
      <ellipse cx="120" cy="71" rx="18" ry="3" fill="#F8F5EC" />

      {/* Metal clip */}
      <g transform="translate(176 130)">
        <rect x="0" y="0" width="22" height="10" rx="2" fill="#C5C5C8" />
        <line x1="4" y1="2" x2="4" y2="8" stroke="#7E7E82" strokeWidth="0.8" />
        <line x1="11" y1="2" x2="11" y2="8" stroke="#7E7E82" strokeWidth="0.8" />
        <line x1="18" y1="2" x2="18" y2="8" stroke="#7E7E82" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

function Stockinet({ tint }: { tint: { fill: string; deep: string } }) {
  // Tubular stockinet — flat folded length
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full max-h-[200px]" aria-hidden>
      <ellipse cx="120" cy="180" rx="85" ry="4" fill={SHADOW} opacity="0.15" />

      <defs>
        <pattern id="stocknet" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.4" fill={tint.deep} opacity="0.45" />
        </pattern>
      </defs>

      {/* Folded tube — back layer */}
      <rect x="30" y="98" width="180" height="22" rx="11" fill={tint.fill} opacity="0.6" />
      <rect x="30" y="98" width="180" height="22" rx="11" fill="url(#stocknet)" />

      {/* Front layer */}
      <rect x="36" y="88" width="180" height="22" rx="11" fill={tint.fill} />
      <rect x="36" y="88" width="180" height="22" rx="11" fill="url(#stocknet)" />

      {/* End openings */}
      <ellipse cx="36" cy="99" rx="3" ry="11" fill="#F4F2EC" />
      <ellipse cx="216" cy="99" rx="3" ry="11" fill="#F4F2EC" />
    </svg>
  );
}

function CornerBrackets() {
  // Engineering-drawing corner ticks
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3">
      <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-ink/25" />
      <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-ink/25" />
      <span className="absolute left-0 bottom-0 h-2 w-2 border-l border-b border-ink/25" />
      <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-ink/25" />
    </div>
  );
}
