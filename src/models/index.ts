import { z } from "astro:schema";
import crypto from "uncrypto";

export type PodcastInfo = z.infer<typeof PodcastSchema>;
export const PodcastSchema = z.object({
  title: z.string(),
  coverImage: z.string().url(),
  episodeLink: z.string().url(),
});

export type Testimony = z.infer<typeof TestimonySchema>;
export const TestimonySchema = z.object({
  id: z.string({ coerce: true }).default(() => crypto.randomUUID()),
  fullName: z.string().min(1),
  quote: z.string().min(1),
  photo: z.string().url(),
  titleAndPosition: z.string().min(1),
});

export type Book = z.infer<typeof BookSchema>;
export const BookSchema = z.object({
  title: z.string().min(1),
  shortDescription: z.string(),
  longTitle: z.string().optional(),
  longDescription: z.string().optional(),
  purchaseLink: z.string().url().optional(),
  testimonies: z.array(TestimonySchema).optional().default([]),
});
