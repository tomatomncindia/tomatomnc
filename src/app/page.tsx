import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { StatStrip } from "@/components/sections/StatStrip";
import { CertGreenBand } from "@/components/sections/CertGreenBand";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { ProductionFlowPreview } from "@/components/sections/ProductionFlowPreview";
import { GlobalReach } from "@/components/sections/GlobalReach";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { PRODUCTS } from "@/data/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const FEATURED_SLUGS = ["tomato-cast", "star-cast-roll", "star-stockinet"];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Container className="pt-14 pb-14 md:pt-20 md:pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Orthopedic Casting Solutions</p>
              </Reveal>
              <WordReveal
                as="h1"
                delay={0.1}
                stagger={0.07}
                className="font-display mt-4 text-[clamp(38px,11vw,56px)] leading-[1.02] tracking-[-0.025em] lg:text-[72px]"
              >
                Korea&apos;s Leading
                <br />
                Fiberglass Cast
                <br />
                <span className="editorial-italic text-forest text-[clamp(44px,13vw,66px)] leading-[0.95] lg:text-[84px]">
                  Manufacturer.
                </span>
              </WordReveal>
              <Reveal delay={0.1}>
                <p className="text-ink-soft mt-6 max-w-xl text-[16.5px] leading-relaxed">
                  Fiberglass casting tape and splints from a fully automated, one-stop production
                  line. Manufactured in Korea, supplied to 30+ countries.
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
              <HeroCarousel />
            </Reveal>
          </div>

          {/* TRUST STATS */}
          <Reveal delay={0.2} className="border-line mt-14 border-y md:mt-20">
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
            <p className="text-ink-muted text-center font-mono text-[11px] tracking-[0.18em] uppercase">
              KEY FIGURES
            </p>
            <h2 className="font-display mx-auto mt-4 max-w-3xl text-center text-[28px] leading-[1.15] tracking-[-0.015em] md:text-[36px]">
              Twenty years of manufacturing under one accountable line.
            </h2>
          </Reveal>

          {/* Mobile: 2×2 grid with full cell rules (divide-y breaks on
              multi-column grids — it draws half-width lines mid-row).
              Desktop: single row with vertical rules only. */}
          <dl className="border-line mt-10 grid grid-cols-2 border-y md:mt-14 lg:grid-cols-4">
            {[
              { value: "2005", label: "Founded", note: "Two decades of process refinement" },
              { value: "30+", label: "Countries", note: "Active distribution worldwide" },
              {
                value: "4",
                label: "Product families",
                note: "Casts, splints, supporting products",
              },
              { value: "ISO 13485", label: "Certified", note: "FDA, CE, KGMP cleared" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`border-line min-w-0 px-3 py-6 sm:px-4 sm:py-7 md:px-8 md:py-9 lg:first:pl-0 lg:last:pr-0 ${
                  i % 2 === 1 ? "border-l" : "lg:border-l lg:first:border-l-0"
                } ${i >= 2 ? "border-t lg:border-t-0" : ""}`}
              >
                <dt className="text-ink-muted font-mono text-[10px] tracking-[0.16em] uppercase">
                  {s.label}
                </dt>
                <dd className="font-display mt-3 text-2xl leading-none tracking-[-0.02em] sm:text-4xl md:text-5xl lg:text-[56px]">
                  <AnimatedNumber value={s.value} />
                </dd>
                <p className="text-ink-soft mt-3 text-[12.5px] leading-snug">{s.note}</p>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
    </>
  );
}
