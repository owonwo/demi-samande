import { formatDuration } from "date-fns";
import React from "react";
import { CircularCounter } from "./circular-counter.tsx";
import { CounterEntryBox } from "./counter-entry-box.tsx";

export function CountdownBanner() {
  return (
    <div className={"bg-white py-2 border text-black"}>
      <div
        className={
          "flex container px-4 text-2xl mx-auto justify-between items-center"
        }
      >
        <span className={"font-heading text-lg"}>Pre-order ends in</span>
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
  const [state, setState] = React.useState(0);
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

  React.useEffect(() => {
    if (import.meta.env.DEV) return;

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
      style={{
        fontVariantNumeric: "tabular-nums",
        // @ts-expect-error
        "--counter-duration": "300ms",
        "--counter-height": "24px",
      }}
    >
      {timestamp.map((t, index) => {
        return <RenderValue data={t} key={index} />;
      })}
    </span>
  );
}

function RenderValue({ data: t }: { data: { value: string; unit: string } }) {
  const record = t.value.split("").map((e, index) => {
    return (
      <span className={"text-base-800"} key={index}>
        <CircularCounter value={e} />
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
