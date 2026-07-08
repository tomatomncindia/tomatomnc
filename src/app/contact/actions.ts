"use server";

import { Resend } from "resend";
import { inquirySchema, type InquiryState } from "./schema";

async function verifyTurnstile(token?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // dev mode — skip
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const raw = {
    inquiryType: formData.get("inquiryType") ?? "distributor",
    companyName: formData.get("companyName") ?? "",
    country: formData.get("country") ?? "",
    contactName: formData.get("contactName") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    productsOfInterest: formData.getAll("productsOfInterest").map(String),
    territory: formData.get("territory") ?? "",
    message: formData.get("message") ?? "",
    honeypot: formData.get("honeypot") ?? "",
    turnstileToken: formData.get("turnstileToken") ?? "",
  };

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }
  const data = parsed.data;

  if (data.honeypot) {
    return { status: "success", message: "Thank you. We'll be in touch shortly." };
  }

  const turnstileOk = await verifyTurnstile(data.turnstileToken);
  if (!turnstileOk) {
    return { status: "error", message: "Verification failed. Please try again." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL ?? "contact@tomatomncindia.com";
  const from = process.env.INQUIRY_FROM_EMAIL ?? "noreply@tomatomnc.com";

  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email send.");
    return {
      status: "success",
      message: "Thank you. We've received your inquiry and will be in touch within 2 hours.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `[${data.inquiryType.toUpperCase()}] inquiry from ${data.companyName}`;
    const text = [
      `Inquiry type: ${data.inquiryType}`,
      `Company: ${data.companyName}`,
      `Country: ${data.country}`,
      `Contact: ${data.contactName}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.productsOfInterest?.length ? `Products: ${data.productsOfInterest.join(", ")}` : null,
      data.territory ? `Territory: ${data.territory}` : null,
      "",
      "Message:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");

    await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: data.email,
    });

    return {
      status: "success",
      message: "Thank you. We've received your inquiry and will be in touch within 2 hours.",
    };
  } catch (err) {
    console.error("Resend error:", err);
    return {
      status: "error",
      message: "We couldn't send your message. Please email contact@tomatomncindia.com directly.",
    };
  }
}
