import React from "react";
import { CounterEntryBox } from "./counter-entry-box.tsx";

export const MechanicalCounter = React.memo(
  function Counter(props: { value: number }) {
    const count = Number(props.value);

    return (
      <CounterEntryBox>
        <div className={"overflow-hidden"}>
          <span
            className="inline-flex transform flex-col items-center"
            style={{
              "--count": count,
              transform: `
                translateY(
                  calc(
                      calc(
                        var(--count, 0)
                        * calc(var(--counter-height) * -1)
                      )
                      - 
                      var(--counter-height)
                  )
                )
              `,
              transitionProperty: "transform",
              transitionDuration: "var(--counter-duration)",
              transitionTimingFunction: "ease-in",
            }}
          >
            <span className="relative text-center h-[--counter-height]">
              --
            </span>
            {Array(10)
              .fill(0)
              .map((_, index) => {
                return (
                  <span
                    key={index}
                    className="relative text-center h-[--counter-height]"
                  >
                    {index}
                  </span>
                );
              })}
          </span>
        </div>
      </CounterEntryBox>
    );
  },
  (prev, current) => prev.value === current.value
);
