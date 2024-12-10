import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { Title } from "./heading.tsx";

type CalcFn = (params: {
  button?: HTMLButtonElement | null;
  parent: HTMLDivElement | null;
  borderSum: number;
}) => { itemWidth: number } | null;

const takeAvailableWidth: CalcFn = ({ parent, borderSum = 0 }) => {
  if (!parent) return null;

  const rect = parent?.getBoundingClientRect?.();
  if (!rect) return null;
  if (parent.children.length < 1) return null;

  const { width: total_width } = rect;

  const button_width = Array.from(parent.children).reduce(
    (accum, el) => getButtonWidth(el) + accum,
    0,
  );
  const itemWidth = total_width - (button_width + borderSum);

  // console.log({
  //   itemWidth,
  //   total_width,
  //   button_width_sum: button_width,
  // });

  return { itemWidth };

  function getButtonWidth(entryEl: Element) {
    const button = entryEl.querySelector("button");
    if (!button) return 38;

    return button?.getBoundingClientRect()?.width ?? 38;
  }
};

export function SmartAccordionRoot(props: { children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const abort = new AbortController();

    calculateWidth();
    window.addEventListener("resize", () => calculateWidth(), {
      signal: abort.signal,
    });

    return () => abort.abort();

    function calculateWidth() {
      if (!containerRef?.current) return;
      const res = takeAvailableWidth({
        borderSum: 2,
        parent: containerRef.current,
      });
      containerRef.current.style.setProperty(
        "--smacc-available-width",
        `${res?.itemWidth}px`,
      );
    }
  }, []);

  return <Slot ref={containerRef}>{props.children}</Slot>;
}

export function SmartAccordionItem(props: {
  heading: string;
  children: React.ReactNode;
  show: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={"flex group shrink-0 -ml-px data-[debug=true]:bg-blue-200"}
      data-active={props.show}
      data-debug={false}
      style={{
        maxWidth: "var(--smacc-available-width)",
        "--smacc-button-width": "2ch",
        "--smacc-transition-duration": ".4s",
      }}
    >
      <button
        type={"button"}
        className={
          "border-l border-[#E6E7EA] relative h-full flex items-center text-3xl transition-all duration-[--smacc-transition-duration] group-data-[debug=true]:bg-pink-200 overflow-hidden"
        }
        style={{
          width: !props.show ? "var(--smacc-button-width)" : "0px",
        }}
        onClick={props.onClick}
      >
        <span
          className={
            "font-heading group transform absolute -rotate-[90deg] translate-x-[1.8ch] left-0 bottom-0 inline-flex"
          }
          style={{
            transformOrigin: "bottom left",
          }}
        >
          <span className={"text-xl group-hover:text-black text-gray-400"}>
            {props.heading}
          </span>
        </span>
      </button>

      <div
        className={
          "flex flex-col justify-end grow group-data-[debug=true]:bg-green-200 overflow-hidden relative gap-2 transition-all duration-[--smacc-transition-duration] w-[200px]"
        }
        style={{
          width: props.show ? "var(--smacc-available-width)" : 0,
        }}
      >
        <div
          data-debug={true}
          className={
            "group-data-[debug=true]:bg-yellow-500 text-3xl px-4 gap-4 flex flex-col justify-end aspect-[5/4] absolute"
          }
          style={{
            width:
              "calc(var(--smacc-available-width) - var(--smacc-button-width))",
          }}
        >
          <Title size={"h2"}>
            <h3 className={"font-heading text-black"}>{props.heading}</h3>
          </Title>
          <p className={"text-sm leading-[2.5ex] md:text-[1.125rem] w-full"}>
            {props.children}
          </p>
        </div>
      </div>
    </div>
  );
}
