# Tomato M&C — Corporate Website

Production website for Tomato M&C Co. Ltd., a Korean manufacturer of synthetic orthopedic casting tape, splints, and immobilization accessories.

## Stack

- **Next.js 15** (App Router, RSC, server actions)
- **React 19**
- **Tailwind CSS v4** (PostCSS, `@theme` tokens)
- **TypeScript** (strict)
- **lucide-react** icons
- **react-hook-form + zod** forms
- **Resend** transactional email
- **Cloudflare Turnstile** bot protection
- **motion** for restrained animations

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
