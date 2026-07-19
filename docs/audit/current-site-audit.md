# Current Site Audit

Audit date: 2026-07-20 (Asia/Taipei)

Baseline commit: `8d4aca7b23284daae34343f77f5caaa7789abeab`

## Publishing source

- Repository default branch is `main`; local `main`, `origin/main`, and `origin/HEAD` resolve to the baseline commit.
- No `.github/workflows/` directory or Pages artifact workflow exists at baseline.
- `https://fader2077.github.io/` returns GitHub Pages headers and its HTML matches `https://raw.githubusercontent.com/fader2077/fader2077.github.io/main/index.html`.
- Evidence therefore identifies GitHub Pages branch publishing from `main` repository content, not an Actions artifact.
- GitHub Settings/Pages could not be read anonymously; the settings URL required sign-in. Source mode must be confirmed in repository settings before the new deploy workflow is enabled.

## File inventory and responsibility

| File | Size | Lines | Responsibility / issue |
| --- | ---: | ---: | --- |
| `index.html` | 45.1 KB | 844 | Homepage, projects, publication summary, skills, experience, contact; duplicates other pages. |
| `projects.html` | 23.1 KB | 468 | Five project cards plus five duplicated modal detail blocks. |
| `publications.html` | 65.7 KB | 971 | Fourteen publication cards plus fourteen duplicated modal detail blocks. |
| `cv.html` | 23.6 KB | 436 | CV; repeats profile, projects, experience, awards, skills, and publications. |
| `404.html` | 4.4 KB | 88 | Error page; still loads animation and Live2D dependencies. |
| `assets/css/style.css` | 37.1 KB | 1,721 | Global tokens, layout, cards, navigation, all homepage sections, effects, responsive rules. |
| `assets/css/pages.css` | 15.8 KB | 788 | Projects/publications cards, modals, filters, animations. |
| `assets/css/cv.css` | 11.1 KB | 506 | CV layout and print rules. |
| `assets/js/main.js` | 12.9 KB | 392 | Runtime component fetch, navigation, counters, parallax, typing, scroll effects, card glow. |
| `assets/js/pages.js` | 7.0 KB | 219 | Project/publication modals, filters, ripple, duplicate observers. |
| `assets/js/live2d-config.js` | 9.6 KB | 241 | Live2D settings and injected CSS. |
| `assets/img/og-preview.png` | 4,552.1 KB | — | Oversized social image; optimization required. |
| `TUTORIAL.md` | 64.8 KB | 2,501 | Legacy editing tutorial; contains placeholder examples and obsolete Live2D guidance. |
| `README copy.md`, `README copy 2.md` | 1.8 KB each | 66 each | Byte-identical duplicate legacy READMEs. |

## Fake, placeholder, and broken controls

Baseline contains 32 literal `href="#"` links:

- `index.html`: lines 142 and 790 (Google Scholar); footer placeholder is also injected by `components/footer.html`.
- `projects.html`: lines 252, 306, 351, 396, 441 (five fake “View Code” buttons).
- `publications.html`: lines 421–946 across publication modals (missing PDF/poster and nonfunctional Cite controls).
- `components/footer.html`: one empty placeholder link.

Referenced favicon files (`assets/img/favicon-32x32.png`) do not exist. No canonical `<link>` is present on the four primary pages.

## Unverified claims

- `projects.html`: 15% improvement, 3x inference optimization, and 92% QA accuracy.
- `index.html` and `cv.html`: 30 FPS KV260 inference.
- `index.html`: 14+ publications and 15+ research areas are hard-coded and animated.
- Publication totals and categories are independently hard-coded in homepage, publications page, and CV.

These values are removed from public migration until evidence is supplied. Details are tracked in `content-verification-required.md`.

## Publication inconsistencies

- JSTARS item is displayed under year 2025 while DOI text contains 2026 (`10.1109/JSTARS.2026.3669661`).
- Homepage title/venue wording differs from publication detail wording for multiple items.
- Publication cards, modals, homepage, and CV maintain separate copies, allowing author/order/status drift.
- Published, accepted, in press, submitted, and review states are not represented consistently; current “14 published” total treats every listed item as published.

No academic metadata is corrected by this audit.

## Duplicate content

- Profile, education, advisors, skills, experience, awards, selected projects, and selected publications appear independently in homepage and CV.
- Every project summary is duplicated between a card and modal.
- Every publication title/metadata is duplicated between a card and modal; selected entries are duplicated again in homepage and CV.
- Desktop/mobile navigation and footer are fetched into every page at runtime.
- Two README copies are identical and `TUTORIAL.md` repeats setup/content instructions.

## External dependencies

| Dependency | Use | Finding |
| --- | --- | --- |
| Google Fonts | Inter/JetBrains Mono | Optional network dependency; replace with system-first stack. |
| Font Awesome 6.5.1 | Icons | Heavy dependency for decorative icons; remove. |
| Materialize 1.0.0 | Project card reveal | Unnecessary; native CSS covers layout. |
| Anime.js 3.2.1 | Entry animations | Unnecessary; remove. |
| Typed.js 2.0.12 | Hero typing | Hides/delays content; remove. |
| Live2D widget `@latest` | Character overlay | Unpinned, deprecated console warning, loads on every page; remove. |
| `ghchart.rshah.org` | Contribution image | Third-party tracking/availability dependency; remove. |

## Runtime and accessibility findings

- Navigation/footer content depends on JavaScript `fetch()`.
- Initial content visibility is delayed by animation; first screenshot can show only background.
- Live2D logs a deprecation error and obscures hero content.
- Fake anchors are keyboard-focusable but perform no action.
- Mobile menu logic does not fully document focus restoration behavior.
- Repeated mousemove, scroll, and IntersectionObserver handlers add work without content value.

## Public/repository differences

Public HTML matches remote `main`. Local working-tree bytes differ from the Git blob only through checkout line-ending normalization; Git reports a clean baseline. No content drift was found between public site and remote `main`.

