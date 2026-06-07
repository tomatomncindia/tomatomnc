"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, FileDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

import { Logo } from "./Logo";
import { ButtonLink } from "@/components/ui/Button";
import { PRODUCTS, type Product } from "@/data/products";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

const CASTING = PRODUCTS.filter((p) => p.category === "Cast");
const SPLINTS = PRODUCTS.filter((p) => p.category === "Splint");
const SUPPORTING = PRODUCTS.filter((p) => p.category === "Supporting Product");

const CATALOG_PDF = "/downloads/tomato-mnc-catalog.pdf";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsExpanded, setMobileProductsExpanded] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setMobileProductsExpanded(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  // ESC closes the mega-menu
  useEffect(() => {
    if (!productsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProductsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [productsOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-200",
        scrolled || productsOpen
          ? "bg-white/95 backdrop-blur-md border-b border-line"
          : "bg-white/0 border-b border-transparent",
      )}
      onMouseLeave={() => setProductsOpen(false)}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {SITE.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isProducts = item.href === "/products";

            if (isProducts) {
              return (
                <ProductsTrigger
                  key={item.href}
                  active={active}
                  open={productsOpen}
                  onOpen={() => setProductsOpen(true)}
                />
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setProductsOpen(false)}
                className={cn(
                  "relative px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                  active ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute left-3.5 right-3.5 -bottom-px h-px origin-left scale-x-0 bg-ink transition-transform duration-200",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {/* Hidden below xl so the nav links never crowd at 1024–1280px */}
          <ButtonLink href={CATALOG_PDF} variant="outline" size="sm" className="hidden xl:inline-flex">
            <span className="inline-flex items-center gap-1.5">
              <FileDown className="h-3.5 w-3.5" /> Download Catalog
            </span>
          </ButtonLink>
          <ButtonLink href="/contact" variant="primary" size="sm">
            Request a Sample
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-paper-warm"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop mega-menu */}
      <AnimatePresence>
        {productsOpen ? (
          <ProductsMegaMenu key="mega" onClose={() => setProductsOpen(false)} />
        ) : null}
      </AnimatePresence>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="lg:hidden border-t border-line bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav aria-label="Mobile primary" className="container-page py-6 flex flex-col gap-1">
            {SITE.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const isProducts = item.href === "/products";

              if (isProducts) {
                return (
                  <div key={item.href}>
                    <div className="flex items-stretch">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex-1 rounded-md px-3 py-3 text-[17px] font-medium transition-colors",
                          active ? "text-ink bg-paper" : "text-ink-soft hover:text-ink hover:bg-paper",
                        )}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-label={mobileProductsExpanded ? "Collapse products" : "Expand products"}
                        aria-expanded={mobileProductsExpanded}
                        onClick={() => setMobileProductsExpanded((v) => !v)}
                        className="px-3 text-ink-muted hover:text-ink"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            mobileProductsExpanded && "rotate-180",
                          )}
                        />
                      </button>
                    </div>
                    {mobileProductsExpanded ? (
                      <div className="mt-2 mb-2 ml-3 border-l border-line pl-4 space-y-3">
                        <MobileProductGroup title="Casting" products={CASTING} />
                        <MobileProductGroup title="Splints" products={SPLINTS} />
                        <MobileProductGroup title="Supporting Products" products={SUPPORTING} />
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-3 text-[17px] font-medium transition-colors",
                    active ? "text-ink bg-paper" : "text-ink-soft hover:text-ink hover:bg-paper",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-line space-y-2.5">
              <ButtonLink href="/contact" variant="primary" size="lg" className="w-full">
                Request a Sample
              </ButtonLink>
              <ButtonLink href={CATALOG_PDF} variant="outline" size="lg" className="w-full">
                <span className="inline-flex items-center gap-2">
                  <FileDown className="h-4 w-4" /> Download Catalog
                </span>
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function ProductsTrigger({
  active,
  open,
  onOpen,
}: {
  active: boolean;
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <Link
      href="/products"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      aria-haspopup="true"
      aria-expanded={open}
      className={cn(
        "relative px-3.5 py-2 text-[13.5px] font-medium transition-colors inline-flex items-center gap-1",
        active ? "text-ink" : "text-ink-soft hover:text-ink",
      )}
    >
      Products
      <ChevronDown
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-200",
          open && "rotate-180",
        )}
      />
      <span
        className={cn(
          "absolute left-3.5 right-7 -bottom-px h-px origin-left scale-x-0 bg-ink transition-transform duration-200",
          active && "scale-x-100",
        )}
      />
    </Link>
  );
}

function ProductsMegaMenu({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-16 border-b border-line bg-white shadow-[var(--shadow-card)]"
      role="region"
      aria-label="Products"
    >
      <div className="container-page grid grid-cols-12 gap-6 py-8">
        <MegaColumn title="Casting" products={CASTING} />
        <MegaColumn title="Splints" products={SPLINTS} />
        <MegaColumn title="Supporting Products" products={SUPPORTING} />

        <div className="col-span-12 md:col-span-3 border-l border-line pl-6 flex flex-col">
          <p className="eyebrow">Resources</p>
          <ul className="mt-4 space-y-3">
            <li>
              <ResourceLink href={CATALOG_PDF} icon={<FileDown className="h-3.5 w-3.5" />}>
                Full catalog PDF
              </ResourceLink>
            </li>
            <li>
              <ResourceLink href="/network#quality" icon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                Certifications &amp; docs
              </ResourceLink>
            </li>
            <li>
              <ResourceLink href="/manufacturing" icon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                Manufacturing
              </ResourceLink>
            </li>
          </ul>

          <Link
            href="/products"
            onClick={onClose}
            className="mt-auto pt-6 inline-flex items-center gap-2 text-[13px] font-medium text-forest hover:text-forest-deep group"
          >
            View full catalog
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="border-t border-line bg-paper">
        <div className="container-page py-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          <span>{PRODUCTS.length} products / 3 categories</span>
          <span className="tabular-nums">ISO 13485 · FDA · CE · KGMP</span>
        </div>
      </div>
    </motion.div>
  );
}

function MegaColumn({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <div className="col-span-12 md:col-span-3">
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-3">
        {products.map((p) => (
          <li key={p.slug}>
            <ProductLink product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductLink({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex items-center gap-3 rounded-md p-2 -mx-2 transition-colors hover:bg-paper"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-line bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-[14px] leading-tight text-ink truncate">{product.shortName}</p>
        <p className="mt-0.5 text-[12px] text-ink-muted line-clamp-1">{product.tagline}</p>
      </div>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-ink-muted opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-forest" />
    </Link>
  );
}

function ResourceLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[13.5px] text-ink-soft hover:text-ink"
    >
      <span className="text-ink-muted group-hover:text-forest transition-colors">{icon}</span>
      {children}
    </Link>
  );
}

function MobileProductGroup({ title, products }: { title: string; products: Product[] }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-2 space-y-1">
        {products.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/products/${p.slug}`}
              className="block rounded-md px-2 py-2 text-[15px] text-ink-soft hover:text-ink hover:bg-paper"
            >
              {p.shortName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
