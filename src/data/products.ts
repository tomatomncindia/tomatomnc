export type ProductCategory = "Cast" | "Splint" | "Accessory";

export type ProductSpec = {
  refCode: string;
  width: string;
  length: string;
  packagingBox?: string;
  packagingCase?: string;
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
  applicationSteps?: { title: string; body: string }[];
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
      "Tomato Cast is designed for the immobilization of fractures, sprains, and post-operative orthopedic conditions where rigid support is required.",
    features: [
      "Fiberglass and polyester options",
      "High strength-to-weight ratio",
      "X-ray translucent",
      "Multiple color variants",
      "Conformable application with controlled set time",
    ],
    precautions:
      "Application must be performed by trained medical personnel. Ensure adequate stockinet and padding underlay. Do not apply directly to broken skin.",
    image: "/images/products/tomato-cast.png",
    applicationSteps: [
      { title: "Preparation", body: "Apply stockinet and undercast padding over the limb." },
      { title: "Squeeze", body: "Briefly immerse the cast roll in tepid water and squeeze to activate." },
      { title: "Apply", body: "Wrap with 50% overlap, maintaining smooth, even tension." },
      { title: "Mould", body: "Mould the cast to anatomy while resin remains workable." },
      { title: "Set", body: "Cast hardens within 3–5 minutes; full strength in 30 minutes." },
      { title: "Inspect", body: "Verify neurovascular status and patient comfort." },
    ],
    specs: [
      { refCode: "TC-002", width: "2 in (5.0 cm)", length: "3.6 m", packagingBox: "10 rolls/box" },
      { refCode: "TC-003", width: "3 in (7.5 cm)", length: "3.6 m", packagingBox: "10 rolls/box" },
      { refCode: "TC-004", width: "4 in (10.0 cm)", length: "3.6 m", packagingBox: "10 rolls/box" },
      { refCode: "TC-005", width: "5 in (12.5 cm)", length: "3.6 m", packagingBox: "10 rolls/box" },
      { refCode: "TC-006", width: "6 in (15.0 cm)", length: "3.6 m", packagingBox: "10 rolls/box" },
    ],
    colors: ["white", "navy", "royal-blue", "sky-blue", "red", "burgundy", "pink", "purple", "green", "teal", "orange", "yellow", "black", "grey"],
    related: ["tomato-soft-cast", "tomato-splint", "2in1-safe-pad"],
  },
  {
    slug: "tomato-soft-cast",
    name: "Tomato Soft Cast",
    shortName: "Soft Cast",
    category: "Cast",
    tagline: "Semi-rigid synthetic cast for functional immobilization.",
    description:
      "Flexible polyester casting tape allowing functional movement. Designed for secondary casting applications and effective swelling control. Tomato Soft Cast provides semi-rigid support while allowing the limb to maintain mobility: ideal for sprains, post-operative bracing, or transition from rigid casts.",
    intendedUse:
      "Indicated for secondary casting applications and effective swelling control where functional immobilization is desired. Allows for controlled movement while maintaining structural support.",
    features: [
      "Easy to apply and remove with standard scissors",
      "Breathable polyester substrate for patient comfort",
      "Semi-rigid for functional immobilization",
      "Bonds to itself rather than to skin or padding",
    ],
    image: "/images/products/tomato-soft-cast.png",
    specs: [
      { refCode: "TSC-002", width: "2 in (5.0 cm)", length: "3.6 m", packagingBox: "10 rolls/box", packagingCase: "8 boxes/case" },
      { refCode: "TSC-003", width: "3 in (7.5 cm)", length: "3.6 m", packagingBox: "10 rolls/box", packagingCase: "8 boxes/case" },
      { refCode: "TSC-004", width: "4 in (10.0 cm)", length: "3.6 m", packagingBox: "10 rolls/box", packagingCase: "8 boxes/case" },
      { refCode: "TSC-005", width: "5 in (12.5 cm)", length: "3.6 m", packagingBox: "10 rolls/box", packagingCase: "8 boxes/case" },
    ],
    related: ["tomato-cast", "tomato-splint", "elastic-bandage"],
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
      "Pre-padded: no separate stockinet or padding required",
      "Hospital-grade fiberglass core",
      "Excellent moisture-evaporation efficiency",
      "Available in a range of widths and lengths",
    ],
    image: "/images/products/tomato-splint.png",
    applicationSteps: [
      { title: "Preparation", body: "Cut splint to required length using standard surgical scissors." },
      { title: "Wet", body: "Briefly immerse splint in tepid water and squeeze gently to remove excess." },
      { title: "Apply", body: "Position over limb, smooth out, and secure with elastic bandage." },
      { title: "Mould", body: "Hand-mould to anatomy while resin remains workable." },
      { title: "Set", body: "Splint hardens within 3–5 minutes; achieves full strength in 30 minutes." },
    ],
    specs: [
      { refCode: "TSP-001", width: "2 in (5.0 cm)", length: "76 cm", packagingBox: "10 rolls/box" },
      { refCode: "TSP-002", width: "3 in (7.5 cm)", length: "76 cm", packagingBox: "10 rolls/box" },
      { refCode: "TSP-003", width: "4 in (10.0 cm)", length: "76 cm", packagingBox: "10 rolls/box" },
      { refCode: "TSP-004", width: "5 in (12.5 cm)", length: "76 cm", packagingBox: "10 rolls/box" },
    ],
    related: ["tomato-cast", "2in1-safe-pad", "elastic-bandage"],
  },
  {
    slug: "2in1-safe-pad",
    name: "Tomato 2in1 Safe Pad",
    shortName: "2in1 Safe Pad",
    category: "Accessory",
    tagline: "Combined padding and stockinet for fast, safe cast application.",
    description:
      "Streamlines the immobilization process while ensuring patient comfort and clinical precision. The 2in1 Safe Pad integrates two layers into one seamless product, eliminating the need for separate application steps.",
    intendedUse:
      "Used as undercast padding and stockinet beneath a primary cast layer to protect skin and ensure consistent padding thickness around bony prominences.",
    features: [
      "Reduces application time by integrating two layers into one seamless product",
      "High-density polyester ensures consistent protection over bony prominences",
      "Optimized stretch characteristics conform closely to patient anatomy",
      "Hybrid construction mixing PAD and STOCKINET functionalities",
    ],
    precautions:
      "Ensure appropriate overlap during application to maintain consistent padding thickness. Do not apply directly to broken skin without primary dressing.",
    image: "/images/products/2in1-safe-pad.png",
    specs: [
      { refCode: "TIP-002", width: "2 in (5.0 cm)", length: "3.6 m", packagingBox: "12 rolls/box" },
      { refCode: "TIP-003", width: "3 in (7.5 cm)", length: "3.6 m", packagingBox: "12 rolls/box" },
      { refCode: "TIP-004", width: "4 in (10.0 cm)", length: "3.6 m", packagingBox: "12 rolls/box" },
      { refCode: "TIP-005", width: "5 in (12.5 cm)", length: "3.6 m", packagingBox: "12 rolls/box" },
      { refCode: "TIP-006", width: "6 in (15.0 cm)", length: "3.6 m", packagingBox: "6 rolls/box" },
    ],
    related: ["tomato-cast", "tomato-splint", "shockinet"],
  },
  {
    slug: "cotton-pad",
    name: "Cotton Pad",
    shortName: "Cotton Pad",
    category: "Accessory",
    tagline: "100% cotton undercast padding for skin-friendly comfort.",
    description:
      "Premium cotton padding for use beneath rigid orthopedic casts. Soft, breathable, and gentle on skin while providing reliable cushioning and absorbency.",
    intendedUse:
      "Used as undercast padding to protect skin from direct contact with rigid casting materials.",
    features: [
      "100% pure cotton fibre",
      "Highly absorbent and breathable",
      "Easy tear, no scissors required",
      "Conformable to anatomy",
    ],
    image: "/images/products/cotton-pad.png",
    specs: [
      { refCode: "CP-002", width: "2 in (5.0 cm)", length: "2.7 m", packagingBox: "12 rolls/box" },
      { refCode: "CP-003", width: "3 in (7.5 cm)", length: "2.7 m", packagingBox: "12 rolls/box" },
      { refCode: "CP-004", width: "4 in (10.0 cm)", length: "2.7 m", packagingBox: "12 rolls/box" },
      { refCode: "CP-006", width: "6 in (15.0 cm)", length: "2.7 m", packagingBox: "6 rolls/box" },
    ],
    related: ["2in1-safe-pad", "tomato-cast", "shockinet"],
  },
  {
    slug: "elastic-bandage",
    name: "Elastic Bandage",
    shortName: "Elastic Bandage",
    category: "Accessory",
    tagline: "High-quality elastic bandage for compression and support.",
    description:
      "Versatile woven elastic bandage providing consistent compression and limb support. Used in splinting, post-cast wrap, and general orthopedic support applications.",
    intendedUse:
      "For compression, support, and securing splints or dressings.",
    features: [
      "Consistent elasticity through repeated washes",
      "Latex-free, hypoallergenic",
      "Secure metal-clip or self-adherent closure variants",
    ],
    image: "/images/products/elastic-bandage.png",
    specs: [
      { refCode: "EB-002", width: "2 in (5.0 cm)", length: "4.5 m" },
      { refCode: "EB-003", width: "3 in (7.5 cm)", length: "4.5 m" },
      { refCode: "EB-004", width: "4 in (10.0 cm)", length: "4.5 m" },
      { refCode: "EB-006", width: "6 in (15.0 cm)", length: "4.5 m" },
    ],
    related: ["tomato-splint", "2in1-safe-pad", "cotton-pad"],
  },
  {
    slug: "shockinet",
    name: "Shockinet",
    shortName: "Shockinet",
    category: "Accessory",
    tagline: "Tubular synthetic bandage for baseline skin protection.",
    description:
      "Lightweight tubular stockinet worn next to the skin beneath padding and rigid casts. Provides a clean barrier and reduces skin irritation.",
    intendedUse:
      "Used as a skin-protective base layer beneath cast padding and primary casting materials.",
    features: [
      "Soft synthetic blend, latex-free",
      "Smooth seamless tubular construction",
      "Conformable stretch in multiple diameters",
    ],
    image: "/images/products/shockinet.png",
    specs: [
      { refCode: "SK-002", width: "2 in (5.0 cm)", length: "25 m" },
      { refCode: "SK-003", width: "3 in (7.5 cm)", length: "25 m" },
      { refCode: "SK-004", width: "4 in (10.0 cm)", length: "25 m" },
    ],
    related: ["2in1-safe-pad", "cotton-pad", "tomato-cast"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean) as Product[];
}
