import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TOP_SKILLS, PROFILE } from "@/data/portfolio";

export function Expertise() {
  return (
    <section
      aria-labelledby="expertise-heading"
      className="section bg-surface border-y border-border"
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2
              id="expertise-heading"
              className="text-[clamp(1.75rem,2.4vw+0.8rem,2.5rem)] font-semibold leading-[1.1] tracking-[-0.025em]"
            >
              What I work on.
            </h2>
            <p className="mt-4 text-muted-strong max-w-[44ch]">
              I build at the intersection of AI, robotics, blockchain, and IoT —
              with a bias toward system architecture and shipping things that run
              in the real world.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-1 text-[14px] font-medium text-ink under-link"
            >
              More about me
              <ArrowUpRight size={14} className="opacity-60" />
            </Link>
          </div>

          <div>
            <ol className="grid gap-0 sm:grid-cols-2">
              {TOP_SKILLS.map((skill, i) => (
                <li
                  key={skill}
                  className="flex items-baseline gap-3 border-b border-border py-4"
                >
                  <span className="font-mono text-[12px] text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15.5px] font-medium text-ink">{skill}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-2">
              {PROFILE.domains.map((d) => (
                <span
                  key={d}
                  className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-strong bg-bg border border-border rounded-sm px-2 py-1"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
