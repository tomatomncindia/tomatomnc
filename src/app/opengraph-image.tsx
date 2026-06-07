import { ImageResponse } from "next/og";

export const alt = "Tomato M&C India · Fiberglass Orthopedic Casting Manufacturer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#FAF9F6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: "#D80C18",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 999, background: "#fff" }} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 24,
              fontWeight: 600,
              color: "#1A1A1A",
            }}
          >
            <span>Tomato</span>
            <span style={{ color: "#D80C18" }}>M&amp;C</span>
            <span>India</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#008E5F",
              fontWeight: 600,
            }}
          >
            Orthopedic Casting Solutions
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.04,
              color: "#1A1A1A",
              letterSpacing: -2,
              maxWidth: 950,
            }}
          >
            Korea&apos;s Leading Fiberglass Cast Manufacturer.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#4A4A4A",
          }}
        >
          <div>ISO 13485 · FDA · CE · KGMP</div>
          <div>Since 2005 · 30+ Countries</div>
        </div>
      </div>
    ),
    size,
  );
}
