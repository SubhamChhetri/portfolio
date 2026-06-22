import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/portfolio";
import { ProjectCard } from "@/components/site/project-card";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-projects-heading" className="section relative">
      <div className="container-page">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2
              id="featured-projects-heading"
              className="text-[clamp(1.75rem,2.4vw+0.8rem,2.5rem)] font-semibold leading-[1.1] tracking-[-0.025em]"
            >
              Selected work.
            </h2>
            <p className="mt-4 text-muted-strong max-w-[56ch]">
              A few projects that show the range — national AI infrastructure, an
              app with 10,000+ downloads, robotics R&amp;D with MIT, and offline
              blockchain validated with the Sui team.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-[14px] font-medium text-ink under-link self-start md:self-end"
          >
            All projects
            <ArrowUpRight size={14} className="opacity-60" />
          </Link>
        </header>

        <hr className="hairline mt-10 mb-12" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
