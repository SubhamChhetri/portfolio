# Subham Chhetri — Portfolio

Personal portfolio website for **Subham Chhetri**, Software Engineer at DHI InnoTech
(Thimphu, Bhutan). A static Next.js site covering an about page, project showcase,
experience, and contact.

Built on the visual system originally created for the DHI InnoTech site (Tailwind
v4 tokens, Inter + JetBrains Mono, Framer Motion), with all content and the backend
replaced by a static, markdown-sourced data layer.

## Getting started

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
```

## Build & serve

```bash
cd frontend
npm run build
npm run start
```

The site is fully static (no database, no auth, no environment variables) and can be
deployed to any static or Node host.

## Editing content

All content lives in **`frontend/src/data/portfolio.ts`** — profile, projects,
experience, skills, education, trainings, awards, contact, and navigation. Edit that
file and rebuild; there is no admin UI.

The canonical source is the Obsidian vault under
`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/My/` (entry: `_Home.md`).

See `frontend/CLAUDE.md` for architecture notes and `frontend/DESIGN.md` for the
design system.
