export type Certification = {
  id: string;
  body: string;
  scope: string;
  region: string;
  description: string;
  pdf?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "iso-13485",
    body: "ISO 13485",
    scope: "Medical devices: quality management systems",
    region: "International",
    description:
      "Certifies our quality management system meets the rigorous requirements for the design and manufacture of medical devices.",
    pdf: "/downloads/certificates/iso-13485.pdf",
  },
  {
    id: "iso-9001",
    body: "ISO 9001",
    scope: "Quality management systems",
    region: "International",
    description:
      "International standard ensuring consistently controlled products that meet customer and regulatory requirements.",
    pdf: "/downloads/certificates/iso-9001.pdf",
  },
  {
    id: "iso-14001",
    body: "ISO 14001",
    scope: "Environmental management systems",
    region: "International",
    description:
      "Certification of our effective environmental management system and commitment to sustainable manufacturing.",
    pdf: "/downloads/certificates/iso-14001.pdf",
  },
  {
    id: "fda",
    body: "USA · FDA",
    scope: "510(k) medical device registration",
    region: "United States",
    description:
      "Facility registration and device listing. Fully compliant with US Food and Drug Administration requirements for medical device distribution.",
    pdf: "/downloads/certificates/fda-registration.pdf",
  },
  {
    id: "ce",
    body: "CE Mark",
    scope: "EU MDR conformity",
    region: "European Union",
    description:
      "Conformity assessment certificate; products meet European Economic Area health, safety, and environmental protection standards.",
    pdf: "/downloads/certificates/ce-mark.pdf",
  },
  {
    id: "kgmp",
    body: "KGMP",
    scope: "Good Manufacturing Practice",
    region: "South Korea",
    description:
      "Certified by Korea Good Manufacturing Practice, ensuring domestic excellence in medical device production.",
    pdf: "/downloads/certificates/kgmp.pdf",
  },
];
