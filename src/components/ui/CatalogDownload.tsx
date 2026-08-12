"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FileDown, Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { buttonClasses, type Size, type Variant } from "@/components/ui/Button";
import { CATALOG_PDF } from "@/data/site";
import { cn } from "@/lib/cn";

// ponytail: the browser's own download manager owns real progress and completion.
// We only acknowledge the click so a slow connection doesn't read as a dead button
// and get hammered. Swap for a fetch + ReadableStream reader if a true % is wanted.
const BUSY_MS = 2500;
const TOAST_MS = 6000;

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Render as a plain inline link (footer / menu lists) instead of a button. */
  plain?: boolean;
  /** Fires after the download is kicked off — e.g. to close a mobile menu. */
  onStart?: () => void;
  children: React.ReactNode;
};

export function CatalogDownload({
  variant = "primary",
  size = "md",
  className,
  plain,
  onStart,
  children,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const t = timers;
    return () => t.current.forEach(clearTimeout);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (busy) {
      e.preventDefault();
      return;
    }
    setBusy(true);
    setToast(true);
    timers.current.push(
      setTimeout(() => setBusy(false), BUSY_MS),
      setTimeout(() => setToast(false), TOAST_MS),
    );
    onStart?.();
  };

  return (
    <>
      <a
        href={CATALOG_PDF}
        download
        onClick={handleClick}
        aria-disabled={busy || undefined}
        aria-live="polite"
        className={cn(
          plain ? className : buttonClasses(variant, size, className),
          busy && "pointer-events-none opacity-70",
        )}
      >
        {busy ? (
          <span className="inline-flex items-center gap-1.5">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Downloading…
          </span>
        ) : (
          children
        )}
      </a>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {toast && (
              <motion.div
                role="status"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-4 bottom-4 z-100 mx-auto flex max-w-sm items-center gap-3 rounded-lg bg-ink px-4 py-3 text-white shadow-lg sm:inset-x-auto sm:right-6 sm:bottom-6"
              >
                <FileDown className="h-4 w-4 shrink-0 text-white/70" />
                <div className="text-[13px] leading-snug font-medium">Download started</div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
