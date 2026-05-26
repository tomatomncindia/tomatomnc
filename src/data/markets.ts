export type Region = {
  name: string;
  countries: number;
  description: string;
};

export const REGIONS: Region[] = [
  {
    name: "North & South America",
    countries: 6,
    description: "Distribution presence across the United States, Canada, Mexico, Brazil, and the Andean region.",
  },
  {
    name: "East Asia",
    countries: 5,
    description: "Established partners across Japan, China, Taiwan, Hong Kong, and the Korean domestic market.",
  },
  {
    name: "Southeast Asia",
    countries: 7,
    description: "Active distribution in Vietnam, Thailand, Malaysia, Indonesia, the Philippines, Singapore, and Myanmar.",
  },
  {
    name: "Middle East & North Africa",
    countries: 6,
    description: "Coverage across the GCC, Levant, Egypt, and Morocco through specialized medical distributors.",
  },
  {
    name: "Europe",
    countries: 8,
    description: "Distribution across the European Union, the UK, and CIS markets with CE-marked product lines.",
  },
  {
    name: "Rest of World",
    countries: 4,
    description: "Selective partnerships in Sub-Saharan Africa, South Asia, and Oceania.",
  },
];

export const MARKET_CLEARANCES = [
  {
    region: "United States",
    body: "FDA",
    description: "Facility registration and device listing under USA-FDA compliance.",
  },
  {
    region: "European Union",
    body: "CE Mark",
    description: "Full EU MDR conformity for all primary product lines.",
  },
  {
    region: "South Korea",
    body: "KGMP",
    description: "Domestic KGMP-approved manufacturing facility.",
  },
];
