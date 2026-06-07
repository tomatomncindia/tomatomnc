import type { ProductSpec } from "@/data/products";

export function SpecsTable({ specs }: { specs: ProductSpec[] }) {
  return (
    <div className="rounded-xl border border-line overflow-hidden bg-white">
      <div className="flex items-center justify-between border-b border-line bg-mustard-soft px-5 py-3">
        <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8B6A1E]">
          Product Specifications
        </p>
      </div>
      {/* Scrolls horizontally on narrow screens instead of clipping */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-[14px] font-tabular">
          <thead>
            <tr className="bg-paper text-left text-[11px] uppercase tracking-[0.12em] text-ink-muted">
              <th className="px-3.5 py-3 font-semibold sm:px-5">Width</th>
              <th className="px-3.5 py-3 font-semibold sm:px-5">Length</th>
              <th className="px-3.5 py-3 font-semibold sm:px-5">Type</th>
            </tr>
          </thead>
          <tbody>
            {specs.map((s) => (
              <tr key={s.refCode} className="border-t border-line">
                <td className="px-3.5 py-3.5 font-medium text-ink sm:px-5">{s.width}</td>
                <td className="px-3.5 py-3.5 text-ink-soft sm:px-5">{s.length}</td>
                <td className="px-3.5 py-3.5 text-ink-soft sm:px-5">
                  {s.packagingBox ?? "—"}
                  {s.packagingCase ? <span className="text-ink-muted"> · {s.packagingCase}</span> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
