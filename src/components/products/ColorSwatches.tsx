const COLOR_MAP: Record<string, { name: string; hex: string }> = {
  white: { name: "White", hex: "#F5F5F2" },
  navy: { name: "Navy", hex: "#19305A" },
  "royal-blue": { name: "Royal Blue", hex: "#1F60C2" },
  "sky-blue": { name: "Sky Blue", hex: "#6FB7E0" },
  "neon-green": { name: "Neon Green", hex: "#5FC23A" },
  "ocean-green": { name: "Ocean Green", hex: "#138D6B" },
  pastel: { name: "Pastel", hex: "#B7A6DA" },
  red: { name: "Red", hex: "#D7322A" },
  burgundy: { name: "Burgundy", hex: "#7B1F2B" },
  pink: { name: "Pink", hex: "#E47BA2" },
  purple: { name: "Purple", hex: "#7B3F9D" },
  green: { name: "Forest Green", hex: "#0E7B5C" },
  teal: { name: "Teal", hex: "#138D8D" },
  orange: { name: "Orange", hex: "#E97A2A" },
  yellow: { name: "Yellow", hex: "#E5C32A" },
  black: { name: "Black", hex: "#1A1A1A" },
  grey: { name: "Grey", hex: "#7A7A7A" },
};

export function ColorSwatches({ colors }: { colors: string[] }) {
  return (
    <div>
      <p className="eyebrow">Available Colors</p>
      <ul className="mt-4 grid grid-cols-7 gap-3 sm:grid-cols-7 md:grid-cols-7">
        {colors.map((c) => {
          const data = COLOR_MAP[c] ?? { name: c, hex: "#888" };
          return (
            <li key={c} className="flex flex-col items-center gap-1.5">
              <span
                title={data.name}
                style={{ backgroundColor: data.hex }}
                className="h-9 w-9 rounded-full border border-line shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
              />
              <span className="text-[10px] text-ink-muted text-center leading-tight">{data.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
