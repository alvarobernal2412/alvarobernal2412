---
name: update-portfolio
description: Sync this portfolio with the owner's GitHub repos (Projects) and Google Scholar / publisher pages (Publications), then rebuild. Use when asked to update the portfolio, add a project or paper, or refresh from GitHub/Scholar.
---

# Update portfolio

Keeps `src/` in sync with external sources, then verifies the build. Never commit without approval: stage, show a one-line message, wait (see global CLAUDE.md).

## Where things live

| Content | Language-independent data | Translated copy |
|---|---|---|
| Projects | `src/data/portfolio.ts` → `projects` (`name`, `demo?`, `source`, `thesis?`, `tags`) | `src/i18n/translations.ts` → `projects.items[i]` (`role`, `desc`, 3 `stats`, 3 `achievements`) |
| Publications | `src/data/portfolio.ts` → `publications` (`year`, `venue`, `conference`, `authors`, `title`, `url?`, `pages?`) | `translations.ts` → `publications.items[i]` (`abstract`, `place`) |

- Arrays are **index-aligned**: item *i* in `portfolio.ts` matches item *i* in each of the `en`, `es`, `de` blocks of `translations.ts`. Always edit all four places together.
- Titles stay in English in every language. `demo` is optional (omit if there is no live site).
- Newest entries go first.
- `Work.astro` counts `projects.length` for the "featured projects" metric; nothing else to update.

## Projects (source: GitHub)

1. List candidates: `gh repo list alvarobernal2412 --limit 100 --json name,description,homepageUrl,primaryLanguage,repositoryTopics,pushedAt,isFork,isArchived`. Skip forks and archived repos. Also check orgs already linked in `projects` (ISPP-07, statuscompliance, FIS2425).
2. For a new or changed repo, read it: `gh api repos/<owner>/<repo>/readme --jq .content | base64 -d`.
3. Write the entry from the README only; do not invent metrics. `homepageUrl` → `demo`, repo URL → `source`, topics/languages/README tech → `tags`.
4. Write `role` (short caps label), `desc` (1–2 sentences), 3 `stats`, 3 `achievements` in EN, then ES and DE. Keep the first-person past tense used by existing entries.
5. For existing projects, compare tags/description with the repo and only touch what drifted.

## Publications (source: Google Scholar + publisher)

1. Owner's profile: `https://scholar.google.com/citations?user=pCy6BTgAAAAJ&hl=es` (WebFetch works; ask for title, authors, venue, year, pages per paper). Compare against `publications` and add anything missing. If Scholar ever blocks, use Crossref:
   `curl -s "https://api.crossref.org/works/<DOI>"` (title, container-title, page, published date, authors) or search `https://api.crossref.org/works?query.author=Bernal-Caunedo&rows=20`.
2. Springer/publisher pages redirect to an auth cookie flow; do not rely on WebFetch for them. Use the DOI via Crossref instead.
3. Per paper set: `url` (publisher link), `pages`, `year`, `venue`, `conference`. Keep the existing abstract unless the user supplies a new one. Published papers show the "published" badge (`publications.published` in the 3 languages); if a future paper is unpublished, add a conditional badge rather than reusing this text.
4. Add the presented location to `place` in all 3 languages (e.g. "St. John's, Canada" / "Canadá" / "Kanada").

## Finish

1. `npm run build` must complete with all 3 pages (`/`, `/es/`, `/de/`).
2. For UI-affecting changes, drive the page live (`npm run dev` + browser) and check Projects and Publications in all 3 languages.
3. Stage only the files you changed; propose atomic commits (e.g. `feat(projects): add X`, `feat(publications): link ER 2026 paper`). Do not stage `.claude/worktrees`, `CLAUDE.md`, or stray assets in the repo root (assets belong in `public/`).
