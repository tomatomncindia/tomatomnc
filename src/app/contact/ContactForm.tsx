"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PRODUCT_INTERESTS } from "./schema";
import { SITE } from "@/data/site";
import { cn } from "@/lib/cn";

const INPUT_BASE =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-[14px] text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  // Build a WhatsApp message from the form data and open it ready to send.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k) ?? "").toString().trim();
    const products = fd.getAll("productsOfInterest").map(String);

    const message = [
      "New Distributor Inquiry: Tomato Medical & Chemical India",
      "",
      `Company: ${get("companyName")}`,
      `Country: ${get("country")}`,
      `Contact: ${get("contactName")}`,
      `Email: ${get("email")}`,
      get("phone") ? `Phone: ${get("phone")}` : null,
      get("territory") ? `Territory: ${get("territory")}` : null,
      products.length ? `Products of interest: ${products.join(", ")}` : null,
      "",
      "Message:",
      get("message"),
    ]
      .filter(Boolean)
      .join("\n");

    const href = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(href, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-line px-5 md:px-6 py-5">
        <h2 className="font-display text-xl">Distributor Inquiry</h2>
        <p className="mt-1.5 text-[13.5px] text-ink-soft">
          Apply for regional distribution rights.
        </p>
      </div>

      <div className="px-5 md:px-6 py-5 md:py-6">
        {/* Status */}
        {sent ? (
          <div className="flex items-start gap-3 rounded-md border border-forest/20 bg-forest/5 p-4 text-[14px] text-forest-deep mb-6">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Your inquiry has opened in WhatsApp: just hit send to reach our team. If it
              didn&rsquo;t open, message us directly at {SITE.contact.phone}.
            </p>
          </div>
        ) : null}

        {/* Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company Name" required name="companyName">
            <input name="companyName" required placeholder="Enter company name" className={INPUT_BASE} />
          </Field>
          <Field label="Country" required name="country">
            <input name="country" required placeholder="Country" className={INPUT_BASE} />
          </Field>
          <Field label="Contact Name" required name="contactName">
            <input name="contactName" required placeholder="Full name" className={INPUT_BASE} />
          </Field>
          <Field label="Email Address" required name="email">
            <input
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className={INPUT_BASE}
            />
          </Field>
          <Field label="Phone Number" name="phone">
            <input name="phone" placeholder="+1 (555) 000-0000" className={INPUT_BASE} />
          </Field>
          <Field label="Territory of Interest" name="territory">
            <input
              name="territory"
              placeholder="e.g. Western Europe, GCC, Southeast Asia"
              className={INPUT_BASE}
            />
          </Field>
        </div>

        {/* Products of Interest */}
        <fieldset className="mt-6">
          <legend className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
            Products of Interest
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {PRODUCT_INTERESTS.map((p) => (
              <label
                key={p}
                className="flex items-center gap-2.5 rounded-md border border-line px-3 py-2.5 text-[13.5px] text-ink-soft hover:border-line-strong cursor-pointer has-[input:checked]:border-forest has-[input:checked]:text-ink has-[input:checked]:bg-forest/5 transition-colors"
              >
                <input
                  type="checkbox"
                  name="productsOfInterest"
                  value={p}
                  className="h-4 w-4 accent-forest"
                />
                {p}
              </label>
            ))}
          </div>
        </fieldset>

        <Field label="Message" required name="message" className="mt-6">
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us about your distribution coverage, current product lines, and regulatory presence."
            className={cn(INPUT_BASE, "resize-y min-h-[120px]")}
          />
        </Field>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-ink-muted">
            Submitting opens WhatsApp with your inquiry pre-filled, ready to send to our team.
          </p>
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-red px-6 py-3 text-[14px] font-medium text-white transition-[background,transform] duration-200 hover:bg-brand-red-hover active:scale-[0.98] [transition-timing-function:var(--ease-out-quint)]"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
        {label}
        {required ? <span className="ml-1 text-brand-red">*</span> : null}
      </span>
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}
