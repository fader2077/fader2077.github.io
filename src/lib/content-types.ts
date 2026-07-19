export type ProjectStatus = 'draft' | 'published' | 'archived';
export type ProjectVisibility = 'public' | 'private' | 'confidential';
export type PublicationStatus = 'published' | 'accepted' | 'in_press' | 'under_revision' | 'under_review' | 'submitted';

export interface ProjectLike {
  title: string;
  slug: string;
  status: ProjectStatus;
  featured: boolean;
  featuredOrder?: number;
  visibility: ProjectVisibility;
}

export interface MetricLike { label: string; value: string; evidenceUrl?: string; evidenceNote?: string; }
export interface PublicationLike { title: string; year: number; status: PublicationStatus; verified?: boolean; }
