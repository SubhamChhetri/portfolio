"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/site/project-card";
import { PROJECT_CATEGORIES, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const ALL = "All";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>(ALL);

  const categories = [ALL, ...PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.category === c))];
  const visible = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(cat)}
              className={cn(
                "font-mono text-[12px] uppercase tracking-[0.04em] rounded-sm px-3 py-1.5 border transition-colors",
                isActive
                  ? "bg-ink text-bg border-ink"
                  : "bg-surface text-muted-strong border-border hover:border-border-strong"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
