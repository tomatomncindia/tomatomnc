import Link from "next/link";
import { ArrowUpRight, Globe, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";
import { CatalogDownload } from "@/components/ui/CatalogDownload";
import { CATALOG_PDF, SITE, telHref } from "@/data/site";

const navCols = [
  {
    title: "Products",
    links: [
      { label: "Casting", href: "/products" },
      { label: "Splints", href: "/products" },
      { label: "Supporting Products", href: "/products" },
      { label: "Full catalog (PDF)", href: CATALOG_PDF },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Manufacturing", href: "/manufacturing" },
      { label: "Certifications", href: "/network#quality" },
      { label: "Founders", href: "/founders" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Network",
    links: [
      { label: "Global Markets", href: "/network#markets" },
      { label: "Become a distributor", href: "/contact?type=distributor" },
    ],
  },
];

const CERTIFICATION_MARKS = [
  "ISO 13485",
  "ISO 9001",
  "ISO 14001",
  "FDA Registration",
  "CE Mark",
  "KGMP",
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
      {/* Top band: region + parent company */}
      <div className="border-b border-white/10">
        <div className="container-page grid items-start gap-10 py-12 md:grid-cols-12 md:gap-12 md:py-16">
          {/* Region selector */}
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">
              REGION
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {REGIONS.map((r, i) => (
                <button
                  key={r.code}
                  type="button"
                  className={
                    i === 0
                      ? "inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-white uppercase"
                      : "inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-white/55 uppercase transition-colors hover:border-white/30 hover:text-white"
                  }
                >
                  {i === 0 ? <Globe className="h-3 w-3" /> : null}
                  {r.label}
                </button>
              ))}
            </div>
            <p className="mt-4 max-w-md text-[12.5px] leading-relaxed text-white/40">
              Regional pricing, documentation, and distributor contacts adapt to your selection.
            </p>
          </div>

          {/* Parent company */}
          <div className="md:col-span-5 md:border-l md:border-white/10 md:pl-12">
            <p className="font-mono text-[11px] tracking-[0.18em] text-white/50 uppercase">
              PARENT COMPANY
            </p>
            <div className="mt-4 text-[15px] text-white/85">Blackchip Impex Pvt. Ltd.</div>
          </div>
        </div>
      </div>

      {/* Middle band: navigation + quality docs */}
      <div className="border-b border-white/10">
        {/* Mobile: brand block full-width, link columns 2-up. md+: 12-col row. */}
        <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-12 md:gap-12 md:py-16">
          <div className="col-span-2 md:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/60">
              {SITE.tagline}
            </p>
            <address className="mt-6 text-[13.5px] leading-relaxed text-white/60 not-italic">
              <div className="text-white/80">{SITE.contact.company}</div>
              {SITE.contact.addressLines.map((l) => (
                <div key={l}>{l}</div>
              ))}
              <div className="mt-2 tabular-nums">
                {SITE.contact.phones.map((phone, i) => (
                  <span key={phone}>
                    {i > 0 && " · "}
                    <a
                      href={telHref(phone)}
                      aria-label={`Call ${phone}`}
                      className="underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      {phone}
                    </a>
                  </span>
                ))}
              </div>
              <a
                href={`mailto:${SITE.contact.salesEmail}`}
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {SITE.contact.salesEmail}
              </a>
            </address>
          </div>

          {navCols.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-2">
              <h3 className="font-mono text-[11px] font-medium tracking-[0.16em] text-white uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const isExternal = "external" in l && l.external;
                  const linkClass =
                    "text-[13.5px] text-white/60 transition-colors hover:text-white";
                  if (l.href === CATALOG_PDF) {
                    return (
                      <li key={l.label}>
                        <CatalogDownload plain className={linkClass}>
                          {l.label}
                        </CatalogDownload>
                      </li>
                    );
                  }
                  return (
                    <li key={l.label}>
                      {isExternal ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 text-[13.5px] text-white/60 transition-colors hover:text-white"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-[13.5px] text-white/60 transition-colors hover:text-white"
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

          {/* Certifications */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-mono text-[11px] font-medium tracking-[0.16em] text-white uppercase">
              Certifications
            </h3>
            <ul className="mt-4 space-y-2">
              {CERTIFICATION_MARKS.map((label) => (
                <li key={label}>
                  <span className="group inline-flex items-center gap-1.5 text-[13px] text-white/60 transition-colors hover:text-white">
                    <ShieldCheck className="group-hover:text-mid-green h-3 w-3 text-white/30 transition-colors" />
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="container-page flex flex-col gap-4 py-6 font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase md:flex-row md:items-center md:justify-between">
        <p>© {year} Blackchip Impex Pvt. Ltd. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {/* Plain labels for now — client asked for non-clickable items; pages live at /privacy, /terms, /compliance when re-enabled. */}
          <span className="cursor-default transition-colors hover:text-white">Privacy</span>
          <span className="cursor-default transition-colors hover:text-white">Terms</span>
          <span className="cursor-default transition-colors hover:text-white">Compliance</span>
        </div>
      </div>
    </footer>
  );
}
