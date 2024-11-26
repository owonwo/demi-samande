import { format } from "date-fns";
import { ChevronRightIcon } from "lucide-react";
import type React from "react";
import { Balancer } from "react-wrap-balancer";
import CoverImage from "../../public/assets/images/in-her-hands-cover.jpg";
import { PreorderEndDate } from "../libs/constants.ts";
import { cn } from "../libs/utils.ts";
import { Container } from "./layouts/container.tsx";

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
}: { heading: string; buttonText: string; buttonLink: string }) {
  return (
    <section className="bg-purple-200 z-10 relative overflow-hidden text-white relative">
      <ResponsiveImage
        image={props.images[0]}
        className={"absolute inset-0 pointer-events-none w-full h-full"}
        style={{
          backgroundBlendMode: "soft-light",
          backgroundSize: "cover",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      <Container className="py-4 relative z-20 flex items-end justify-start min-h-[100svh]">
        <hgroup className="flex items-start flex-col gap-12 pb-8">
          <h1 className="font-semibold text-7xl max-w-[15ch] text-balance font-heading">
            {heading}
          </h1>
          <a href={buttonLink}>
            <button
              type="button"
              className="inline-flex bg-white gap-3 p-4 items-center text-black"
            >
              <span>{buttonText}</span>
              <ChevronRightIcon size="18" />
            </button>
          </a>
        </hgroup>
      </Container>
    </section>
  );
}

type ResponsiveImage = {
  base: string;
  medium?: string;
  small?: string;
};

function ResponsiveImage(
  props: React.ComponentProps<"img"> & { image: ResponsiveImage },
) {
  const {
    image: { small, base },
    className,
    style,
  } = props;

  return (
    <>
      <img
        alt={props.alt}
        style={{ ...style, backgroundImage: `url(${small})` }}
        className={cn("md:hidden absolute inset-0 object-cover", className)}
      />
      <img
        alt={props.alt}
        style={{ ...style, backgroundImage: `url(${base})` }}
        className={cn(
          "hidden absolute inset-0 md:block object-cover",
          className,
        )}
      />
    </>
  );
}
