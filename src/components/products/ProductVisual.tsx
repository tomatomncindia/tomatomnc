import Image from "next/image";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

/**
 * Product visual — a real catalog photograph framed inside an engineering-drawing
 * surround (dot grid, ref-code overlay, corner ticks). Photos are sourced from the
 * Tomato M&C product catalog and live under /images/products.
 */
export function ProductVisual({
  product,
  className,
  withRefCode = true,
  priority = false,
  sizes,
}: {
  product: Product;
  className?: string;
  withRefCode?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
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

      {/* Soft radial spotlight behind the product */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(255,255,255,0.7),transparent_75%)]"
      />

      {/* The product photograph */}
      <div className="relative h-full w-full p-7 md:p-9">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          className="object-contain mix-blend-multiply"
        />
      </div>

      {/* Industrial overlay: ref code + dimensions */}
      {withRefCode ? (
        <div className="pointer-events-none absolute left-4 top-4 right-4 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
          <span>REF · {code}</span>
          {dimensions ? (
            <span className="tabular-nums">
              {dimensions.split(" ")[0]} {dimensions.split(" ")[1]?.toUpperCase()}
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Bottom-right brand mark */}
      <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
        TMC
      </div>

      {/* Corner brackets — engineering drawing feel */}
      <CornerBrackets />
    </div>
  );
}

function CornerBrackets() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-3">
      <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-ink/25" />
      <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-ink/25" />
      <span className="absolute left-0 bottom-0 h-2 w-2 border-l border-b border-ink/25" />
      <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-ink/25" />
    </div>
  );
}
