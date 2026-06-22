import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CONTACT, SOCIALS } from "@/data/portfolio";

export function ClosingCTA() {
  return (
    <section className="bg-ink text-bg">
      <div className="container-page py-20 lg:py-28">
        <p className="mono-label text-bg/55">Get in touch</p>
        <h2 className="mt-5 text-[clamp(2rem,3.5vw+0.5rem,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] max-w-[18ch]">
          Let&apos;s build something that matters.
        </h2>
        <p className="mt-6 text-[1.0625rem] leading-relaxed text-bg/75 max-w-[52ch]">
          Open to roles, collaborations, research, and good problems — in Bhutan
          and beyond. The fastest way to reach me is email.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-1.5 font-semibold text-ink bg-accent px-5 py-2.5 rounded-sm hover:bg-[#c8923f] transition-colors"
          >
            {CONTACT.email}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-bg under-link font-medium"
          >
            All contact options
            <ArrowUpRight size={14} className="opacity-70" />
          </Link>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-bg under-link font-medium"
            >
              {s.label}
              <ArrowUpRight size={14} className="opacity-70" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
