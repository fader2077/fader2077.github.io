export type SectionType = 'hero' | 'featured-projects' | 'current-research' | 'publications' | 'experience' | 'awards' | 'skills' | 'contact' | 'custom-markdown';
export interface SiteSection { id: string; type: string; enabled: boolean; order: number; title?: string; subtitle?: string; maxItems?: number; variant?: 'grid' | 'list' | 'compact' | 'featured'; showMoreLink?: boolean; body?: string; }
export const registeredSectionTypes = ['hero', 'featured-projects', 'current-research', 'publications', 'experience', 'awards', 'skills', 'contact', 'custom-markdown'] as const satisfies readonly SectionType[];
const registered = new Set<string>(registeredSectionTypes);

export const getEnabledSections = (sections: SiteSection[]) => {
  for (const section of sections) {
    if (!registered.has(section.type)) throw new Error(`Unknown homepage section type: ${section.type}`);
  }
  return [...sections].filter(({ enabled }) => enabled).sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
};
