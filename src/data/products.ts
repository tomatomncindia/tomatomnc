export type ProductCategory = "Cast" | "Splint" | "Accessory";

export type ProductSpec = {
  refCode: string;
  width: string;
  length: string;
  packagingBox?: string;
  packagingCase?: string;
};

export type ApplicationStep = {
  title: string;
  body: string;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  intendedUse: string;
  features: string[];
  precautions?: string;
  image: string;
  applicationSteps?: ApplicationStep[];
  specs: ProductSpec[];
  colors?: string[];
  related: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "tomato-cast",
    name: "Tomato Cast",
    shortName: "Cast",
    category: "Cast",
    tagline: "Synthetic orthopedic casting tape, fiberglass and polyester options.",
    description:
      "Rigid synthetic casting tape providing exceptional strength-to-weight ratio for primary orthopedic immobilization. Engineered for fast set, high mechanical strength, and radiolucency.",
    intendedUse:
      "Tomato Cast has been designed for the immobilization of fractures, sprains, and strains where rigid support is required.",
    features: [
      "Comfortability — smooth unrolling lets clinicians wrap with less pressure and no pain to the patient",
      "Conformability & mouldability — extreme-soft fabric shapes easily to the contours of the body",
      "Durability for safety — strong on impact and durable on the edges",
      "Tack-free with no layer separation",
      "Excellent X-ray translucency",
    ],
    precautions:
      "Application must be performed by trained medical personnel. Ensure adequate stockinet and padding underlay. Do not apply directly to broken skin.",
    image: "/images/products/tomato-cast.png",
    applicationSteps: [
      {
        title: "Preparation",
        body: "Slip the two layers of Tomato Safe Pad onto the affected body part.",
        image: "/images/application/steps/cast-1.png",
      },
      {
        title: "Wear gloves",
        body: "Gloves must be worn before handling the cast roll.",
        image: "/images/application/steps/cast-2.png",
      },
      {
        title: "Open one roll",
        body: "Open only one roll of Tomato Cast at a time to control set time.",
        image: "/images/application/steps/cast-3.png",
      },
      {
        title: "Immerse",
        body: "Immerse the roll in water at 20–24°C for 3–5 seconds and squeeze 3–4 times for full penetration. Do not soak too long.",
        image: "/images/application/steps/cast-4.png",
      },
      {
        title: "Wrap",
        body: "Wrap spirally, avoiding excessive tightness. Finish within 1 minute 10 seconds of opening the pouch.",
        image: "/images/application/steps/cast-5.png",
      },
      {
        title: "Mould",
        body: "Smooth and rub the surface for good contact between layers. Cures for moulding in 3–5 minutes.",
        image: "/images/application/steps/cast-6.png",
      },
    ],
    specs: [
      { refCode: "TRC-001", width: "1 in (2.5 cm)", length: "1.8 m (2 yds)", packagingBox: "Fiberglass / Poly" },
      { refCode: "TRC-002", width: "2 in (5.0 cm)", length: "3.6 m (4 yds)", packagingBox: "Fiberglass / Poly" },
      { refCode: "TRC-003", width: "3 in (7.5 cm)", length: "3.6 m (4 yds)", packagingBox: "Fiberglass / Poly" },
      { refCode: "TRC-004", width: "4 in (10.0 cm)", length: "3.6 m (4 yds)", packagingBox: "Fiberglass / Poly" },
      { refCode: "TRC-005", width: "5 in (12.5 cm)", length: "3.6 m (4 yds)", packagingBox: "Fiberglass / Poly" },
      { refCode: "TRC-006", width: "6 in (15.0 cm)", length: "3.6 m (4 yds)", packagingBox: "Fiberglass / Poly" },
    ],
    colors: ["white", "sky-blue", "neon-green", "ocean-green", "green", "purple", "pink", "orange", "yellow", "black", "grey", "pastel"],
    related: ["tomato-splint", "star-cast-roll", "star-stockinet"],
  },
  {
    slug: "tomato-splint",
    name: "Tomato Splint",
    shortName: "Splint",
    category: "Splint",
    tagline: "All-in-one layered splinting system with integrated padding.",
    description:
      "Pre-padded synthetic splint for immediate immobilization. Tomato Splint is a multi-layered fiberglass-and-resin splint with integrated stockinet padding, ready to use straight out of the package for emergency, fracture care, or post-operative immobilization.",
    intendedUse:
      "Tomato Splint is designed for the immediate immobilization of fractures, sprains, and post-operative orthopedic conditions where reliable splinting and a quick, clean application is required.",
    features: [
      "Comfortability & hygiene — water-spray application on the mesh side keeps the patient side dry",
      "Conformability & mouldability — shapes easily to the contours of the body",
      "Pre-padded: no separate stockinet or padding required",
      "Excellent moisture-evaporation efficiency during hardening",
      "Available pre-cut and in rolls across a range of widths",
    ],
    image: "/images/products/tomato-splint.png",
    applicationSteps: [
      {
        title: "Cut to length",
        body: "Take Tomato Splint with its sealed foil pouch from the box, measure the length, and cut it off with bandage scissors.",
        image: "/images/application/steps/splint-1.png",
      },
      {
        title: "Reseal the pack",
        body: "Seal the box immediately with the clip provided inside to prevent moisture from entering the package.",
        image: "/images/application/steps/splint-2.png",
      },
      {
        title: "Choose the size",
        body: "Choose the desired size for the affected body part. Generally, no gloves are necessary.",
        image: "/images/application/steps/splint-3.png",
      },
      {
        title: "Spray",
        body: "Instead of soaking, spray room-temperature water on the outer green mesh side of the splint.",
        image: "/images/application/steps/splint-4.png",
      },
      {
        title: "Dry off",
        body: "Remove excess water by rolling up with a dry towel; tap the surface with the towel if needed.",
        image: "/images/application/steps/splint-5.png",
      },
      {
        title: "Wrap & mould",
        body: "Wrap Tomato Splint with a roll of elastic bandage to secure it and mould it firmly to the limb.",
        image: "/images/application/steps/splint-6.png",
      },
    ],
    specs: [
      { refCode: "TPS-210", width: "2 in (5.0 cm)", length: "25.0 cm (10 in)", packagingBox: "Pre-cut" },
      { refCode: "TPS-312", width: "3 in (7.5 cm)", length: "30.0 cm (12 in)", packagingBox: "Pre-cut" },
      { refCode: "TPS-415", width: "4 in (10.0 cm)", length: "37.5 cm (15 in)", packagingBox: "Pre-cut" },
      { refCode: "TPS-530", width: "5 in (12.5 cm)", length: "75.0 cm (30 in)", packagingBox: "Pre-cut" },
      { refCode: "TRS-004", width: "4 in (10.0 cm)", length: "4.5 m (5 yds)", packagingBox: "Roll" },
      { refCode: "TRS-005", width: "5 in (12.5 cm)", length: "4.5 m (5 yds)", packagingBox: "Roll" },
    ],
    related: ["tomato-cast", "star-cast-roll", "star-stockinet"],
  },
  {
    slug: "star-cast-roll",
    name: "Star Cast Roll",
    shortName: "Cast Roll",
    category: "Cast",
    tagline: "Semi-rigid polyester cast roll for functional immobilization.",
    description:
      "Flexible polyester casting tape allowing functional movement. Star Cast Roll provides semi-rigid support while allowing the limb to keep some mobility — ideal for secondary casting, sprains, post-operative bracing, or transition from a rigid cast.",
    intendedUse:
      "Indicated for secondary casting and effective swelling control where functional immobilization is desired. Allows controlled movement while maintaining structural support.",
    features: [
      "Easy to apply and remove with standard scissors",
      "Enough flexion for support",
      "Skin-tight application without separate padding",
      "Shoes can be worn with the cast on",
      "Suitable for children or for staged cast removal",
    ],
    image: "/images/products/star-cast-roll.png",
    specs: [
      { refCode: "SCR-002", width: "2 in (5.0 cm)", length: "3.6 m (4 yds)", packagingBox: "Soft Polyester Cast" },
      { refCode: "SCR-003", width: "3 in (7.5 cm)", length: "3.6 m (4 yds)", packagingBox: "Soft Polyester Cast" },
      { refCode: "SCR-004", width: "4 in (10.0 cm)", length: "3.6 m (4 yds)", packagingBox: "Soft Polyester Cast" },
      { refCode: "SCR-005", width: "5 in (12.5 cm)", length: "3.6 m (4 yds)", packagingBox: "Soft Polyester Cast" },
    ],
    related: ["tomato-cast", "tomato-splint", "star-stockinet"],
  },
  {
    slug: "star-stockinet",
    name: "Star Stockinet",
    shortName: "Stockinet",
    category: "Accessory",
    tagline: "100% cotton tubular stockinet for baseline skin protection.",
    description:
      "Soft 100% cotton tubular stockinet worn next to the skin beneath padding and rigid casts. Provides a clean barrier and reduces skin irritation.",
    intendedUse:
      "Star Stockinet is intended as a soft, sores-preventing inter-layer under solid cast materials.",
    features: [
      "Soft & moderate elasticity offers more comfort to the patient",
      "100% cotton minimizes skin trouble",
      "Smooth seamless tubular construction",
    ],
    image: "/images/products/star-stockinet.png",
    specs: [
      { refCode: "SWS-002", width: "2 in (5.0 cm)", length: "10 m" },
      { refCode: "SWS-003", width: "3 in (7.5 cm)", length: "10 m" },
      { refCode: "SWS-004", width: "4 in (10.0 cm)", length: "10 m" },
      { refCode: "SWS-006", width: "6 in (15.0 cm)", length: "10 m" },
      { refCode: "SWS-010", width: "10 in (25.0 cm)", length: "10 m" },
    ],
    related: ["tomato-cast", "tomato-splint", "star-cast-roll"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean) as Product[];
}
