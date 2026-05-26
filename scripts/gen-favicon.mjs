// Generates the browser-tab favicon and apple touch icon from the brand logo.
// The wordmark is wide (1066x444), so it is centered on a square canvas with
// padding (aspect preserved — never squished) and packed into a multi-size .ico.
//   node scripts/gen-favicon.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve(process.cwd(), "public/tomatomnclogo.png");
const APP = path.resolve(process.cwd(), "src/app");

// Fit the logo onto a transparent square of `size`, occupying ~88% width.
async function squareLogo(size, background = { r: 0, g: 0, b: 0, alpha: 0 }) {
  const logoW = Math.round(size * 0.88);
  const logo = await sharp(SRC)
    .resize({ width: logoW, fit: "inside" })
    .toBuffer({ resolveWithObject: true });
  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: logo.data, gravity: "center" }])
    .png()
    .toBuffer();
}

// Pack PNG-encoded images into a single .ico container.
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
const images = [];
for (const size of icoSizes) {
  images.push({ size, buffer: await squareLogo(size) });
}
fs.writeFileSync(path.join(APP, "favicon.ico"), buildIco(images));

// Apple touch icon — iOS masks to a rounded square and renders transparency as
// black, so flatten onto white. 180x180 is the modern standard.
const apple = await squareLogo(180, { r: 255, g: 255, b: 255, alpha: 1 });
fs.writeFileSync(path.join(APP, "apple-icon.png"), apple);

// Crisp PNG icon for tabs / PWA contexts.
fs.writeFileSync(path.join(APP, "icon.png"), await squareLogo(256));

console.log("Wrote favicon.ico, apple-icon.png, icon.png to src/app/");
