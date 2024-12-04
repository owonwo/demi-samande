import { formatDuration, isPast } from "date-fns";
import React from "react";
import { useArrowKeys } from "../hooks/use-arrow-keys.ts";
import { PreorderEndDate } from "../libs/constants.ts";
import { CounterEntryBox } from "./counter-entry-box.tsx";
import { MechanicalCounter } from "./mechanical-counter.tsx";
import { Container } from "./layouts/container.tsx";
import { cn } from "../libs/utils.ts";

export function CountdownBanner(props: { children: React.ReactNode, className?: string }) {
  if (isPast(PreorderEndDate)) { return null }

  return (
    <div
      className={cn("bg-white flex items-center py-2 min-h-12 border-b text-black", props.className)}
    >
      <Container
        className={"flex justify-between items-center"}
      >
        <span className={"text-xs font-body md:text-lg"}>
          PRE-ORDER ENDS IN
        </span>
        <span className={"flex"}>{props.children}</span>
      </Container>
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

type CounterViewProps = {
  timestamp: { value: string; unit: string }[];
};

export function Countdown(props: {
  to: Date;
  View?: React.FC<CounterViewProps>;
}) {
  const { to: targetDate } = props;
  const View = props.View ?? GridView;

  const [, setState] = React.useState(0);
  const [timestamp, setRange] = React.useState<CounterViewProps["timestamp"]>(
    [],
  );

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

  useArrowKeys({
    maxValue: 9,
    enabled: import.meta.env.DEV,
    setter: setState,
  });

  return <View timestamp={timestamp} />;
}

export function BannerCountdown() {
  return <Countdown to={PreorderEndDate} View={ListView} />;
}

export function ListView({ timestamp }: CounterViewProps) {
  return (
    <span className={"flex font-thin gap-2 font-[600]"}>
      {timestamp.map((t, index) => {
        return <RenderValue data={t} key={index} />;
      })}
    </span>
  );
}
export function GridView({ timestamp }: CounterViewProps) {
  return (
    <span className={"grid grid-cols-2 font-thin font-[600]"}>
      {timestamp.map((t, index) => {
        return (
          <React.Fragment key={index}>
            <RenderValue data={t} />
          </React.Fragment>
        );
      })}
    </span>
  );
}

function RenderValue({ data: t }: { data: CounterViewProps["timestamp"][0] }) {
  const record = t.value.split("").map((e, index) => {
    return (
      <span className={"text-base-800"} key={index}>
        <MechanicalCounter value={Number(e)} />
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
