import { defineCollection, z } from "astro:content";

const experienceCollection = defineCollection({
  type: "data",
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
