export type Certification = {
  id: string;
  body: string;
  scope: string;
  region: string;
  description: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "iso-13485",
    body: "ISO 13485",
    scope: "Medical devices: quality management systems",
    region: "International",
    description:
      "Certifies our quality management system meets the rigorous requirements for the design and manufacture of medical devices.",
  },
  {
    id: "iso-9001",
    body: "ISO 9001",
    scope: "Quality management systems",
    region: "International",
    description:
      "International standard ensuring consistently controlled products that meet customer and regulatory requirements.",
  },
  {
    id: "iso-14001",
    body: "ISO 14001",
    scope: "Environmental management systems",
    region: "International",
    description:
      "Certification of our effective environmental management system and commitment to sustainable manufacturing.",
  },
  {
    id: "fda",
    body: "USA · FDA",
    scope: "510(k) medical device registration",
    region: "United States",
    description:
      "Facility registration and device listing. Fully compliant with US Food and Drug Administration requirements for medical device distribution.",
  },
  {
    id: "ce",
    body: "CE Mark",
    scope: "EU MDR conformity",
    region: "European Union",
    description:
      "Conformity assessment certificate; products meet European Economic Area health, safety, and environmental protection standards.",
  },
  {
    id: "kgmp",
    body: "KGMP",
    scope: "Good Manufacturing Practice",
    region: "South Korea",
    description:
      "Certified by Korea Good Manufacturing Practice, ensuring domestic excellence in medical device production.",
  },
];
