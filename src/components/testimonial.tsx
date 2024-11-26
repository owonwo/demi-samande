import { motion } from "framer-motion";
import React from "react";
import { Balancer } from "react-wrap-balancer";
import { useArrowKeys } from "../hooks/use-arrow-keys.ts";
import { safeStr } from "../libs/data.helper.ts";
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

  const images = testimonies.map((e) => ({
    id: e.id,
    src: e.photo,
    alt: e.fullName,
  }));

  return (
    <section
      id="testimonials"
      className="flex flex flex-col w-full bg-white text-black py-12 md:py-32 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,_640px)] gap-12 w-full justify-between flex-col">
          <h1 className="text-3xl lg:text-5xl order-1 font-heading text-black">
            <Balancer>What my clients, partners & leaders say</Balancer>
          </h1>

          <div className={"row-span-2 aspect-[1.1/1] flex items-end order-2"}>
            <ImageCarousel pos={index} images={images.toReversed()} />
          </div>

          <div
            id={"name-title"}
            className={"order-4 md:order-3 flex flex-col justify-end gap-1"}
          >
            <SlideLens
              index={index}
              options={testimonies.map((e) => ({
                id: e.id,
                text: e.fullName,
              }))}
              className="text-xl md:text-[24px] font-bold text-black"
            />
            <SlideLens
              index={index}
              options={testimonies.map((e) => ({
                id: e.id,
                text: e.titleAndPosition,
              }))}
              className={"text-lg text-neutral-700"}
            />
          </div>

          <div
            id="thumbnails"
            className="order-5 md:order-4 grid gap-4 grid-cols-[repeat(auto-fit,minmax(40px,69px))] content-end items-start"
          >
            {images.map((e, index) => {
              return (
                <button
                  type={"button"}
                  key={e.id}
                  className={cn(
                    "relative filter transition-all grayscale-0 md:w-[69px] aspect-square transform ease-in duration-[200ms] rounded-md overflow-hidden",
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
                      "absolute inset-0 w-full bg-gray-200 aspect-square object-cover"
                    }
                  />
                </button>
              );
            })}
          </div>

          <blockquote
            className="h-[calc(2.2ex_*_6)] md:h-[calc(2.2ex_*_3)] order-3 lg:order-5 relative leading-[2.2ex] text-2xl md:text-[32px] tracking-tighter md:tracking-[-1.4px]"
            style={{ verticalAlign: "top" }}
          >
            <span
              className={
                "transform mr-3 scale-[2] opacity-25 font-heading translate-y-[30%] font-bold inline-block"
              }
            >
              “
            </span>
            {addPeriodSymbol(current.quote)}
            <span className={"font-heading"}>.</span>
            <span
              className={
                "transform ml-1 scale-[1.2] opacity-25 font-heading translate-y-[30%] font-bold inline-block"
              }
            >
              ”
            </span>
          </blockquote>
        </div>
      </Container>
    </section>
  );
}

function addPeriodSymbol(quote_: string) {
  const quote = safeStr(quote_);
  return quote.trim().endsWith(".") ? quote.slice(0, quote.length - 1) : quote;
}

type SlideLensProps = {
  index?: number;
  className?: string;
  options: { id: string | number; text: string }[];
};

function SlideLens({ index = 0, className, options }: SlideLensProps) {
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
