import type { ProjectLike, PublicationLike } from './content-types';

const publicationPriority: Record<PublicationLike['status'], number> = {
  published: 0,
  accepted: 1,
  in_press: 2,
  under_revision: 3,
  under_review: 4,
  submitted: 5,
};

export const sortProjects = <T extends ProjectLike>(items: T[]) => [...items].sort((a, b) =>
  (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER)
  || a.title.localeCompare(b.title, 'en'),
);

export const sortPublications = <T extends PublicationLike>(items: T[]) => [...items].sort((a, b) =>
  b.year - a.year
  || publicationPriority[a.status] - publicationPriority[b.status]
  || a.title.localeCompare(b.title, 'en'),
);
