import { builder } from "@builder.io/sdk";
import { safeStr } from "../libs/data.helper.ts";

builder.init(safeStr(import.meta.env.BUILDER_API_PUBLIC_KEY));

export const builderInstance = builder;
