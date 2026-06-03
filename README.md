# Tomato M&C India — Corporate Website

Production website (India market) for Tomato M&C Co. Ltd., a Korean manufacturer of synthetic orthopedic casting tape, splints, and immobilization accessories. Targets hospitals and distributors across India.

Production domain: **https://tomatomncindia.com** · Hosted on **Cloudflare Workers** (via OpenNext).

## Stack

- **Next.js 16** (App Router, RSC, server actions)
- **React 19**
- **Tailwind CSS v4** (PostCSS, `@theme` tokens)
- **TypeScript** (strict)
- **lucide-react** icons
- **react-hook-form + zod** forms
- **Resend** transactional email
- **Cloudflare Turnstile** bot protection
- **motion** for restrained animations
- **OpenNext + Cloudflare Workers** for hosting

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in keys
npm run dev
```

Open http://localhost:3000.

## Structure

```
src/
  app/                  # routes (App Router)
  components/
    layout/             # Navbar, Footer, Container, Section
    sections/           # page-level composed sections
    products/           # product-specific components
    ui/                 # primitive UI (Button, Tabs, etc.)
    motion/             # animation wrappers
  data/                 # typed content data (products, certs, markets)
  lib/                  # utilities, SEO helpers
  styles/               # globals.css (Tailwind v4 @theme)
public/
  images/               # optimized assets
  downloads/            # PDF catalog, datasheets, certificates
```

## Pages

- `/` — Home
- `/about` — About / heritage / certifications summary
- `/products` — Catalog grid + Downloads tab (catalog PDFs, datasheets)
- `/products/[slug]` — Product detail (SSG)
- `/manufacturing` — Facility, automation, capacity
- `/network` — Global markets, OEM/private label, quality certifications
- `/contact` — Inquiry forms (sample, distributor, OEM)

## SEO

All SEO is centralized — update the helper, not individual pages:

- `src/lib/seo.ts` — `SITE_URL`, base metadata, India-market title/description/keywords, Open Graph (`en_IN`), Twitter cards. `pageMetadata()` builds per-page canonical + OG.
- `src/app/robots.ts` → `/robots.txt` · `src/app/sitemap.ts` → `/sitemap.xml` · `src/app/manifest.ts` → `/manifest.webmanifest`
- `src/app/opengraph-image.tsx` — dynamic 1200×630 OG image.
- JSON-LD structured data: `Organization` (root `layout.tsx`, `areaServed: India`), `Product` + `BreadcrumbList` (`products/[slug]`).

The canonical domain comes from `NEXT_PUBLIC_SITE_URL` (falls back to `https://tomatomncindia.com`). Set it in production.

After the DNS goes live, submit `https://tomatomncindia.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

## Deployment — Cloudflare Workers

The app runs on Cloudflare Workers via the [OpenNext](https://opennext.js.org/cloudflare) adapter (`wrangler.jsonc`, `open-next.config.ts`).

```bash
# One-time: authenticate wrangler
npx wrangler login

# Set production secrets (NOT committed)
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put INQUIRY_TO_EMAIL
npx wrangler secret put INQUIRY_FROM_EMAIL

# Build + preview locally in the Workers runtime
npm run preview

# Build + deploy to Cloudflare
npm run deploy
```

Public, non-secret vars live in `wrangler.jsonc` under `vars` (e.g. `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`). After the first deploy, add the custom domain `tomatomncindia.com` to the Worker in the Cloudflare dashboard (Workers → your worker → Settings → Domains & Routes).

> Email sending requires a verified domain in [Resend](https://resend.com); `INQUIRY_FROM_EMAIL` must be on that domain. Without `RESEND_API_KEY`, the contact form still accepts submissions but logs instead of sending.
