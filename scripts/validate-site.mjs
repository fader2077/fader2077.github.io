import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';
import { parse } from 'yaml';

const root = process.cwd();
const issues = [];
const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});
const report = (message) => issues.push(message);
const relativePath = (path) => relative(root, path).split(sep).join('/');
const readFrontmatter = (path) => {
  const source = readFileSync(path, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`Missing frontmatter: ${relativePath(path)}`);
  return parse(match[1]);
};

const productionFiles = [resolve(root, 'src'), resolve(root, 'public')]
  .flatMap(walk)
  .filter((path) => ['.astro', '.js', '.md', '.yml', '.yaml', '.html', '.css', '.svg', '.txt'].includes(extname(path)));
const forbidden = [
  [/href\s*=\s*["']#["']/gi, 'placeholder href'],
  [/javascript:/gi, 'javascript URL'],
  [/@latest\b/gi, 'unpinned latest dependency'],
  [/\bexample\.com\b/gi, 'example.com placeholder'],
  [/\b(?:hello|test|yourname)@(?:example\.)?com\b/gi, 'placeholder email'],
];
for (const path of productionFiles) {
  const source = readFileSync(path, 'utf8');
  for (const [pattern, label] of forbidden) {
    pattern.lastIndex = 0;
    if (pattern.test(source)) report(`${relativePath(path)} contains ${label}`);
  }
}

const projectFiles = walk(resolve(root, 'src/content/projects')).filter((path) => extname(path) === '.md');
const slugs = new Set();
for (const path of projectFiles) {
  const data = readFrontmatter(path);
  if (slugs.has(data.slug)) report(`Duplicate project slug: ${data.slug}`);
  slugs.add(data.slug);
  if (data.slug !== relativePath(path).split('/').at(-1).replace(/\.md$/, '')) report(`${relativePath(path)} filename does not match slug ${data.slug}`);
  for (const metric of data.metrics ?? []) {
    if (!metric.evidenceUrl && !metric.evidenceNote) report(`${relativePath(path)} metric ${metric.label} has no evidence`);
  }
}

const registeredSections = new Set(['hero', 'featured-projects', 'current-research', 'publications', 'experience', 'awards', 'skills', 'contact', 'custom-markdown']);
const { sections } = parse(readFileSync(resolve(root, 'src/data/site-sections.yml'), 'utf8'));
for (const section of sections) if (!registeredSections.has(section.type)) report(`Unknown homepage section type: ${section.type}`);

const { items: navigation } = parse(readFileSync(resolve(root, 'src/data/navigation.yml'), 'utf8'));
for (const item of navigation) {
  if (item.href === '#') report(`Navigation placeholder: ${item.label}`);
  if (item.external) {
    try { if (new URL(item.href).protocol !== 'https:') report(`Navigation external URL is not HTTPS: ${item.href}`); }
    catch { report(`Navigation external URL is invalid: ${item.href}`); }
  }
}

const imageFiles = walk(resolve(root, 'public')).filter((path) => ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'].includes(extname(path).toLowerCase()));
for (const path of imageFiles) if (statSync(path).size > 1_000_000) report(`${relativePath(path)} exceeds the 1 MB image budget`);

const dist = resolve(root, 'dist');
if (!existsSync(dist)) report('dist is missing; run npm run build first');
else {
  const htmlFiles = walk(dist).filter((path) => extname(path) === '.html');
  const routeExists = (href) => {
    const clean = href.split(/[?#]/)[0];
    if (!clean || clean === '/') return existsSync(join(dist, 'index.html'));
    const local = clean.replace(/^\//, '');
    return existsSync(join(dist, local)) || existsSync(join(dist, local, 'index.html'));
  };
  for (const path of htmlFiles) {
    const html = readFileSync(path, 'utf8');
    for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (href === '#') report(`${relativePath(path)} contains placeholder href`);
      else if (/^(?:https:|mailto:)/.test(href)) {
        if (href.startsWith('https:')) try { new URL(href); } catch { report(`${relativePath(path)} contains invalid URL ${href}`); }
      } else if (href.startsWith('/') && !routeExists(href)) report(`${relativePath(path)} links to missing route ${href}`);
    }
  }

  const publications = walk(resolve(root, 'src/content/publications')).filter((path) => extname(path) === '.md').map(readFrontmatter);
  const formalStatuses = new Set(['published', 'accepted', 'in_press']);
  const verifiedCount = publications.filter((item) => item.verified === true && formalStatuses.has(item.status)).length;
  for (const page of ['index.html', 'publications.html', 'cv.html']) {
    const html = readFileSync(join(dist, page), 'utf8');
    if (!html.includes(`data-verified-publication-count="${verifiedCount}"`)) report(`${page} does not render computed publication count ${verifiedCount}`);
  }
}

if (issues.length) {
  console.error(`Site validation failed with ${issues.length} issue(s):\n- ${issues.join('\n- ')}`);
  process.exit(1);
}
console.log('Site validation passed: links, placeholders, slugs, sections, evidence, image budget, and publication totals.');
