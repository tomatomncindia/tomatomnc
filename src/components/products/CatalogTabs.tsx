"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Download, FileText } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { PRODUCTS, type ProductCategory } from "@/data/products";
import { DOWNLOADS, type DownloadCategory } from "@/data/downloads";
import { cn } from "@/lib/cn";

type Tab = "catalog" | "downloads";

const CATEGORY_FILTERS: Array<{ label: string; value: ProductCategory | "all" }> = [
  { label: "All Products", value: "all" },
  { label: "Casting", value: "Cast" },
  { label: "Splints", value: "Splint" },
  { label: "Accessories", value: "Accessory" },
];

const DOWNLOAD_CATEGORIES: DownloadCategory[] = [
  "Catalogs",
  "Datasheets",
  "Certifications",
  "Technical Guides",
];

export function CatalogTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const initialTab: Tab = params.get("tab") === "downloads" ? "downloads" : "catalog";
  const [tab, setTab] = useState<Tab>(initialTab);
  const [filter, setFilter] = useState<ProductCategory | "all">(() => {
    const c = params.get("category");
    if (c === "cast") return "Cast";
    if (c === "splint") return "Splint";
    if (c === "accessory") return "Accessory";
    return "all";
  });

  useEffect(() => {
    const q = params.get("tab");
    setTab(q === "downloads" ? "downloads" : "catalog");
  }, [params]);

  function changeTab(next: Tab) {
    setTab(next);
    const usp = new URLSearchParams(params.toString());
    if (next === "downloads") usp.set("tab", "downloads");
    else usp.delete("tab");
    router.replace(`${pathname}?${usp.toString()}`, { scroll: false });
  }

  const filteredProducts = useMemo(() => {
    if (filter === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div>
      {/* Tab switcher */}
      <div className="border-b border-line">
        <div className="flex flex-wrap gap-1" role="tablist" aria-label="Product views">
          {(["catalog", "downloads"] as Tab[]).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => changeTab(t)}
              className={cn(
                "relative px-4 py-3 text-[14px] font-medium transition-colors",
                tab === t ? "text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {t === "catalog" ? "Product Catalog" : "Downloads"}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-3 -bottom-px h-[2px] origin-left bg-forest transition-transform duration-200",
                  tab === t ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Catalog */}
      {tab === "catalog" ? (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {CATEGORY_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                    filter === f.value
                      ? "border-ink bg-ink text-white"
                      : "border-line-strong text-ink-soft hover:border-ink hover:text-ink",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="text-[13px] text-ink-muted">
              Showing <span className="font-medium text-ink">{filteredProducts.length}</span> of {PRODUCTS.length} products
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      ) : (
        <DownloadsView />
      )}
    </div>
  );
}

function DownloadsView() {
  return (
    <div className="mt-8 space-y-12">
      <div className="rounded-xl border border-line bg-paper p-6 md:p-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">Complete Catalog</p>
          <h2 className="mt-2 font-display text-[26px] md:text-[32px] leading-[1.15] tracking-[-0.01em]">
            Full Product Catalog
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
            All product families, sizes, ordering codes, packaging details, and material specifications in a single document.
          </p>
        </div>
        <a
          href="/downloads/tomato-mnc-catalog.pdf"
          className="inline-flex items-center gap-2 rounded-md bg-forest px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-forest-deep"
        >
          <Download className="h-4 w-4" /> Download Catalog (PDF)
        </a>
      </div>

      {DOWNLOAD_CATEGORIES.map((cat) => {
        const items = DOWNLOADS.filter((d) => d.category === cat);
        if (!items.length) return null;
        return (
          <div key={cat}>
            <h3 className="font-display text-[20px] mb-4">{cat}</h3>
            <div className="rounded-xl border border-line overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-paper">
                    <tr className="text-left text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                      <th className="px-4 py-3 font-semibold sm:px-5">Document</th>
                      <th className="hidden md:table-cell px-4 py-3 font-semibold sm:px-5">Description</th>
                      <th className="px-4 py-3 font-semibold sm:px-5">Size</th>
                      <th className="px-4 py-3 font-semibold text-right sm:px-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((d) => (
                      <tr key={d.id} className="border-t border-line">
                        <td className="px-4 py-4 align-top sm:px-5">
                          <div className="flex items-start gap-3">
                            <FileText className="mt-0.5 h-4 w-4 text-brand-red shrink-0" />
                            <div>
                              <p className="font-medium text-ink">{d.title}</p>
                              <p className="md:hidden mt-1 text-[13px] text-ink-soft">{d.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-4 py-4 align-top text-ink-soft sm:px-5">
                          {d.description}
                        </td>
                        <td className="px-4 py-4 align-top text-ink-muted tabular-nums sm:px-5">{d.size ?? "·"}</td>
                        <td className="px-4 py-4 align-top text-right sm:px-5">
                          <a
                            href={d.file}
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-forest hover:text-forest-deep"
                          >
                            <Download className="h-3.5 w-3.5" /> Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}

      <div className="rounded-xl border border-dashed border-line p-6 md:p-8 text-center">
        <p className="text-[14.5px] text-ink-soft">
          Need a custom datasheet, batch COA, or regulatory document?
        </p>
        <a
          href="/contact"
          className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-medium text-forest hover:text-forest-deep"
        >
          Contact our team →
        </a>
      </div>
    </div>
  );
}
