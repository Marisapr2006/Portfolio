import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(3).max(80),
      summary: z.string().min(40).max(160),
      year: z.number().int().min(2022),
      role: z.string().min(3).max(80),
      status: z.enum(['live', 'repo', 'case-study']),
      stack: z.array(z.string()).min(1).max(8),
      cover: image(),
      gallery: z.array(image()).max(6).default([]),
      repo: z.url().optional(),
      demo: z.url().optional(),
      video: z.url().optional(),
      featured: z.boolean().default(false),
      order: z.number().int().default(99),
      confidential: z.boolean().default(false),
    }),
});

export const collections = { projects };
