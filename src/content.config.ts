import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const experienceCollection = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/experience" }),
  schema: ({ image }) =>
    z.object({
      sortOrder: z.number(),
      company: z.string(),
      companyUrl: z.string().url(),
      logo: image(),
      positions: z.array(
        z.object({
          title: z.string(),
          fromDate: z.date(),
          toDate: z.date().optional(),
          content: z.array(z.string()),
        })
      ),
    }),
});

export const collections = {
  experience: experienceCollection,
};
