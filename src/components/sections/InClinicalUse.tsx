"use client";

import Link from "next/link";
import { Stethoscope, Activity, Baby, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { ProductVisual } from "@/components/products/ProductVisual";
import { getProduct } from "@/data/products";
import { Reveal } from "@/components/motion/Reveal";

const ANNOTATIONS = [
  {
    label: "X-RAY TRANSLUCENT",
    spec: "Allows scan-through imaging during cast wear",
    side: "left" as const,
    top: "14%",
  },
  {
    label: "FIBERGLASS CORE",
    spec: "Hospital-grade fiberglass substrate",
    side: "left" as const,
    top: "58%",
  },
  {
    label: "SETS IN 3–5 MIN",
    spec: "Full mechanical strength within 30 min",
    side: "right" as const,
    top: "26%",
  },
  {
    label: "15 STANDARD COLORS",
    spec: "Plus custom colorways",
    side: "right" as const,
    top: "70%",
  },
];

const USE_CASES = [
  {
    icon: Stethoscope,
    title: "Emergency Department",
    body: "Fast set time and conformability for high-throughput trauma immobilization.",
    stat: "3–5 min",
    statLabel: "Set time",
  },
  {
    icon: Activity,
    title: "Sports Medicine",
    body: "Lightweight fiberglass for active patients; multiple width options for limb-specific fits.",
    stat: "5 widths",
    statLabel: "Per family",
  },
  {
    icon: Baby,
    title: "Pediatric Care",
    body: "Color-selectable rolls and softer Soft Cast variant for younger patients and shorter-term immobilization.",
    stat: "15",
    statLabel: "Color choices",
  },
];

export function InClinicalUse() {
  const product = getProduct("tomato-cast")!;

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 items-start">
      <div className="lg:col-span-5">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-forest">
            IN CLINICAL USE
          </p>
          <h2 className="mt-4 font-display text-[32px] md:text-[44px] leading-[1.1] tracking-[-0.02em]">
            One product, <span className="editorial-italic text-forest">three settings.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink-soft">
            The same Tomato Cast roll serves trauma immobilization, post-op orthopedics, and pediatric care. Spec is shared. Application is identical. The cast behaves the same on the floor of every hospital.
          </p>
        </Reveal>

        <ul className="mt-10 space-y-3">
          {USE_CASES.map(({ icon: Icon, title, body, stat, statLabel }, i) => (
            <Reveal key={title} delay={i * 0.06} as="li">
              <div className="group flex items-start gap-4 rounded-xl border border-line bg-white p-5 transition-[border-color,transform] duration-300 [transition-timing-function:var(--ease-out-quint)] hover:border-line-strong hover:-translate-y-0.5">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-forest/10 text-forest">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-[17px] leading-tight">{title}</h3>
                    <div className="text-right">
                      <p className="font-display text-[18px] tabular-nums leading-none">{stat}</p>
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-muted mt-0.5">
                        {statLabel}
                      </p>
                    </div>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.3}>
          <Link
            href="/products/tomato-cast"
            className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-medium text-forest hover:text-forest-deep group"
          >
            View Tomato Cast spec sheet
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="lg:col-span-7">
        <AnnotatedProduct product={product} annotations={ANNOTATIONS} />
      </Reveal>
    </div>
  );
}

function AnnotatedProduct({
  product,
  annotations,
}: {
  product: ReturnType<typeof getProduct> extends infer T ? Exclude<T, undefined> : never;
  annotations: typeof ANNOTATIONS;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* The product visual — slightly inset so annotation chips can sit at the edges */}
      <div className="relative mx-auto max-w-[600px] px-12 py-8 sm:px-20 sm:py-12">
        <ProductVisual product={product} className="aspect-square" />
      </div>

      {/* Annotation chips */}
      {annotations.map((a, i) => (
        <motion.div
          key={a.label}
          initial={reduce ? false : { opacity: 0, x: a.side === "left" ? -8 : 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute z-10 max-w-[170px] sm:max-w-[200px] ${
            a.side === "left" ? "left-0 text-right" : "right-0 text-left"
          }`}
          style={{ top: a.top }}
        >
          {/* Connector line */}
          <div
            aria-hidden
            className={`absolute top-1/2 h-px w-6 sm:w-10 bg-line-strong ${
              a.side === "left" ? "right-0 -translate-y-1/2 -mr-6 sm:-mr-10" : "left-0 -translate-y-1/2 -ml-6 sm:-ml-10"
            }`}
          >
            <span
              className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-forest ${
                a.side === "left" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
              }`}
            />
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-forest leading-tight">
            {a.label}
          </p>
          <p className="mt-1 text-[12px] leading-snug text-ink-soft">{a.spec}</p>
        </motion.div>
      ))}
    </div>
  );
}
