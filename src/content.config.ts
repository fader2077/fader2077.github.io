import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const metricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  evidenceUrl: z.url().optional(),
  evidenceNote: z.string().min(1).optional(),
}).refine((metric) => metric.evidenceUrl || metric.evidenceNote, {
  message: 'Project metrics require evidenceUrl or evidenceNote',
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    summary: z.string().min(1),
    status: z.enum(['draft', 'published', 'archived']),
    featured: z.boolean(),
    featuredOrder: z.number().int().positive().optional(),
    period: z.string().optional(),
    role: z.string().min(1),
    teamSize: z.number().int().positive().optional(),
    visibility: z.enum(['public', 'private', 'confidential']),
    category: z.string().min(1),
    technologies: z.array(z.string().min(1)),
    repositoryUrl: z.url().optional(),
    demoUrl: z.url().optional(),
    paperUrl: z.url().optional(),
    reportUrl: z.url().optional(),
    coverImage: z.string().optional(),
    metrics: z.array(metricSchema).optional(),
    updatedAt: z.coerce.date(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string().min(1),
    authors: z.array(z.string().min(1)).min(1),
    highlightedAuthor: z.string().min(1),
    venue: z.string().min(1),
    year: z.number().int().min(1900).max(2100),
    type: z.enum(['journal', 'conference', 'workshop', 'poster']),
    status: z.enum(['published', 'accepted', 'in_press', 'under_revision', 'under_review', 'submitted']),
    verified: z.boolean().default(false),
    verificationNote: z.string().optional(),
    doi: z.string().optional(),
    url: z.url().optional(),
    pdfUrl: z.url().optional(),
    codeUrl: z.url().optional(),
    tags: z.array(z.string().min(1)),
    featured: z.boolean(),
    abstract: z.string().optional(),
  }),
});

export const collections = { projects, publications };
