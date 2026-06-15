// Generates the static Open Graph image at build/author time.
//
// Why static: rendering the OG image at request time pulls `@vercel/og`
// (satori + resvg.wasm, ~3 MB combined) into the single Cloudflare Worker
// bundle. That weight is parsed on every cold start and was tripping
// Cloudflare's startup resource budget → intermittent error 1102
// ("worker exceeded resource limits"). The OG image is fully static, so we
// rasterize it once here and ship a plain PNG instead.
//
// Run:  node scripts/gen-og.mjs
// Output: src/app/opengraph-image.png  (Next picks it up by file convention)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../src/app/opengraph-image.png");

const W = 1200;
const H = 630;

// Palette mirrors the previous next/og design (src/app/opengraph-image.tsx).
const BG = "#FAF9F6";
const RED = "#D80C18";
const INK = "#1A1A1A";
const GREEN = "#008E5F";
const MUTED = "#4A4A4A";

const serif = "Georgia, 'Times New Roman', 'Noto Serif', serif";
const sans = "Arial, 'Helvetica Neue', Helvetica, 'Noto Sans', sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- Brand mark -->
  <circle cx="86" cy="88" r="14" fill="${RED}"/>
  <circle cx="86" cy="88" r="4" fill="#ffffff"/>
  <text x="112" y="96" font-family="${sans}" font-size="24" font-weight="600" fill="${INK}">Tomato <tspan fill="${RED}">M&amp;C</tspan> India</text>

  <!-- Eyebrow -->
  <text x="72" y="300" font-family="${sans}" font-size="18" font-weight="600" letter-spacing="4" fill="${GREEN}">ORTHOPEDIC CASTING SOLUTIONS</text>

  <!-- Headline -->
  <g font-family="${serif}" font-size="82" letter-spacing="-2" fill="${INK}">
    <text x="70" y="372">Korea&apos;s Leading</text>
    <text x="70" y="457">Fiberglass Cast</text>
    <text x="70" y="542">Manufacturer.</text>
  </g>

  <!-- Footer -->
  <text x="72" y="585" font-family="${sans}" font-size="18" fill="${MUTED}">ISO 13485 · FDA · CE · KGMP</text>
  <text x="${W - 72}" y="585" text-anchor="end" font-family="${sans}" font-size="18" fill="${MUTED}">Since 2005 · 30+ Countries</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`Wrote ${path.relative(process.cwd(), OUT)} (${W}x${H})`);
