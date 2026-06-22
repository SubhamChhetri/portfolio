import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { PROJECTS } from "@/data/portfolio";
import { ProjectsGrid } from "./projects-grid";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd, projectListLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects across AI, robotics, blockchain, IoT, and full-stack — from national infrastructure to personal ventures.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
          projectListLd(PROJECTS),
        ]}
      />
      <PageHeader
        eyebrow={`${PROJECTS.length} projects`}
        title="Projects"
        lede="Work across AI & computer vision, robotics, blockchain, IoT, and full-stack — spanning national infrastructure, government platforms, and personal ventures."
      />
      <section className="container-page pb-24">
        <ProjectsGrid projects={PROJECTS} />
      </section>
    </>
  );
}
