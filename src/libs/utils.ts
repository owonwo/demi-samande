import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export function baseUrl(url: string) {
  return `${import.meta.env.APP_DOMAIN}${url}`;
}
