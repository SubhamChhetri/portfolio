import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";

export function ExperienceTeaser() {
  const roles = EXPERIENCE.slice(0, 4);
  return (
    <section aria-labelledby="experience-teaser-heading" className="section">
      <div className="container-page">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            id="experience-teaser-heading"
            className="text-[clamp(1.75rem,2.4vw+0.8rem,2.5rem)] font-semibold leading-[1.1] tracking-[-0.025em]"
          >
            Where I&apos;ve worked.
          </h2>
          <Link
            href="/experience"
            className="inline-flex items-center gap-1 text-[14px] font-medium text-ink under-link self-start md:self-end"
          >
            Full experience
            <ArrowUpRight size={14} className="opacity-60" />
          </Link>
        </header>

        <ul className="mt-10 border-t border-border">
          {roles.map((job) => (
            <li
              key={`${job.company}-${job.role}`}
              className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-border py-5"
            >
              <div className="min-w-0">
                <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.015em]">
                  {job.role}
                  <span className="text-muted-strong font-normal"> · {job.company}</span>
                </h3>
                <p className="mt-1 text-[14.5px] text-muted-strong leading-relaxed max-w-[62ch]">
                  {job.summary}
                </p>
              </div>
              <time className="font-mono text-[12px] text-muted sm:text-right tabular-nums whitespace-nowrap">
                {job.period}
              </time>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
