import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every framework is one Markdown file in src/content/frameworks/.
// The fields below go at the top of that file (between the --- lines).
const frameworks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/frameworks' }),
  schema: z.object({
    number: z.string(),                 // "001"
    course: z.number(),                 // position in the season's menu: 1, 2, 3…
    title: z.string(),
    titleAccent: z.string().optional(), // the word shown in italic clay, e.g. "Doughnut"
    pairing: z.string(),                // one line for the menu: "x, paired with y"
    question: z.string(),               // the italic question on the homepage card
    summary: z.string(),
    dek: z.string(),                    // the large intro under the title
    category: z.string(),               // "Systems & Economics"
    fields: z.array(z.string()),
    appliesTo: z.array(z.object({ name: z.string(), how: z.string() })),
    author: z.string().default('[AUTHOR NAME]'),
    readingTime: z.string().optional(),
    status: z.enum(['published', 'forthcoming']).default('published'),
    featured: z.boolean().default(false),
    figure: z.enum(['viable-doughnut']).optional(),
    lineage: z.array(z.object({ year: z.string(), field: z.string(), work: z.string(), by: z.string() })).default([]),
    threads: z
      .object({ columns: z.array(z.string()), rows: z.array(z.object({ name: z.string(), cells: z.array(z.string()) })) })
      .optional(),
    synthesis: z.object({ heading: z.string(), accent: z.string(), body: z.array(z.string()) }).optional(),
    principles: z.array(z.object({ title: z.string(), text: z.string(), from: z.string() })).default([]),
    questions: z.array(z.string()).default([]),
    sources: z.array(z.string()).default([]),
  }),
});

export const collections = { frameworks };
