import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { cvLoader } from "./cv/loader";

const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, "expected YYYY-MM");

// Mirrors cv.yaml in longkimhoang/cv. Unknown keys are ignored, so the CV can
// grow new fields without breaking the site.
const cv = defineCollection({
  loader: cvLoader(),
  schema: z.object({
    basics: z.object({
      name: z.string(),
      email: z.email(),
      location: z.string(),
      profiles: z.array(z.object({ network: z.string(), url: z.url() })),
    }),
    experience: z.array(
      z.object({
        company: z.string(),
        location: z.string().optional(),
        roles: z.array(
          z.object({
            title: z.string(),
            start: yearMonth,
            end: yearMonth.nullish(),
            highlights: z.array(z.string()),
          }),
        ),
      }),
    ),
    skills: z.array(z.object({ category: z.string(), items: z.array(z.string()) })),
    education: z.array(
      z.object({
        institution: z.string(),
        location: z.string().optional(),
        degree: z.string(),
        start: yearMonth,
        end: yearMonth.nullish(),
        highlights: z.array(z.string()).default([]),
      }),
    ),
    languages: z.array(z.object({ language: z.string(), fluency: z.string() })),
  }),
});

export const collections = { cv };
