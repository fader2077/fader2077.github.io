# Astro + Decap CMS Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a typed, accessible Astro portfolio with Git-backed content management, deterministic validation, GitHub Pages CI, preserved legacy URLs, and no unverified public claims.

**Architecture:** Astro generates all content at build time from Content Collections and YAML data. Closed registries and Zod schemas reject invalid content; minimal client TypeScript progressively enhances navigation and publication filtering.

**Tech Stack:** Node 22, npm, Astro, TypeScript strict mode, Zod, YAML, Vitest, Playwright, axe-core, html-validate, Vanilla CSS, Decap CMS, GitHub Actions.

## Global Constraints

- Work only on `codex/astro-cms-refactor`; do not merge `main`.
- Preserve `/`, `/projects.html`, `/publications.html`, and `/cv.html`.
- Never publish unverifiable numbers or infer academic metadata.
- No React/Vue/Svelte, Materialize, jQuery, Anime.js, Typed.js, Live2D, `@latest`, frontend token, or custom CMS write API.
- Every Phase ends with its specified validation and commit.

---

### Task 1: Audit and Baseline

**Files:**
- Create: `docs/audit/current-site-audit.md`
- Create: `docs/audit/content-verification-required.md`
- Create: `.gitignore`

**Interfaces:**
- Consumes: legacy repository and public GitHub Pages site.
- Produces: evidence ledger used by all migration tasks.

- [ ] Inventory files, byte sizes, responsibilities, dependencies, placeholder links, repeated content, and public/repository differences.
- [ ] Record publication/metric conflicts without changing claims.
- [ ] Verify `git diff --check` and commit `chore: audit current portfolio and deployment`.

### Task 2: Astro Shell and Route Compatibility

**Files:**
- Create: `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`
- Create: `src/layouts/BaseLayout.astro`, `src/layouts/CvLayout.astro`
- Create: `src/components/layout/{Header,MobileNavigation,Footer}.astro`
- Create: `src/components/shared/{Badge,ExternalLink,SectionHeader,SeoHead}.astro`
- Create: `src/styles/{tokens,global,layout,components,utilities,print}.css`
- Create: `src/pages/{index,projects.html,publications.html,cv.html,404}.astro`
- Create: `public/{favicon.svg,robots.txt}`

**Interfaces:**
- Consumes: `SiteMeta`, navigation data, and page content slots.
- Produces: static legacy routes, semantic shell, shared SEO contract.

- [ ] Write route/metadata smoke tests; run them against missing build and observe failure.
- [ ] Add minimum Astro config, layouts, components, styles, and route pages.
- [ ] Run Astro check/build and smoke tests until green.
- [ ] Commit `refactor: migrate portfolio shell to Astro`.

### Task 3: Typed Content Collections

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/projects/*.md`, `src/content/publications/*.md`
- Create: `src/lib/{content-status,sort-content,publication-stats,validate-links}.ts`
- Create: `src/components/projects/{ProjectCard,ProjectEvidenceLinks}.astro`
- Create: `src/components/publications/PublicationItem.astro`
- Create: `src/layouts/ProjectLayout.astro`
- Create: `src/pages/projects/[slug].astro`
- Create: `tests/unit/content.test.ts`

**Interfaces:**
- Produces: `isVisibleProject(project)`, `sortProjects(projects)`, `sortPublications(publications)`, and `getPublicationStats(publications)`.

- [ ] Write failing tests for draft/private exclusion, archived homepage exclusion, deterministic sorting, statistics status rules, metric evidence, duplicate slugs, and URL rejection.
- [ ] Run `vitest` and verify failures name missing behavior.
- [ ] Implement schemas/helpers and migrate content, omitting unverified claims.
- [ ] Run unit tests and production build until green.
- [ ] Commit `feat: add typed portfolio content collections`.

### Task 4: Configurable Homepage and CMS

**Files:**
- Create: `src/data/{profile,education,experience,awards,skills,navigation,site-sections,seo,contact}.yml`
- Create: `src/lib/section-registry.ts`
- Create: `src/components/home/*.astro`
- Create: `public/admin/{index.html,config.yml,preview.js}`
- Create: `docs/{architecture,content-model,cms-setup,content-editing-guide}.md`
- Create: `tests/unit/sections.test.ts`

**Interfaces:**
- Produces: `sectionRegistry`, `getEnabledSections(sections)`, and closed Decap collections.

- [ ] Write failing tests for unknown section rejection, enabled filtering, ascending order, navigation rules, and safe custom Markdown.
- [ ] Implement YAML loaders, registry, homepage renderer, and CMS schema.
- [ ] Verify unknown type makes validation/build fail; restore valid fixture and verify green.
- [ ] Commit `feat: add Git-backed CMS and configurable sections`.

### Task 5: Applied AI Content and Accessible UI

**Files:**
- Modify: all `src/content/**`, `src/data/**`, and homepage components.
- Create: `tests/e2e/portfolio.spec.ts`, `playwright.config.ts`.
- Remove after migration: legacy HTML/CSS/JS and duplicate README/tutorial copies.

**Interfaces:**
- Consumes: canonical collections/data.
- Produces: public job-oriented pages and keyboard-accessible interactions.

- [ ] Write failing Playwright tests for hero copy, four featured case studies, filters, menu keyboard behavior, disabled/order rules, draft absence, detail pages, and print CV.
- [ ] Implement content/UI and minimum client TypeScript.
- [ ] Run Playwright desktop/mobile and axe checks until green.
- [ ] Commit `content: reposition portfolio for applied AI roles`.

### Task 6: Validation, Documentation, CI, and Deployment

**Files:**
- Create: `scripts/validate-site.mjs`
- Create: `.github/workflows/{validate,deploy}.yml`
- Create: `docs/deployment.md`
- Replace: `README.md`
- Update: `astro.config.mjs`, `package.json`, `public/robots.txt`

**Interfaces:**
- Produces: `npm run validate`, Pages artifact workflow, deploy SHA metadata.

- [ ] Write failing validator fixtures for placeholders, broken links, duplicate slugs, unknown sections, invalid images, and count drift.
- [ ] Implement validator and validation script composition.
- [ ] Add PR validation and main-only Pages deployment workflows with fixed major versions and minimum permissions.
- [ ] Run fresh `npm ci`, `npm run validate`, and `npm run build`.
- [ ] Commit `ci: validate and deploy Astro portfolio`.

### Task 7: Independent Review and Publish

**Files:**
- Modify only files required by reviewer findings.

- [ ] Compare `origin/main...HEAD`, run independent code review, and fix every Critical/Important issue with regression tests.
- [ ] Run full fresh validation again and inspect desktop/mobile pages in the in-app browser.
- [ ] Push `codex/astro-cms-refactor` and create a draft PR targeting `main`.
- [ ] Report OAuth/Pages manual settings and production-deployment boundary.
