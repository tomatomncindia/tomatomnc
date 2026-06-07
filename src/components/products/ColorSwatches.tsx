/**
 * Color index — mirrors the official Tomato M&C catalog color chart (15 colors).
 * Hovering a swatch reveals the color's playful tagline (not the color name),
 * per the brand hover-state spec.
 */
const COLOR_MAP: Record<string, { name: string; code: string; hex: string; tagline: string }> = {
  white: { name: "White", code: "WH", hex: "#F5F5F2", tagline: "Fresh smiles" },
  green: { name: "Green", code: "GR", hex: "#1FA34A", tagline: "Bright growth" },
  purple: { name: "Purple", code: "PU", hex: "#7B3F9D", tagline: "Fun magic" },
  pink: { name: "Pink", code: "PN", hex: "#EC1E79", tagline: "Sweet joy" },
  blue: { name: "Blue", code: "BL", hex: "#1F60C2", tagline: "Happy vibes" },
  red: { name: "Red", code: "RD", hex: "#D7322A", tagline: "Pure excitement" },
  orange: { name: "Orange", code: "OR", hex: "#F58220", tagline: "Bright sparks" },
  yellow: { name: "Yellow", code: "YL", hex: "#F2E22A", tagline: "Pure sunshine" },
  grey: { name: "Grey", code: "GY", hex: "#9A9A9A", tagline: "Cozy comfort" },
  black: { name: "Black", code: "BK", hex: "#1A1A1A", tagline: "Bold strength" },
  "sky-blue": { name: "Sky Blue (Blue Clear)", code: "SB", hex: "#7EC8E3", tagline: "Happy days" },
  "neon-green": { name: "Neon Green", code: "NG", hex: "#C3E72A", tagline: "High sparks" },
  "green-pastel": { name: "Green Pastel", code: "GP", hex: "#8CD790", tagline: "Soft giggles" },
  "pink-pastel": { name: "Pink Pastel", code: "PP", hex: "#F49AC1", tagline: "Sweet smiles" },
  "ocean-green": { name: "Ocean Green", code: "OG", hex: "#18B07B", tagline: "Bright breeze" },
};

export function ColorSwatches({ colors }: { colors: string[] }) {
  return (
    <div>
      <p className="eyebrow">Color Index</p>
      <ul className="mt-4 grid grid-cols-5 gap-x-3 gap-y-4 sm:grid-cols-8">
        {colors.map((c) => {
          const data = COLOR_MAP[c] ?? { name: c, code: "", hex: "#888", tagline: c };
          return (
            <li key={c} className="group relative flex flex-col items-center gap-1.5">
              {/* Hover tagline bubble */}
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 text-[11px] font-medium text-white opacity-0 translate-y-1 transition-all duration-200 [transition-timing-function:var(--ease-out-quint)] group-hover:opacity-100 group-hover:translate-y-0 shadow-[var(--shadow-soft)]"
              >
                {data.tagline}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ink"
                />
              </span>

              <span
                aria-label={data.name}
                style={{ backgroundColor: data.hex }}
                className="h-9 w-9 rounded-full border border-line shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] transition-transform duration-200 [transition-timing-function:var(--ease-out-quint)] group-hover:scale-110"
              />
              <span className="text-[10px] text-ink-muted text-center leading-tight">
                {data.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
