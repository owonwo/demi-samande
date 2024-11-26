import type { BuilderContent } from "@builder.io/sdk";
import { builderInstance } from "../config/builderio.ts";
import { safeArray, safeObj } from "./data.helper.ts";

export async function getContent(params: { key: string }) {
  return builderInstance.get(params.key, {}).promise();
}

export async function getPodcastInfo(params: { limit: number }) {
  const response = await builderInstance.getAll("featured-podcasts", {
    limit: params.limit,
  });

  return safeArray(response).map(extractWithId);
}

export async function getTestimonies(params: { limit: number }) {
  const response = await builderInstance.getAll("testimonials", {
    limit: params.limit,
  });

  return safeArray(response).map(extractWithId);
}

function extractWithId(e: BuilderContent) {
  return { id: e.id, ...safeObj(e.data) };
}
