import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { StatStrip } from "@/components/sections/StatStrip";
import { CTABand } from "@/components/sections/CTABand";
import { CertGreenBand } from "@/components/sections/CertGreenBand";
import { ProductionFlowPreview } from "@/components/sections/ProductionFlowPreview";
import { GlobalReach } from "@/components/sections/GlobalReach";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductVisual } from "@/components/products/ProductVisual";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { PRODUCTS, getProduct } from "@/data/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const FEATURED_SLUGS = ["tomato-cast", "tomato-soft-cast", "tomato-splint"];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Container className="pt-14 md:pt-20 pb-14 md:pb-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Orthopedic Casting Solutions</p>
              </Reveal>
              <WordReveal
                as="h1"
                delay={0.1}
                stagger={0.07}
                className="mt-4 font-display text-[44px] sm:text-[56px] lg:text-[72px] leading-[1.02] tracking-[-0.025em]"
              >
                Korea&apos;s Leading
                <br />
                Synthetic Cast
                <br />
                <span className="editorial-italic text-forest text-[52px] sm:text-[66px] lg:text-[84px] leading-[0.95]">
                  Manufacturer.
                </span>
              </WordReveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-ink-soft">
                  Synthetic casting tape and splints from a fully automated, one-stop production line. Manufactured in Korea, supplied to 30+ countries.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <ButtonLink href="/contact?type=sample" variant="primary" size="lg" withArrow>
                    Request a Sample
                  </ButtonLink>
                  <ButtonLink href="/products" variant="outline" size="lg">
                    View Products
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="relative">
                <ProductVisual
                  product={getProduct("tomato-cast")!}
                  className="aspect-square"
                  withRefCode={false}
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-lg bg-white/95 px-4 py-3 backdrop-blur shadow-[var(--shadow-soft)]">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">FLAGSHIP</p>
                    <p className="font-display text-base font-medium">Tomato Cast · Fiberglass</p>
                  </div>
                  <span className="inline-flex h-7 items-center rounded-full bg-forest/10 px-3 text-[11px] font-medium text-forest font-mono tracking-[0.08em]">
                    ISO 13485
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* TRUST STATS */}
          <Reveal delay={0.2} className="mt-14 md:mt-20 border-y border-line">
            <StatStrip
              stats={[
                { value: "ISO 13485", label: "Certified QMS" },
                { value: "FDA · CE", label: "Cleared markets" },
                { value: "30+", label: "Countries shipped" },
              ]}
            />
          </Reveal>
        </Container>
      </section>

      {/* ─── CERTIFICATION GREEN BAND ──────────────────────────── */}
      <CertGreenBand />

      {/* ─── PRODUCT SHOWCASE ──────────────────────────────────── */}
      <Section size="lg">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="View Our Product Lineup"
              title="Complete Casting Room Solutions"
              description="Vertically integrated production of every component a clinician needs: primary cast, padding, splint."
            />
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_SLUGS.map((slug) => {
              const p = PRODUCTS.find((x) => x.slug === slug)!;
              return (
                <StaggerItem key={p.slug}>
                  <ProductCard product={p} />
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          <div className="mt-10 flex justify-center">
            <ButtonLink href="/products" variant="outline" withArrow>
              View full catalog
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ─── MANUFACTURING DIFFERENTIATOR (5-step flow) ────────── */}
      <ProductionFlowPreview />

      {/* ─── GLOBAL REACH (world map) ──────────────────────────── */}
      <GlobalReach />

      {/* ─── KEY FIGURES STRIP ─────────────────────────────────── */}
      <Section size="md" tone="paper">
        <Container>
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted text-center">
              KEY FIGURES
            </p>
            <h2 className="mt-4 text-center font-display text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.015em] max-w-3xl mx-auto">
              Twenty years of manufacturing under one accountable line.
            </h2>
          </Reveal>

          <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 divide-y divide-line lg:divide-y-0 lg:divide-x border-y border-line">
            {[
              { value: "2005", label: "Founded", note: "Two decades of process refinement" },
              { value: "30+", label: "Countries", note: "Active distribution worldwide" },
              { value: "6", label: "Product families", note: "Casts, splints, accessories" },
              { value: "ISO 13485", label: "Certified", note: "FDA, CE, KGMP cleared" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-7 md:px-8 md:py-9 lg:first:pl-0 lg:last:pr-0">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {s.label}
                </dt>
                <dd className="mt-3 font-display text-4xl md:text-5xl lg:text-[56px] leading-none tracking-[-0.02em]">
                  <AnimatedNumber value={s.value} />
                </dd>
                <p className="mt-3 text-[12.5px] text-ink-soft leading-snug">{s.note}</p>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ─── INQUIRY CTA BANNER ────────────────────────────────── */}
      <CTABand
        title="Looking for a reliable casting tape manufacturer?"
        description="Sample, distribution, and OEM inquiries answered within 2 business days."
        primaryLabel="Request a Sample"
        primaryHref="/contact?type=sample"
        secondaryLabel="Talk to Sales"
        secondaryHref="/contact"
      />
    </>
  );
}
