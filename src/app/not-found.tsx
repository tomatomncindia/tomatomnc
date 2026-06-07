import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

const QUICK_LINKS = [
  { label: "Products", href: "/products", note: "Casts, splints & supporting products" },
  { label: "Manufacturing", href: "/manufacturing", note: "Inside the production line" },
  { label: "Global Network", href: "/network", note: "Distribution & quality" },
  { label: "Contact", href: "/contact", note: "Samples & inquiries" },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-paper-warm">
      {/* Dot-grid backdrop */}
      <svg aria-hidden className="absolute inset-0 h-full w-full text-ink/[0.05]">
        <defs>
          <pattern id="nf-dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nf-dots)" />
      </svg>

      <Container className="relative py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left — the oversized 404 plate */}
          <div className="lg:col-span-6">
            <div className="relative inline-block">
              {/* engineering corner ticks */}
              <span aria-hidden className="absolute -left-3 -top-3 h-4 w-4 border-l-2 border-t-2 border-forest/40" />
              <span aria-hidden className="absolute -right-3 -top-3 h-4 w-4 border-r-2 border-t-2 border-forest/40" />
              <span aria-hidden className="absolute -left-3 -bottom-3 h-4 w-4 border-l-2 border-b-2 border-forest/40" />
              <span aria-hidden className="absolute -right-3 -bottom-3 h-4 w-4 border-r-2 border-b-2 border-forest/40" />

              <p className="font-display leading-none tracking-[-0.04em] text-ink text-[128px] sm:text-[176px] lg:text-[212px] tabular-nums select-none">
                4
                {/* the tomato "0" — brand dot */}
                <span className="relative inline-block">
                  <span className="text-brand-red">0</span>
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-[18%] h-[14%] w-[14%] -translate-x-1/2 rounded-full bg-mid-green"
                  />
                </span>
                4
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
              <span className="text-brand-red">ERROR · 404</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <span>NO RECORD ON THIS LINE</span>
            </div>
          </div>

          {/* Right — message + navigation */}
          <div className="lg:col-span-6">
            <p className="eyebrow">Page not found</p>
            <h1 className="mt-4 font-display text-[34px] sm:text-[44px] leading-[1.07] tracking-[-0.02em]">
              This page rolled off the
              <span className="editorial-italic text-forest"> end of the line.</span>
            </h1>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink-soft">
              The link may have moved, or the page no longer exists. Pick up the trail
              again from one of the sections below.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/" variant="primary" size="lg" withArrow>
                Back to home
              </ButtonLink>
              <ButtonLink href="/products" variant="outline" size="lg">
                View products
              </ButtonLink>
            </div>

            {/* Quick links grid */}
            <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-line pt-8">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3.5 transition-[border-color,transform] duration-300 [transition-timing-function:var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-forest/40"
                  >
                    <span>
                      <span className="block font-display text-[15px] leading-tight text-ink">
                        {l.label}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-ink-muted">{l.note}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-forest" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
