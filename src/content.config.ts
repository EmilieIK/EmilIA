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

// Fabrique à prompts — 6 fonctions / prompts types.
const prompts = defineCollection({
  loader: file('src/data/prompts.json'),
  schema: z.object({
    fonction: z.string(),
    prompt: z.string(),
  }),
});

// Jeu de cartes-questions — 10 questions de bilan.
const questions = defineCollection({
  loader: file('src/data/questions.json'),
  schema: z.object({
    question: z.string(),
  }),
});

// Aiguiser son regard — texte(s) d'exercice avec erreurs annotées par jeton.
// Données de DÉMONSTRATION FICTIVES (fictif:true) — à remplacer par Émilie.
const exercicesAiguiser = defineCollection({
  loader: file('src/data/aiguiser-exemples.json'),
  schema: z.object({
    titre: z.string(),
    fictif: z.literal(true),
    consigne_niveau: z.string(),
    jetons: z.array(
      z.object({
        texte: z.string(),
        candidat: z.boolean().optional(),
        erreur: z
          .object({
            categorie: z.enum(['accord', 'conjugaison', 'lexique', 'connecteur', 'syntaxe']),
            correction: z.string(),
            explication: z.string(),
          })
          .nullable()
          .optional(),
      })
    ),
  }),
});

export const collections = { glossaire, plan, etapes, prompts, questions, exercicesAiguiser };
