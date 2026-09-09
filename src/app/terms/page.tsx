import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms that apply to using the DSmart Web Studio website and to projects we take on.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="September 2026"
      intro="These terms cover the use of this website and the general basis on which we take on work."
    >
      <section>
        <h2>Using this website</h2>
        <p>
          The content on this site is provided for information. You may not copy the design, code or
          written content for commercial use without written permission.
        </p>
      </section>

      <section>
        <h2>Quotes and pricing</h2>
        <p>
          Prices shown are starting points, set in Nigerian naira. Amounts displayed in other
          currencies are approximate conversions for guidance only and are not a binding quote. The
          final price for any project is the one confirmed in writing after we understand the scope.
        </p>
      </section>

      <section>
        <h2>Project work</h2>
        <p>
          Every engagement is confirmed with its own scope, timeline, payment schedule and
          deliverables before work begins. Timelines assume that content, feedback and approvals are
          provided when needed.
        </p>
      </section>

      <section>
        <h2>Search engine optimization</h2>
        <p>
          We build and optimize websites to improve search visibility. Search engines control their
          own rankings, so we do not guarantee any specific position, ranking or traffic volume.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          On full payment, you own the final deliverables produced for your project. We retain the
          right to reference the work in our portfolio unless we agree otherwise in writing.
        </p>
      </section>

      <section>
        <h2>Third-party services</h2>
        <p>
          Projects may rely on third-party services such as hosting, payment gateways, domain
          registrars or analytics. Those services are governed by their own terms and pricing.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          We take care to deliver work that performs, but we are not liable for indirect or
          consequential losses arising from the use of a delivered product.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent to {SITE.email}.</p>
      </section>
    </LegalPage>
  );
}
