import type { PublicationLike } from './content-types';

const formalStatuses = new Set<PublicationLike['status']>(['published', 'accepted', 'in_press']);

export const isFormalPublication = (item: Pick<PublicationLike, 'status' | 'verified'>) =>
  item.verified === true && formalStatuses.has(item.status);

export const getPublicationStats = (items: Pick<PublicationLike, 'year' | 'status' | 'verified'>[]) => {
  const formal = items.filter(isFormalPublication);
  return {
    formalResults: formal.length,
    byYear: formal.reduce<Record<number, number>>((years, item) => {
      years[item.year] = (years[item.year] ?? 0) + 1;
      return years;
    }, {}),
  };
};
