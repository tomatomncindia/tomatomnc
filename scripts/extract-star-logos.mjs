// Extracts the Star product-line logos from the client-supplied PDF.
//   node scripts/extract-star-logos.mjs
//
// Source: ref/Star Cast Roll Final logos dt.6.5.26.pdf — one page, five
// vector logos stacked vertically (Star Stockinet x2 variants, Star Cast
// Roll, Star Cast, Star 2in1 Safe Pad).
//
// The page is rendered at high scale with a transparent background (the
// art has no background fill), then split into logo bands by scanning row
// alpha coverage, trimmed, and written as transparent PNGs.
//
// Outputs (public/images/products/logos/):
//   star-stockinet-a.png      variant 1 (top)
//   star-stockinet.png        variant 2 (assumed final — bottom of the pair)
//   star-cast-roll.png
//   star-cast.png
//   star-2in1-safe-pad.png
import fs from "node:fs";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";

const PDF = path.resolve(process.cwd(), "ref/Star Cast Roll Final logos dt.6.5.26.pdf");
const OUT = path.resolve(process.cwd(), "public/images/products/logos");
fs.mkdirSync(OUT, { recursive: true });

const SCALE = 4; // ~288 DPI; logos come out ~2800px wide
const NAMES = [
  "star-stockinet-a",
  "star-stockinet",
  "star-cast-roll",
  "star-cast",
  "star-2in1-safe-pad",
];

const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");

const doc = await getDocument({
  data: new Uint8Array(fs.readFileSync(PDF)),
  useSystemFonts: true,
}).promise;
const page = await doc.getPage(1);
const viewport = page.getViewport({ scale: SCALE });

const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
const ctx = canvas.getContext("2d");
await page.render({
  canvasContext: ctx,
  viewport,
  background: "rgba(0,0,0,0)", // keep the page transparent — art has no bg fill
}).promise;

const W = canvas.width;
const H = canvas.height;
const { data } = ctx.getImageData(0, 0, W, H);

// A pixel belongs to a logo if it is visibly opaque.
const rowHasInk = new Array(H).fill(false);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (data[(y * W + x) * 4 + 3] > 16) {
      rowHasInk[y] = true;
      break;
    }
  }
}

// Group inked rows into bands, bridging gaps smaller than GAP px (the "TM"
// superscripts float slightly above the wordmarks).
const GAP = Math.round(18 * SCALE);
const bands = [];
let start = -1;
let lastInk = -1;
for (let y = 0; y < H; y++) {
  if (rowHasInk[y]) {
    if (start === -1) start = y;
    lastInk = y;
  } else if (start !== -1 && y - lastInk > GAP) {
    bands.push([start, lastInk]);
    start = -1;
  }
}
if (start !== -1) bands.push([start, lastInk]);

if (bands.length !== NAMES.length) {
  console.error(
    `Expected ${NAMES.length} logo bands, found ${bands.length}:`,
    bands.map(([a, b]) => `${a}-${b}`).join(", "),
  );
  process.exit(1);
}

const png = canvas.toBuffer("image/png");

for (let i = 0; i < bands.length; i++) {
  const [y0, y1] = bands[i];
  // Horizontal extent of this band
  let x0 = W;
  let x1 = 0;
  for (let y = y0; y <= y1; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] > 16) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
      }
    }
  }

  const out = path.join(OUT, `${NAMES[i]}.png`);
  await sharp(png)
    .extract({ left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 })
    // Web-friendly size — displayed at <= 40px tall, 240px covers 6x DPR
    .resize({ height: 240 })
    .png({ compressionLevel: 9 })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`${NAMES[i]}.png  ${meta.width}x${meta.height}`);
}

console.log(`\nDone -> ${path.relative(process.cwd(), OUT)}`);
