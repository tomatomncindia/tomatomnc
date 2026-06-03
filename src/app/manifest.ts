import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tomato M&C India · Orthopedic Casting Tape & Splint Supplier",
    short_name: "Tomato M&C India",
    description:
      "Premium Korean-manufactured synthetic orthopedic casting tape and splints for the Indian healthcare market.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["medical", "business", "health"],
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
