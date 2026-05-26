import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, AlertTriangle, CheckCircle2, FileDown } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ColorSwatches } from "@/components/products/ColorSwatches";
import { SpecsTable } from "@/components/products/SpecsTable";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductVisual } from "@/components/products/ProductVisual";
import { ProductSpecAside } from "@/components/products/ProductSpecAside";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

import { PRODUCTS, getProduct, getRelatedProducts } from "@/data/products";

type Params = { slug: string };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} · Tomato M&C`,
      description: product.tagline,
      url: `/products/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.related);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomatomnc-mc.com";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    brand: { "@type": "Brand", name: "Tomato M&C" },
    manufacturer: { "@type": "Organization", name: "Tomato M&C Co., Ltd." },
    category: product.category,
    image: `${siteUrl}${product.image}`,
    url: `${siteUrl}/products/${product.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteUrl}/products/${product.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <Container className="pt-10 md:pt-14">
        <nav aria-label="Breadcrumb" className="text-[12px] text-ink-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-ink">Home</Link>
            </li>
            <ChevronRight className="h-3 w-3" />
            <li>
              <Link href="/products" className="hover:text-ink">Products</Link>
            </li>
            <ChevronRight className="h-3 w-3" />
            <li className="text-ink">{product.name}</li>
          </ol>
        </nav>
      </Container>

      {/* HERO */}
      <Container className="pt-6 md:pt-10 pb-10 md:pb-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <Reveal>
              <p className="eyebrow">{product.category}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-3 font-display text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]">
                {product.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-[16.5px] leading-relaxed text-ink-soft max-w-xl">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-7 space-y-2">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="border-l-2 border-forest pl-4 py-1.5 text-[14.5px] leading-relaxed text-ink-soft"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  href={`/contact?type=sample&product=${product.slug}`}
                  variant="primary"
                  size="lg"
                  withArrow
                >
                  Request a Sample
                </ButtonLink>
                <ButtonLink
                  href={`/downloads/datasheets/${product.slug}.pdf`}
                  variant="outline"
                  size="lg"
                >
                  <FileDown className="mr-1 h-4 w-4" /> Download Datasheet
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6 order-1 lg:order-2">
            <ProductVisual product={product} className="aspect-[4/3]" />
            {product.colors ? (
              <div className="mt-6">
                <ColorSwatches colors={product.colors} />
              </div>
            ) : null}
          </Reveal>
        </div>
      </Container>

      {/* BODY: 2-col with sticky aside */}
      <Section size="md" tone="paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-8">
              {/* Intended Use + Precautions */}
              <div className="grid gap-6 md:grid-cols-2">
                <Reveal>
                  <div className="h-full rounded-xl border border-line bg-white p-6 md:p-7">
                    <p className="eyebrow">Intended Use</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {product.intendedUse}
                    </p>
                  </div>
                </Reveal>
                {product.precautions ? (
                  <Reveal delay={0.05}>
                    <div className="h-full rounded-xl border border-mustard/40 bg-mustard-soft p-6 md:p-7">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-[#8B6A1E]" strokeWidth={2} />
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8B6A1E]">
                          Precautions
                        </p>
                      </div>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                        {product.precautions}
                      </p>
                    </div>
                  </Reveal>
                ) : (
                  <Reveal delay={0.05}>
                    <div className="h-full rounded-xl border border-line bg-white p-6 md:p-7">
                      <p className="eyebrow">At a Glance</p>
                      <ul className="mt-3 space-y-2 text-[14.5px] text-ink-soft">
                        {product.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={2.2} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}
              </div>

              {/* Application Guide — step grid */}
              {product.applicationSteps ? (
                <Reveal>
                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-6">
                      <div>
                        <p className="eyebrow">How to use</p>
                        <h2 className="mt-1.5 font-display text-2xl">Application Guide</h2>
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted tabular-nums">
                        {product.applicationSteps.length} STEPS
                      </p>
                    </div>
                    <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {product.applicationSteps.map((step, i) => (
                        <StaggerItem key={step.title}>
                          <div className="h-full rounded-xl border border-line bg-white p-5 md:p-6 transition-[border-color,transform] duration-300 [transition-timing-function:var(--ease-out-quint)] hover:border-forest/30 hover:-translate-y-0.5">
                            {/* Step illustration plate — large monospace number with subtle backdrop */}
                            <div className="relative h-16 w-full flex items-end justify-between">
                              <span className="font-display text-5xl text-forest leading-none tracking-[-0.02em] tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-muted">
                                STEP / {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <div aria-hidden className="mt-4 h-px w-full bg-line" />
                            <h3 className="mt-4 font-display text-[17px] leading-tight">{step.title}</h3>
                            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">{step.body}</p>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerGroup>
                  </div>
                </Reveal>
              ) : null}

              {/* Full Specs Table */}
              <Reveal>
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <h2 className="font-display text-2xl">Specifications &amp; Ordering</h2>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted tabular-nums">
                      {product.specs.length} VARIANTS
                    </p>
                  </div>
                  <SpecsTable
                    specs={product.specs}
                    datasheetHref={`/downloads/datasheets/${product.slug}.pdf`}
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4">
              <ProductSpecAside product={product} />
            </div>
          </div>
        </Container>
      </Section>

      {/* RELATED */}
      {related.length > 0 ? (
        <Section size="md">
          <Container>
            <Reveal>
              <SectionHeader title="Related Products" />
            </Reveal>
            <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <StaggerItem key={p.slug}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </Section>
      ) : null}

      {/* CONTEXTUAL SAMPLE REQUEST */}
      <Section size="md" tone="paper">
        <Container>
          <div className="rounded-2xl bg-ink text-white p-8 md:p-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-10 items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mid-green">
                SAMPLE / {product.shortName.toUpperCase()}
              </p>
              <h2 className="mt-3 font-display text-[26px] md:text-[32px] leading-[1.15] tracking-[-0.015em]">
                Request a sample of {product.name}.
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/70 max-w-md">
                Sample shipment includes the datasheet, certificate of analysis, and the relevant regulatory documentation for your market.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <ButtonLink href={`/contact?type=sample&product=${product.slug}`} variant="primary" size="lg" withArrow>
                Request sample
              </ButtonLink>
              <ButtonLink
                href={`/downloads/datasheets/${product.slug}.pdf`}
                variant="ghost"
                size="lg"
                className="text-white border border-white/20 hover:bg-white/10"
              >
                <span className="inline-flex items-center gap-2">
                  <FileDown className="h-4 w-4" /> Datasheet
                </span>
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
