import { format } from "date-fns";
import { motion } from "framer-motion";
import React from "react";
import { Balancer } from "react-wrap-balancer";
import CoverImage from "../../public/assets/images/in-her-hands-cover.jpg";
import { PreorderEndDate } from "../libs/constants.ts";
import { Title } from "./heading.tsx";
import { Container } from "./layouts/container.tsx";
import { ResponsiveImage } from "./responsive-image.tsx";

export function Hero() {
  return (
    <div className="pb-32 pt-52 bg-base-500 text-[--foreground-alt]">
      <section
        className={
          "flex flex-col md:flex-row items-center md:items-start container mx-auto px-6 justify-center gap-10 sm:gap-32 min-h-[300]"
        }
      >
        <div
          className={
            "md:-rotate-[12deg] w-full md:w-auto border md:border-none"
          }
        >
          <div
            id={"book-cover"}
            className={"w-full relative bg-base-200 shadow-2xl"}
          >
            <img
              {...CoverImage}
              className={"w-full md:w-[30vw] max-w-lg aspect-[388/575]"}
              alt={"In Her Hands cover"}
            />
          </div>
          <p
            className={
              "opacity-75 italic text-sm md:text-base py-2 text-center font-body"
            }
          >
            Available from {format(PreorderEndDate, "do MMMM, yyyy")}
          </p>
        </div>

        <div
          className={
            "flex self-stretch px-2 md:px-0 flex-col gap-16 max-w-[440px]"
          }
        >
          <h1 className={"text-4xl md:text-5xl md:-ml-8"}>
            <Balancer>
              <span className={"font-[800] font-heading "}>In Her Hands</span>
              <br />
              <span
                className={"font-heading text-base-100 font-[300] text-outline"}
                style={{
                  fontWeight: 400,
                }}
              >
                Shaping the Future of Manufacturing in Africa: A Woman's Story
              </span>
            </Balancer>
          </h1>
          <p
            className={
              "text-xl md:text-lg leading-[2.6ex] opacity-75 text-balance"
            }
          >
            Learn from award-winning entrepreneur Demi Samande as she guides
            African entrepreneurs and investors to drive transformative growth,
            offering practical tools, inspiring stories and expert insights for
            sustainable business success.
          </p>
        </div>
      </section>
    </div>
  );
}

export function MainHero({
  heading = "Heading",
  buttonText = "Get to know her",
  buttonLink = "/about",
  ...props
}: {
  heading: string;
  buttonText: string;
  buttonLink: string;
  images: ResponsiveImage[];
}) {
  return (
    <section
      id={"hero"}
      className="page-section z-10 relative overflow-hidden text-[--foreground-alt] relative"
      data-header-color={"--foreground-alt"}
    >
      <ResponsiveImage image={props.images[0]} priority={true} />

      <div
        className={"z-20 absolute inset-0"}
        style={{
          backgroundBlendMode: "soft-light",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      <Container className="py-4 relative z-20 flex items-end justify-start min-h-[86svh]">
        <hgroup className="flex items-start flex-col gap-12 pb-12">
          <Title size={"h1"}>
            <h1 className="font-normal max-w-[20ch] text-balance">
              <TransitionS>{heading}</TransitionS>
            </h1>
          </Title>
        </hgroup>
      </Container>
    </section>
  );
}

function TransitionS(props: { children: string }) {
  return (
    <motion.div
      initial={"hide"}
      transition={{ delay: 3, staggerChildren: 2 }}
      whileInView={"show"}
      viewport={{ once: true }}
    >
      {breakInTwos(props.children).map((word, index) => {
        return (
          <motion.span
            variants={{
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              hide: { opacity: 0, y: "25%" },
            }}
            key={word.id}
            data-index={index}
            className={"inline-block leading-[normal]"}
          >
            {word.value}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

function breakInTwos(value: string) {
  const matchIterator = value.matchAll(/(\w+\.?)\s(\w+\.?)/g);
  return Array.from(matchIterator).map((e) => ({
    value: e[0],
    id: crypto.randomUUID(),
  }));
}
