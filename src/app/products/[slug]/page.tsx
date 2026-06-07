import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, AlertTriangle, CheckCircle2 } from "lucide-react";

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
import { SITE_URL } from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} · Tomato M&C India`,
      description: product.tagline,
      url: `/products/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.related);

  const siteUrl = SITE_URL;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    brand: { "@type": "Brand", name: "Tomato M&C India" },
    manufacturer: { "@type": "Organization", name: "Tomato M&C Co., Ltd." },
    category: product.category,
    image: `${siteUrl}${product.image}`,
    url: `${siteUrl}/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "Country", name: "India" },
      seller: { "@type": "Organization", name: "Tomato M&C Co., Ltd." },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${siteUrl}/products/${product.slug}`,
      },
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
        <nav aria-label="Breadcrumb" className="text-ink-muted text-[12px]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" />
            <li>
              <Link href="/products" className="hover:text-ink">
                Products
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" />
            <li className="text-ink">{product.name}</li>
          </ol>
        </nav>
      </Container>

      {/* HERO */}
      <Container className="pt-6 pb-10 md:pt-10 md:pb-14">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <p className="eyebrow">{product.category}</p>
            </Reveal>
            <Reveal delay={0.05}>
              {product.logo ? (
                // Product-line wordmark — client-supplied brand logo, shown above the name
                <Image
                  src={product.logo.src}
                  alt={`${product.name} logo`}
                  width={product.logo.width}
                  height={product.logo.height}
                  priority
                  className="mt-4 h-9 w-auto md:h-12"
                />
              ) : null}
              <h1 className="font-display mt-3 text-[40px] leading-[1.05] tracking-[-0.02em] md:text-[56px]">
                {product.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink-soft mt-4 max-w-xl text-[16.5px] leading-relaxed">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-7 space-y-2">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="border-forest text-ink-soft border-l-2 py-1.5 pl-4 text-[14.5px] leading-relaxed"
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
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-6">
            <ProductVisual
              product={product}
              className="aspect-[4/3]"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
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
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 space-y-8 lg:col-span-8">
              {/* Intended Use + Precautions */}
              <div className="grid gap-6 md:grid-cols-2">
                <Reveal>
                  <div className="border-line h-full rounded-xl border bg-white p-6 md:p-7">
                    <p className="eyebrow">Intended Use</p>
                    <p className="text-ink-soft mt-3 text-[15px] leading-relaxed">
                      {product.intendedUse}
                    </p>
                  </div>
                </Reveal>
                {product.precautions ? (
                  <Reveal delay={0.05}>
                    <div className="border-mustard/40 bg-mustard-soft h-full rounded-xl border p-6 md:p-7">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-[#8B6A1E]" strokeWidth={2} />
                        <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#8B6A1E] uppercase">
                          Precautions
                        </p>
                      </div>
                      <p className="text-ink-soft mt-3 text-[15px] leading-relaxed">
                        {product.precautions}
                      </p>
                    </div>
                  </Reveal>
                ) : (
                  <Reveal delay={0.05}>
                    <div className="border-line h-full rounded-xl border bg-white p-6 md:p-7">
                      <p className="eyebrow">At a Glance</p>
                      <ul className="text-ink-soft mt-3 space-y-2 text-[14.5px]">
                        {product.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <CheckCircle2
                              className="text-forest mt-0.5 h-4 w-4 shrink-0"
                              strokeWidth={2.2}
                            />
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
                    <div className="mb-6 flex items-baseline justify-between gap-4">
                      <div>
                        <p className="eyebrow">How to use</p>
                        <h2 className="font-display mt-1.5 text-2xl">Application Guide</h2>
                      </div>
                      <p className="text-ink-muted font-mono text-[10px] tracking-[0.16em] uppercase tabular-nums">
                        {product.applicationSteps.length} STEPS
                      </p>
                    </div>

                    <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {product.applicationSteps.map((step, i) => (
                        <StaggerItem key={step.title}>
                          <div className="group border-line hover:border-forest/30 flex h-full flex-col overflow-hidden rounded-xl border bg-white transition-[border-color,transform] duration-300 [transition-timing-function:var(--ease-out-quint)] hover:-translate-y-0.5">
                            {/* Step illustration from the catalog */}
                            {step.image ? (
                              <div className="relative aspect-[16/11] w-full overflow-hidden bg-white">
                                <Image
                                  src={step.image}
                                  alt={`${step.title} — step ${i + 1}`}
                                  fill
                                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                                  className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-[1.04]"
                                />
                                <span className="bg-forest absolute top-3 left-3 inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 font-mono text-[12px] font-medium text-white tabular-nums shadow-sm">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                              </div>
                            ) : null}
                            <div className="flex flex-1 flex-col p-5">
                              <div className="flex items-baseline justify-between gap-2">
                                <h3 className="font-display text-[17px] leading-tight">
                                  {step.image ? null : (
                                    <span className="text-forest mr-2 font-mono tabular-nums">
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                  )}
                                  {step.title}
                                </h3>
                                <span className="text-ink-muted shrink-0 font-mono text-[9.5px] tracking-[0.18em] uppercase">
                                  STEP / {String(i + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <p className="text-ink-soft mt-2 text-[13.5px] leading-relaxed">
                                {step.body}
                              </p>
                            </div>
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
                  <div className="mb-4 flex items-baseline justify-between gap-4">
                    <h2 className="font-display text-2xl">Specifications &amp; Ordering</h2>
                    <p className="text-ink-muted font-mono text-[10px] tracking-[0.16em] uppercase tabular-nums">
                      {product.specs.length} VARIANTS
                    </p>
                  </div>
                  <SpecsTable specs={product.specs} />
                </div>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-4">
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
          <div className="bg-ink grid items-center gap-8 rounded-2xl p-6 text-white sm:p-8 md:grid-cols-[1.4fr_1fr] md:gap-10 md:p-10">
            <div>
              <p className="text-mid-green font-mono text-[11px] tracking-[0.16em] uppercase">
                SAMPLE / {product.shortName.toUpperCase()}
              </p>
              <h2 className="font-display mt-3 text-[26px] leading-[1.15] tracking-[-0.015em] md:text-[32px]">
                Request a sample of {product.name}.
              </h2>
              <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-white/70">
                Sample shipment includes full specifications and the relevant regulatory
                documentation for your market.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <ButtonLink
                href={`/contact?type=sample&product=${product.slug}`}
                variant="primary"
                size="lg"
                withArrow
              >
                Request sample
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
