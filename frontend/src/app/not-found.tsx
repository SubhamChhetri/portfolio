import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV, CONTACT } from "@/data/portfolio";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <article className="container-page pt-20 sm:pt-28 lg:pt-32 pb-24 sm:pb-32">
          <div className="flex items-center gap-2 mono-label text-muted-strong">
            <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden />
            404 · Page not found
          </div>

          <h1 className="mt-7 font-semibold tracking-[-0.035em] leading-[1.04] text-ink text-[clamp(2.25rem,4.4vw+0.5rem,3.5rem)] max-w-[22ch]">
            That page isn&apos;t here.
          </h1>
          <p className="mt-6 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-muted-strong max-w-[58ch]">
            It may have moved, or never existed. The entry points below are the
            working ones — pick whichever matches what you came for.
          </p>

          <hr className="hairline mt-12" />

          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-y-10 sm:gap-x-10 lg:gap-x-16">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group block">
                  <h2 className="text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.02em] group-hover:text-brand transition-colors">
                    {item.label}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-ink under-link">
                    Go to {item.label}
                    <ArrowUpRight size={14} className="opacity-60" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-16 font-mono text-[12px] text-muted">
            Still stuck? Email{" "}
            <a href={`mailto:${CONTACT.email}`} className="under-link text-ink">
              {CONTACT.email}
            </a>
            .
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
