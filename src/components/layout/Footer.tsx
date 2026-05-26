import Link from "next/link";
import { ArrowUpRight, Globe, FileDown } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/data/site";
import { NewsletterSignup } from "./NewsletterSignup";

const navCols = [
  {
    title: "Products",
    links: [
      { label: "Casting", href: "/products?category=cast" },
      { label: "Splints", href: "/products?category=splint" },
      { label: "Accessories", href: "/products?category=accessory" },
      { label: "Full catalog (PDF)", href: "/products?tab=downloads" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Quality", href: "/network#quality" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Network",
    links: [
      { label: "OEM / Private Label", href: "/network#oem" },
      { label: "Global Markets", href: "/network#markets" },
      { label: "Become a distributor", href: "/contact?type=distributor" },
      { label: "Parent company", href: "https://www.tomatomnc.com", external: true },
    ],
  },
];

const QUALITY_DOCS = [
  { label: "ISO 13485", href: "/downloads/certificates/iso-13485.pdf" },
  { label: "ISO 9001", href: "/downloads/certificates/iso-9001.pdf" },
  { label: "ISO 14001", href: "/downloads/certificates/iso-14001.pdf" },
  { label: "FDA Registration", href: "/downloads/certificates/fda-registration.pdf" },
  { label: "CE Mark", href: "/downloads/certificates/ce-mark.pdf" },
  { label: "KGMP", href: "/downloads/certificates/kgmp.pdf" },
];

const REGIONS = [
  { code: "GLOBAL", label: "Global · English" },
  { code: "EU", label: "European Union" },
  { code: "US", label: "United States" },
  { code: "APAC", label: "Asia-Pacific" },
  { code: "MENA", label: "MENA" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      {/* Top band: newsletter + region */}
      <div className="border-b border-white/10">
        <div className="container-page py-12 md:py-16 grid gap-10 md:grid-cols-12 md:gap-12 items-start">
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mid-green">
              QUARTERLY BRIEF
            </p>
            <h2 className="mt-3 font-display text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.015em] text-white">
              Product updates, regulatory changes,
              <br className="hidden md:block" /> shipped to procurement teams quarterly.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/60 max-w-md">
              Four issues per year. Spec changes, new market clearances, and the occasional production-floor note. Unsubscribe in one click.
            </p>
            <div className="mt-6">
              <NewsletterSignup />
            </div>
          </div>

          {/* Region selector + parent company */}
          <div className="md:col-span-5 md:pl-12 md:border-l md:border-white/10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
              REGION
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {REGIONS.map((r, i) => (
                <button
                  key={r.code}
                  type="button"
                  className={
                    i === 0
                      ? "inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white"
                      : "inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/55 hover:text-white hover:border-white/30 transition-colors"
                  }
                >
                  {i === 0 ? <Globe className="h-3 w-3" /> : null}
                  {r.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[12.5px] text-white/40 leading-relaxed">
              Regional pricing, documentation, and distributor contacts adapt to your selection.
            </p>

            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href={SITE.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[13px] text-white/70 hover:text-white transition-colors"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  PARENT COMPANY
                </span>
                <span>tomatomnc.com</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Middle band: navigation + quality docs */}
      <div className="border-b border-white/10">
        <div className="container-page py-12 md:py-16 grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/60">
              {SITE.tagline}
            </p>
            <address className="mt-6 not-italic text-[13.5px] text-white/60 leading-relaxed">
              {SITE.contact.addressLines.map((l) => (
                <div key={l}>{l}</div>
              ))}
              <div className="mt-2 tabular-nums">{SITE.contact.phone}</div>
              <a
                href={`mailto:${SITE.contact.salesEmail}`}
                className="hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                {SITE.contact.salesEmail}
              </a>
            </address>
          </div>

          {navCols.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const isExternal = "external" in l && l.external;
                  return (
                    <li key={l.label}>
                      {isExternal ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/60 hover:text-white transition-colors"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-[13.5px] text-white/60 hover:text-white transition-colors"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Quality docs */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white">
              Quality
            </h3>
            <ul className="mt-4 space-y-2">
              {QUALITY_DOCS.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    className="group inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition-colors"
                  >
                    <FileDown className="h-3 w-3 text-white/30 group-hover:text-mid-green transition-colors" />
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="container-page py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
        <p>© {year} {SITE.legalName}. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/network#quality" className="hover:text-white transition-colors">
            Compliance
          </Link>
          <span className="tabular-nums">EN · ES · KO · AR · ZH</span>
        </div>
      </div>
    </footer>
  );
}
