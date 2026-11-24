import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Flat config (ESLint 9). Replaces the legacy .eslintrc.json, which ESLint 9
// no longer reads; `next lint` was removed in Next 16, so `npm run lint` runs
// ESLint directly.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    ".open-next/**",
    ".wrangler/**",
    "out/**",
    "build/**",
    "media-src/**",
    "next-env.d.ts",
    "cloudflare-env.d.ts",
  ]),
]);
