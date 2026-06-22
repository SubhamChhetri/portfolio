import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { PROFILE, CONTACT } from "@/data/portfolio";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd, PERSON_ID } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description: PROFILE.shortBio,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: `About ${PROFILE.name}`,
            url: "/about",
            mainEntity: { "@id": PERSON_ID },
          },
        ]}
      />
      <PageHeader
        eyebrow={`${PROFILE.role} · ${PROFILE.location}`}
        title="About"
        italic="me."
        lede={PROFILE.shortBio}
      />

      <section className="container-page pb-24 grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-12 lg:gap-16">
        <div className="min-w-0 space-y-16">
          <div className="space-y-5 max-w-[64ch]">
            {PROFILE.longBio.map((para, i) => (
              <p key={i} className="text-[1.0625rem] leading-relaxed text-ink">
                {para}
              </p>
            ))}
          </div>

          <Block title="What drives me">
            <ul className="mt-5 space-y-3 list-disc pl-5 marker:text-accent max-w-[60ch]">
              {PROFILE.interests.map((item) => (
                <li key={item} className="text-[15.5px] leading-relaxed text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Beyond the screen">
            <ul className="mt-5 space-y-3 list-disc pl-5 marker:text-accent max-w-[60ch]">
              {PROFILE.personal.map((item) => (
                <li key={item} className="text-[15.5px] leading-relaxed text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <div className="pt-10 border-t border-border">
            <p className="text-[14.5px] text-muted-strong max-w-[56ch]">
              Want the full picture of what I&apos;ve built and where I&apos;ve worked?
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 text-[14.5px]">
              <Link href="/projects" className="inline-flex items-center gap-1 text-ink under-link font-medium">
                See projects
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>
              <Link href="/experience" className="inline-flex items-center gap-1 text-ink under-link font-medium">
                See experience
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1 text-ink under-link font-medium">
                Email me
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 self-start space-y-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-2">
            <Image
              src="/subham.jpg"
              alt={`Portrait of ${PROFILE.name}`}
              fill
              sizes="(min-width: 1024px) 18rem, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <div className="mono-label text-muted">Languages</div>
            <ul className="mt-3 space-y-2">
              {PROFILE.languages.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between gap-3 text-[14px]">
                  <span className="text-ink">{l.name}</span>
                  <span className="font-mono text-[12px] text-muted">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[1.4rem] sm:text-[1.55rem] font-semibold leading-[1.2] tracking-[-0.025em]">
        {title}
      </h2>
      {children}
    </section>
  );
}
