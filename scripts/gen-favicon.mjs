// Generates every logo/icon asset for all platforms from the brand wordmark.
//   node scripts/gen-favicon.mjs
//
// Source: public/tomatomncindia.png (1066x444 wordmark — tomato mark + "TOMATO M&C India")
//
// Square icons (favicon, apple touch, PWA) use the TOMATO FRUIT MARK cropped
// out of the wordmark — the full wordmark is illegible at 16–48px. The crop is
// found by scanning for the red fruit pixels (left 62% of the canvas, so the
// red "India" text on the right is excluded) and then extending vertically to
// capture the green leaf above and the swoosh arc below.
//
// Outputs:
// All outputs are transparent — no white-background variants.
//   src/app/favicon.ico          16/32/48/64/256 multi-size (tab icon)
//   src/app/icon.png             512x512 transparent (modern tab / PWA)
//   src/app/icon.svg             scalable icon (mark, embedded raster)
//   src/app/apple-icon.png       180x180 transparent (iOS home screen)
//   public/icons/icon-192.png    PWA manifest, transparent
//   public/icons/icon-512.png    PWA manifest, transparent
//   public/icons/mark.png        512 square mark, transparent (general use)
//   public/logo.svg              full wordmark, scalable (embedded raster)
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve(process.cwd(), "public/tomatomncindia.png");
const APP = path.resolve(process.cwd(), "src/app");
const ICONS = path.resolve(process.cwd(), "public/icons");
fs.mkdirSync(ICONS, { recursive: true });

/* ── 1. Locate the tomato mark inside the wordmark ─────────────────── */

async function findMarkCrop() {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels } = info;

  // Bounding box of the red fruit (ignore the red "India" text on the right).
  const xLimit = Math.floor(W * 0.62);
  let x0 = W, x1 = 0, y0 = H, y1 = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < xLimit; x++) {
      const i = (y * W + x) * channels;
      const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      if (a > 200 && r > 140 && g < 110 && b < 110) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }

  // Extend vertically within the fruit's x-range to include the green leaf
  // (above) and the swoosh arc (below) so nothing is sliced mid-stroke.
  let top = y0, bottom = y1;
  for (let y = 0; y < H; y++) {
    for (let x = x0; x <= x1; x++) {
      const i = (y * W + x) * channels;
      if (data[i + 3] > 200) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        break;
      }
    }
  }

  // Small breathing room, clamped to the canvas.
  const pad = Math.round((x1 - x0) * 0.02);
  const left = Math.max(0, x0 - pad);
  const width = Math.min(W - left, x1 - x0 + pad * 2);
  const cTop = Math.max(0, top - pad);
  const height = Math.min(H - cTop, bottom - top + pad * 2);
  return { left, top: cTop, width, height };
}

const crop = await findMarkCrop();
const markBuffer = await sharp(SRC).extract(crop).png().toBuffer();

/* ── 2. Square compositor ──────────────────────────────────────────── */

// Fit the mark onto a square of `size`, occupying `scale` of the side.
async function squareMark(size, { scale = 0.9, background = { r: 0, g: 0, b: 0, alpha: 0 } } = {}) {
  const inner = Math.round(size * scale);
  const mark = await sharp(markBuffer)
    .resize({ width: inner, height: inner, fit: "inside" })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

/* ── 3. favicon.ico (multi-size PNG-packed) ────────────────────────── */

function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const dirs = images.map(({ size, buffer }) => {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 => 256)
    dir.writeUInt8(size >= 256 ? 0 : size, 1); // height
    dir.writeUInt8(0, 2); // color palette
    dir.writeUInt8(0, 3); // reserved
    dir.writeUInt16LE(1, 4); // color planes
    dir.writeUInt16LE(32, 6); // bits per pixel
    dir.writeUInt32LE(buffer.length, 8);
    dir.writeUInt32LE(offset, 12);
    offset += buffer.length;
    return dir;
  });

  return Buffer.concat([header, ...dirs, ...images.map((i) => i.buffer)]);
}

const icoSizes = [16, 32, 48, 64, 256];
const icoImages = [];
for (const size of icoSizes) {
  icoImages.push({ size, buffer: await squareMark(size, { scale: 0.94 }) });
}
fs.writeFileSync(path.join(APP, "favicon.ico"), buildIco(icoImages));

/* ── 4. App-route icons (Next serves these automatically) ──────────── */

// Modern tab / PWA icon.
fs.writeFileSync(path.join(APP, "icon.png"), await squareMark(512));

// Apple touch icon — kept transparent per brand preference.
fs.writeFileSync(path.join(APP, "apple-icon.png"), await squareMark(180, { scale: 0.85 }));

// Scalable icon — SVG wrapper around the high-res mark (crisp at any size,
// no manual tracing of the artwork required).
const mark512 = await squareMark(512);
fs.writeFileSync(
  path.join(APP, "icon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><image width="512" height="512" href="data:image/png;base64,${mark512.toString("base64")}"/></svg>`,
);

/* ── 5. PWA manifest icons ─────────────────────────────────────────── */

fs.writeFileSync(path.join(ICONS, "icon-192.png"), await squareMark(192));
fs.writeFileSync(path.join(ICONS, "icon-512.png"), mark512);

// General-purpose square mark.
fs.writeFileSync(path.join(ICONS, "mark.png"), mark512);

/* ── 6. Full wordmark as scalable SVG ──────────────────────────────── */

const wordmark = await sharp(SRC).png().toBuffer();
const meta = await sharp(SRC).metadata();
fs.writeFileSync(
  path.resolve(process.cwd(), "public/logo.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${meta.width} ${meta.height}" width="${meta.width}" height="${meta.height}"><image width="${meta.width}" height="${meta.height}" href="data:image/png;base64,${wordmark.toString("base64")}"/></svg>`,
);

console.log(`Mark crop: ${JSON.stringify(crop)}`);
console.log("Wrote favicon.ico, icon.png, icon.svg, apple-icon.png → src/app/");
console.log("Wrote icon-192/512, mark.png → public/icons/");
console.log("Wrote logo.svg → public/");
