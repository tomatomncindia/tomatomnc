import { ShieldCheck } from "lucide-react";

const CERTS = [
  "ISO 13485",
  "ISO 9001",
  "ISO 14001",
  "FDA Registered",
  "CE Mark · EU MDR",
  "KGMP",
];

/**
 * Full-width forest-green certification band.
 * Sits between the hero and product showcase as the primary trust signal.
 */
export function CertGreenBand() {
  return (
    <div className="bg-forest text-white">
      <div className="container-page py-5 md:py-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-3">
          {CERTS.map((cert, i) => (
            <li
              key={cert}
              className="inline-flex items-center gap-2 font-mono text-[11.5px] md:text-[12px] font-medium uppercase tracking-[0.16em] text-white"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-white/90" strokeWidth={2.2} />
              {cert}
              {i < CERTS.length - 1 ? (
                <span aria-hidden className="hidden md:inline-block h-3 w-px bg-white/25 ml-6 md:ml-10" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
