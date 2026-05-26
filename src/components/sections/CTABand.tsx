import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function CTABand({
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Request a Sample",
  secondaryHref,
  secondaryLabel,
  tone = "forest",
}: {
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  tone?: "forest" | "paper" | "ink";
}) {
  const toneCls = {
    forest: "bg-forest text-white",
    ink: "bg-ink text-white",
    paper: "bg-paper text-ink",
  }[tone];

  return (
    <section className={cn(toneCls)}>
      <div className="container-page py-14 md:py-20 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-2xl">
          <h2 className="font-display text-[28px] md:text-[40px] leading-[1.15] tracking-[-0.015em]">
            {title}
          </h2>
          {description ? (
            <p className={cn("mt-3 text-[15px] md:text-base leading-relaxed", tone === "paper" ? "text-ink-soft" : "text-white/80")}>
              {description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={primaryHref} variant={tone === "paper" ? "primary" : "primary"} withArrow size="lg">
            {primaryLabel}
          </ButtonLink>
          {secondaryHref && secondaryLabel ? (
            <ButtonLink
              href={secondaryHref}
              variant={tone === "paper" ? "outline" : "ghost"}
              size="lg"
              className={tone !== "paper" ? "text-white border border-white/20 hover:bg-white/10" : ""}
            >
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </section>
  );
}
