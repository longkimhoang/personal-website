import { defineCollection, z } from "astro:content";

const experienceCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      sortOrder: z.number(),
      company: z.string(),
      logo: image(),
      positions: z.array(
        z.object({
          title: z.string(),
          content: z.array(z.string()),
        })
      ),
    }),
});

export const collections = {
  experience: experienceCollection,
};
