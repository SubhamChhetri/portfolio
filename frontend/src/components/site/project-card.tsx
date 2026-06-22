import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatusTag } from "@/components/site/status-tag";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col h-full rounded-md border border-border bg-surface p-6 transition-colors hover:border-border-strong"
    >
      <div className="flex items-center justify-between gap-3">
        <StatusTag status={project.status} />
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted truncate">
          {project.category}
        </span>
      </div>

      <h3 className="mt-5 text-[1.3rem] font-semibold leading-[1.2] tracking-[-0.02em] text-ink group-hover:text-brand transition-colors">
        {project.title}
      </h3>

      <p className="mt-3 text-[15px] leading-relaxed text-muted-strong">
        {project.oneLiner}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="font-mono text-[11px] text-muted-strong bg-bg border border-border rounded-sm px-1.5 py-0.5"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6 flex items-center justify-between gap-3 border-t border-border mt-6">
        <span className="font-mono text-[12px] text-muted truncate">
          {project.org} · {project.period}
        </span>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-muted opacity-60 group-hover:opacity-100 group-hover:text-brand transition"
        />
      </div>
    </Link>
  );
}
