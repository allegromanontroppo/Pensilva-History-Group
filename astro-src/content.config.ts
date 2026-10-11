import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const schema = z.object({
  title: z.string(),
  preview: z.string().optional(),
});

const people = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/people' }),
  schema,
});

const places = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/places' }),
  schema,
});

export const collections = { people, places };
