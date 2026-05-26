"use client";

import { useState } from "react";
import { ArrowRight, Check, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Footer newsletter signup. No backend wired yet — this is a UI shell.
 * On submit we validate email shape and simulate success. Wire to a real
 * mailing service (Resend audience, Mailchimp, etc.) when ready.
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    // Basic shape check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }

    // Simulated submit. Replace with real call.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-3 rounded-md border border-mid-green/30 bg-mid-green/10 px-4 py-3 text-[14px] text-white">
        <Check className="h-4 w-4 text-mid-green" strokeWidth={2.5} />
        <p>
          Subscribed. Next issue ships {nextQuarterLabel()}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap items-stretch gap-2 max-w-md">
      <label className="sr-only" htmlFor="newsletter-email">
        Work email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") {
            setStatus("idle");
            setErrorMsg(null);
          }
        }}
        autoComplete="email"
        className="flex-1 min-w-0 rounded-md border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/35 focus:outline-none focus:border-mid-green focus:ring-2 focus:ring-mid-green/20 transition"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center gap-2 rounded-md bg-mid-green px-4 py-2.5 text-[14px] font-medium text-ink transition-[background,transform] duration-200 hover:bg-mid-green/90 active:scale-[0.98] disabled:opacity-60 [transition-timing-function:var(--ease-out-quint)]"
      >
        {status === "submitting" ? "Subscribing…" : "Subscribe"}
        {status === "idle" ? (
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        ) : null}
      </button>
      {status === "error" && errorMsg ? (
        <p className="basis-full inline-flex items-center gap-1.5 text-[12.5px] text-red-300/90">
          <AlertCircle className="h-3.5 w-3.5" />
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}

function nextQuarterLabel() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const quarterStartMonths = [0, 3, 6, 9]; // Jan, Apr, Jul, Oct
  const nextStart = quarterStartMonths.find((m) => m > month);
  if (nextStart !== undefined) {
    return monthName(nextStart) + " " + year;
  }
  return "Jan " + (year + 1);
}

function monthName(m: number) {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m];
}
