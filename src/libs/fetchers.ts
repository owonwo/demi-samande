import type { BuilderContent } from "@builder.io/sdk";
import { builderInstance } from "../config/builderio.ts";
import {
  type Book,
  BookSchema,
  type PodcastInfo,
  PodcastSchema,
  type Testimony,
  TestimonySchema,
} from "../models";
import { safeArray, safeObj, safeStr } from "./data.helper.ts";

export async function getContent(params: { key: string }) {
  return builderInstance.get(params.key, {}).promise();
}

export async function getPodcastInfo(params: { limit: number }): Promise<
  PodcastInfo[]
> {
  const response = await builderInstance.getAll("featured-podcasts", {
    limit: params.limit,
  });

  return emptyOnFailure(() => {
    return safeArray(response).map((e) => {
      const podcast = extractWithId(e);

      return PodcastSchema.parse(podcast);
    });
  });
}

export async function getTestimonies(params: { limit: number }): Promise<
  Testimony[]
> {
  const response = await builderInstance.getAll("testimonials", {
    limit: params.limit,
  });

  return emptyOnFailure(() =>
    safeArray(response).map((v) => {
      const data = extractWithId(v);
      return TestimonySchema.parse(data);
    }),
  );
}

export async function getBooks(params: { limit: number }): Promise<Book[]> {
  const response = await builderInstance.getAll("books", {
    limit: params.limit,
  });

  return emptyOnFailure<Book>(() => {
    return safeArray(response).map((v) => {
      const data = extractWithId(v);

      // @ts-expect-error
      const testimonies = safeArray(data.testimonies).map((e: any) => ({
        id: safeStr(e.entry.fullName).toLowerCase().replaceAll(" ", "_"),
        ...e.entry,
      }));

      return BookSchema.parse({
        ...data,
        testimonies,
      });
    });
  });
}

function emptyOnFailure<B>(fn: () => B[]): B[] | never[] {
  try {
    return fn();
  } catch (err) {
    return [];
  }
}

function extractWithId(e: BuilderContent) {
  return { id: e.id, ...safeObj(e.data) };
}
