# Astro + Decap CMS Refactor Design

## Objective

Replace the duplicated HTML/CSS/JavaScript portfolio with a build-time Astro site whose content, navigation, homepage sections, statistics, and CMS fields have one typed source of truth. Preserve the public URLs and dark Bento identity while removing unverifiable claims, fake controls, runtime content dependencies, and obsolete animation libraries.

## Delivery Boundary

Work happens on `codex/astro-cms-refactor`. The completed branch is validated, pushed, and opened as a draft pull request. It is not merged into `main`; production remains unchanged until human review and merge.

## Architecture

- Astro performs static generation. No React, database, custom CRUD API, or runtime content service is introduced.
- `src/content/projects/` and `src/content/publications/` are the canonical repeatable content sources.
- `src/data/` owns profile, education, experience, awards, skills, navigation, homepage sections, SEO, and contact settings.
- Zod schemas reject malformed content during build.
- `src/lib/section-registry.ts` maps a closed section-type union to Astro components. Unknown types fail validation and build.
- Main content renders as HTML. Client TypeScript is limited to the mobile menu and publication filter.
- Legacy `.html` routes are emitted directly by Astro. Project details use `/projects/<slug>/`.

## Content Rules

Projects use one Markdown file each. Production includes only `public` projects. Draft projects are excluded everywhere; archived projects remain in the full list and detail routes but not the homepage. Artifact buttons render only when their URLs exist. Every metric requires `evidenceUrl` or `evidenceNote`.

Publications use one Markdown file each. Authors and source wording are migrated without inference. Published-result counts include only `published`, `accepted`, and `in_press`. Sorting is year descending, status priority, then title. Homepage, publications page, CV, and structured data call the same statistics helper.

Unverified values—including 92%, 15%, 3x, and 30 FPS—are recorded in `docs/audit/content-verification-required.md` and omitted from public content. Publication status/year/DOI and author spelling conflicts are recorded without correction unless an authoritative source proves the change.

## CMS and Security

`/admin/` uses Decap CMS with the `github` backend, `fader2077/fader2077.github.io`, `main`, and `editorial_workflow`. The choice replaces the now-deprecated Git Gateway path. Folder collections manage projects and publications; file collections manage all site data.

No OAuth secret or token is committed. GitHub OAuth requires a human-created Netlify authentication site or compatible OAuth proxy. CMS fields are closed widgets: select options for statuses/types/variants, structured lists for records, Markdown for prose, and no arbitrary JavaScript/component paths/raw HTML.

## UI and Compatibility

The visual system retains dark slate surfaces, indigo accents, subtle grid texture, Bento hierarchy, Inter/system fonts, and limited JetBrains Mono. Live2D, Materialize, Anime.js, Typed.js, cursor-follow glow, parallax, and animated counters are removed.

Desktop uses Bento grids; mobile collapses to one column. Keyboard focus is visible. A skip link, semantic landmarks, native controls, sufficient contrast, and `prefers-reduced-motion` are mandatory. Mobile navigation updates `aria-expanded`, closes on Escape, and restores focus. Publication filtering progressively enhances a fully rendered list. CV uses print-specific CSS and no decorative client script.

Each page has a unique title/description, canonical URL, Open Graph, Twitter Card, sitemap entry, and `zh-TW` language. Person, ScholarlyArticle, and project JSON-LD are generated from canonical data.

## Validation

TDD is used for behavior: failing test, observed failure, minimal implementation, observed pass. Vitest covers status, sorting, statistics, link rules, section types, and data consistency. Build fixture tests cover invalid content. Playwright covers routes, navigation, filtering, mobile keyboard use, visibility rules, section order, detail pages, print CV, and axe accessibility checks.

`npm run validate` runs Astro/TypeScript checks, unit tests, production build, repository validators, HTML validation, and browser tests. Custom validation rejects `href="#"`, placeholder emails/URLs, `javascript:`, `@latest`, broken internal links, duplicate slugs, inconsistent counts, unknown sections, and oversized images.

Pull requests run validation only. Main pushes build a GitHub Pages artifact, then deploy with minimum permissions. The build exposes its commit SHA for later production verification.

## Phase Commits

1. `chore: audit current portfolio and deployment`
2. `refactor: migrate portfolio shell to Astro`
3. `feat: add typed portfolio content collections`
4. `feat: add Git-backed CMS and configurable sections`
5. `content: reposition portfolio for applied AI roles`
6. `ci: validate and deploy Astro portfolio`

## Known External Work

- Configure GitHub Pages source to GitHub Actions after PR merge.
- Create and configure GitHub OAuth authentication outside the repository.
- Review every item in content verification before restoring omitted claims.
- Merge the draft PR before production can be checked against the new commit SHA.
