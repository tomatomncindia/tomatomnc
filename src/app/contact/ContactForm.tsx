"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitInquiry } from "./actions";
import { PRODUCT_INTERESTS, type InquiryState } from "./schema";
import { cn } from "@/lib/cn";

const initialState: InquiryState = { status: "idle" };

const INPUT_BASE =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-[14px] text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);
  const fieldErrors =
    state.status === "error" ? state.fieldErrors ?? {} : ({} as Record<string, string[]>);

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-white overflow-hidden">
      <input type="hidden" name="inquiryType" value="distributor" />
      <div className="sr-only">
        <label>
          Leave this empty
          <input name="honeypot" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Header */}
      <div className="border-b border-line px-5 md:px-6 py-5">
        <h2 className="font-display text-xl">Distributor Inquiry</h2>
        <p className="mt-1.5 text-[13.5px] text-ink-soft">
          Apply for regional distribution rights.
        </p>
      </div>

      <div className="px-5 md:px-6 py-5 md:py-6">
        {/* Status */}
        {state.status === "success" ? (
          <div className="flex items-start gap-3 rounded-md border border-forest/20 bg-forest/5 p-4 text-[14px] text-forest-deep mb-6">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{state.message}</p>
          </div>
        ) : null}
        {state.status === "error" ? (
          <div className="flex items-start gap-3 rounded-md border border-brand-red/20 bg-brand-red/5 p-4 text-[14px] text-brand-red mb-6">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{state.message}</p>
          </div>
        ) : null}

        {/* Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
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

        <Field label="Message" required name="message" errors={fieldErrors.message} className="mt-6">
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
            By submitting this form, you agree to be contacted by Tomato M&amp;C India regarding your inquiry.
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
