"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Children, isValidElement, type ReactNode } from "react";

/**
 * Staggered word reveal for hero headings.
 *
 * Wraps each word in an inline mask + translate-up to give the impression
 * of typeset words being slotted into place. Maintains layout (so it doesn't
 * cause CLS) by using overflow:hidden on the wrapper, not the word.
 *
 * Children may include inline <span> formatting (e.g. italic accents) — the
 * reveal recurses into spans so a styled span still animates as one word.
 */
export function WordReveal({
  children,
  className,
  delay = 0,
  stagger = 0.06,
  as: Tag = "h1",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const reduce = useReducedMotion();
  const words = collectWords(children);

  if (reduce) {
    const MotionTag = motion[Tag] as typeof motion.div;
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };

  const word: Variants = {
    hidden: { y: "115%" },
    visible: {
      y: "0%",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={container}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom pb-[0.05em]"
        >
          {w.isBreak ? (
            <span style={{ display: "block", width: 0, height: 0 }} aria-hidden />
          ) : (
            <motion.span
              variants={word}
              className="inline-block will-change-transform"
              style={w.style}
            >
              {w.content}
              {w.trailingSpace ? " " : ""}
            </motion.span>
          )}
          {w.isBreak ? <br /> : null}
        </span>
      ))}
    </MotionTag>
  );
}

type Word = {
  content: ReactNode;
  trailingSpace: boolean;
  isBreak: boolean;
  style?: React.CSSProperties;
};

/**
 * Walks the children tree, splitting text nodes into words and preserving
 * inline <span> formatting. Each word gets a placeholder for animation.
 */
function collectWords(children: ReactNode): Word[] {
  const out = walkChildren(children);
  // JSX trims whitespace adjacent to newlines, so a space between a text node
  // and an inline <span> can vanish from the source. Guarantee a separating
  // space between any two consecutive words (breaks don't need one).
  for (let i = 0; i < out.length - 1; i++) {
    if (!out[i].isBreak && !out[i + 1].isBreak) out[i].trailingSpace = true;
  }
  return out;
}

function walkChildren(children: ReactNode): Word[] {
  const out: Word[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      const parts = child.split(/\s+/).filter(Boolean);
      parts.forEach((p, i) => {
        out.push({
          content: p,
          trailingSpace: i < parts.length - 1 || /\s$/.test(child),
          isBreak: false,
        });
      });
    } else if (isValidElement<{ children?: ReactNode; className?: string; style?: React.CSSProperties }>(child)) {
      if (child.type === "br") {
        out.push({ content: "", trailingSpace: false, isBreak: true });
        return;
      }
      // Wrap each word from a span in the span's styling
      const inner = collectWords(child.props.children);
      inner.forEach((w) => {
        out.push({
          ...w,
          content: (
            <span className={child.props.className} style={child.props.style}>
              {w.content}
            </span>
          ),
        });
      });
    }
  });
  return out;
}
