# Design

> Starter visual system seeded from the PRD (no code exists yet). Re-run `/impeccable document` after Phase 0 scaffolds tokens, so the real implementation tokens supersede this file.

## Theme

A working R&D lab in Thimphu. The reading scene is daylight on a 4-inch Android over a Bhutanese mobile connection, or a researcher on a laptop at a desk. The mood is daylight, not dusk. Default to **light mode** as the primary surface; a dark mode follows later but is not the lead. The page should feel like a research paper or a technical report typeset for the web: high information density, generous left/right whitespace, photography of real Bhutanese projects (water systems, fab lab, sites) doing more visual work than decorative graphics.

**Color strategy: Committed.** The deep navy `#111b3c` carries a meaningful share of the page (top nav, footer, dark feature sections, large display type, MCIF page hero). The gold `#e3af63` is the *single* accent, used sparingly: status tags, the underline behind the logo, a single hairline divider, a hover state. The off-white `#f8f6f7` is the default page background; the warm tint `#fdecd9` is reserved for callouts and the occasional MCIF / fund-related surface, never the body background.

This is not "navy + gold corporate". The differentiator is restraint: most of the page is off-white and ink, with navy and gold appearing where they matter.

## Color Palette

OKLCH values are derived from the PRD hex values for accurate tinting and dark-mode interpolation. Hex remains canonical.

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `--ink` | `#111b3c` | `oklch(0.236 0.077 270.4)` | Primary text, headers, footer, dark sections, the "navy" the brand is built on |
| `--brand` | `#28428b` | `oklch(0.397 0.143 268.7)` | Logo mark, primary buttons, links, focus rings |
| `--brand-hover` | `#526ac8` | `oklch(0.530 0.155 275.7)` | Hover for `--brand`, secondary accents, wordmark tone |
| `--accent` | `#e3af63` | `oklch(0.788 0.121 78.9)` | Status tags ("Pilot"/"Deployed"), the logo's gold underline, dividers, highlight strokes. Decorative or large-text only against light backgrounds |
| `--accent-soft` | `#fdecd9` | `oklch(0.952 0.030 75.7)` | Soft section background for callouts, MCIF funding visuals. **Not** the body bg |
| `--bg` | `#f8f6f7` | `oklch(0.974 0.003 325.0)` | Default page background. Reads as off-white, slightly cool, neutral |
| `--surface` | `#ffffff` | `oklch(1 0 0)` | Card / panel surface on top of `--bg` |
| `--surface-dark` | `#0a1230` | derived | Dark section surface, one step deeper than `--ink` for layering |
| `--muted` | `oklch(0.55 0.02 270)` | derived | Secondary text, dates, metadata. Verified ≥4.5:1 on `--bg` |
| `--border` | `oklch(0.90 0.005 270)` | derived | 1px hairlines, table rules, input borders |
| `--border-strong` | `oklch(0.78 0.01 270)` | derived | Hover/focus borders, divider between hero and body |

**Contrast verification (target: WCAG AA):**
- `--ink` on `--bg`: ~14.5:1 (body text ✅)
- `--brand` on `--bg`: ~8.2:1 (links, button labels ✅)
- `--brand` on `--surface`: ~8.7:1 (✅)
- `--accent` on `--bg`: ~2.1:1 (decorative or ≥24px display only; never small text)
- `--bg` on `--ink`: ~14.5:1 (inverted text, e.g. footer ✅)
- `--muted` on `--bg`: target ≥4.6:1 (verify on first build; reduce L if it falls short)

**Status tag mapping** (project cards):
- Research → `--accent-soft` bg, `--ink` text, `--accent` underline
- Pilot → `--brand` bg, white text
- Deployed → `--ink` bg, `--accent` text
- Shelved → `--border` bg, `--muted` text

## Typography

Two families. **Inter** for everything that isn't code or metadata; **JetBrains Mono** for code, dates, project IDs, version tags, and any tabular metadata. Inter Italic is used for subheadings and pull quotes, as a deliberate voice gesture, not as a default subhead style.

### Scale

Modular scale at ratio ~1.25 (major third), tuned so display steps are wide enough to feel typographic, not generic, and body steps land on a 4px grid.

| Token | Size (mobile → desktop) | Line height | Weight | Use |
|---|---|---|---|---|
| `--text-display` | `clamp(2.5rem, 5vw + 1rem, 5rem)` | 1.02 | 600 | Home hero, MCIF page hero. Letter-spacing `-0.035em`. Use `text-wrap: balance` |
| `--text-h1` | `clamp(2rem, 3vw + 1rem, 3.25rem)` | 1.08 | 600 | Page titles. `-0.03em` |
| `--text-h2` | `clamp(1.5rem, 1.5vw + 1rem, 2.25rem)` | 1.15 | 600 | Section headings. `-0.02em` |
| `--text-h3` | `1.25rem` → `1.5rem` | 1.25 | 600 | Sub-section, card titles. `-0.01em` |
| `--text-body` | `1.0625rem` (17px) | 1.6 | 400 | Long-form prose. `max-width: 68ch` |
| `--text-body-sm` | `0.9375rem` (15px) | 1.55 | 400 | Secondary copy, card bodies |
| `--text-meta` | `0.8125rem` (13px) | 1.4 | 500, JetBrains Mono | Dates, project IDs, status tags, metadata |
| `--text-eyebrow` | `0.75rem` (12px) | 1.2 | 600, uppercase, +0.08em tracking | **Used sparingly.** One per page max, only when a sequence requires it (e.g. the MCIF flow). Never as a default scaffold above every section |

### Rules

- Body line length capped at 68ch on long-form pages (Research, News & Blog posts, About).
- No all-caps body copy. Uppercase reserved for `--text-eyebrow` and short status tags (≤2 words).
- `text-wrap: balance` on h1, h2, hero display. `text-wrap: pretty` on `--text-body` paragraphs.
- Italics are *Inter Italic* set as subheads or pull quotes, not as inline emphasis.
- Code blocks, repo names, dataset names use JetBrains Mono at `--text-body-sm` size.

## Layout & Spacing

### Grid

12-column grid on desktop, snap to 4-column on mobile. Maximum content width `--container-max: 76rem` (1216px). Inside that, three useful column widths:

- `--col-prose: 38rem` (608px) — long-form prose (About, Research detail, blog posts).
- `--col-wide: 56rem` (896px) — section headers, project list intros.
- `--col-full: 100%` of container — galleries, project grids, MCIF Sankey/flow visuals.

### Spacing scale

8px base. Token names map to use, not to scale numbers, so they survive a scale change.

| Token | Value | Use |
|---|---|---|
| `--space-xs` | 4px | Icon/text gaps, badge padding |
| `--space-sm` | 8px | Tight stack, form field internal padding |
| `--space-md` | 16px | Default stack, card padding |
| `--space-lg` | 24px | Section sub-rhythm, between paragraphs and figures |
| `--space-xl` | 40px | Between top-level groups inside a section |
| `--space-2xl` | 64px | Between sections on the same page |
| `--space-3xl` | 96px | Hero ↔ first section, footer ↔ last section |
| `--space-4xl` | 128px | Page top padding on landing surfaces |

Vary spacing for rhythm. Hero → first section uses `--space-3xl`; between two project-list sections inside Collaborate, drop to `--space-xl`. Identical `--space-2xl` between every section is the AI-grid tell.

### Radius

Restrained. `--radius-sm: 4px` for inputs and small chips; `--radius-md: 8px` for cards; `--radius-lg: 12px` for the occasional large surface (hero panel, MCIF overview card). No fully-rounded pill buttons; the brand is institutional, not playful. Buttons use `--radius-sm`.

### Elevation

Borders, not shadows, do most of the lifting. `--border` 1px hairlines on cards and panels. Shadows are reserved for the sticky header on scroll (`0 1px 0 var(--border)`) and the admin dashboard popovers (a real `0 8px 24px -12px rgb(17 27 60 / 0.18)`). No decorative shadows on landing cards.

### Z-index scale

Semantic, not numeric, to avoid the 999 trap.

```
--z-base: 0
--z-sticky: 100
--z-dropdown: 200
--z-modal-backdrop: 300
--z-modal: 310
--z-toast: 400
--z-tooltip: 500
```

## Components

### Buttons

- **Primary**: `--brand` bg, white text, `--radius-sm`, `0.625rem 1.125rem` padding, weight 600. Hover: bg → `--brand-hover`. Focus: `2px` outline in `--accent` offset by 2px.
- **Secondary**: transparent bg, `1px solid --border-strong`, `--ink` text. Hover: bg → `--bg` darkened 4%.
- **Quiet / link-button**: text-only with a 1px underline that thickens on hover. Used for inline "Read paper", "View repo".
- All button labels are verb + object ("Apply for internship", "Read the paper", "Submit your idea"). Never "Click here", "Submit", "OK".

### Project card

The single most repeated component, so it carries weight. **Not** the SaaS icon-headline-paragraph template.

Structure:
- Project image (16:9, lazy, Next/Image, `--radius-md`). Falls back to `projectplaceholder.webp` when CMS image is empty.
- Status tag (top-left overlay or first row, see Color § status tag mapping).
- Project title in `--text-h3`.
- One-line problem in `--text-body-sm`, `--muted`.
- Footer row in `--text-meta`: sector + location (e.g. `Water · Gyalposhing`).

No icons in the card by default. The image and the named partner do the visual work. Cards in a list share a width but not necessarily a height; let the content set the rhythm. Hover: image scales 1.02 over 240ms ease-out-quart, card border deepens to `--border-strong`.

### Status tag

Inline chip, `--text-meta`, `--space-xs` padding-y, `--space-sm` padding-x, `--radius-sm`. Color mapping in Color § status tag.

### Section header

