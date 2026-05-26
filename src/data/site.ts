export const SITE = {
  name: "Tomato M&C",
  legalName: "Tomato M&C Co., Ltd.",
  tagline: "Synthetic orthopedic casting solutions, manufactured in Korea since 2005.",
  founded: 2005,
  parentUrl: "https://www.tomatomnc.com",

  contact: {
    addressLines: [
      "123 Industrial Complex Rd.",
      "Pyeongtaek-si, Gyeonggi-do",
      "South Korea",
    ],
    phone: "+82-31-000-0000",
    fax: "+82-31-000-0001",
    email: "info@tomatomnc.com",
    salesEmail: "sales@tomatomnc.com",
  },

  stats: [
    { value: "2005", label: "Year established" },
    { value: "30+", label: "Global markets" },
    { value: "100%", label: "Supply chain owned" },
  ],

  nav: [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Network", href: "/network" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
