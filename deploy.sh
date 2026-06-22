#!/usr/bin/env bash
#
# Local deploy for the portfolio.
#
#   1. Syncs projects/content from your Obsidian vault and builds the static
#      site (frontend/out).
#   2. Commits and pushes the source to the DEV branch.
#   3. Publishes the built static files to the PROD branch (which GitHub Pages
#      serves) via a throwaway git worktree.
#
# Usage:
#   ./deploy.sh                 # deploy with an auto commit message
#   ./deploy.sh "my message"    # deploy with a custom commit message
#
# First-time setup:
#   git remote add origin git@github.com:<you>/<repo>.git
#   # then in GitHub: Settings → Pages → Build and deployment → Deploy from a
#   # branch → Branch: prod / root.
#
# Config (override by exporting before running, or edit the defaults):
#   DEV_BRANCH            source branch        (default: main)
#   PROD_BRANCH           static files branch  (default: prod)
#   REMOTE               git remote name       (default: origin)
#   NEXT_PUBLIC_BASE_PATH for project pages https://<user>.github.io/<repo>/
#                         set this to "/<repo>" (default: empty = root/custom domain)
#   CUSTOM_DOMAIN         e.g. subhamchhetri.com (writes a CNAME file; default: empty)
#
set -euo pipefail

DEV_BRANCH="${DEV_BRANCH:-main}"
PROD_BRANCH="${PROD_BRANCH:-prod}"
REMOTE="${REMOTE:-origin}"
BASE_PATH="${NEXT_PUBLIC_BASE_PATH:-}"
CUSTOM_DOMAIN="${CUSTOM_DOMAIN:-}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND="$REPO_ROOT/frontend"
OUT="$FRONTEND/out"
WORKTREE="$REPO_ROOT/.deploy-prod"
MSG="${1:-deploy: $(date '+%Y-%m-%d %H:%M:%S')}"

say() { printf '\n\033[1;34m▶ %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31m✖ %s\033[0m\n' "$*" >&2; exit 1; }

cd "$REPO_ROOT"

# --- preflight -------------------------------------------------------------
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "Not a git repository."
if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  die "No git remote '$REMOTE'. Add one first:
       git remote add $REMOTE git@github.com:<you>/<repo>.git"
fi

# --- 1. build (prebuild runs the Obsidian sync) ----------------------------
say "Building static site (NEXT_PUBLIC_BASE_PATH='${BASE_PATH}')"
( cd "$FRONTEND" && NEXT_PUBLIC_BASE_PATH="$BASE_PATH" npm run build )
[ -d "$OUT" ] || die "Build did not produce $OUT"

# --- 2. commit + push source to DEV ----------------------------------------
say "Pushing source → $DEV_BRANCH"
git add -A
if git diff --cached --quiet; then
  echo "  (no source changes to commit)"
else
  git commit -m "$MSG"
fi
git push "$REMOTE" "HEAD:$DEV_BRANCH"

# --- 3. publish out/ → PROD ------------------------------------------------
say "Publishing static files → $PROD_BRANCH"
git worktree remove "$WORKTREE" --force >/dev/null 2>&1 || true
rm -rf "$WORKTREE"
git fetch "$REMOTE" "$PROD_BRANCH" >/dev/null 2>&1 || true

if git show-ref --verify --quiet "refs/remotes/$REMOTE/$PROD_BRANCH"; then
  git worktree add -B "$PROD_BRANCH" "$WORKTREE" "$REMOTE/$PROD_BRANCH"
else
  git worktree add -B "$PROD_BRANCH" "$WORKTREE"
fi

# Replace the worktree contents with the fresh build.
find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R "$OUT/." "$WORKTREE/"
touch "$WORKTREE/.nojekyll"                       # let GitHub Pages serve _next/
[ -n "$CUSTOM_DOMAIN" ] && printf '%s\n' "$CUSTOM_DOMAIN" > "$WORKTREE/CNAME"

(
  cd "$WORKTREE"
  git add -A
  if git diff --cached --quiet; then
    echo "  (no changes in built output)"
  else
    git commit -m "$MSG"
  fi
  git push "$REMOTE" "$PROD_BRANCH"
)

git worktree remove "$WORKTREE" --force

say "Done. Source → $DEV_BRANCH, static site → $PROD_BRANCH."
echo "  If this is the first deploy, set GitHub Pages to serve the '$PROD_BRANCH' branch (root)."
