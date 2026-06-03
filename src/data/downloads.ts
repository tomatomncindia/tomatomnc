export type DownloadCategory =
  | "Catalogs"
  | "Certifications"
  | "Technical Guides";

export type DownloadItem = {
  id: string;
  title: string;
  description: string;
  category: DownloadCategory;
  file: string;
  size?: string;
};

export const DOWNLOADS: DownloadItem[] = [
  {
    id: "full-catalog",
    title: "Tomato M&C: Full Product Catalog",
    description: "Complete catalog of casting tapes, splints, padding, and accessories.",
    category: "Catalogs",
    file: "/downloads/tomato-mnc-catalog.pdf",
    size: "8.2 MB",
  },
  {
    id: "iso-13485-cert",
    title: "ISO 13485 Certificate",
    description: "Medical device QMS certification.",
    category: "Certifications",
    file: "/downloads/certificates/iso-13485.pdf",
    size: "420 KB",
  },
  {
    id: "ce-cert",
    title: "CE Mark: Declaration of Conformity",
    description: "EU MDR conformity documentation.",
    category: "Certifications",
    file: "/downloads/certificates/ce-mark.pdf",
    size: "380 KB",
  },
  {
    id: "ordering-code-guide",
    title: "Ordering Code Reference Guide",
    description: "Decode all Tomato M&C model numbers and ordering codes.",
    category: "Technical Guides",
    file: "/downloads/guides/ordering-codes.pdf",
    size: "620 KB",
  },
];
