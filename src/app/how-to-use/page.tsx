import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { VideoGuideList } from "@/components/how-to-use/VideoGuideList";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How to Use: Application Videos",
  description:
    "Watch Tomato Cast and Tomato Splint applied step by step: short leg cast with Tomato Safe Pad, long arm splint and short arm splint.",
  path: "/how-to-use",
});

export default function HowToUsePage() {
  return (
    <>
      <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">How to use</p>
          </Reveal>
          <WordReveal
            as="h1"
            delay={0.1}
            stagger={0.06}
            className="font-display mt-4 text-[40px] leading-[1.05] tracking-[-0.02em] sm:text-[52px] lg:text-[60px]"
          >
            See it applied, <span className="editorial-italic text-forest">step by step.</span>
          </WordReveal>
          <Reveal delay={0.12}>
            <p className="text-ink-soft mt-5 max-w-2xl text-[16.5px] leading-relaxed">
              Short application videos for Tomato Cast and Tomato Splint.
            </p>
          </Reveal>
        </div>
      </Container>

      <Container className="pb-20 md:pb-28">
        <VideoGuideList />
        <p className="text-ink-muted mt-10 text-[13px] leading-relaxed">
          For demonstration only. Always follow the instructions for use supplied with each
          product.
        </p>
      </Container>
    </>
  );
}
