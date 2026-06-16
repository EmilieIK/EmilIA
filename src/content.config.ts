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

// Kit pédagogique — 8 étapes (carte à 6 composantes).
const etapes = defineCollection({
  loader: file('src/data/etapes.json'),
  schema: z.object({
    numero: z.number(),
    nom: z.string(),
    duree_min: z.number(),
    modalite: z.array(z.enum(['individuel', 'binôme', 'collectif'])),
    ia: z.enum(['sans', 'avec', 'mixte']),
    objectif: z.string(),
    consigne: z.string(),
    a_retenir: z.string(),
    supports: z.array(z.string()),
    astuce: z.string(),
    bonus: z.string(),
    bonus_pour: z.enum(['étudiant·e', 'enseignant·e']).nullable(),
    outil_lie: z.enum(['aiguiser-regard', 'fabrique-prompts', 'cartes-questions']).nullable(),
  }),
});

export const collections = { glossaire, plan, etapes };
