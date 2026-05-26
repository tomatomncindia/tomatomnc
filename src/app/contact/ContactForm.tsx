"use client";

import { Suspense, useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitInquiry } from "./actions";
import {
  INQUIRY_TYPES,
  PRODUCT_INTERESTS,
  OEM_INQUIRY_TYPES,
  PRODUCT_CATEGORIES,
  type InquiryState,
  type InquiryType,
} from "./schema";
import { cn } from "@/lib/cn";

const initialState: InquiryState = { status: "idle" };

const TAB_LABELS: Record<InquiryType, string> = {
  sample: "Sample / Quotation",
  distributor: "Distributor",
  oem: "OEM & Partnership",
};

const TAB_DESCRIPTIONS: Record<InquiryType, string> = {
  sample: "Request product samples and pricing for evaluation.",
  distributor: "Apply for regional distribution rights.",
  oem: "Manufacturing under your brand or technical partnership.",
};

function resolveInitialTab(value: string | null): InquiryType {
  if (value === "oem" || value === "distributor" || value === "sample") return value;
  return "sample";
}

const INPUT_BASE =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-[14px] text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition";

export function ContactForm() {
  return (
    <Suspense fallback={<div className="h-96 rounded-2xl border border-line bg-white" />}>
      <ContactFormInner />
    </Suspense>
  );
}

function ContactFormInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState<InquiryType>(() => resolveInitialTab(params.get("type")));
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const fieldErrors =
    state.status === "error" ? state.fieldErrors ?? {} : ({} as Record<string, string[]>);

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-white overflow-hidden">
      <input type="hidden" name="inquiryType" value={tab} />
      <div className="sr-only">
        <label>
          Leave this empty
          <input name="honeypot" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-line px-5 md:px-8 pt-5 md:pt-6" role="tablist">
        {INQUIRY_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-4 py-3 text-[13.5px] font-medium transition-colors",
              tab === t ? "text-ink" : "text-ink-muted hover:text-ink",
            )}
          >
            {TAB_LABELS[t]}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-3 -bottom-px h-[2px] origin-left bg-forest transition-transform duration-200",
                tab === t ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>

      <div className="px-5 md:px-8 py-5 md:py-7">
        {/* Tab description */}
        <p className="text-[13.5px] text-ink-soft">{TAB_DESCRIPTIONS[tab]}</p>

        {/* Status */}
        {state.status === "success" ? (
          <div className="mt-6 flex items-start gap-3 rounded-md border border-forest/20 bg-forest/5 p-4 text-[14px] text-forest-deep">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{state.message}</p>
          </div>
        ) : null}
        {state.status === "error" ? (
          <div className="mt-6 flex items-start gap-3 rounded-md border border-brand-red/20 bg-brand-red/5 p-4 text-[14px] text-brand-red">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{state.message}</p>
          </div>
        ) : null}

        {/* Shared fields */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Company Name" required name="companyName" errors={fieldErrors.companyName}>
            <input name="companyName" required placeholder="Enter company name" className={INPUT_BASE} />
          </Field>
          <Field label="Country" required name="country" errors={fieldErrors.country}>
            <input name="country" required placeholder="Country" className={INPUT_BASE} />
          </Field>
          <Field label="Contact Name" required name="contactName" errors={fieldErrors.contactName}>
            <input name="contactName" required placeholder="Full name" className={INPUT_BASE} />
          </Field>
          <Field label="Email Address" required name="email" errors={fieldErrors.email}>
            <input
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className={INPUT_BASE}
            />
          </Field>
          <Field label="Phone Number" name="phone" errors={fieldErrors.phone}>
            <input name="phone" placeholder="+1 (555) 000-0000" className={INPUT_BASE} />
          </Field>

          {/* Sample-only: quantity */}
          {tab === "sample" ? (
            <Field label="Estimated Monthly Quantity" name="estimatedQuantity">
              <select name="estimatedQuantity" className={INPUT_BASE} defaultValue="">
                <option value="">Select a range</option>
                <option value="100-1000">100 – 1,000 rolls</option>
                <option value="1000-5000">1,000 – 5,000 rolls</option>
                <option value="5000-20000">5,000 – 20,000 rolls</option>
                <option value="20000+">20,000+ rolls</option>
              </select>
            </Field>
          ) : null}

          {/* OEM-only: inquiry type */}
          {tab === "oem" ? (
            <Field label="Inquiry Type" name="oemInquiryType">
              <select name="oemInquiryType" className={INPUT_BASE} defaultValue="">
                <option value="">Select inquiry type</option>
                {OEM_INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          ) : null}

          {/* Distributor or OEM: territory */}
          {tab === "distributor" || tab === "oem" ? (
            <Field
              label={tab === "distributor" ? "Territory of Interest" : "Target Territory"}
              name="territory"
              className="sm:col-span-2"
            >
              <input
                name="territory"
                placeholder="e.g. Western Europe, GCC, Southeast Asia"
                className={INPUT_BASE}
              />
            </Field>
          ) : null}
        </div>

        {/* Sample tab — Products of Interest */}
        {tab === "sample" ? (
          <fieldset className="mt-6">
            <legend className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              Products of Interest
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
        ) : null}

        {/* OEM tab — Current Product Categories */}
        {tab === "oem" ? (
          <fieldset className="mt-6">
            <legend className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              Current Product Categories
            </legend>
            <p className="mt-2 text-[12.5px] text-ink-muted">
              Which categories are you currently selling or planning to launch?
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCT_CATEGORIES.map((p) => (
                <label
                  key={p}
                  className="flex items-center gap-2.5 rounded-md border border-line px-3 py-2.5 text-[13.5px] text-ink-soft hover:border-line-strong cursor-pointer has-[input:checked]:border-forest has-[input:checked]:text-ink has-[input:checked]:bg-forest/5 transition-colors"
                >
                  <input
                    type="checkbox"
                    name="productCategories"
                    value={p}
                    className="h-4 w-4 accent-forest"
                  />
                  {p}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {/* Distributor tab — focused product interest */}
        {tab === "distributor" ? (
          <fieldset className="mt-6">
            <legend className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              Products of Interest
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
        ) : null}

        <Field label="Message" required name="message" errors={fieldErrors.message} className="mt-6">
          <textarea
            name="message"
            rows={5}
            required
            placeholder={
              tab === "oem"
                ? "Tell us about your brand, target markets, and partnership requirements."
                : tab === "distributor"
                  ? "Tell us about your distribution coverage, current product lines, and regulatory presence."
                  : "Please share details about your requirements, target markets, or any technical specifications."
            }
            className={cn(INPUT_BASE, "resize-y min-h-[120px]")}
          />
        </Field>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12px] text-ink-muted">
            By submitting this form, you agree to be contacted by Tomato M&amp;C regarding your inquiry.
          </p>
          <button
            type="submit"
            disabled={pending}
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-red px-6 py-3 text-[14px] font-medium text-white transition-[background,transform] duration-200 hover:bg-brand-red-hover disabled:opacity-60 active:scale-[0.98] [transition-timing-function:var(--ease-out-quint)]"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {pending ? "Sending…" : "Send Inquiry"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  errors,
  children,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  errors?: string[];
  children: React.ReactNode;
  className?: string;
}) {
  const hasError = errors && errors.length > 0;
  return (
    <label className={cn("block", className)}>
      <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
        {label}
        {required ? <span className="ml-1 text-brand-red">*</span> : null}
      </span>
      <span className="mt-1.5 block">{children}</span>
      {hasError ? (
        <span className="mt-1.5 block text-[12px] text-brand-red">{errors![0]}</span>
      ) : null}
    </label>
  );
}
