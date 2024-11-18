import { ChevronRightIcon } from "lucide-react";
import { Balancer } from "react-wrap-balancer";
import CoverImage from "../../public/assets/images/in-her-hands-cover.jpg";

export function Hero() {
  return (
    <div className="pb-32 pt-52 bg-base-500 text-white">
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
            Available from 2nd December, 2024
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

export function MainHero() {
  return (
    <section className="bg-purple-200">
      <div className="container mx-auto px-4 py-4 flex items-end justify-start min-h-[100svh]">
        <hgroup className="flex  items-start flex-col gap-4 pb-8">
          <h1 className="font-semibold text-7xl max-w-2xl text-balance font-heading">
            Empowering ideas, Inspiring change.
          </h1>

          <button
            type="button"
            className="inline-flex gap-3 p-4 items-center text-black"
          >
            <span>Get to know here</span>
            <ChevronRightIcon size="18" />
          </button>
        </hgroup>
      </div>
    </section>
  );
}
