import { motion } from "framer-motion";
import React from "react";
import { Balancer } from "react-wrap-balancer";
import { useArrowKeys } from "../hooks/use-arrow-keys.ts";
import { cn } from "../libs/utils.ts";
import { ImageCarousel } from "./custom-carousel.tsx";
import { Container } from "./layouts/container.tsx";

export type Testimony = {
  id: number;
  fullName: string;
  titleAndPosition: string;
  photo: string;
  quote: string;
};

export function Testimonial({ list: testimonies }: { list: Testimony[] }) {
  const [index, setIndex] = React.useState(0);
  const current = testimonies[index];

  useArrowKeys({
    maxValue: testimonies.length - 1,
    setter: setIndex,
    enabled: import.meta.env.DEV,
  });

  const quoteRef = React.useRef<HTMLElement>();
  const images = testimonies.map((e) => ({
    id: e.id,
    src: e.photo,
    alt: e.fullName,
  }));

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
                options={testimonies.map((e) => ({
                  id: e.id,
                  text: e.fullName,
                }))}
                className="text-[24px] font-bold text-black"
              />
              <SlideLens
                index={index}
                options={testimonies.map((e) => ({
                  id: e.id,
                  text: e.titleAndPosition,
                }))}
                className={"text-[18px] text-neutral-700"}
              />
            </div>

            <div className="flex flex gap-4">
              {images.map((e, index) => {
                return (
                  <button
                    type={"button"}
                    key={e.id}
                    className={cn(
                      "relative filter transition-all grayscale-0 w-[69px] aspect-square transform ease-in duration-[200ms] rounded-sm",
                      {
                        "opacity-70 grayscale": e.id !== current.id,
                      },
                    )}
                    onClick={() => {
                      setIndex(index);
                    }}
                  >
                    <img
                      src={e.src}
                      alt={e.alt}
                      className={
                        "absolute inset-0 w-[69px] bg-gray-200 aspect-square object-cover"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-[640px] flex-col gap-12">
          <ImageCarousel pos={index} images={images.toReversed()} />
          <blockquote className="h-[calc(2.2ex_*_3)] first-letter:-ml-[0.5ch] relative leading-[34px] text-[28px] tracking-[-1.4px]">
            “{current.quote}”
          </blockquote>
        </div>
      </Container>
    </section>
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
        animate={{ y: `-${(index / options.length) * 100}%` }}
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
