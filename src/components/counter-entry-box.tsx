import React from "react";
import {Slot} from "@radix-ui/react-slot";

export function CounterEntryBox(props: { children: React.ReactNode }) {
  return (
    <Slot
      className="font-body text-[1.4rem] h-[--counter-height] leading-[1]"
      style={{
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {props.children}
    </Slot>
  );
}
