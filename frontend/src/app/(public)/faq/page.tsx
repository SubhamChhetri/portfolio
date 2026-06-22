import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { FAQS, PROFILE, CONTACT } from "@/data/portfolio";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${PROFILE.name} — what he does, where he's based, his projects, skills, and how to get in touch.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
          faqLd(FAQS),
        ]}
      />

      <PageHeader
        eyebrow="Frequently asked questions"
        title="FAQ"
        lede={`Quick, factual answers about who ${PROFILE.shortName} is, what he builds, and how to reach him.`}
      />

      <section className="container-page pb-24">
        <dl className="border-t border-border max-w-[68ch]">
          {FAQS.map((faq) => (
            <div key={faq.q} className="border-b border-border py-7">
              <dt className="text-[1.2rem] font-semibold leading-snug tracking-[-0.015em] text-ink">
                {faq.q}
              </dt>
              <dd className="mt-3 text-[1.0625rem] leading-relaxed text-muted-strong">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-[15px] text-muted-strong">
          Still have a question? Email{" "}
          <a href={`mailto:${CONTACT.email}`} className="under-link text-ink font-medium">
            {CONTACT.email}
          </a>
          .
        </p>
      </section>
    </>
  );
}
