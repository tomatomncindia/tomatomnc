import Link from "next/link";

import { LegalShell, LegalSection } from "@/components/legal/LegalShell";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Blackchip Impex Private Limited collects, uses, and protects personal information submitted through the Tomato M&C India website.",
  path: "/privacy",
});

const UPDATED = "7 June 2026";

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This policy explains what personal information this website collects, how it is used, and the choices you have. It applies to tomatomncindia.com, operated by Blackchip Impex Private Limited."
      updated={UPDATED}
    >
      <LegalSection number="01" title="Who we are">
        <p>
          This website is operated by <strong>{SITE.contact.company}</strong> (&ldquo;Blackchip&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;), distributor of Tomato M&amp;C orthopedic casting
          products in India. The products presented on this site are manufactured by Tomato M&amp;C
          Co., Ltd. (South Korea).
        </p>
        <p>
          {SITE.contact.company}
          <br />
          {SITE.contact.addressLines.join(", ")}
          <br />
          Tel: {SITE.contact.phones.join(" / ")}
          <br />
          Email:{" "}
          <a href={`mailto:${SITE.contact.email}`} className="text-ink underline underline-offset-4 hover:text-forest">
            {SITE.contact.email}
          </a>
        </p>
      </LegalSection>

      <LegalSection number="02" title="Information we collect">
        <p>We collect personal information only when you choose to provide it:</p>
        <ul>
          <li>
            <strong>Distributor inquiry form</strong> — company name, country, contact name, email
            address, phone number (optional), products of interest, intended territory, and your
            message.
          </li>
          <li>
            <strong>Newsletter signup</strong> — your email address, used to send our quarterly
            product and regulatory brief.
          </li>
          <li>
            <strong>Direct contact</strong> — information you share when you email, call, or
            message us on WhatsApp.
          </li>
        </ul>
        <p>
          Like most websites, our hosting and security providers also process standard technical
          data (such as IP address and browser type) in server and security logs to keep the site
          available and protected from abuse.
        </p>
      </LegalSection>

      <LegalSection number="03" title="How we use your information">
        <ul>
          <li>To respond to your inquiry and discuss samples, quotations, or distribution.</li>
          <li>To send the quarterly brief you subscribed to. You can unsubscribe at any time.</li>
          <li>To protect the website against spam and automated abuse.</li>
          <li>To comply with applicable legal obligations.</li>
        </ul>
        <p>
          We do not sell personal information, and we do not use it for third-party advertising.
        </p>
      </LegalSection>

      <LegalSection number="04" title="How inquiries are processed">
        <p>
          When you submit the contact form, your submission is delivered to our inbox as an email
          using Resend, a transactional email service. Form submissions are screened for spam using
          a hidden honeypot field and Cloudflare Turnstile verification. Where necessary to answer
          a product or supply question, we may share relevant inquiry details with the
          manufacturer, Tomato M&amp;C Co., Ltd. (South Korea).
        </p>
      </LegalSection>

      <LegalSection number="05" title="Third-party services">
        <p>The website relies on a small number of service providers:</p>
        <ul>
          <li>
            <strong>Cloudflare</strong> — website hosting and Turnstile spam protection.
          </li>
          <li>
            <strong>Resend</strong> — delivery of contact form submissions by email.
          </li>
          <li>
            <strong>Google Maps</strong> — the embedded map on our contact page is served by
            Google, which may process technical data and set its own cookies.
          </li>
          <li>
            <strong>WhatsApp (Meta)</strong> — the WhatsApp chat button opens a conversation in the
            WhatsApp app or website; any chat is governed by WhatsApp&rsquo;s own terms and privacy
            policy.
          </li>
        </ul>
        <p>
          Each provider processes data under its own privacy policy. We encourage you to review
          those policies if you want more detail on their practices.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Cookies">
        <p>
          We do not set our own analytics, advertising, or tracking cookies. Embedded third-party
          services (such as Cloudflare Turnstile and Google Maps) may set cookies that are
          functional or security-related, governed by their respective policies.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Data retention">
        <p>
          Inquiry and correspondence records are kept for as long as needed to handle your request
          and any resulting business relationship, and as required by applicable law. You may
          request deletion of your information at any time using the contact details below.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Your rights">
        <p>
          Subject to applicable Indian law, including the Digital Personal Data Protection Act,
          2023 and the Information Technology Act, 2000, you may request access to, correction of,
          or erasure of the personal information we hold about you, and you may withdraw consent to
          further communication at any time. To exercise these rights, write to{" "}
          <a href={`mailto:${SITE.contact.email}`} className="text-ink underline underline-offset-4 hover:text-forest">
            {SITE.contact.email}
          </a>
          . We will respond as promptly as we can.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Children">
        <p>
          This is a business-to-business website intended for healthcare institutions and
          distributors. It is not directed at children, and we do not knowingly collect information
          from children.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Changes to this policy">
        <p>
          We may update this policy from time to time. The date at the top of this page reflects
          the most recent revision. Material changes will be reflected on this page.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Contact">
        <p>
          Questions about this policy or your data can be sent to{" "}
          <a href={`mailto:${SITE.contact.email}`} className="text-ink underline underline-offset-4 hover:text-forest">
            {SITE.contact.email}
          </a>{" "}
          or by post to {SITE.contact.company}, {SITE.contact.addressLines.join(", ")}. You can
          also reach us via the <Link href="/contact" className="text-ink underline underline-offset-4 hover:text-forest">contact page</Link>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
