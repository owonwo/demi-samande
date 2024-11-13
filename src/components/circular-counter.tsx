import React from "react";
import { CounterEntryBox } from "./counter-entry-box.tsx";

export const CircularCounter = React.memo(
  function Counter(props: { value: number }) {
    const prevRef = React.useRef<HTMLSpanElement>(null);
    const currentRef = React.useRef<HTMLSpanElement>(null);
    const container = React.useRef<HTMLSpanElement>(null);
    const [count, setCount] = React.useState(() => Number(props.value));

    const animating = React.useRef(false);

    React.useEffect(() => {
      const old_value = count;
      const new_value = props.value;

      const prev = prevRef.current;
      const current = currentRef.current;
      const con = container.current;

      const duration =
        getComputedStyle(con).getPropertyValue("--counter-duration") ?? "300ms";

      if (!(prev && current && con)) return;
      if (animating.current) return;

      // add to top
      prev.textContent = new_value;

      // slide down
      animating.current = true;
      con.style.transitionDuration = duration;
      con.style.transform = "translateY(0px)";

      setTimeout(() => {
        // quick swap
        current.textContent = new_value;
        con.style.transitionDuration = "0s";
        con.style.transform = "translateY(-24px)";
        animating.current = false;
      }, Number.parseInt(duration) + 1);

      setCount(new_value);
    }, [props.value]);

    return (
      <CounterEntryBox>
        <div className={"overflow-hidden"}>
          <span
            ref={container}
            className="inline-flex transform flex-col items-center"
            style={{
              transform: "translateY(-24px)",
              transitionProperty: "transform",
              transitionDuration: ".3s",
              transitionTimingFunction: "ease-in",
            }}
          >
            <span
              ref={prevRef}
              className="relative text-center h-[--counter-height]"
            >
              1
            </span>
            <span
              ref={currentRef}
              className="relative text-center h-[--counter-height]"
            >
              0
            </span>
          </span>
        </div>
      </CounterEntryBox>
    );
  },
  (prev, current) => prev.value === current.value,
);