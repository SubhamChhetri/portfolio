import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Expertise } from "@/components/sections/expertise";
import { ExperienceTeaser } from "@/components/sections/experience-teaser";
import { ClosingCTA } from "@/components/sections/closing-cta";
import { JsonLd } from "@/components/site/json-ld";
import { profilePageLd } from "@/lib/jsonld";

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePageLd()} />
      <Hero />
      <FeaturedProjects />
      <Expertise />
      <ExperienceTeaser />
      <ClosingCTA />
    </>
  );
}
