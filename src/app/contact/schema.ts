import { z } from "zod";

export const INQUIRY_TYPES = ["distributor"] as const;
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

export const inquirySchema = z.object({
  inquiryType: z.enum(INQUIRY_TYPES),
  companyName: z.string().min(2, "Company name is required."),
  country: z.string().min(2, "Country is required."),
  contactName: z.string().min(2, "Contact name is required."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().optional(),
  productsOfInterest: z.array(z.string()).optional(),
  territory: z.string().optional(),
  message: z.string().min(10, "Please share a few details about your request."),
  honeypot: z.string().max(0).optional(),
  turnstileToken: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };
