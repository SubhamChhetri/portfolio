#!/usr/bin/env node
/**
 * Sync portfolio content from the Obsidian vault into the site.
 *
 *  • Projects  — every Markdown note under  <vault>/Projects/  that has a
 *                `portfolio:` frontmatter block  →  projects.generated.json
 *                (merged by slug on top of the curated BASE_PROJECTS).
 *  • Experience / Trainings / Awards — read from the frontmatter of a single
 *                data note (default <vault>/Portfolio.md) as the arrays
 *                `experience`, `trainings`, `awards`  →  *.generated.json
 *                (each replaces its curated base list when non-empty).
 *
 * This script NEVER modifies the vault. If the vault can't be found it warns
 * and exits 0 so dev/build/deploy still work from the committed JSON.
 *
 * Config:
 *   PORTFOLIO_VAULT_PATH   path to the vault "My" folder (contains Projects/)
 *   PORTFOLIO_DATA_NOTE    path to the data note (default <vault>/Portfolio.md)
 *
 * See PORTFOLIO_SYNC.md. Run with `npm run sync:content` (also on dev/build).
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "src", "data");

const DEFAULT_VAULT = path.join(
  os.homedir(),
  "Library",
  "Mobile Documents",
  "iCloud~md~obsidian",
  "Documents",
  "My"
);

const VAULT = process.env.PORTFOLIO_VAULT_PATH || DEFAULT_VAULT;
const PROJECTS_DIR = path.join(VAULT, "Projects");
const DATA_NOTE = process.env.PORTFOLIO_DATA_NOTE || path.join(VAULT, "Portfolio.md");

const VALID_STATUS = new Set(["live", "in-development", "completed", "research"]);
const VALID_CATEGORY = new Set([
  "AI & Computer Vision",
  "Robotics",
  "IoT & Embedded",
  "Blockchain & Web3",
  "Conservation & Climate Tech",
  "Government & Civic",
  "Mobile & Web Apps",
]);
const VALID_JOB_TYPE = new Set(["Full-time", "Contract", "Internship", "Volunteer"]);

const log = (m) => console.log(`[sync:content] ${m}`);
const out = (name) => path.join(DATA_DIR, name);
const writeJson = (file, data) =>
  fs.writeFileSync(out(file), JSON.stringify(data, null, 2) + "\n");

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function asArray(v) {
  if (v == null) return undefined;
  return Array.isArray(v) ? v : [v];
}

/** Array of non-empty strings, or undefined if there are none. */
function cleanStrings(v) {
  const a = asArray(v);
  if (!a) return undefined;
  const cleaned = a.filter((x) => x != null && String(x).trim() !== "").map(String);
  return cleaned.length ? cleaned : undefined;
}

function walk(dir) {
  const acc = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    // Skip hidden and Obsidian index/template files (_TEMPLATE, _README, _Index…).
    if (e.name.startsWith(".") || e.name.startsWith("_")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) acc.push(...walk(full));
    else if (e.isFile() && e.name.endsWith(".md")) acc.push(full);
  }
  return acc;
}

/* ----------------------------------- projects ---------------------------- */

function buildProjectOverride(pf, fm, file) {
  const fallbackTitle = fm.title || path.basename(file, ".md");
  const slug = slugify(pf.slug || pf.title || fallbackTitle);

  if (pf.show === false) return { slug, hidden: true };

  const o = { slug };
  const title = pf.title || fm.title; // never default to filename, so partial
  if (title) o.title = String(title); // overrides don't clobber base titles

  if (pf.status != null) {
    if (VALID_STATUS.has(pf.status)) o.status = pf.status;
    else log(`  ! "${slug}": invalid status "${pf.status}"`);
  }
  if (pf.category != null) {
    if (VALID_CATEGORY.has(pf.category)) o.category = pf.category;
    else log(`  ! "${slug}": invalid category "${pf.category}"`);
  }
  if (pf.role != null) o.role = String(pf.role);
  if (pf.org != null) o.org = String(pf.org);
  if (pf.period != null) o.period = String(pf.period);
  if (pf.oneLiner != null) o.oneLiner = String(pf.oneLiner);
  if (pf.featured != null) o.featured = Boolean(pf.featured);
  if (pf.confidential != null) o.confidential = Boolean(pf.confidential);

  for (const key of ["partners", "stack", "summary", "highlights", "metrics"]) {
    const arr = cleanStrings(pf[key]);
    if (arr) o[key] = arr;
  }
  const links = asArray(pf.links);
  if (links) {
    o.links = links
      .map((l) => (l && l.href ? { label: String(l.label || l.href), href: String(l.href) } : null))
      .filter(Boolean);
  }
  return o;
}

function syncProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    log(`Projects folder not found: ${PROJECTS_DIR} — keeping committed projects.generated.json`);
    if (!fs.existsSync(out("projects.generated.json"))) writeJson("projects.generated.json", []);
    return;
  }
  const files = walk(PROJECTS_DIR);
  const overrides = [];
  const seen = new Set();
  for (const file of files) {
    let parsed;
    try {
      parsed = matter(fs.readFileSync(file, "utf8"));
    } catch (err) {
      log(`  ! parse failed ${path.basename(file)}: ${err.message}`);
      continue;
    }
    const pf = parsed.data?.portfolio;
    if (!pf || typeof pf !== "object") continue;
    const o = buildProjectOverride(pf, parsed.data, file);
    if (seen.has(o.slug)) {
      log(`  ! duplicate slug "${o.slug}" (${path.basename(file)}) — skipping`);
      continue;
    }
    seen.add(o.slug);
    overrides.push(o);
  }
  overrides.sort((a, b) => a.slug.localeCompare(b.slug));
  writeJson("projects.generated.json", overrides);
  const shown = overrides.filter((o) => !o.hidden).length;
  log(`projects: ${files.length} note(s) scanned, ${overrides.length} override(s) (${shown} shown, ${overrides.length - shown} hidden)`);
}

/* -------------------------- experience / trainings / awards -------------- */

function syncDataNote() {
  if (!fs.existsSync(DATA_NOTE)) {
    log(`data note not found: ${DATA_NOTE} — experience/trainings/awards use curated defaults`);
    // Reset to empty so the site falls back to the curated base lists.
    for (const f of ["experience", "trainings", "awards"]) writeJson(`${f}.generated.json`, []);
    return;
  }

  let data;
  try {
    data = matter(fs.readFileSync(DATA_NOTE, "utf8")).data || {};
  } catch (err) {
    log(`  ! parse failed ${path.basename(DATA_NOTE)}: ${err.message}`);
    return;
  }

  // experience
  const exp = (asArray(data.experience) || [])
    .filter((j) => j && j.role && j.company)
    .map((j) => {
      const type = VALID_JOB_TYPE.has(j.type) ? j.type : "Full-time";
      if (!VALID_JOB_TYPE.has(j.type) && j.type != null) log(`  ! experience "${j.role}": invalid type "${j.type}" → Full-time`);
      const o = {
        role: String(j.role),
        company: String(j.company),
        type,
        period: String(j.period ?? ""),
        summary: String(j.summary ?? ""),
      };
      if (j.current != null) o.current = Boolean(j.current);
      return o;
    });
  writeJson("experience.generated.json", exp);

  // trainings
  const trainings = (asArray(data.trainings) || [])
    .filter((t) => t && t.title)
    .map((t) => ({
      title: String(t.title),
      org: String(t.org ?? ""),
      note: String(t.note ?? ""),
    }));
  writeJson("trainings.generated.json", trainings);

  // awards
  const awards = (asArray(data.awards) || [])
    .filter((a) => a && a.title)
    .map((a) => ({
      title: String(a.title),
      year: String(a.year ?? ""),
      note: String(a.note ?? ""),
    }));
  writeJson("awards.generated.json", awards);

  log(`data note: experience ${exp.length}, trainings ${trainings.length}, awards ${awards.length} (empty = use defaults)`);
}

/* ----------------------------------- run --------------------------------- */

function main() {
  if (!fs.existsSync(VAULT)) {
    log(`vault not found: ${VAULT}`);
    log("skipping sync — using committed *.generated.json (set PORTFOLIO_VAULT_PATH if wrong).");
    for (const f of ["projects", "experience", "trainings", "awards"]) {
      if (!fs.existsSync(out(`${f}.generated.json`))) writeJson(`${f}.generated.json`, []);
    }
    return;
  }
  log(`vault: ${VAULT}`);
  syncProjects();
  syncDataNote();
}

main();
