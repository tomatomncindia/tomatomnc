/**
 * Application videos shown on /how-to-use (and linked from the home page and
 * product pages).
 *
 * Files are generated from the client masters by `node scripts/encode-videos.mjs`
 * (masters live in media-src/videos/, which is gitignored).
 */

export type GuideVideo = {
  /** Also used as the URL hash: /how-to-use#<id> */
  id: string;
  /** Product slug in src/data/products.ts */
  product: "tomato-cast" | "tomato-splint";
  productName: string;
  title: string;
  summary: string;
  src: string;
};

export const GUIDE_VIDEOS: GuideVideo[] = [
  {
    id: "tomato-cast-short-leg",
    product: "tomato-cast",
    productName: "Tomato Cast",
    title: "Short leg cast with Tomato Safe Pad",
    summary:
      "A full below-knee application: padding with Tomato Safe Pad, wetting, spiral wrapping and moulding, then removal with a cast saw.",
    src: "/videos/tomato-cast-short-leg.mp4",
  },
  {
    id: "tomato-splint-long-arm",
    product: "tomato-splint",
    productName: "Tomato Splint",
    title: "Long arm splint",
    summary:
      "Measuring, cutting and positioning a long arm splint around the elbow, then securing and moulding it with an elastic bandage.",
    src: "/videos/tomato-splint-long-arm.mp4",
  },
  {
    id: "tomato-splint-short-arm",
    product: "tomato-splint",
    productName: "Tomato Splint",
    title: "Short arm splint",
    summary:
      "A forearm splint from start to finish: measuring and trimming, the water spray and towel dry, then wrapping and moulding to the hand.",
    src: "/videos/tomato-splint-short-arm.mp4",
  },
];

/** Silent montage looped on the home page (built by the encode script). */
export const GUIDE_TEASER = {
  src: "/videos/how-to-use-teaser.mp4",
};

export function getVideosForProduct(slug: string) {
  return GUIDE_VIDEOS.filter((v) => v.product === slug);
}
