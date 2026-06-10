import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Pin the workspace root to this project so Next doesn't pick up a
  // stray parent-directory lockfile when inferring the Turbopack root.
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    // Source images are already hand-optimized WebP (~50–160 KB). Routing them
    // through the runtime optimizer on the Cloudflare Worker added no real
    // benefit and broke decoding in Safari (the AVIF/Accept-negotiation path is
    // fragile in the Workers WASM runtime — Chrome got a working variant, Safari
    // got a failed transform → broken-image placeholder). Serve the static WebP
    // assets straight from the CDN instead.
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

// Enable Cloudflare bindings (env vars, etc.) during `next dev`.
// No-op for `next build` / production. Safe to keep enabled.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
