# Deployment — GitHub Pages (static)

The portfolio is a **static export** (no server, no database). It deploys with one
local script that builds, pushes source to a **dev** branch, and publishes the
built files to a **prod** branch that GitHub Pages serves.

```
local source ──▶ dev branch (source of truth)
     │
     └─ build (frontend/out) ──▶ prod branch ──▶ GitHub Pages
```

## One-time setup

1. **Create the GitHub repo** and add it as the remote:
   ```bash
   git remote add origin git@github.com:<you>/<repo>.git
   ```
2. **First deploy** (creates the `prod` branch):
   ```bash
   ./deploy.sh "first deploy"
   ```
3. **Enable Pages**: GitHub → repo **Settings → Pages → Build and deployment →
   Deploy from a branch → Branch: `prod` / `/ (root)`** → Save.
4. Wait ~1 minute; your site is live at the URL Pages shows.

## URL / basePath (important)

GitHub serves a project repo at `https://<you>.github.io/<repo>/` — a **subpath**.
For assets and links to resolve there, build with the base path set:

```bash
NEXT_PUBLIC_BASE_PATH="/<repo>" ./deploy.sh
```

If you use a **custom domain** or your **user site** (`<you>.github.io`), it serves
from the root — leave the base path unset and pass your domain so a CNAME is written:

```bash
CUSTOM_DOMAIN="subhamchhetri.com" ./deploy.sh
```

Also update `SITE.url` in `frontend/src/data/portfolio.ts` to the final URL
(drives canonical tags, sitemap, robots, and JSON-LD).

## Everyday deploy

After editing content (in Obsidian or in code):

```bash
./deploy.sh "update projects"
```

This runs the Obsidian sync, builds, pushes source → `dev`, and the static site →
`prod`. GitHub Pages redeploys automatically within a minute.

## Config (env overrides for deploy.sh)

| Var | Default | Purpose |
|---|---|---|
| `DEV_BRANCH` | `main` | branch that holds the source |
| `PROD_BRANCH` | `prod` | branch GitHub Pages serves (built files) |
| `REMOTE` | `origin` | git remote |
| `NEXT_PUBLIC_BASE_PATH` | _(empty)_ | `/<repo>` for project pages |
| `CUSTOM_DOMAIN` | _(empty)_ | writes a `CNAME` file for a custom domain |

## Notes

- `deploy.sh` adds a `.nojekyll` file to `prod` so GitHub Pages serves the `_next/`
  folder (Jekyll otherwise ignores `_`-prefixed paths).
- The build runs the Obsidian sync first (`PORTFOLIO_SYNC.md`); if the vault isn't
  present it falls back to committed data, so deploys never break.
- Content updates from Obsidian are committed to `dev` automatically as part of the
  deploy, so `dev` and `prod` stay in sync.
