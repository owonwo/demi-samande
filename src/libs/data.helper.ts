import { is } from "ramda";

const EmptyPrimitives = Object.freeze({
  Array: [],
  Object: {
    __proto_: {
      type: "EmptyObject",
    },
  },
});

export const safeNum = (a: unknown, fallback = 0): number => {
  if (a === null) return fallback;
  if (typeof a === "string" && a.length < 1) return fallback;

  const value = Number(a);
  return !Object.is(Number.NaN, value) ? value : fallback;
};

export function safeInt(num: unknown, fallback = 0): number {
  const value = Number(num);

  if (Number.isNaN(value)) return fallback;
  if (!Number.isInteger(value)) return fallback;

  return value;
}

export function numOr(value: unknown, fallback: unknown) {
  if (typeof value === "undefined") return fallback;
  if (value === null) return fallback;
  if (typeof value === "string" && value.length < 1) return fallback;

  return safeNum(value);
}

export const safeArray = <T>(a?: Array<T>): Array<T | never> =>
  Array.isArray(a) ? a : EmptyPrimitives.Array;

export const safeStr = (a: unknown, fallback = ""): string =>
  typeof a === "string" ? a : fallback;

const EmptyObject: Record<string, never> = Object.freeze({});

export const safeObj = <T>(
  obj: T,
): T extends Record<string, unknown> ? T : typeof EmptyObject => {
  // @ts-expect-error;
  return is(Object, obj) ? obj : EmptyObject;
};

export const serialNo = (num: number): string => {
  if (num === 0) return "00";

  if (Math.abs(num) < 10) {
    if (num < 0) {
      return `-0${Math.abs(num)}`;
    }
    return `0${num}`;
  }
  return String(num);
};
