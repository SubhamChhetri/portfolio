import Link from "next/link";
import { NAV, NAV_CTA, PROFILE, CONTACT, SOCIALS } from "@/data/portfolio";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bg mt-auto">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-[34ch]">
            <Logo tone="bg" />
            <p className="mt-5 text-[14px] leading-relaxed text-bg/70">
              {PROFILE.role} at {PROFILE.org}, working at the intersection of AI,
              robotics, blockchain, and IoT — from {PROFILE.location}.
            </p>
            <div className="mt-6 h-px w-12 bg-accent" aria-hidden />
            <p className="mt-5 font-mono text-[12px] text-bg/60 leading-relaxed">
              {CONTACT.location}
              <br />
              <a
                href={`mailto:${CONTACT.email}`}
                className="under-link hover:text-accent transition-colors"
              >
                {CONTACT.email}
              </a>
            </p>
          </div>

          <div>
            <div className="mono-label text-bg/55">Explore</div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[...NAV, { label: "FAQ", href: "/faq" }, NAV_CTA].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-bg/85 hover:text-accent transition-colors under-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono-label text-bg/55">Elsewhere</div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[14px] text-bg/85 hover:text-accent transition-colors under-link"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border-dark flex flex-col md:flex-row gap-4 md:items-center md:justify-between font-mono text-[12px] text-bg/55">
          <div>© {new Date().getFullYear()} {PROFILE.name}.</div>
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={`${PROFILE.name} on ${s.label} (opens in new tab)`}
                className="hover:text-accent transition-colors"
                rel="noreferrer noopener"
                target="_blank"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
