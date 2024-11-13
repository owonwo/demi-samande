import { Slot } from "@radix-ui/react-slot";
import type React from "react";

export function CounterEntryBox(props: { children: React.ReactNode }) {
  return (
    <Slot
      className="h-[--counter-height] leading-[1]"
      style={{
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {props.children}
    </Slot>
  );
}
