import { motion } from "framer-motion";
import React from "react";
import { Balancer } from "react-wrap-balancer";
import { useArrowKeys } from "../hooks/use-arrow-keys.ts";
import { cn } from "../libs/utils.ts";
import { CustomSlider } from "./custom-slider.ts";
import { Container } from "./layouts/container.tsx";

const testimonies = [
  {
    id: 1,
    name: "John Inengite",
    title: "Founder of Spark podcast",
    image: "",
    quote: `We have worked with Demi for just over a year, and i could not be
            more impressed with her capabilities sed do eiusmod tempor
            incididunt ut labore et dolore`.trim(),
  },
  {
    id: 2,
    name: "Frank Gray",
    title: "Author, Atomic Habits",
    image: "",
    quote:
      `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci assumenda minima perspiciatis quisquam veritatis!`.trim(),
  },
  {
    id: 3,
    name: "John C. Maxwell",
    title: "Founder, John Maxwell Group",
    image: "",
    quote:
      `Some other lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci assumenda minima perspiciatis quisquam veritatis!`.trim(),
  },
];

export function Testimonial() {
  const [index, setIndex] = React.useState(0);
  const current = testimonies[index];

  useArrowKeys({
    maxValue: testimonies.length - 1,
    setter: setIndex,
    enabled: import.meta.env.DEV,
  });

  const quoteRef = React.useRef<HTMLElement>();

  return (
    <section
      id="testimonials"
      className="flex flex flex-col w-full bg-white text-black py-32 overflow-hidden"
    >
      <Container className="flex justify-between">
        <div className="flex basis-4/12 justify-between flex-col">
          <h1 className="text-5xl font-heading text-black">
            <Balancer>What my clients, partners & leaders say</Balancer>
          </h1>

          <div className="flex flex-col gap-16">
            <div className={"flex flex-col"}>
              <SlideLens
                index={index}
                options={testimonies.map((e) => ({ id: e.id, text: e.name }))}
                className="text-[24px] font-bold text-black"
              />
              <SlideLens
                index={index}
                options={testimonies.map((e) => ({ id: e.id, text: e.title }))}
                className={"text-[18px] text-neutral-700"}
              />
            </div>

            <div className="flex flex gap-4">
              {testimonies.map((e, index) => {
                return (
                  <button
                    type={"button"}
                    key={e.name}
                    className={cn(
                      "w-[69px] aspect-square transform ease-in duration-[200ms] rounded-sm bg-gray-200 ",
                      {
                        "opacity-70": e.id !== current.id,
                      },
                    )}
                    onClick={() => {
                      setIndex(index);
                    }}
                  >
                    {index}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex max-w-[640px] flex-col gap-12">
          <ImageCarousel pos={index} images={testimonies} />
          <blockquote className="first-letter:-ml-[0.5ch] relative leading-[34px] text-[28px] tracking-[-1.4px]">
            “{current.quote}”
          </blockquote>
        </div>
      </Container>
    </section>
  );
}

//
// [
//   [0, -15, -30],
//   [15, 0, -15],
//   [30, 15, 0],
// ];
function ImageCarousel({
  pos,
  images,
}: { images: Record<string, string>[]; pos: number }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const slider = React.useRef(new CustomSlider([])).current;

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const elements = container.children as unknown as HTMLElement[];
    slider.setElements([...elements]);
    slider.initialize();
  }, [slider]);

  React.useLayoutEffect(() => {
    slider.move(pos);
  }, [slider, pos]);

  return (
    <div
      ref={containerRef}
      className={"relative flex flex-col items-center aspect-[640/440] w-full"}
    >
      <Figure className={"w-full bg-red-200"} />
      <Figure className={"w-full bg-purple-400"} />
      <Figure className={"w-full bg-blue-200"} />
    </div>
  );
}

function Figure(props: React.ComponentProps<"div">) {
  return (
    <figure
      {...props}
      className={cn("absolute aspect-[640/416] rounded-sm", props.className)}
    />
  );
}

function SlideLens({
  index = 0,
  className,
  options,
}: {
  options: { id: string | number; text: string }[];
  className?: string;
  index?: number;
}) {
  return (
    <div className={cn("h-[2.2ex] overflow-hidden text-base", className)}>
      <motion.div
        className="flex flex-col"
        animate={{ y: `-${(index / testimonies.length) * 100}%` }}
        transition={{ duration: 0.4 }}
      >
        {options.map((e) => {
          return (
            <span key={e.id} className="h-[2.2ex] leading-[2ex]">
              {e.text}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
