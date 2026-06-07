import { Container } from "@/components/layout/Container";

/**
 * Shared layout for legal / policy pages (privacy, terms, compliance).
 * Editorial single-column reading layout with numbered sections.
 */
export function LegalShell({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Container className="pt-16 md:pt-24 pb-12">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-display text-[36px] sm:text-[44px] md:text-[52px] leading-[1.08] tracking-[-0.02em]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink-soft">{intro}</p>
          {updated ? (
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
              Last updated · {updated}
            </p>
          ) : null}
        </div>
      </Container>

      <Container className="pb-24">
        <div className="mx-auto max-w-3xl">{children}</div>
      </Container>
    </>
  );
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0 md:py-10">
      <div className="flex items-baseline gap-4">
        <span className="shrink-0 font-mono text-[11px] tabular-nums text-forest">{number}</span>
        <h2 className="font-display text-[22px] leading-tight tracking-[-0.01em] md:text-[24px]">
          {title}
        </h2>
      </div>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-soft md:pl-9 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_strong]:font-medium [&_strong]:text-ink">
        {children}
      </div>
    </section>
  );
}
