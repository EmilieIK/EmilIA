import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Glossaire – source unique, réutilisable site-wide (page Mémoire + usage inline).
const glossaire = defineCollection({
  loader: file('src/data/glossaire.json'),
  schema: z.object({
    terme: z.string(),
    definition: z.string(),
  }),
});

// Plan du mémoire – 3 parties, chacune avec ses chapitres et sections (niveau 3).
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

// Kit pédagogique – 8 étapes (carte à 6 composantes).
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

// Fabrique à prompts – 6 fonctions / prompts types.
const prompts = defineCollection({
  loader: file('src/data/prompts.json'),
  schema: z.object({
    fonction: z.string(),
    prompt: z.string(),
  }),
});

// Jeu de cartes-questions – 10 questions de bilan.
const questions = defineCollection({
  loader: file('src/data/questions.json'),
  schema: z.object({
    question: z.string(),
  }),
});

// Soutenance – 7 diapos/sections (talking points), bi-mode consultable + présentation.
const soutenance = defineCollection({
  loader: file('src/data/soutenance.json'),
  schema: z.object({
    numero: z.number(),
    titre: z.string(),
    sousTitre: z.string().optional(),
    meta: z.array(z.string()).default([]),
    signature: z.array(z.string()).default([]),
    blocs: z
      .array(
        z.object({
          soustitre: z.string().default(''),
          items: z.array(z.string()).default([]),
        })
      )
      .default([]),
  }),
});

// Corpus anonymisé – parcours d'écriture d'étudiant·es. Données de DÉMONSTRATION
// FICTIVES (fictif:true). TODO Émilie : remplacer par le corpus vierge anonymisé
// (jamais de prénom ni d'élément ré-identifiant ; identifiants neutres B1-01…).
const corpus = defineCollection({
  loader: file('src/data/corpus.json'),
  schema: z.object({
    niveau: z.enum(['B1', 'B2']),
    fictif: z.literal(true),
    tache: z.string(),
    synthese_tete: z.object({
      nb_reecritures: z.number(),
      nb_interactions: z.number(),
      type_progres: z.string(),
    }),
    premier_jet: z.string(),
    reecriture: z.array(
      z.object({
        t: z.enum(['egal', 'ajout', 'suppr', 'modif']),
        texte: z.string().optional(),
        avant: z.string().optional(),
        apres: z.string().optional(),
        origine: z.enum(['humain', 'ia-reprise', 'ia-refus']).optional(),
        ref_ia: z.string().nullable().optional(),
      })
    ),
    versions_intermediaires: z.array(z.object({ label: z.string(), texte: z.string() })).default([]),
    interactions: z.array(
      z.object({
        id: z.string(),
        prompt: z.string(),
        reponse: z.string(),
        reprise: z.enum(['reprise', 'adaptee', 'ignoree', 'refusee']),
        commentaire: z.string(),
      })
    ),
    grille: z.array(
      z.object({
        dimension: z.string(),
        code: z.string(),
        niveau: z.enum(['fort', 'moyen', 'faible', 'na']),
        observation: z.string(),
      })
    ),
    synthese: z.string(),
  }),
});

export const collections = { glossaire, plan, etapes, prompts, questions, soutenance, corpus };
