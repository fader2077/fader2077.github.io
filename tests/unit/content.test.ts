import { describe, expect, it } from 'vitest';
import { isProjectFeatured, isProjectPublic, metricHasEvidence } from '../../src/lib/content-status';
import { getPublicationStats, isFormalPublication } from '../../src/lib/publication-stats';
import { sortProjects, sortPublications } from '../../src/lib/sort-content';

const project = {
  title: 'Project', slug: 'project', summary: 'Summary', status: 'published' as const,
  featured: true, featuredOrder: 2, role: 'Researcher', visibility: 'public' as const,
  category: 'AI', technologies: ['TypeScript'], updatedAt: new Date('2026-01-01'),
};

describe('project visibility', () => {
  it('excludes drafts and non-public work from production', () => {
    expect(isProjectPublic(project)).toBe(true);
    expect(isProjectPublic({ ...project, status: 'draft' })).toBe(false);
    expect(isProjectPublic({ ...project, visibility: 'private' })).toBe(false);
  });

  it('keeps archived work off the homepage', () => {
    expect(isProjectFeatured(project)).toBe(true);
    expect(isProjectFeatured({ ...project, status: 'archived' })).toBe(false);
  });

  it('requires metric evidence URL or note', () => {
    expect(metricHasEvidence({ label: 'Latency', value: '20 ms', evidenceNote: 'Lab report A' })).toBe(true);
    expect(metricHasEvidence({ label: 'Latency', value: '20 ms' })).toBe(false);
  });
});

describe('deterministic sorting', () => {
  it('sorts projects by featured order then title', () => {
    const result = sortProjects([
      { ...project, title: 'Beta', slug: 'beta', featuredOrder: 2 },
      { ...project, title: 'Alpha', slug: 'alpha', featuredOrder: 2 },
      { ...project, title: 'Gamma', slug: 'gamma', featuredOrder: 1 },
    ]);
    expect(result.map((item) => item.slug)).toEqual(['gamma', 'alpha', 'beta']);
  });

  it('sorts publications by year, status, then title', () => {
    const result = sortPublications([
      { title: 'Beta', year: 2025, status: 'accepted' },
      { title: 'Alpha', year: 2025, status: 'published' },
      { title: 'Gamma', year: 2026, status: 'submitted' },
    ]);
    expect(result.map((item) => item.title)).toEqual(['Gamma', 'Alpha', 'Beta']);
  });
});

describe('publication statistics', () => {
  it('uses one formal-result predicate for every public claim', () => {
    expect(isFormalPublication({ status: 'published', verified: true })).toBe(true);
    expect(isFormalPublication({ status: 'under_review', verified: true })).toBe(false);
    expect(isFormalPublication({ status: 'accepted', verified: false })).toBe(false);
  });

  it('counts only verified formal results', () => {
    const stats = getPublicationStats([
      { year: 2026, status: 'published', verified: true },
      { year: 2026, status: 'accepted', verified: true },
      { year: 2025, status: 'in_press', verified: true },
      { year: 2025, status: 'submitted', verified: true },
      { year: 2024, status: 'published', verified: false },
    ]);
    expect(stats.formalResults).toBe(3);
    expect(stats.byYear).toEqual({ 2025: 1, 2026: 2 });
  });
});
