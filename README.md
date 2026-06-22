# Subham Chhetri — Portfolio

Personal portfolio website for **Subham Chhetri**, Software Engineer at DHI InnoTech
(Thimphu, Bhutan). A static Next.js site covering about, a project showcase,
experience, FAQ, and contact.

**Live:** https://subhamchhetri.github.io/portfolio/

Built on the visual system originally created for the DHI InnoTech site (Tailwind
v4 tokens, Inter + JetBrains Mono, Framer Motion), with all content and the backend
replaced by a static, Obsidian-driven data layer.

## Getting started

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
```

## Editing content

Two ways — they combine (Obsidian overrides the curated defaults):

1. **In code** — edit **`frontend/src/data/portfolio.ts`** (profile, projects,
   experience, skills, education, trainings, awards, FAQ, contact, navigation).
2. **In Obsidian** — add a `portfolio:` block to a project note, or fill the data
   note for experience/trainings/awards. `npm run sync:content` (run automatically
   on `dev`/`build`) imports them. See **`frontend/PORTFOLIO_SYNC.md`**.

Canonical source vault:
`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/My/` (entry: `_Home.md`).

## Deploy (GitHub Pages)

One command from `frontend/`:

```bash
npm run deploy                 # sync → build → push source to main + static site to prod
npm run deploy -- "message"    # with a commit message
```

`main` holds the source, `prod` holds the built static site that GitHub Pages
serves. Full setup (Pages settings, custom domain, base path) is in
**`DEPLOYMENT.md`**.

## Docs

- `DEPLOYMENT.md` — hosting & the deploy script
- `frontend/PORTFOLIO_SYNC.md` — Obsidian → site sync (schema, examples)
- `frontend/CLAUDE.md` — architecture notes
- `frontend/DESIGN.md` — design system
