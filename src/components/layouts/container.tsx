import type React from "react";
import { cn } from "../../libs/utils.ts";

export function Container(props: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto px-6 w-full xl:container xl:px-4",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
