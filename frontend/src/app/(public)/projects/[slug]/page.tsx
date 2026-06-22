import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { StatusTag } from "@/components/site/status-tag";
import { PROJECTS, getProjectBySlug, CONTACT } from "@/data/portfolio";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd, projectLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.oneLiner,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.oneLiner,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      <JsonLd
        data={[
          projectLd(project),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />
      <header className="container-page pt-12 sm:pt-16 lg:pt-20 pb-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-muted hover:text-ink transition-colors group"
        >
          <span className="inline-flex items-center justify-center size-7 rounded-full border border-border bg-surface group-hover:border-border-strong group-hover:bg-surface-2 transition-colors">
            <ArrowLeft size={13} />
          </span>
          All projects
        </Link>

        <div className="mt-10">
          <div className="flex items-center gap-3">
            <StatusTag status={project.status} />
            <span className="font-mono text-[12px] text-muted">{project.category}</span>
          </div>
          <h1 className="mt-5 font-semibold tracking-[-0.035em] leading-[1.04] text-ink text-[clamp(2.25rem,4.6vw+0.5rem,3.75rem)] max-w-[22ch]">
            {project.title}
          </h1>
          <p className="mt-5 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-muted-strong max-w-[60ch]">
            {project.oneLiner}
          </p>
        </div>
      </header>

      <section className="container-page pb-24 grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-10 lg:gap-16">
        <aside className="lg:sticky lg:top-28 self-start space-y-7 text-[13.5px]">
          <Aside title="Role" value={project.role} />
          <Aside title="Organization" value={project.org} />
          {project.partners.length > 0 && (
            <Aside title="Partners" value={project.partners.join(" · ")} />
          )}
          <Aside title="Period" value={project.period} />
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <div className="mono-label text-muted">Highlights</div>
              <ul className="mt-2 space-y-1.5">
                {project.metrics.map((m) => (
                  <li key={m} className="text-[13.5px] text-ink leading-snug">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div className="min-w-0 space-y-14">
          <Block title="Overview">
            <div className="mt-5 space-y-4">
              {project.summary.map((para, i) => (
                <p key={i} className="text-[1.0625rem] leading-relaxed text-ink max-w-[62ch]">
                  {para}
                </p>
              ))}
            </div>
          </Block>

          {project.highlights && project.highlights.length > 0 && (
            <Block title="What I did">
              <ul className="mt-5 space-y-3 list-disc pl-5 marker:text-accent">
                {project.highlights.map((h) => (
                  <li key={h} className="text-[15.5px] leading-relaxed text-ink max-w-[60ch]">
                    {h}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block title="Tech stack">
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[12px] text-muted-strong bg-surface border border-border rounded-sm px-2 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
          </Block>

          {project.confidential && (
            <p className="text-[14px] text-muted-strong italic max-w-[58ch]">
              Some details of this project are under NDA and intentionally omitted.
            </p>
          )}

          {project.links && project.links.length > 0 && (
            <Block title="Links">
              <ul className="mt-5 divide-y divide-border border-t border-b border-border">
                {project.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between gap-4 py-4 text-[15px]"
                    >
                      <span className="text-ink group-hover:text-brand transition-colors">
                        {l.label}
                      </span>
                      <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <div className="pt-10 border-t border-border">
            <p className="text-[14.5px] text-muted-strong max-w-[58ch]">
              Curious about this project or want to work together?
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3 text-[14.5px]">
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-1 text-ink under-link font-medium"
              >
                Email me
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-ink under-link font-medium"
              >
                Back to all projects
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function Aside({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <div className="mono-label text-muted">{title}</div>
      <p className="mt-2 text-[13.5px] text-ink leading-snug">{value}</p>
    </div>
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
