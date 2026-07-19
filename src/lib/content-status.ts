import type { MetricLike, ProjectLike } from './content-types';

export const isProjectPublic = (project: ProjectLike) =>
  project.visibility === 'public' && project.status !== 'draft';

export const isProjectFeatured = (project: ProjectLike) =>
  isProjectPublic(project) && project.status === 'published' && project.featured;

export const metricHasEvidence = (metric: MetricLike) =>
  Boolean(metric.evidenceUrl?.trim() || metric.evidenceNote?.trim());
