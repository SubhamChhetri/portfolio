# Syncing projects from Obsidian

Your projects can be driven straight from the Obsidian vault. Add a `portfolio:`
block to a project note's frontmatter, then run the site — the project shows up
(or updates) automatically. No code editing required.

## How it works

```
Obsidian note  ──(npm run sync:content)──▶  src/data/projects.generated.json
                                                       │  merged by slug, on top of
                                                       ▼  the curated BASE_PROJECTS
                                              src/data/portfolio.ts → the website
```

- `sync:content` runs **automatically** before `npm run dev` and `npm run build`
  (via the `predev` / `prebuild` hooks). You can also run it manually:
  `npm run sync:content`.
- It reads every `.md` under your vault's `Projects/` folder (recursively) and
  collects the ones that have a `portfolio:` frontmatter block.
- It writes them to `src/data/projects.generated.json`, which is **merged by
  `slug`** on top of the curated defaults in `src/data/portfolio.ts`:
  - a note whose slug matches a default **updates** that project (only the fields
    you provide; everything else stays),
  - a new slug is **added**,
  - `show: false` **removes/hides** a project.
- The script **never modifies your vault**. If the vault isn't found (e.g. on a
  deploy server), it skips and the committed JSON is used — so builds never break.
- Commit `src/data/projects.generated.json` so your deploy reflects the latest sync.

## Vault location

Defaults to:
`~/Library/Mobile Documents/iCloud~md~obsidian/Documents/My/Projects`

Override with an env var if your vault is elsewhere:

```bash
PORTFOLIO_VAULT_PATH="/path/to/your/Vault/My" npm run sync:content
```

(Point it at the folder that contains `Projects/`.)

## Frontmatter schema

Add this `portfolio:` block to any project note's frontmatter. Keep your existing
Obsidian frontmatter (title, tags, etc.) — just add `portfolio:` alongside it.

```yaml
---
title: DRIVE ANPR System          # your normal Obsidian frontmatter is fine
portfolio:
  show: true                      # optional; set false to hide. default: shown
  slug: drive-anpr                # optional; defaults to a slug of the title/filename
  title: DRIVE ANPR System        # optional; defaults to frontmatter title/filename
  status: live                    # live | in-development | completed | research
  category: AI & Computer Vision  # see the list below — must match exactly
  role: Led the technical side
  org: DHI InnoTech
  partners: [Royal Bhutan Police]
  period: 2024 – present
  featured: true                  # show on the homepage "Selected work"
  oneLiner: One sentence shown on the project card.
  stack: [YOLOv8, Florence-2 OCR, Computer Vision]
  summary:                        # paragraphs for the detail page
    - First paragraph.
    - Second paragraph.
  highlights:                     # "What I did" bullets
    - Built the real-time communication layer
    - Optimised on-device inference
  metrics:                        # short outcome bullets (sidebar)
    - 10 cameras + 3 GPU servers live
  links:
    - { label: Press coverage, href: https://example.com/article }
    - { label: GitHub, href: https://github.com/you/repo }
  confidential: false             # optional; shows an NDA note, omit links
---
```

### Allowed `status` values
`live` · `in-development` · `completed` · `research`

### Allowed `category` values (must match exactly)
- `AI & Computer Vision`
- `Robotics`
- `IoT & Embedded`
- `Blockchain & Web3`
- `Conservation & Climate Tech`
- `Government & Civic`
- `Mobile & Web Apps`

## Minimal example (new project)

```yaml
---
portfolio:
  status: in-development
  category: Mobile & Web Apps
  role: Founder / lead developer
  org: Personal project
  period: 2026 – present
  oneLiner: A new app I'm building.
  stack: [React Native, PostgreSQL]
  featured: false
---
```

Run `npm run sync:content` (or just `npm run dev`) and it appears on the site.

## Experience, trainings & awards

These three list sections are driven from the frontmatter of a single **data
note** (default `<vault>/Portfolio.md`, override with `PORTFOLIO_DATA_NOTE`). If a
list is present and non-empty it **replaces** the curated default; if absent, the
default is used. Create the note with this frontmatter:

```yaml
---
experience:
  - role: Software Engineer
    company: DHI InnoTech (DRIVE)
    type: Full-time          # Full-time | Contract | Internship | Volunteer
    period: Jun 2023 – present
    current: true
    summary: One or two lines about the role.
trainings:
  - title: Sui Bootcamp
    org: Sui Foundation
    note: Sui / Move blockchain development.
awards:
  - title: ICDL National Champion
    year: "2018"
    note: First in Bhutan; represented Bhutan at the international finals.
---
```

Run `npm run sync:content` (or `npm run dev`) to apply.

## Deploying (GitHub Pages)

The site is a static export. `./deploy.sh` (in the repo root) syncs from Obsidian,
builds, pushes source to the **dev** branch, and publishes the static files to the
**prod** branch that GitHub Pages serves. See `DEPLOYMENT.md`.

## Notes

- Only the `portfolio:` frontmatter is read — the note body is ignored, so your
  scratch notes and links stay private. Put anything you want public into the
  `summary` / `highlights` fields.
- Invalid `status`/`category` values are warned about and skipped (the rest of the
  project still syncs).
- To stop managing a project from Obsidian, remove its `portfolio:` block and edit
  `src/data/portfolio.ts` directly instead.
