import {
  SITE,
  PROFILE,
  CONTACT,
  SOCIALS,
  TOP_SKILLS,
  EXPERIENCE,
  SERVICES,
  type Project,
  type Faq,
} from "@/data/portfolio";

const BASE = SITE.url;

/** Resolve a path to an absolute URL. */
export const abs = (path: string): string =>
  path.startsWith("http") ? path : `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

export const PERSON_ID = `${BASE}/#person`;
export const WEBSITE_ID = `${BASE}/#website`;

/** The Person — the central entity of the whole site. */
export function personLd() {
  const currentRole = EXPERIENCE.find((j) => j.current);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    givenName: "Subham",
    familyName: "Chhetri",
    jobTitle: PROFILE.role,
    description: PROFILE.shortBio,
    url: BASE,
    image: abs("/subham.jpg"),
    email: `mailto:${CONTACT.email}`,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Thimphu",
      addressCountry: "BT",
    },
    worksFor: {
      "@type": "Organization",
      name: currentRole?.company ?? PROFILE.org,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Chitkara University",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
    knowsAbout: [...PROFILE.domains, ...TOP_SKILLS],
    knowsLanguage: PROFILE.languages.map((l) => l.name),
    sameAs: SOCIALS.map((s) => s.href),
    hasOccupation: {
      "@type": "Occupation",
      name: "Freelance Software Engineer",
      occupationalCategory: "15-1252.00",
      skills: TOP_SKILLS.join(", "),
    },
    // Services available for hire — signals to search/answer engines what
    // Subham can be engaged for as a freelancer.
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        serviceType: s.name,
        provider: { "@id": PERSON_ID },
        areaServed: { "@type": "Place", name: "Worldwide" },
      },
    })),
  };
}

/** The WebSite, authored and published by the Person. */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE,
    name: `${PROFILE.name} — Portfolio`,
    description: SITE.tagline,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

/** ProfilePage wrapper for the homepage, pointing at the Person. */
export function profilePageLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${BASE}/#profilepage`,
    url: BASE,
    name: `${PROFILE.name} · ${PROFILE.role}`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/** A single project as a CreativeWork created by the Person. */
export function projectLd(project: Project) {
  const externalLinks = (project.links ?? [])
    .map((l) => l.href)
    .filter((h) => h.startsWith("http"));
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": abs(`/projects/${project.slug}#project`),
    name: project.title,
    headline: project.title,
    description: project.oneLiner,
    url: abs(`/projects/${project.slug}`),
    inLanguage: "en",
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    about: project.category,
    keywords: [project.category, ...project.stack].join(", "),
    temporalCoverage: project.period,
    creativeWorkStatus: project.status,
    ...(project.partners.length
      ? {
          contributor: project.partners.map((name) => ({
            "@type": "Organization",
            name,
          })),
        }
      : {}),
    ...(externalLinks.length ? { sameAs: externalLinks } : {}),
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** ItemList of projects (used on the projects index). */
export function projectListLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Projects by ${PROFILE.name}`,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/projects/${p.slug}`),
      name: p.title,
    })),
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
