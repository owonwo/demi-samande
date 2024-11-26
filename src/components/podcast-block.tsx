import { z } from "astro:schema";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { take } from "ramda";
import { useState } from "react";
import { Balancer } from "react-wrap-balancer";
import { Container } from "./layouts/container";

const PodcastInfo = z.array(
  z.object({
    title: z.string(),
    coverImage: z.string().url(),
    episodeLink: z.string().url(),
  }),
);

export function PodcastBlock({ data }: { data: z.infer<typeof PodcastInfo> }) {
  const [index, setIndex] = useState(0);
  const current = data[index];

  if (!current) return;

  return (
    <section
      id="podcaster"
      className="flex flex flex-col relative aspect-[16/9] w-full bg-black text-white py-24"
    >
      <div
        className={"absolute z-10 inset-0"}
        style={{
          backgroundBlendMode: "soft-light",
          backgroundColor: "rgba(0,0,0,0.25)",
          backgroundImage: `url(${current.coverImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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

        <div className="flex gap-5">
          <div className="flex flex-col items-start basis-6/12 gap-6">
            <h2 className="text-4xl font-bold max-w-xl">
              <Balancer>{current.title}</Balancer>
            </h2>

            <a
              href={current.episodeLink}
              rel="noopener noreferrer"
              target={"_blank"}
            >
              <button
                type={"button"}
                className="bg-white items-center text-[14px] gap-2 rounded-sm inline-flex text-black p-4"
              >
                <span>Watch full episode</span>
                <ArrowRight size="1.1rem" />
              </button>
            </a>
          </div>

          <div className="flex-1 items-end flex justify-end gap-4">
            {take(3, data).map((entry, idx) => {
              const is_active = entry.episodeLink === current.episodeLink;

              return (
                <button
                  type={"button"}
                  key={entry.title}
                  className={"flex-1 max-w-[192px] group relative"}
                  onClick={() => {
                    setIndex(idx);
                  }}
                >
                  <motion.div
                    variants={variants}
                    initial={"hide"}
                    animate={is_active ? "show" : "hide"}
                    className={
                      "-inset-1 rounded-lg z-[-1] pointer-events-none absolute border border-red-600"
                    }
                  />
                  <div className="aspect-[16/9] pointer-events-none relative w-full border border-white/[0.5] overflow-hidden border-white bg-white/[0.4] rounded-md">
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
