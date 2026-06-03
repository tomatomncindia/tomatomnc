import Link from "next/link";
import { ShieldCheck, Palette } from "lucide-react";
import type { Product } from "@/data/products";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Sticky spec aside for product detail pages.
 * Surfaces the most decision-relevant info at-a-glance:
 *   - Key spec at-a-glance
 *   - Color count (if applicable)
 *   - Primary CTA (request sample)
 *   - Regulatory marks the product ships under
 *
 * Designed to remain in view as the reader scrolls through the long-form
 * spec + application content.
 */
export function ProductSpecAside({ product }: { product: Product }) {
  const refCodes = product.specs.map((s) => s.refCode);
  const widthRange = getWidthRange(product);
  const length = product.specs[0]?.length ?? "";
  const colorCount = product.colors?.length ?? 0;

  return (
    <aside className="lg:sticky lg:top-24 space-y-4">
      {/* Header strip */}
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-forest">
          QUICK SPEC
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted tabular-nums">
          {product.specs.length} REF{product.specs.length === 1 ? "" : "S"}
        </p>
      </div>

      {/* Key spec rows */}
      <dl className="space-y-3 border-b border-line pb-5">
        {widthRange ? <SpecRow label="Widths" value={widthRange} /> : null}
        {length ? <SpecRow label="Length" value={length} /> : null}
        <SpecRow
          label="Category"
          value={product.category}
        />
        {colorCount > 0 ? (
          <SpecRow
            label="Colors"
            value={
              <span className="inline-flex items-center gap-1.5">
                <Palette className="h-3 w-3 text-ink-muted" />
                <span className="tabular-nums">{colorCount}</span>
                <span className="text-ink-muted">standard</span>
              </span>
            }
          />
        ) : null}
      </dl>

      {/* Ref codes pill row */}
      <div className="border-b border-line pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          REFERENCE CODES
        </p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {refCodes.map((c) => (
            <li
              key={c}
              className="font-mono text-[11px] text-ink rounded-md border border-line px-2 py-1 tabular-nums"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="pb-5 border-b border-line">
        <ButtonLink
          href={`/contact?type=sample&product=${product.slug}`}
          variant="primary"
          size="md"
          withArrow
          className="w-full justify-between"
        >
          Request a sample
        </ButtonLink>
      </div>

      {/* Regulatory */}
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          SHIPS UNDER
        </p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {["ISO 13485", "FDA", "CE", "KGMP"].map((cert) => (
            <li
              key={cert}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
            >
              <ShieldCheck className="h-2.5 w-2.5 text-forest" strokeWidth={2.5} />
              {cert}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] text-ink-muted leading-relaxed">
          Region-specific documentation included with every sample shipment.{" "}
          <Link href="/network#quality" className="text-forest hover:text-forest-deep underline-offset-4 hover:underline">
            See all certifications.
          </Link>
        </p>
      </div>
    </aside>
  );
}

function SpecRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </dt>
      <dd className="text-[13.5px] text-ink text-right">{value}</dd>
    </div>
  );
}

function getWidthRange(product: Product): string | null {
  const widths = product.specs
    .map((s) => parseFloat(s.width))
    .filter((n) => !isNaN(n));
  if (widths.length === 0) return null;
  const min = Math.min(...widths);
  const max = Math.max(...widths);
  if (min === max) return `${min} in`;
  return `${min}–${max} in`;
}
