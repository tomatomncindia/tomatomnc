import { cn } from "@/lib/cn";

type Tone = "white" | "paper" | "forest" | "ink";

const toneClasses: Record<Tone, string> = {
  white: "bg-white text-ink",
  paper: "bg-paper text-ink",
  forest: "bg-forest text-white",
  ink: "bg-ink text-white",
};

export function Section({
  tone = "white",
  size = "md",
  className,
  children,
  id,
}: {
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const py =
    size === "sm"
      ? "py-[var(--section-y-sm)]"
      : size === "lg"
        ? "py-[var(--section-y-lg)]"
        : "py-[var(--section-y)]";
  return (
    <section id={id} className={cn(toneClasses[tone], py, className)}>
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="font-display text-[length:var(--text-display-md)] leading-[var(--text-display-md--line-height)] tracking-[var(--text-display-md--letter-spacing)] md:text-[length:var(--text-display-lg)] md:leading-[var(--text-display-lg--line-height)] md:tracking-[var(--text-display-lg--letter-spacing)]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-ink-soft text-base md:text-lg leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  );
}