`--text-h2`, optional one-sentence dek below in `--text-body-sm` `--muted`, `--space-lg` below the dek before content. **No tracked-uppercase eyebrow above the heading by default.** A single eyebrow is allowed on the page when a sequence demands it (e.g. MCIF Phase 1 / 2 / 3 funding flow); never as a per-section scaffold.

### MCIF funding diagram

Custom visual, not a pie chart and not a generic flowchart. Sankey-style flow from funding sources on the left to project verticals on the right, drawn with SVG, `--brand` and `--accent` carrying the flow. This is the single most "designed" surface on the site; investor credibility is the test case.

### Forms (internship, idea submission)

shadcn/ui as the substrate, themed to brand tokens. Inline field labels above inputs (not floating), `--text-meta` helper text below. File-upload field tells the user "PDF or DOCX, up to 5 MB" *before* they pick a file. Submit button: verb + object. Success state replaces the form with a short confirmation that names what happens next ("We received your application. Our team reviews on a rolling basis; you will hear back within 14 days.").

### Navigation

- Top header: logo (SVG) left, three tabs centered or right-aligned (About Us / Collaborate / Read), single primary CTA "Collaborate" on the far right.
- Tabs reveal a small dropdown on hover/focus with the pages under each. Use the native popover API, not absolute-positioned divs inside overflow containers.
- Mobile: full-screen sheet, three tabs as section headers, pages as a list inside each.
- Sticky on scroll with a 1px hairline below; not a heavy shadow.

### Footer

Dark (`--ink` bg, `--bg` text). Four columns desktop, accordion mobile:
1. Logo + one-sentence positioning + Thimphu address.
2. About Us pages.
3. Collaborate pages.
4. Read pages + newsletter signup (single email field).

Bottom row: copyright, contact (`drivedivision@dhi.bt`), LinkedIn link, the gold underline as a 1px `--accent` rule.

## Motion

Intentional, restrained, fast. The page should never feel slow because of motion. All durations cap at 320ms; ease functions are exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`), no bounce.

- **Reveal**: hero and first section render visible by default. Subsequent sections fade-up 8px over 240ms when they enter the viewport. Stagger items inside a list (project cards: 40ms per item, capped at 5). Do **not** gate visibility on a class; the section is visible by default and the entrance enhances it.
- **Hover**: card scale `1.02`, image scale `1.03`, link underline thickness 1px → 2px. All 200ms `ease-out-quart`.
- **Page transition**: avoid full-page transitions; rely on native browser navigation. Next.js App Router's `loading.tsx` covers the perceived gap.
- **MCIF Sankey**: paths draw in over 800ms on first paint, single time per page load. Then static.
- **Reduced motion** (`prefers-reduced-motion: reduce`): all reveals collapse to an instant fade. Hover scales drop to 0. Underline thickness still changes (that's color/affordance, not motion).

Libraries: **Framer Motion** for component-level reveals and hover. **Remotion** only for the programmatic video assets (annual report animations, social videos), not for in-site motion. The MCIF Sankey is hand-rolled SVG + Framer Motion `motion.path`, no D3 dependency.

## Iconography

Use [Lucide](https://lucide.dev/) (already part of the Next.js / shadcn defaults). Stroke 1.5px to match Inter's weight on screen. Reserve icons for navigation, status, and UI affordances, not as a decorative element above section headings. The brand is identified by the logo, not by icon language.

## Images & Media

- Projects, team, and news posts use real photography from the CMS. Placeholders (`projectplaceholder.webp`, `team1.jpg`) are temporary.
- Aspect ratios: project images 16:9, team portraits 4:5, news cover 16:9.
- All photography processed through Next.js Image with `placeholder="blur"` so slow connections see content shape immediately.
- No stock photography of generic technologists, abstract orbs, or handshake imagery. The anti-references list is in PRODUCT.md and applies here.
- Diagrams (MCIF flow, project architectures) are SVG, drawn to the brand palette, not screenshot from PowerPoint.

## Asset Map

| Asset | Source | Destination in app |
|---|---|---|
| Logo (SVG) | `assets/logos/logo.svg` | `public/logo.svg` — header, mobile nav |
| Logo (PNG) | `assets/logos/logo.png` | `public/logo.png` — social previews, OG image fallback |
| Project placeholder | `assets/projects/projectplaceholder.webp` | `public/placeholders/project.webp` — default project image when CMS field is empty |
| Team placeholder | `assets/team/team1.jpg` | `public/placeholders/team.jpg` — default team avatar |

Fonts:
- Inter — load via `next/font/google`, weights 400, 500, 600. Subset Latin.
- JetBrains Mono — load via `next/font/google`, weight 500. Subset Latin.

Both loaded with `display: 'swap'` and used as CSS variables.

## What's not in this file yet

This DESIGN.md was seeded before any code existed. Once Phase 0 scaffolds the Tailwind tokens, the shadcn theme, and the first real components, re-run `/impeccable document` to capture the implementation: actual `tailwind.config.ts` tokens, the chosen shadcn component variants, real focus-ring values, and any new tokens added during the build.
