import { Slot } from "@radix-ui/react-slot";
import { formatDuration } from "date-fns";
import React from "react";

export function CountdownBanner() {
  return (
    <div className={"bg-white py-2 border text-black"}>
      <div
        className={
          "flex container px-4 text-2xl mx-auto justify-between items-center"
        }
      >
        <span className={"font-heading"}>Pre-order ends in</span>
        <span>
          <Countdown to={new Date(2024, 11, 15)} />
        </span>
      </div>
    </div>
  );
}

type Timestamp = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function countdownToDate(
  targetDate: Date,
  fn: (data: "DONE" | Timestamp) => void,
) {
  const updateCountdown = () => {
    const now = new Date();
    const timeLeft = targetDate.getTime() - now.getTime();

    if (timeLeft <= 0) {
      return fn("DONE");
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return fn({ days: days, hours, minutes, seconds });
  };

  updateCountdown();
  return setInterval(updateCountdown, 1000);
}

function Countdown({ to: targetDate }: { to: Date }) {
  const [timestamp, setRange] = React.useState<
    { value: string; unit: string }[]
  >([]);

  React.useEffect(() => {
    const id = countdownToDate(targetDate, (value) => {
      if (value !== "DONE") {
        const map = {
          days: "D",
          day: "D",
          hours: "H",
          hour: "H",
          minutes: "M",
          minute: "M",
          seconds: "S",
          second: "S",
        } as const;

        const array = formatDuration(value, {
          delimiter: "/",
          zero: true,
        })
          .split("/")
          .map((e) => {
            for (const key in map) {
              if (e.includes(key)) {
                return {
                  value: serialNo(+e.replace(key, "")),
                  unit: map[key as keyof typeof map],
                };
              }
            }
            return { value: e.trim(), unit: "--" };
          });

        setRange(array);
      }
    });

    return () => clearInterval(id);
  }, [targetDate]);
  const [state, setState] = React.useState(0);

  React.useEffect(() => {
    const controller = new AbortController();
    const inc = () => setState((e) => (e >= 9 ? 0 : e + 1));
    const dec = () => setState((e) => (e <= 0 ? 9 : e - 1));

    window.addEventListener(
      "keyup",
      (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        if (evt.key === "ArrowRight") inc();
        if (evt.key === "ArrowLeft") dec();
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, []);

  return (
    <span
      className={"flex font-heading gap-2 font-thin font-[600]"}
      style={{ fontVariantNumeric: "tabular-nums", "--counter-height": "24px" }}
    >
      <Counter value={state} />
      {/*{timestamp.map((t, index) => {*/}
      {/*  return <RenderValue data={t} key={index} />;*/}
      {/*})}*/}
    </span>
  );
}

function RenderValue({ data: t }: { data: { value: string; unit: string } }) {
  const record = t.value.split("").map((e, index) => {
    return (
      <span className={"text-base-800"} key={index}>
        <Counter value={e} />
      </span>
    );
  });

  return (
    <span className={"flex font-bold"}>
      {record}
      <CounterEntryBox>
        <span className={"text-base-300"}>{t.unit}</span>
      </CounterEntryBox>
    </span>
  );
}

function CounterEntryBox(props: { children: React.ReactNode }) {
  return (
    <Slot
      className="font-body text-[1.4rem] h-[--counter-height] overflow-hidden leading-[1]"
      style={{
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {props.children}
    </Slot>
  );
}

const Counter = React.memo(
  function Counter(props: { value: number }) {
    const swapRef = React.useRef<HTMLSpanElement>(null);
    const container = React.useRef<HTMLSpanElement>(null);
    const [count, setCount] = React.useState(() => Number(props.value));

    React.useEffect(() => {
      console.log(">>>", { count, value: props.value });
      const new_value = props.value;
      const swap = swapRef.current;
      const con = container.current;
      if (!(con && swap)) return;

      if (
        (new_value === 9 && count === 0) ||
        (new_value === 0 && count === 9)
      ) {
        swap.textContent = new_value;
        con.style.transform = "translateY(0)";
        // con.style.transitionDuration = "0s";
      } else {
        con.style.transform = `
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
              `;
        con.style.transitionDuration = "0.3s";
      }

      setCount(new_value);
    }, [props.value]);

    return (
      <CounterEntryBox>
        <div>
          <span
            ref={container}
            className="inline-flex transform flex-col items-center"
            style={{
              "--count": count,
              transitionProperty: "transform",
              transitionDuration: ".3s",
              transitionTimingFunction: "ease-in",
            }}
          >
            <span
              ref={swapRef}
              className="relative text-center h-[--counter-height]"
            >
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
  (prev, current) => prev.value === current.value,
);

const serialNo = (num: number): string => {
  if (num === 0) return "00";

  if (Math.abs(num) < 10) {
    if (num < 0) {
      return `-0${Math.abs(num)}`;
    }
    return `0${num}`;
  }
  return String(num);
};
