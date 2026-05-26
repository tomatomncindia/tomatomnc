import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container className="py-32 md:py-44">
      <div className="max-w-xl">
        <p className="eyebrow mb-4">404 / Not found</p>
        <h1 className="font-display text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-5 text-ink-soft text-lg leading-relaxed">
          The link may have moved, or the page no longer exists. Head back to the homepage or explore our catalog.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="secondary">Back to home</ButtonLink>
          <ButtonLink href="/products" variant="outline">View products</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
