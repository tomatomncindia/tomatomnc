import { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark";
export type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

const baseStyles =
  "group/btn inline-flex items-center justify-center gap-2 font-medium rounded-md transition-[background,color,box-shadow,transform] duration-200 [transition-timing-function:var(--ease-out-quint)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap active:scale-[0.98] active:duration-100";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-red-hover focus-visible:outline-brand-red",
  secondary:
    "bg-forest text-white hover:bg-forest-deep focus-visible:outline-forest",
  outline:
    "bg-white text-ink border border-line-strong hover:border-ink hover:text-ink",
  ghost: "bg-transparent text-ink hover:bg-paper-warm",
  dark: "bg-ink text-white hover:bg-black focus-visible:outline-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

/** Shared so non-Button elements (e.g. the catalog download anchor) match exactly. */
export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(baseStyles, variants[variant], sizes[size], className);
}

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", withArrow, className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow ? (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--ease-out-quint)] group-hover/btn:translate-x-0.5"
          strokeWidth={2}
        />
      ) : null}
    </button>
  ),
);
Button.displayName = "Button";

type ButtonLinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  withArrow,
  className,
  href,
  external,
  children,
}: ButtonLinkProps) {
  const classes = cn(baseStyles, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {withArrow ? (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--ease-out-quint)] group-hover/btn:translate-x-0.5"
          strokeWidth={2}
        />
      ) : null}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {withArrow ? (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 [transition-timing-function:var(--ease-out-quint)] group-hover/btn:translate-x-0.5"
          strokeWidth={2}
        />
      ) : null}
    </Link>
  );
}
