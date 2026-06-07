export const SITE = {
  name: "Tomato M&C India",
  legalName: "Tomato M&C Co., Ltd.",
  tagline: "Fiberglass orthopedic casting solutions, manufactured in Korea since 2005.",
  founded: 2005,
  parentUrl: "https://www.tomatomnc.com",

  contact: {
    addressLines: [
      "#15-11 Suwolam-gil, Seotan-myeon",
      "Pyeongtaek City, Gyeonggi-do (17704)",
      "South Korea",
    ],
    phone: "+82-31-662-9690",
    fax: "+82-31-662-9691",
    email: "sales@tomatomnc.kr",
    salesEmail: "sales@tomatomnc.kr",
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
    { label: "Founders", href: "/founders" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
