import { motion } from "framer-motion";
import React from "react";
import { Balancer } from "react-wrap-balancer";
import { useArrowKeys } from "../hooks/use-arrow-keys.ts";
import { safeStr } from "../libs/data.helper.ts";
import { cn } from "../libs/utils.ts";
import type { ImageSource, Testimony } from "../models";
import { ImageCarousel } from "./custom-carousel.tsx";
import { Title } from "./heading.tsx";
import { Container } from "./layouts/container.tsx";

export function Testimonial({ list: testimonies }: { list: Testimony[] }) {
  const [index, setIndex] = React.useState(0);
  const current = testimonies[index];

  useArrowKeys({
    maxValue: testimonies.length - 1,
    setter: setIndex,
    enabled: import.meta.env.DEV,
  });

  const images = React.useMemo(() => {
    return testimonies.map(
      (e): ImageSource => ({
        id: e.id,
        src: e.photo,
        alt: e.fullName,
      }),
    );
  }, [testimonies]);

  return (
    <section
      id="testimonials"
      className="page-section flex flex-col w-full bg-white text-black py-12 md:py-32 overflow-hidden"
      data-header-color={"--primary"}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,_640px)] gap-12 w-full justify-between flex-col">
          <Title size={"h2"}>
            <h1 className="order-1 max-w-[20ch] font-heading text-black">
              <Balancer>What my clients, partners & leaders say</Balancer>
            </h1>
          </Title>

          <div
            className={
              "row-span-2 aspect-[--carousel-aspect-ratio] flex items-end order-2"
            }
            style={{
              "--carousel-aspect-ratio": "640/416",
            }}
          >
            <ImageCarousel pos={index} images={images} />
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
              className={"text-sm md:text-lg text-neutral-700"}
            />
          </div>

          <div
            id="thumbnails"
            className="order-5 md:order-4 grid gap-4 grid-cols-[repeat(5,minmax(40px,69px))] content-end items-start"
          >
            {images.map((e, index) => {
              return (
                <ThumbnailButton
                  key={e.id}
                  isActive={current.id === e.id}
                  image={e}
                  onClick={() => setIndex(index)}
                />
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

export function ThumbnailButton(props: {
  isActive: boolean;
  image: { src: string; alt: string };
  onClick: () => void;
  className?: string;
}) {
  const { isActive = false, className, image, onClick } = props;

  return (
    <button
      type={"button"}
      className={cn(
        "relative group filter transition-all grayscale-0 flex-1 w-auto md:w-[69px] max-w-[69px] aspect-square transform ease-in duration-[200ms] rounded-md overflow-hidden",
        {
          "opacity-70 grayscale": !isActive,
        },
        className,
      )}
      onClick={onClick}
    >
      <img
        src={image.src}
        alt={image.alt}
        draggable={false}
        className={cn(
          "absolute transition-all duration-200 group-hover:rotate-[2deg] group-hover:scale-[1.2] inset-0 w-full bg-gray-200 aspect-square object-cover",
          {
            "scale-[1.2] rotate-[2deg]": isActive,
          },
        )}
      />
    </button>
  );
}

export function Testimonies({ list: testimonies }: { list: Testimony[] }) {
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
      className="flex flex flex-col w-full text-black py-12 md:py-32 overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <div
          id="thumbnails"
          className="mb-8 md:mb-[5.126rem] w-full md:w-auto gap-4 grid grid-cols-[repeat(5,minmax(30px,69px))] md:flex"
        >
          {images.map((e, index) => {
            const isActive = e.id === current.id;

            return (
              <ThumbnailButton
                key={e.id}
                isActive={isActive}
                image={e}
                onClick={() => setIndex(index)}
              />
            );
          })}
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-8 gap-6 w-full"}>
          <div className="absolute text-[64px] md:relative md:text-[92px] md:aspect-square md:w-full font-body leading-[1] self-start">
            “
          </div>

          <div
            className={
              "flex py-6 px-5 md:col-span-6 flex-1 gap-[1.5rem] flex-col"
            }
          >
            <blockquote
              className="mt-[2.2ex] relative leading-[2.2ex] text-2xl text-[30px] md:text-[36px] tracking-tighter md:tracking-[-1.4px]"
              style={{ verticalAlign: "top" }}
            >
              <span>{addPeriodSymbol(current.quote)}</span>
            </blockquote>

            <div
              id={"name-title"}
              className={"flex flex-col justify-end gap-1"}
            >
              <SlideLens
                index={index}
                options={testimonies.map((e) => ({
                  id: e.id,
                  text: e.fullName,
                }))}
                className="text-[20px] font-medium text-black md:text-[22px]"
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
          </div>

          <div
            className="absolute text-[64px] md:relative md:text-[92px] leading-[1] relative w-full md:aspect-square self-end text-end font-body"
            style={{ verticalAlign: "text-bottom" }}
          >
            <span className={"absolute leading-[0] bottom-0 end-0"}>”</span>
          </div>
        </div>
      </div>
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
        transition={{ duration: 0.4, delay: 0.4 }}
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
