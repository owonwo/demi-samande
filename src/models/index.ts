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
  bookCoverImage: z.string().url().optional(),
  shortDescription: z.string(),
  longTitle: z.string().optional(),
  longDescription: z.string().optional(),
  purchaseLink: z.string().url().optional(),
  testimonies: z.array(TestimonySchema).optional().default([]),
});

const ResponsiveImage = z.object({
  base: z.string().url(),
  small: z.string().url().optional(),
  medium: z.string().url().optional(),
});

export type AboutContent = z.infer<typeof AboutContentSchema>;
export const AboutContentSchema = z.object({
  pageHeading: z.string().min(1).default("<PAGE_HEADING>"),
  title: z.string().min(1).default("<TITLE>"),
  content: z.string().min(1).default("<p>No Content</p>"),
  photo: ResponsiveImage,
  heroImages: z.array(z.object({ entry: ResponsiveImage })).default([]),
});

export type ImageSource = z.infer<typeof ImageSourceSchema>
export const ImageSourceSchema = z.object({
  id: z.string(),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional()
});
