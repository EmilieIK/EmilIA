import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Glossaire — source unique, réutilisable site-wide (page Mémoire + usage inline).
const glossaire = defineCollection({
  loader: file('src/data/glossaire.json'),
  schema: z.object({
    terme: z.string(),
    definition: z.string(),
  }),
});

// Plan du mémoire — 3 parties, chacune avec ses chapitres et sections (niveau 3).
const plan = defineCollection({
  loader: file('src/data/plan.json'),
  schema: z.object({
    numero: z.number(),
    titre: z.string(),
    chapitres: z.array(
      z.object({
        num: z.number(),
        titre: z.string(),
        sections: z.array(z.string()),
      })
    ),
  }),
});

export const collections = { glossaire, plan };
