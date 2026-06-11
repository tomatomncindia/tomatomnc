export type ProductCategory = "Cast" | "Splint" | "Supporting Product";

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

/** Product-line wordmark supplied by the client (transparent PNG). */
export type ProductLogo = {
  src: string;
  width: number;
  height: number;
};

/** Lifestyle photo — a happy patient wearing the branded product. */
export type LifestyleImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  /** Short label used in the homepage hero slogan: "You can be No. 1 with Tomato {heroTag}". */
  heroTag?: string;
  tagline: string;
  description: string;
  intendedUse: string;
  features: string[];
  precautions?: string;
  image: string;
  /** Extra carousel slides for the product-page hero (patient/lifestyle shots). */
  lifestyle?: LifestyleImage[];
  logo?: ProductLogo;
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
    heroTag: "Orthopedic Cast",
    tagline: "Fiberglass orthopedic casting tape, with polyester options.",
    description:
      "Rigid fiberglass casting tape providing exceptional strength-to-weight ratio for primary orthopedic immobilization. Engineered for fast set, high mechanical strength, and radiolucency.",
    intendedUse:
      "Tomato Cast has been designed for the immobilization of fractures, sprains, and strains where rigid support is required.",
    features: [
      "Comfortability — smooth unrolling lets clinicians wrap with less pressure and no pain to the patient",
      "Better conformability — molds smoothly around complex joints like ankles and wrists without wrinkling",
      "Durability for safety — strong on impact and durable on the edges",
      "Tack-free, smoother lamination — doesn't stick to gloves during application while the layers bond perfectly to each other",
      "Cleaner edges — no fraying or sharp fiberglass needles to poke and irritate the skin after curing",
      "Excellent X-ray translucency",
    ],
    precautions:
      "Application must be performed by trained medical personnel. Ensure adequate stockinet and padding underlay. Do not apply directly to broken skin.",
    image: "/images/products/tomato-cast.webp",
    lifestyle: [
      {
        src: "/images/products/lifestyle/tomato-cast-1.webp",
        alt: "Smiling patient recovering in hospital with a Tomato Cast on her leg",
      },
      {
        src: "/images/products/lifestyle/tomato-cast-2.webp",
        alt: "Happy patient relaxing at home with a Tomato Cast leg cast",
      },
      {
        src: "/images/products/lifestyle/tomato-cast-3.webp",
        alt: "Patient back on his feet outdoors wearing a Tomato Cast walking cast",
      },
      {
        src: "/images/products/lifestyle/tomato-cast-packaging.webp",
        alt: "Tomato Cast packaging carton with individually sealed casting tape rolls",
      },
    ],
    applicationSteps: [
      {
        title: "Preparation",
        body: "Slip the two layers of Tomato Safe Pad onto the affected body part.",
        image: "/images/application/steps/cast-1.webp",
      },
      {
        title: "Wear gloves",
        body: "Gloves must be worn before handling the cast roll.",
        image: "/images/application/steps/cast-2.webp",
      },
      {
        title: "Open one roll",
        body: "Open only one roll of Tomato Cast at a time to control set time.",
        image: "/images/application/steps/cast-3.webp",
      },
      {
        title: "Immerse",
        body: "Immerse the roll in water at 20–24°C for 3–5 seconds and squeeze 3–4 times for full penetration. Do not soak too long.",
        image: "/images/application/steps/cast-4.webp",
      },
      {
        title: "Wrap",
        body: "Wrap spirally, avoiding excessive tightness. Finish within 1 minute 10 seconds of opening the pouch.",
        image: "/images/application/steps/cast-5.webp",
      },
      {
        title: "Mould",
        body: "Smooth and rub the surface for good contact between layers. Cures for moulding in 3–5 minutes.",
        image: "/images/application/steps/cast-6.webp",
      },
    ],
    specs: [
      { refCode: "TRC-002", width: "2 in (5.0 cm)", length: "3.6 m", packagingBox: "Fiberglass" },
      { refCode: "TRC-003", width: "3 in (7.5 cm)", length: "3.6 m", packagingBox: "Fiberglass" },
      { refCode: "TRC-004", width: "4 in (10.0 cm)", length: "3.6 m", packagingBox: "Fiberglass" },
      { refCode: "TRC-005", width: "5 in (12.5 cm)", length: "3.6 m", packagingBox: "Fiberglass" },
      { refCode: "TRC-006", width: "6 in (15.0 cm)", length: "3.6 m", packagingBox: "Fiberglass" },
    ],
    colors: ["white", "green", "purple", "pink", "blue", "red", "orange", "yellow", "grey", "black", "sky-blue", "neon-green", "green-pastel", "pink-pastel", "ocean-green"],
    related: ["tomato-splint", "star-cast-roll", "star-stockinet"],
  },
  {
    slug: "star-cast-roll",
    name: "Star Cast Roll",
    shortName: "Cast Roll",
    category: "Supporting Product",
    heroTag: "Orthopedic Star Cast",
    tagline: "Soft polyester cast roll for functional immobilization.",
    description:
      "Soft cast of knitted polyester fabric impregnated with polyurethane resin. Exposure to water sets the roll; the finished wrap retains its shape while remaining elastic to the touch — a more flexible casting material for functional immobilization that can tolerate some movement.",
    intendedUse:
      "Intended for secondary casting and a comprehensive wrap to control swelling. Typically used for functional immobilizations that can tolerate some movement, such as minor broken bones, casual strains, sprains, and ligament damage.",
    features: [
      "Uniform thickness, dense loft throughout",
      "Tears crisply, ‘feathers’ smoothly",
      "Blends together cleanly, stays in place",
      "Breathable, promotes rapid drying",
      "Easy to be cut off with bandage scissors",
      "Enough fixation for support",
      "Skin-tight application without padding",
      "Shoes can be worn with the cast on",
      "Suitable for a child in cast removal",
    ],
    image: "/images/products/star-cast-roll.webp",
    lifestyle: [
      {
        src: "/images/products/lifestyle/star-cast-roll-2.webp",
        alt: "Patient with a Star Cast Roll functional wrap during recovery",
      },
      {
        src: "/images/products/lifestyle/star-cast-roll-3.webp",
        alt: "Happy child wearing a colorful Star Cast Roll soft cast on his arm",
      },
    ],
    logo: { src: "/images/products/logos/star-cast-roll.webp", width: 1479, height: 240 },
    specs: [
      { refCode: "SCR-004", width: "4 in (10.0 cm)", length: "3 m", packagingBox: "Premium Cotton Blend" },
      { refCode: "SCR-006", width: "6 in (15.0 cm)", length: "3 m", packagingBox: "Premium Cotton Blend" },
    ],
    related: ["tomato-cast", "tomato-splint", "star-stockinet"],
  },
  {
    slug: "star-stockinet",
    name: "Star Stockinet",
    shortName: "Stockinet",
    category: "Supporting Product",
    heroTag: "Ortho Stockinet",
    tagline: "100% cotton tubular stockinet for baseline skin protection.",
    description:
      "Soft 100% cotton tubular stockinet worn next to the skin beneath padding and rigid casts. Provides a clean barrier and reduces skin irritation.",
    intendedUse:
      "Star Stockinet is intended as a soft, sores-preventing inter-layer under solid cast materials.",
    features: [
      "Conforms smoothly, retains elastic memory",
      "Resists running, holds shape at cut lines",
      "Soft, breathable, wicks or absorbs moisture",
      "Soft & moderate elasticity offers more comfort to the patient",
      "100% cotton minimizes skin trouble",
    ],
    image: "/images/products/star-stockinet.webp",
    logo: { src: "/images/products/logos/star-stockinet.webp", width: 1281, height: 240 },
    lifestyle: [
      {
        src: "/images/products/lifestyle/star-stockinet-1.webp",
        alt: "Doctor fitting Star Stockinet onto a patient's arm before casting",
      },
      {
        src: "/images/products/lifestyle/star-stockinet-3.webp",
        alt: "Nurse fitting Star Stockinet onto a child's arm",
      },
    ],
    specs: [
      { refCode: "SSN-002-S", width: "2 in (5.0 cm)", length: "1.5 m" },
      { refCode: "SSN-002-L", width: "2 in (5.0 cm)", length: "10 m" },
      { refCode: "SSN-003-S", width: "3 in (7.5 cm)", length: "1.5 m" },
      { refCode: "SSN-003-L", width: "3 in (7.5 cm)", length: "10 m" },
      { refCode: "SSN-004-S", width: "4 in (10.0 cm)", length: "1.5 m" },
      { refCode: "SSN-004-L", width: "4 in (10.0 cm)", length: "10 m" },
      { refCode: "SSN-006-S", width: "6 in (15.0 cm)", length: "1.5 m" },
      { refCode: "SSN-006-L", width: "6 in (15.0 cm)", length: "10 m" },
    ],
    related: ["tomato-cast", "tomato-splint", "star-cast-roll"],
  },
  {
    slug: "tomato-splint",
    name: "Tomato Splint",
    shortName: "Splint",
    category: "Splint",
    heroTag: "Ortho Splint",
    tagline: "Multi-layered splint for emergency immobilization, pre-cut or in rolls.",
    description:
      "Multi-layered splint in fiberglass or polyester for emergency immobilization. Supplied pre-cut or in rolls in sealed foil pouches, Tomato Splint applies with a simple water spray — no soaking — and can be used until swelling has decreased and the limb is ready for a complete cast.",
    intendedUse:
      "Tomato Splint has been designed for use in emergency treatment of fractures, sprains, and strains. It can be used until swelling has decreased and the limb is ready for a complete cast.",
    features: [
      "Comfortability — smooth application with less pressure and no pain to the patient",
      "Conformability & mouldability — extreme-soft fabric shapes easily to the contours of the body",
      "Generally no gloves are necessary for handling",
      "Tack-free with no layer separation",
      "Available pre-cut and in rolls across a range of widths",
    ],
    image: "/images/products/tomato-splint.webp",
    lifestyle: [
      {
        src: "/images/products/lifestyle/tomato-splint-1.webp",
        alt: "Teal Tomato Splint moulded along a patient's forearm",
      },
      {
        src: "/images/products/lifestyle/tomato-splint-2.webp",
        alt: "Doctor applying a Tomato Splint to a smiling patient's wrist",
      },
      {
        src: "/images/products/lifestyle/tomato-splint-3.webp",
        alt: "Happy child with a Tomato Splint wrap on her arm at home",
      },
    ],
    applicationSteps: [
      {
        title: "Cut to length",
        body: "Take Tomato Splint with its sealed foil pouch from the box, measure the length, and cut it off with bandage scissors.",
        image: "/images/application/steps/splint-1.webp",
      },
      {
        title: "Reseal the pack",
        body: "Seal the box immediately with the clip provided inside to prevent moisture from entering the package.",
        image: "/images/application/steps/splint-2.webp",
      },
      {
        title: "Choose the size",
        body: "Choose the desired size for the affected body part. Generally, no gloves are necessary.",
        image: "/images/application/steps/splint-3.webp",
      },
      {
        title: "Spray",
        body: "Instead of soaking, spray room-temperature water on the inside (white side) of the splint for 3–5 seconds, then wipe the water off the surface.",
        image: "/images/application/steps/splint-4.webp",
      },
      {
        title: "Dry off",
        body: "Remove excess water by laying the splint on a dry towel and rolling it up with the towel to strengthen adhesion between layers.",
        image: "/images/application/steps/splint-5.webp",
      },
      {
        title: "Wrap & mould",
        body: "Wrap Tomato Splint with a roll of elastic bandage to secure it and mould it freely to the limb.",
        image: "/images/application/steps/splint-6.webp",
      },
    ],
    specs: [
      { refCode: "TPS-210", width: "2 in (5.0 cm)", length: "10 in (25.0 cm)", packagingBox: "Pre-cut" },
      { refCode: "TPS-312", width: "3 in (7.5 cm)", length: "12 in (30.0 cm)", packagingBox: "Pre-cut" },
      { refCode: "TPS-335", width: "3 in (7.5 cm)", length: "35 in (87.5 cm)", packagingBox: "Pre-cut" },
      { refCode: "TPS-415", width: "4 in (10.0 cm)", length: "15 in (37.5 cm)", packagingBox: "Pre-cut" },
      { refCode: "TPS-430", width: "4 in (10.0 cm)", length: "30 in (75.0 cm)", packagingBox: "Pre-cut" },
      { refCode: "TPS-530", width: "5 in (12.5 cm)", length: "30 in (75.0 cm)", packagingBox: "Pre-cut" },
      { refCode: "TPS-545", width: "5 in (12.5 cm)", length: "45 in (112.5 cm)", packagingBox: "Pre-cut" },
      { refCode: "TPS-630", width: "6 in (15.0 cm)", length: "30 in (75.0 cm)", packagingBox: "Pre-cut" },
      { refCode: "TPS-645", width: "6 in (15.0 cm)", length: "45 in (112.5 cm)", packagingBox: "Pre-cut" },
      { refCode: "TRS-002", width: "2 in (5.0 cm)", length: "5 yds (4.5 m)", packagingBox: "Roll" },
      { refCode: "TRS-003", width: "3 in (7.5 cm)", length: "5 yds (4.5 m)", packagingBox: "Roll" },
      { refCode: "TRS-004", width: "4 in (10.0 cm)", length: "5 yds (4.5 m)", packagingBox: "Roll" },
      { refCode: "TRS-005", width: "5 in (12.5 cm)", length: "5 yds (4.5 m)", packagingBox: "Roll" },
      { refCode: "TRS-006", width: "6 in (15.0 cm)", length: "5 yds (4.5 m)", packagingBox: "Roll" },
      { refCode: "TRS-008", width: "8 in (20.0 cm)", length: "5 yds (4.5 m)", packagingBox: "Roll" },
    ],
    related: ["tomato-cast", "star-cast-roll", "star-stockinet"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean) as Product[];
}
