import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE, WHATSAPP_NUMBERS } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How DSmart Web Studio collects, uses and protects the information you share through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2026"
      intro="This policy explains what information we collect through this website, why we collect it and how it is handled."
    >
      <section>
        <h2>Information we collect</h2>
        <p>
          We only collect information you choose to send us. When you submit the quote form, that
          includes your name, business name, email address, phone or WhatsApp number, country, the
          service you need, your budget range, your timeline and the project description you write.
        </p>
        <p>
          Our server also records the approximate country supplied by your network provider so we
          can show prices in a suitable currency, and standard request data such as your IP address
          for spam protection and rate limiting.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To prepare and send you a project quote.</li>
          <li>To reply to your enquiry by email or WhatsApp.</li>
          <li>To protect the contact endpoint from automated abuse.</li>
          <li>To display pricing in a currency relevant to your location.</li>
        </ul>
        <p>
          We do not sell your information, and we do not share it with third parties for marketing.
        </p>
      </section>

      <section>
        <h2>Storage on your device</h2>
        <p>
          If you choose a currency manually, that preference is stored in your browser so the site
          remembers it on your next visit. You can clear it at any time through your browser
          settings.
        </p>
      </section>

      <section>
        <h2>Analytics</h2>
        <p>
          Where analytics is enabled, we use it to understand which pages and actions are useful.
          Analytics data is aggregated and is not used to identify individual visitors.
        </p>
      </section>

      <section>
        <h2>Third-party services</h2>
        <p>
          Quote submissions are delivered by email through an SMTP provider. If you continue a
          conversation on WhatsApp, that conversation is governed by WhatsApp&apos;s own privacy
          terms.
        </p>
      </section>

      <section>
        <h2>Retention</h2>
        <p>
          Enquiry emails are kept in our mailbox for as long as they are useful for the working
          relationship. You can ask us to delete your enquiry at any time.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us what information we hold about you, ask us to correct it, or ask us to
          delete it. Email {SITE.email} or message {WHATSAPP_NUMBERS[0].label} on WhatsApp and we
          will action the request.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to {SITE.email}.
        </p>
      </section>
    </LegalPage>
  );
}
