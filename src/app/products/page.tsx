import { Suspense } from "react";
import { FileDown, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CatalogTabs } from "@/components/products/CatalogTabs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products & Downloads",
  description:
    "Browse Tomato M&C's complete catalog of synthetic orthopedic casts, splints, padding, and accessories. Download datasheets, certifications, and the full product catalog.",
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
            A complete library of synthetic casting tapes, splints, and undercast accessories. Manufactured to ISO 13485 standards, available in fiberglass and polyester variants.
          </p>
        </div>
      </Container>

      <Container className="pb-20 md:pb-24">
        <Suspense fallback={<div className="h-96" />}>
          <CatalogTabs />
        </Suspense>
      </Container>

      {/* SPEC REQUEST INLINE CARD */}
      <Section size="md" tone="paper">
        <Container>
          <div className="rounded-2xl border border-line bg-white p-8 md:p-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12 items-start">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-forest">
                SPEC REQUEST
              </p>
              <h2 className="mt-3 font-display text-[26px] md:text-[32px] leading-[1.15] tracking-[-0.015em]">
                Need a sample, custom spec, or quote?
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft max-w-md">
                Send a list of SKUs, target market, and estimated volume. Sample shipments include the relevant datasheet, COA, and regulatory documentation for your region.
              </p>
              <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-muted">
                Response: &lt; 2 business days
              </p>
            </div>
            <div className="space-y-3">
              <ButtonLink href="/contact?type=sample" variant="primary" size="lg" withArrow className="w-full justify-between">
                Request a Sample
              </ButtonLink>
              <ButtonLink href="/products?tab=downloads" variant="outline" size="lg" className="w-full justify-between">
                <span className="inline-flex items-center gap-2">
                  <FileDown className="h-4 w-4" /> Download Catalog
                </span>
              </ButtonLink>
              <ButtonLink href="/contact?type=distributor" variant="ghost" size="lg" className="w-full justify-between">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Distributor inquiry
                </span>
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
