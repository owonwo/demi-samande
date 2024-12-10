import React from "react";
import { cn } from "../libs/utils.ts";

export const Button = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentProps<"button">
>(function Button(props, ref) {
  const { children, className, ...PROPS } = props;

  return (
    <button
      ref={ref}
      type={"button"}
      className={cn(
        "inline-flex bg-white gap-3 p-4 justify-center text-center rounded-md items-center text-black",
        className,
      )}
      {...PROPS}
    >
      {children}
    </button>
  );
});
