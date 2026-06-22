import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import {
  EXPERIENCE,
  SKILL_GROUPS,
  EDUCATION,
  TRAININGS,
  AWARDS,
} from "@/data/portfolio";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work history, skills, education, trainings, and awards — from DHI InnoTech to a B.E. in Computer Science & Engineering (CGPA 9.65/10).",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ])}
      />
      <PageHeader
        eyebrow="Work · Skills · Education"
        title="Experience"
        lede="Roles, the skills behind them, and the credentials along the way."
      />

      <div className="container-page pb-24 space-y-20">
        {/* Work */}
        <Section title="Work">
          <ul className="border-t border-border">
            {EXPERIENCE.map((job) => (
              <li
                key={`${job.company}-${job.role}`}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-border py-6"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-[1.1rem] font-semibold leading-snug tracking-[-0.015em]">
                      {job.role}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted">
                      {job.type}
                    </span>
                    {job.current && (
                      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-accent">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[15px] text-brand">{job.company}</p>
                  <p className="mt-2 text-[14.5px] text-muted-strong leading-relaxed max-w-[64ch]">
                    {job.summary}
                  </p>
                </div>
                <time className="font-mono text-[12px] text-muted sm:text-right tabular-nums whitespace-nowrap">
                  {job.period}
                </time>
              </li>
            ))}
          </ul>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <div className="mono-label text-muted">{group.label}</div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-[12px] text-muted-strong bg-surface border border-border rounded-sm px-2 py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          <ul className="border-t border-border">
            {EDUCATION.map((ed) => (
              <li
                key={ed.degree}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-border py-6"
              >
                <div className="min-w-0">
                  <h3 className="text-[1.1rem] font-semibold leading-snug tracking-[-0.015em]">
                    {ed.degree}
                  </h3>
                  <p className="mt-0.5 text-[15px] text-brand">{ed.school}</p>
                  <p className="mt-2 text-[14.5px] text-muted-strong leading-relaxed max-w-[64ch]">
                    {ed.detail}
                  </p>
                </div>
                <time className="font-mono text-[12px] text-muted sm:text-right tabular-nums whitespace-nowrap">
                  {ed.period}
                </time>
              </li>
            ))}
          </ul>
        </Section>

        {/* Trainings */}
        <Section title="Trainings & courses">
          <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {TRAININGS.map((t) => (
              <li key={t.title} className="border-l-2 border-accent pl-4">
                <h3 className="text-[15.5px] font-semibold leading-snug">{t.title}</h3>
                <p className="mt-0.5 font-mono text-[12px] text-muted">{t.org}</p>
                <p className="mt-1.5 text-[14px] text-muted-strong leading-relaxed">
                  {t.note}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Awards */}
        <Section title="Awards & distinctions">
          <ul className="border-t border-border">
            {AWARDS.map((a) => (
              <li
                key={a.title}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-border py-5"
              >
                <div className="min-w-0">
                  <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.015em]">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-[14.5px] text-muted-strong leading-relaxed max-w-[64ch]">
                    {a.note}
                  </p>
                </div>
                <time className="font-mono text-[12px] text-muted sm:text-right tabular-nums">
                  {a.year}
                </time>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`sec-${title}`}>
      <h2
        id={`sec-${title}`}
        className="text-[clamp(1.5rem,2vw+0.7rem,2rem)] font-semibold leading-[1.1] tracking-[-0.025em] mb-8"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
