"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function AnchorNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item.id);
        },
        { rootMargin: "-30% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <div className="sticky top-16 z-20 bg-white/85 backdrop-blur border-b border-line">
      <div className="container-page flex gap-1 overflow-x-auto">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(item.id);
              if (el) {
                window.scrollTo({
                  top: el.offsetTop - 100,
                  behavior: "smooth",
                });
                history.replaceState(null, "", `#${item.id}`);
              }
            }}
            className={cn(
              "relative shrink-0 px-4 py-3 text-[13.5px] font-medium transition-colors whitespace-nowrap",
              active === item.id ? "text-ink" : "text-ink-muted hover:text-ink",
            )}
          >
            {item.label}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-3 -bottom-px h-[2px] origin-left bg-forest transition-transform duration-200",
                active === item.id ? "scale-x-100" : "scale-x-0",
              )}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
