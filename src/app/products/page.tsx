import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { PRODUCTS } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Browse Tomato M&C India's complete catalog of fiberglass orthopedic casts, splints, and supporting products. Manufactured to ISO 13485 standards.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <Container className="pt-16 md:pt-24 pb-8 md:pb-10">
        <div className="max-w-3xl">
          <p className="eyebrow">Product Catalog</p>
          <h1 className="mt-4 font-display text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.05] tracking-[-0.02em]">
            Orthopedic Casting <span className="editorial-italic text-forest">&amp; Immobilization</span> Products
          </h1>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink-soft">
            A complete library of fiberglass casting tapes, splints, and undercast supporting products. Manufactured to ISO 13485 standards, available in fiberglass and polyester variants.
          </p>
        </div>
      </Container>

      <Container className="pb-20 md:pb-24">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <StaggerItem key={p.slug}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>

      {/* SPEC REQUEST INLINE CARD */}
      <Section size="md" tone="paper">
        <Container>
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 md:p-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12 md:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-forest">
                SPEC REQUEST
              </p>
              <h2 className="mt-3 font-display text-[26px] md:text-[32px] leading-[1.15] tracking-[-0.015em]">
                Need a sample, custom spec, or quote?
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft max-w-md">
                Send a list of products, target market, and estimated volume. Sample shipments include the relevant specifications and regulatory documentation for your region.
              </p>
              <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-muted">
                Response: &lt; 2 hours
              </p>
            </div>
            <div className="space-y-3">
              <ButtonLink href="/contact?type=sample" variant="primary" size="lg" withArrow className="w-full justify-between">
                Request a Sample
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
