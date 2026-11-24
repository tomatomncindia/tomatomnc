// Encodes the client's application videos into web-ready files for /how-to-use.
//   node scripts/encode-videos.mjs
//
// Why: Cloudflare Workers static assets are capped at 25 MiB per file, and the
// client masters are 30–73 MB. Masters live in media-src/videos/ (gitignored);
// this script writes compressed copies into public/ that deploy cleanly.
//
// Requires ffmpeg on PATH (winget install Gyan.FFmpeg / brew install ffmpeg).
//
// Outputs:
//   public/videos/<id>.mp4                  1080p H.264 + AAC, faststart, < 25 MiB
//   public/videos/how-to-use-teaser.mp4     silent ~12s montage for the home page
//   worker/video-sizes.json                 byte sizes the worker needs to answer
//                                           Range requests (see worker/video-range.ts)
//
// Refresh only the size manifest (e.g. after swapping a file by hand):
//   node scripts/encode-videos.mjs --manifest-only
//
// No poster images are generated: the client asked for none on /how-to-use
// (the player shows a typographic title slate instead).
//
// To add a video: drop the master in media-src/videos/, add an entry to VIDEOS
// below, run this script, then add the matching entry to src/data/videos.ts.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "media-src/videos");
const OUT_VIDEO = path.join(ROOT, "public/videos");

const MAX_BYTES = 25 * 1024 * 1024; // Cloudflare Workers static asset limit
const MANIFEST = path.join(ROOT, "worker/video-sizes.json");
const MANIFEST_ONLY = process.argv.includes("--manifest-only");

const VIDEOS = [
  {
    id: "tomato-cast-short-leg",
    source: "Tomato Cast, Short Leg application with Tomato Safe Pad.mp4",
  },
  {
    id: "tomato-splint-long-arm",
    source: "Tomato Splint, Long arm application.mp4",
  },
  {
    id: "tomato-splint-short-arm",
    source: "Tomato Splint, Short arm application.mp4",
  },
];

// Three ~4s shots, one per video, cut together for the home-page loop.
const TEASER_SHOTS = [
  { source: VIDEOS[0].source, start: 40, duration: 4.5 },
  { source: VIDEOS[1].source, start: 50, duration: 4 },
  { source: VIDEOS[2].source, start: 63.5, duration: 4 },
];

function ffmpeg(args) {
  const res = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    stdio: "inherit",
  });
  if (res.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MiB`;

function encodeAll() {
  fs.mkdirSync(OUT_VIDEO, { recursive: true });

  for (const v of VIDEOS) {
    const input = path.join(SRC, v.source);
    const output = path.join(OUT_VIDEO, `${v.id}.mp4`);
    console.log(`→ ${v.id}`);

    // CRF for quality, with a maxrate ceiling so the longest clip (2:00) stays
    // under the 25 MiB asset cap. Footage is clean studio work, so 1080p holds
    // up well at this rate. faststart moves the index to the front so playback
    // begins before the whole file downloads.
    ffmpeg([
      "-i", input,
      "-c:v", "libx264", "-preset", "slow", "-crf", "24",
      "-maxrate", "1500k", "-bufsize", "3000k",
      "-profile:v", "high", "-level", "4.0", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "96k", "-ac", "2",
      "-movflags", "+faststart",
      output,
    ]);

    const size = fs.statSync(output).size;
    console.log(`  ${mb(size)}${size > MAX_BYTES ? "  ⚠ OVER CLOUDFLARE LIMIT" : ""}`);
  }

  // Teaser montage — silent, 720p, small enough to autoplay on the home page.
  console.log("→ how-to-use-teaser");
  const inputs = TEASER_SHOTS.flatMap((s) => [
    "-ss", String(s.start), "-t", String(s.duration), "-i", path.join(SRC, s.source),
  ]);
  const chains = TEASER_SHOTS.map(
    (_, i) => `[${i}:v]scale=1280:-2,setsar=1,fps=30[v${i}]`,
  ).join(";");
  const concat = `${TEASER_SHOTS.map((_, i) => `[v${i}]`).join("")}concat=n=${TEASER_SHOTS.length}:v=1:a=0[out]`;
  const teaser = path.join(OUT_VIDEO, "how-to-use-teaser.mp4");
  ffmpeg([
    ...inputs,
    "-filter_complex", `${chains};${concat}`,
    "-map", "[out]", "-an",
    "-c:v", "libx264", "-preset", "slow", "-crf", "27",
    "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    teaser,
  ]);
  console.log(`  ${mb(fs.statSync(teaser).size)}`);
}

// Size manifest for the worker's Range handling.
function writeManifest() {
  const sizes = Object.fromEntries(
    fs
      .readdirSync(OUT_VIDEO)
      .filter((f) => f.endsWith(".mp4"))
      .sort()
      .map((f) => [`/videos/${f}`, fs.statSync(path.join(OUT_VIDEO, f)).size]),
  );
  fs.writeFileSync(MANIFEST, JSON.stringify(sizes, null, 2) + "\n");
  console.log(`→ ${path.relative(ROOT, MANIFEST)} (${Object.keys(sizes).length} videos)`);
}

if (!MANIFEST_ONLY) encodeAll();
writeManifest();
console.log("Done.");
