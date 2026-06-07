import Image from "next/image";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

/**
 * Product visual — a real catalog photograph filling the frame edge-to-edge,
 * with engineering-drawing corner ticks. Photos are sourced from the
 * Tomato M&C product catalog and live under /images/products.
 */
export function ProductVisual({
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
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-paper-warm",
        className,
      )}
    >
      {/* The product photograph — full bleed, fills the frame */}
      <div className="relative h-full w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover"
        />
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
