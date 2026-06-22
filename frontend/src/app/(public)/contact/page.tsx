import type { Metadata } from "next";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { CONTACT, SOCIALS, PROFILE } from "@/data/portfolio";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd, PERSON_ID } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${PROFILE.name} — email, phone, and social links.`,
  alternates: { canonical: "/contact" },
};

const DIRECT = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: CONTACT.location,
    href: null,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${PROFILE.name}`,
            url: "/contact",
            mainEntity: { "@id": PERSON_ID },
          },
        ]}
      />
      <PageHeader
        eyebrow="Get in touch"
        title="Let's talk."
        lede="Open to roles, collaborations, and research. Email is the fastest way to reach me — I read everything."
      />

      <section className="container-page pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <div className="mono-label text-muted">Direct</div>
          <ul className="mt-4 divide-y divide-border border-t border-b border-border">
            {DIRECT.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                {href ? (
                  <a href={href} className="group flex items-center gap-4 py-5">
                    <Icon size={18} className="shrink-0 text-muted" />
                    <span className="min-w-0">
                      <span className="block mono-label text-muted">{label}</span>
                      <span className="block text-[1.0625rem] text-ink group-hover:text-brand transition-colors under-link">
                        {value}
                      </span>
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 py-5">
                    <Icon size={18} className="shrink-0 text-muted" />
                    <span className="min-w-0">
                      <span className="block mono-label text-muted">{label}</span>
                      <span className="block text-[1.0625rem] text-ink">{value}</span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mono-label text-muted">Elsewhere</div>
          <ul className="mt-4 divide-y divide-border border-t border-b border-border">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span className="min-w-0">
                    <span className="block mono-label text-muted">{s.label}</span>
                    <span className="block text-[1.0625rem] text-ink group-hover:text-brand transition-colors under-link">
                      {s.handle}
                    </span>
                  </span>
                  <ArrowUpRight size={16} className="shrink-0 text-muted opacity-60 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
