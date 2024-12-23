import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { take } from "ramda";
import { useState } from "react";
import { Balancer } from "react-wrap-balancer";
import type { PodcastInfo } from "../models";
import { Button } from "./button.tsx";
import { Container } from "./layouts/container";

export function PodcastBlock({ list }: { list: PodcastInfo[] }) {
  const [index, setIndex] = useState(0);
  const current = list[index];

  if (!current) return;

  return (
    <section
      id="podcaster"
      className="page-section flex flex-col min-h-[100svh] relative aspect-[16/9] w-full bg-black text-[--foreground-alt] py-12 md:py-24"
      data-header-color={"--foreground-alt"}
    >
      <div
        className={"absolute z-10 inset-0"}
        style={{
          backgroundBlendMode: "soft-light",
          backgroundColor: "rgba(0,0,0,0.25)",
          backgroundImage: `url(${current.coverImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />

      <div
        className={"absolute z-20 inset-0 bg-black/[0.5]"}
        style={{ backgroundBlendMode: "difference" }}
      />

      <Container className="flex z-20 relative flex-1 flex-col justify-between flex-1 gap-8 justify-between">
        <h1 className="font-[300] text-2xl">
          Susu podcast <span className="italic font-heading">hosted</span> by
          Demi
        </h1>

        <div className="flex flex-col md:flex-row gap-16 md:gap-5">
          <div className="flex flex-col items-start basis-6/12 gap-6">
            <h2 className="text-2xl md:text-4xl leading-[2.2ex] font-bold max-w-xl">
              <Balancer>{current.title}</Balancer>
            </h2>

            <a
              href={current.episodeLink}
              rel="noopener noreferrer"
              target={"_blank"}
            >
              <Button
                type={"button"}
                className="items-center text-[0.875rem] gap-2 text-black"
              >
                <span>Watch full episode</span>
                <ArrowRight size="1.1rem" />
              </Button>
            </a>
          </div>

          <div className="flex-1 justify-start items-end flex md:justify-end gap-4">
            {take(3, list).map((entry, idx) => {
              const is_active = entry.episodeLink === current.episodeLink;

              return (
                <button
                  type={"button"}
                  key={entry.title}
                  className={
                    "flex-1 max-w-[35vw] md:max-w-[192px] group relative"
                  }
                  onClick={() => {
                    setIndex(idx);
                  }}
                >
                  <motion.div
                    variants={variants}
                    initial={"hide"}
                    animate={is_active ? "show" : "hide"}
                    className={
                      "-inset-1 rounded-lg z-[-1] pointer-events-none absolute border border-accent-500"
                    }
                  />
                  <div className="aspect-[16/9] pointer-events-none relative w-full overflow-hidden border-white bg-white/[0.4] rounded-md">
                    <img
                      src={entry.coverImage}
                      alt={entry.title}
                      className={"absolute inset-0 object-cover"}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

const variants = { show: { scale: 1 }, hide: { scale: 0.9 } };
