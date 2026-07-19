import { describe, expect, it } from 'vitest';
import { getEnabledSections } from '../../src/lib/section-types';
import { renderSafeMarkdown } from '../../src/lib/safe-markdown';
import { validateNavigation } from '../../src/lib/site-data';

describe('homepage section registry', () => {
  it('returns enabled sections in ascending order', () => {
    const sections = getEnabledSections([
      { id: 'skills', type: 'skills', enabled: true, order: 30 },
      { id: 'hidden', type: 'contact', enabled: false, order: 1 },
      { id: 'hero', type: 'hero', enabled: true, order: 10 },
    ]);
    expect(sections.map(({ id }) => id)).toEqual(['hero', 'skills']);
  });

  it('rejects unknown section types', () => {
    expect(() => getEnabledSections([{ id: 'bad', type: 'script', enabled: true, order: 1 }])).toThrow(/Unknown homepage section type: script/);
  });
});

describe('navigation validation', () => {
  it('rejects placeholders and invalid external links', () => {
    expect(() => validateNavigation([{ label: 'Bad', href: '#', enabled: true, order: 1, external: false }])).toThrow(/placeholder/);
    expect(() => validateNavigation([{ label: 'Bad', href: '/relative', enabled: true, order: 1, external: true }])).toThrow(/HTTPS/);
  });
});

describe('safe custom Markdown', () => {
  it('keeps basic Markdown and removes executable HTML', async () => {
    const html = await renderSafeMarkdown('# Safe\n\n**Evidence**<script>alert(1)</script>[bad](javascript:alert(1))');
    expect(html).toContain('<h1>Safe</h1>');
    expect(html).toContain('<strong>Evidence</strong>');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('javascript:');
  });
});
