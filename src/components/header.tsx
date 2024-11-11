import React from "react";
import Logo from "../../public/images/assets/Logo.svg";
import { cn } from "../libs/utils.ts";

export function Header({ variant = "sticky" }) {
  return (
    <div className={cn({ "h-0": variant === "sticky" })}>
      <header
        className={cn(
          "text-base-100 flex justify-center py-12 items-center",
          {},
        )}
      >
        <img {...Logo} className={"w-[150px]"} alt={"Demi Samande"} />
      </header>
    </div>
  );
}
