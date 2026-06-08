export const SITE = {
  name: "Tomato M&C India",
  legalName: "Tomato M&C Co., Ltd.",
  tagline: "Fiberglass orthopedic casting solutions, manufactured in Korea since 2005.",
  founded: 2005,
  parentUrl: "https://www.tomatomnc.com",

  contact: {
    company: "Blackchip Impex Private Limited",
    addressLines: [
      "65-651 Shiv CHS Ltd, MHB Colony",
      "Mahavir Nagar, Kandivali West",
      "Mumbai – 400067, India",
    ],
    phone: "+91 98331 16680",
    phones: ["+91 98331 16680", "+91 98203 24286"],
    email: "Blackchip.pvt@gmail.com",
    salesEmail: "Blackchip.pvt@gmail.com",
    // WhatsApp business line — digits only, used to build wa.me links.
    whatsapp: "919833116680",
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
