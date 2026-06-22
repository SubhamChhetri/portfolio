# Subham Chhetri — Portfolio

Personal portfolio website for Subham Chhetri (Software Engineer, Thimphu, Bhutan).
Originally forked from the DHI InnoTech website and converted into a static
portfolio — the InnoTech design system (tokens, typography, motion) is the visual
basis; all content and the backend were replaced.

## Stack

- **Next.js 16** (App Router, Turbopack) — fully static. No database, no auth, no
  server actions, no CMS. Every route is prerendered (`○ Static` / `● SSG`).
- **TypeScript** everywhere.
- **Tailwind CSS v4** with design tokens in `src/app/globals.css` (`--ink`,
  `--brand`, `--accent`, `--bg`, …). See `DESIGN.md` for the full system.
- **Framer Motion** for restrained reveals/hover. **lucide-react** for icons.
  **sonner** for toasts. `cn()` (clsx + tailwind-merge) in `src/lib/utils.ts`.
- Fonts: **Inter** + **JetBrains Mono** via `next/font/google`.

## Content

All portfolio content lives in **one file**: `src/data/portfolio.ts`
(profile, contact, socials, projects, experience, skills, education, trainings,
awards, plus `SITE` and `NAV`). To update the site, edit that file — there is no
admin UI. Source of truth is the Obsidian vault at
`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/My/` (entry: `_Home.md`).

Privacy: the public site shows email, phone, and city only. Date of birth,
nationality, passport, and NDA project internals are intentionally excluded.

## Structure

- `src/app/(public)/` — `page.tsx` (home), `about`, `projects` + `projects/[slug]`,
  `experience`, `contact`. Shared `layout.tsx` wraps header/footer.
- `src/app/layout.tsx` — root, fonts, metadata, Person JSON-LD.
- `src/components/sections/` — home sections (hero, featured-projects, expertise,
  experience-teaser, closing-cta).
- `src/components/site/` — shell (site-header, site-footer, logo, status-tag,
  project-card, page-header, motion-provider).
- `src/app/sitemap.ts`, `robots.ts` — generated from `portfolio.ts`.

## Commands

- `npm run dev` — local dev
- `npm run build` — production build (also typechecks + lints)
- `npm run start` — serve the production build
- `npm run lint`

Static output means it can deploy to any static/Node host (Vercel, Netlify, a
plain Node server). No environment variables required.
