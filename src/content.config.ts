import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/knowledge' }),
  schema: z.object({
    title: z.string().min(4),
    description: z.string().min(40).max(180),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: z.enum([
      'start', 'validate', 'product', 'build', 'ai-building', 'tech-stack', 'quality',
      'ship', 'grow', 'sales', 'monetize', 'retain', 'operate', 'business', 'recipes',
      'checklists', 'case-studies', 'tools', 'templates', 'reference',
    ]),
    kind: z.enum(['article', 'checklist', 'recipe', 'case-study', 'tool-guide', 'template', 'glossary']),
    tags: z.array(z.string()).min(1),
    audience: z.array(z.string()).min(1),
    status: z.enum(['published', 'draft', 'needs-review']),
    evidence: z.enum(['primary', 'multiple-sources', 'practitioner', 'seed-only', 'mixed']),
    confidence: z.enum(['high', 'moderate', 'limited']),
    lastVerified: z.coerce.date(),
    reviewBy: z.coerce.date(),
    reviewTrigger: z.string().min(20),
    related: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    seedSources: z.array(z.string()).default([]),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      publisher: z.string().optional(),
      accessed: z.coerce.date().optional(),
    })).default([]),
  }),
});

export const collections = { knowledge };
