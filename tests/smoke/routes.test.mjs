import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const routes = [
  ['dist/index.html', 'Applied AI'],
  ['dist/projects.html', 'Projects'],
  ['dist/publications.html', 'Publications'],
  ['dist/cv.html', 'Curriculum Vitae'],
  ['dist/404.html', 'Page not found'],
];

for (const [file, expected] of routes) {
  test(`${file} renders static content and canonical metadata`, async () => {
    const html = await readFile(file, 'utf8');
    assert.match(html, new RegExp(expected, 'i'));
    assert.match(html, /<link rel="canonical" href="https:\/\/fader2077\.github\.io\//);
    assert.match(html, /<html lang="zh-TW">/);
  });
}
