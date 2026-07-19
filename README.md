# Jie-Xin Li portfolio

Static Astro portfolio for applied AI, trustworthy LLM systems, research outputs, and evidence-bounded project case studies. Content is Git-backed and editable through Decap CMS; GitHub Actions validates and deploys the generated site to GitHub Pages.

## Architecture

- Astro 7 static output with TypeScript checks and legacy-compatible public routes.
- Typed content collections for projects and publications.
- YAML site data for profile, CV, navigation, SEO, and homepage composition.
- Closed homepage section registry; unknown types fail validation.
- Decap CMS GitHub backend with editorial workflow.
- Vitest, Node smoke tests, Playwright, axe-core, HTML Validate, and repository-specific integrity checks.

See [architecture](docs/architecture.md), [content model](docs/content-model.md), and [deployment](docs/deployment.md) for details.

## Local development

Requires Node.js 24 and npm 11.

```bash
npm ci
npm run dev
```

Build and preview the static artifact:

```bash
npm run build
npm run preview
```

## Testing

Install the Playwright browser once:

```bash
npx playwright install chromium
```

Run the same complete gate used by CI:

```bash
npm run validate
```

This checks TypeScript/Astro diagnostics, unit tests, a fresh build, route smoke tests, links and placeholders, content integrity, HTML validity, desktop/mobile behavior, and serious accessibility violations.

## CMS

After GitHub OAuth is configured, editors use `/admin/`. The CMS creates Git-backed editorial workflow changes; publishing to production still requires a reviewed merge to `main`. See [CMS setup](docs/cms-setup.md) and the [editing guide](docs/content-editing-guide.md).

## Content operations

- Add a project in `src/content/projects/<slug>.md`; keep `status: draft` until evidence and visibility are ready.
- Add a publication in `src/content/publications`; mark `verified: true` only after an authoritative metadata check.
- Reorder or hide homepage sections in `src/data/site-sections.yml` using a registered type.
- Archive historical projects with `status: archived`; they remain on the full Projects page but leave the homepage.
- Omit unavailable artifact URLs. Never add placeholder links or unsupported performance claims.

The same operations are available through Decap CMS. Full field rules are documented in [content model](docs/content-model.md).

## Deployment

Pull requests validate only. Merges to `main` trigger the Pages workflow and publish `dist`. Repository Pages must use **GitHub Actions** as its source. The CMS OAuth service is a manual prerequisite and keeps its secret outside this repository.

## Security and evidence policy

The public build contains no secrets. External links use HTTPS, private/confidential projects are fail-closed, project metrics require evidence, and only independently verified publication records enter formal-result totals. Unresolved migrated claims are tracked in [content verification required](docs/audit/content-verification-required.md).
