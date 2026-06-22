# Subham Chhetri — Portfolio

Personal portfolio website for Subham Chhetri (Software Engineer, Thimphu, Bhutan).
Originally forked from the DHI InnoTech website and converted into a static,
Obsidian-driven portfolio — the InnoTech design system (tokens, typography,
motion) is the visual basis; all content and the backend were replaced.

Live: https://subhamchhetri.github.io/portfolio/ (GitHub Pages, `prod` branch).

## Stack

- **Next.js 16** (App Router, Turbopack) — **static export** (`output: "export"`,
  `next.config.ts`). No database, no auth, no server actions, no CMS. Every route
  is prerendered to `out/`.
- **TypeScript** everywhere.
- **Tailwind CSS v4** with design tokens in `src/app/globals.css` (`--ink`,
  `--brand`, `--accent`, `--bg`, …). See `DESIGN.md` for the full system.
- **Framer Motion** for restrained reveals/hover. **lucide-react** for icons.
  **sonner** for toasts. `cn()` (clsx + tailwind-merge) in `src/lib/utils.ts`.
- Fonts: **Inter** + **JetBrains Mono** via `next/font/google`.

## Content

Curated defaults live in **`src/data/portfolio.ts`** (profile, contact, socials,
projects, experience, skills, education, trainings, awards, FAQ, services, plus
`SITE` and `NAV`). Edit that file directly, or drive it from Obsidian (below).

The canonical source is the Obsidian vault at
`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/My/` (entry: `_Home.md`).

### Obsidian sync (`PORTFOLIO_SYNC.md`)
`npm run sync:content` (runs automatically on `dev`/`build` via `predev`/`prebuild`)
reads the vault and writes `src/data/*.generated.json`, which is merged on top of
the curated base lists in `portfolio.ts`:
- **Projects** — per-note `portfolio:` frontmatter in `Projects/*.md`, merged by
  `slug` (`projects.generated.json`). `_`-prefixed notes are skipped.
- **Experience / trainings / awards** — arrays in a single data note's frontmatter
  (default `Portfolio.md`, env `PORTFOLIO_DATA_NOTE`); each replaces its base list
  when non-empty (`{experience,trainings,awards}.generated.json`).
- The script never edits the vault; if the vault is absent (e.g. CI) it falls back
  to the committed JSON, so builds never break.

Privacy: the public site shows email, phone, and city only. Date of birth,
nationality, passport, and NDA project internals are intentionally excluded.

## SEO / GEO / AEO

- `src/lib/jsonld.ts` + `src/components/site/json-ld.tsx` emit Schema.org JSON-LD:
  Person (with offered services + occupation), WebSite, ProfilePage, CreativeWork
  (per project), FAQPage, BreadcrumbList.
- `src/app/robots.ts` allows AI crawlers (OAI-SearchBot, GPTBot, etc.);
  `src/app/sitemap.ts` and `public/llms.txt` list all pages. All three are
  `dynamic = "force-static"` for export.
- Metadata + FAQ lead with freelance discovery signals.

## Structure

- `src/app/(public)/` — `page.tsx` (home), `about`, `projects` + `projects/[slug]`,
  `experience`, `faq`, `contact`. Shared `layout.tsx` wraps header/footer.
- `src/app/layout.tsx` — root: fonts, metadata, Person + WebSite JSON-LD, icons.
- `src/app/icon.svg` (favicon "SC" mark) + `public/apple-icon.png` (Apple touch
  icon). Icon hrefs are declared in `layout.tsx` metadata with `assetPath()` so the
  base path is applied (Next doesn't prefix metadata icon URLs in export).
- `src/components/sections/` — home sections (hero, featured-projects, expertise,
  experience-teaser, closing-cta).
- `src/components/site/` — shell (site-header, site-footer, logo, status-tag,
  project-card, json-ld, page-header, motion-provider).
- `scripts/sync-content.mjs` — the Obsidian sync. `../deploy.sh` — the deploy.

### Gotchas
- **basePath**: hosted at a GitHub project page (`/portfolio`). `next/image` does
  **not** add basePath to unoptimized images in export, so reference public assets
  via `assetPath()` from `src/lib/utils.ts` (e.g. the portrait `/subham.jpg`).
- **Mobile nav**: the drawer must live **outside** `<header>` — the header's
  `backdrop-filter` would otherwise become the containing block for the `fixed`
  drawer and collapse it.

## Commands

- `npm run dev` — local dev (syncs from Obsidian first)
- `npm run build` — static export to `out/` (syncs first; typechecks + lints)
- `npm run start` — serve a non-export build (not used for deploy)
- `npm run sync:content` — sync projects/content from the Obsidian vault
- `npm run deploy` — sync + build + push source → `main` and static site → `prod`
  (`= NEXT_PUBLIC_BASE_PATH=/portfolio bash ../deploy.sh`). See `DEPLOYMENT.md`.
- `npm run lint`
