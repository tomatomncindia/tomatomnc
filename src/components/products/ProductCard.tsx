import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-[transform,box-shadow,border-color] duration-300 [transition-timing-function:var(--ease-out-quint)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] hover:border-line-strong"
    >
      <div className="shrink-0 overflow-hidden">
        <ProductVisual
          product={product}
          className="aspect-[4/3] transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="eyebrow text-ink-muted">{product.category}</p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl md:text-[22px] leading-tight">{product.name}</h3>
          <ArrowUpRight className="h-4 w-4 text-ink-muted transition-colors group-hover:text-forest" />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft line-clamp-2">{product.tagline}</p>
        <p className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium text-forest">
          View product
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </p>
      </div>
    </Link>
  );
}
