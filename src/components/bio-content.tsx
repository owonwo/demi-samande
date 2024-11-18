import React from "react";

export function BioContent() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((v) => (v >= 3 ? 0 : v + 1));
    }, 4000);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex flex-col bg-dm-background py-24 gap-24 min-h-[100svh]">
      <div className="container mx-auto">
        <div className="flex gap-4 items-end">
          <hgroup className="basis-1/2 flex flex-col gap-8">
            <h2 className="text-3xl font-heading">Hy, it's Demi Samande</h2>

            <p className="w-full text-balance font-[100]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
              culpa error, facere facilis necessitatibus obcaecati possimus
              quasi qui quidem, repudiandae saepe, soluta totam vero. Esse
              impedit ipsa iste molestias unde.
            </p>
          </hgroup>

          <div
            id="slider"
            className="basis-1/2 relative flex items-end overflow-hidden w-full h-[200px]"
          >
            <div className="absolute bottom-0 flex gap-4">
              {Array.from({ length: 30 }, (e) => (
                <div className="w-[150px] bg-gray-100 aspect-[3/1]"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={"container mx-auto flex gap-4"}>
        <figure
          className={
            "border basis-1/2 shrink-0 bg-gray-200 rounded-lg aspect-[712/544]"
          }
        ></figure>

        <div className={"border-l flex justify-end grow"}>
          <Entry
            mode={"controlled"}
            show={index === 0}
            heading={"Founder"}
            computeWidth={takeAvailableWidth}
          />
          <Entry
            mode={"controlled"}
            show={index === 1}
            heading={"Speaker"}
            computeWidth={takeAvailableWidth}
          />
          <Entry
            mode={"controlled"}
            show={index === 2}
            heading={"Author"}
            computeWidth={takeAvailableWidth}
          />
          <Entry
            mode={"controlled"}
            show={index === 3}
            heading={"Podcaster"}
            computeWidth={takeAvailableWidth}
          />
        </div>
      </div>
    </section>
  );
}

type CalcFn = (a: {
  button: HTMLButtonElement | null;
  parent: HTMLDivElement | null;
  borderSum: number;
}) => null | { itemWidth: number };

const cache = new Map<string, number>();
if (typeof window !== "undefined") window.$$cache = cache;

const takeAvailableWidth: CalcFn = ({ button, parent, borderSum = 0 }) => {
  if (!button) return null;
  if (!parent) return null;

  if (cache.has("itemWidth")) return { itemWidth: cache.get("itemWidth") };

  const rect = parent?.getBoundingClientRect?.();
  if (!rect) return null;

  const { width: total_width } = rect;

  const currentWidth = Array.from(
    parent?.children,
    (e) => e.getBoundingClientRect().width,
  )
    .slice(1)
    .reduce((a, b) => a + b + borderSum, 0);

  const itemWidth = total_width - currentWidth;
  cache.set("itemWidth", itemWidth);
  console.log({ availableWidth: itemWidth });

  return { itemWidth };
};

const expandToFixedWidth: CalcFn = ({ button, parent, borderSum = 0 }) => {
  if (!button) return null;
  if (!parent) return null;

  const rect = parent?.getBoundingClientRect?.();
  if (!rect) return null;

  const { width } = rect;

  const boxWidth = width / (parent?.children?.length ?? 0);
  const buttonWidth = button.clientWidth;
  const itemWidth = boxWidth - buttonWidth - borderSum;

  return { itemWidth };
};

function Entry(props: {
  heading: string;
  show: boolean;
  mode: "controlled" | "uncontrolled";
  computeWidth: CalcFn;
}) {
  const { computeWidth: recalul = expandToFixedWidth } = props;

  const [width, setWidth] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const doCalculation = React.useCallback(
    () =>
      recalul({
        borderSum: 2,
        button: buttonRef.current,
        parent: containerRef.current?.parentElement,
      }),
    [recalul],
  );

  // React.useEffect(() => {
  //   const id = setInterval(() => {
  //     const res = doCalculation();
  //
  //     if (res) setWidth((prev) => (prev === 0 ? res.itemWidth : 0));
  //   }, 2000);
  //
  //   return () => clearInterval(id);
  // }, []);

  React.useEffect(() => {
    function calculateWidth() {
      if (!containerRef?.current) return;
      const res = doCalculation();
      containerRef.current.style.setProperty(
        "--rev-width",
        `${res?.itemWidth}px`,
      );
    }

    calculateWidth();
    const abort = new AbortController();
    window.addEventListener("resize", () => calculateWidth(), {
      signal: abort.signal,
    });
    return () => abort.abort();
  }, [doCalculation]);

  React.useEffect(() => {
    if (props.mode !== "controlled") return;
    const res = doCalculation();
    console.log(res);
    if (res) setWidth(props.show ? res.itemWidth : 0);
  }, [props.mode, doCalculation, props.show]);

  return (
    <div ref={containerRef} className={"flex shrink-0 bg-blue-200"}>
      <button
        type={"button"}
        ref={buttonRef}
        className={"border relative h-full text-3xl w-[2ch]"}
        onClick={
          props.mode === "controlled"
            ? undefined
            : () => {
                const res = recalul({
                  borderSum: 2,
                  button: buttonRef.current,
                  parent: containerRef.current?.parentElement,
                });
                if (!res) return;
                setWidth((prev) => (prev === 0 ? res?.itemWidth : 0));
              }
        }
      >
        <span
          className={
            "font-heading transform absolute -rotate-[90deg] translate-x-[2ch] left-0 bottom-0 inline-flex px-4"
          }
          style={{
            transformOrigin: "bottom left",
          }}
        >
          {props.heading}
        </span>
      </button>

      <div
        className={
          "flex flex-col justify-end bg-green-200 overflow-hidden relative gap-2 transition-all duration-200 w-[200px]"
        }
        style={{
          width: width,
        }}
      >
        <div
          className={
            "bg-yellow-500 w-[--rev-width] p-4 gap-4 flex flex-col justify-end aspect-[5/4] absolute"
          }
        >
          <h3 className={"font-heading text-3xl"}>{props.heading}</h3>
          <p className={"text-sm text-neutral-500"}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            aut beatae culpa cumque, debitis ea, enim numquam optio pariatur sed
            vel veniam. Doloribus eius impedit nihil sunt tempore veniam
            veritatis?
          </p>
        </div>
      </div>
    </div>
  );
}
