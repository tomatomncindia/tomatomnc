import Link from "next/link";

import { LegalShell, LegalSection } from "@/components/legal/LegalShell";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "Terms governing the use of the Tomato M&C India website, operated by Blackchip Impex Private Limited.",
  path: "/terms",
});

const UPDATED = "7 June 2026";

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Terms of Use"
      intro="These terms govern your use of tomatomncindia.com. By using the website you accept them. If you do not agree, please do not use the site."
      updated={UPDATED}
    >
      <LegalSection number="01" title="Operator">
        <p>
          This website is operated by <strong>{SITE.contact.company}</strong> (&ldquo;Blackchip&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;), {SITE.contact.addressLines.join(", ")}, distributor
          of Tomato M&amp;C orthopedic casting products in India. The products presented on this
          site are manufactured by Tomato M&amp;C Co., Ltd. (South Korea).
        </p>
      </LegalSection>

      <LegalSection number="02" title="Informational purpose">
        <p>
          The content of this website — including product descriptions, specifications, and
          ordering codes — is provided for general information of healthcare institutions and
          prospective distributors. It does not constitute a binding offer. Quotations, samples,
          supply terms, and distribution arrangements are agreed separately in writing.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Medical disclaimer">
        <p>
          The products shown on this website are medical devices intended for application by
          trained medical personnel. Nothing on this website constitutes medical advice, diagnosis,
          or treatment guidance. Always follow the product labeling and instructions for use
          supplied with each product, and the direction of a qualified medical professional.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Inquiries and samples">
        <p>
          Submitting an inquiry through the <Link href="/contact" className="text-ink underline underline-offset-4 hover:text-forest">contact form</Link> does
          not create a distribution agreement or any other contractual relationship. We aim to
          respond to inquiries within 2 hours, but response times are not guaranteed.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Intellectual property">
        <p>
          Product names, wordmarks, and product imagery shown on this site — including Tomato Cast,
          Tomato Splint, Star Cast Roll, and Star Stockinet — are the property of Tomato M&amp;C
          Co., Ltd. or their respective owners. The remaining content of this website is the
          property of {SITE.contact.company}. You may not reproduce, distribute, or use any content
          from this site for commercial purposes without prior written permission.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>use the website for any unlawful purpose;</li>
          <li>submit false, misleading, or automated (spam) inquiries;</li>
          <li>
            attempt to interfere with the operation or security of the website, or scrape its
            content at scale;
          </li>
          <li>misrepresent your identity or affiliation when contacting us.</li>
        </ul>
      </LegalSection>

      <LegalSection number="07" title="Accuracy of information">
        <p>
          We take care to keep product information consistent with the manufacturer&rsquo;s current
          documentation, but specifications, available sizes, colors, and packaging may change.
          Always confirm details against the current product documentation provided with a
          quotation before ordering. We may update or remove website content at any time without
          notice.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Third-party links and services">
        <p>
          The website links to external services, including the manufacturer&rsquo;s website
          (tomatomnc.com), an embedded Google Map, and a WhatsApp chat link. These are operated by
          third parties under their own terms, and we are not responsible for their content or
          practices.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Limitation of liability">
        <p>
          The website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
          To the maximum extent permitted by applicable law, {SITE.contact.company} accepts no
          liability for loss or damage arising from use of, or inability to use, this website or
          reliance on its content. Nothing in these terms excludes or limits any liability that
          cannot be excluded or limited under Indian law.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Governing law">
        <p>
          These terms are governed by the laws of India. Any dispute arising from the use of this
          website is subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.
        </p>
      </LegalSection>

      <LegalSection number="11" title="Contact">
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${SITE.contact.email}`} className="text-ink underline underline-offset-4 hover:text-forest">
            {SITE.contact.email}
          </a>{" "}
          or by post to {SITE.contact.company}, {SITE.contact.addressLines.join(", ")}.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
