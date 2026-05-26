import { z } from "zod";

export const INQUIRY_TYPES = ["sample", "distributor", "oem"] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const PRODUCT_INTERESTS = [
  "Orthopedic Cast",
  "Soft Cast",
  "Orthopedic Splint",
  "Safe Pad",
  "Cotton Pad",
  "Elastic Bandage",
  "Shockinet",
] as const;

export const OEM_INQUIRY_TYPES = [
  "OEM Branded Product",
  "Private Label",
  "Production Line Supply",
  "Raw Material Supply",
] as const;

export const PRODUCT_CATEGORIES = [
  "Casting Tape (Fiberglass)",
  "Casting Tape (Polyester)",
  "Splints",
  "Padding & Stockinet",
  "Elastic Bandage",
  "Other",
] as const;

export const inquirySchema = z.object({
  inquiryType: z.enum(INQUIRY_TYPES),
  companyName: z.string().min(2, "Company name is required."),
  country: z.string().min(2, "Country is required."),
  contactName: z.string().min(2, "Contact name is required."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().optional(),
  // Sample-specific
  productsOfInterest: z.array(z.string()).optional(),
  estimatedQuantity: z.string().optional(),
  // OEM-specific
  oemInquiryType: z.string().optional(),
  territory: z.string().optional(),
  productCategories: z.array(z.string()).optional(),
  message: z.string().min(10, "Please share a few details about your request."),
  honeypot: z.string().max(0).optional(),
  turnstileToken: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };
