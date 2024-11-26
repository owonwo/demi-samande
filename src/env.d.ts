import "react";

/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly BUILDER_API_PUBLIC_KEY: string;
}

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
