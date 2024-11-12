import type React from "react";
import { Balancer } from "react-wrap-balancer";
import { cn } from "../libs/utils.ts";

export function BookDescription() {
  return (
    <section
      className={"relative bg-base-900 text-white py-24 overflow-hidden"}
    >
      <div
        className={
          "flex items-start container mx-auto px-6 flex-col min-h-screen"
        }
      >
        <span
          className={
            "absolute top-0 -translate-y-[40%] text-[32ch] font-heading italic opacity-25"
          }
          style={{
            WebkitTextStroke: "1px currentColor",
            WebkitTextFillColor: "transparent",
          }}
          role={"presentation"}
        >
          Brief
        </span>

        <h1
          className={
            "text-[10ch] w-full text-right italic tracking-[-0.08ch] font-[800] relative mb-24 font-heading"
          }
        >
          <span
            className={"px-12 bg-gradient-to-b from-purple-600 to-base-600 "}
            style={{
              fontWeight: 800,
              backgroundClip: "text",
              // WebkitTextStroke: "1px currentColor",
              WebkitTextFillColor: "transparent",
            }}
          >
            Brief
          </span>
        </h1>

        <article className={"grid w-full gap-24 grid-cols-3"}>
          <div className={"col-span-3"}>
            <p className={"font-heading text-4xl italic max-w-[30ch]"}>
              <Balancer>
                Africa is seen as the next large growth economy, but with this
                potential comes concerns about exploitation from outside
                interests
              </Balancer>
            </p>
          </div>
          <div className={"col-span-2 content-end"}>
            <div
              id={"video-canvas"}
              className={"aspect-[16/9] w-full bg-base-700 shadow"}
            />
          </div>
          <div
            className={
              "flex text-lg flex-col gap-[4ch] text-white text-opacity-85"
            }
          >
            <p>
              — Based on the real-world experiences of{" "}
              <Italic>Demi Samande</Italic>, award-winning entrepreneur, this
              book provides a toolkit for aspirational and savvy African
              entrepreneurs, as well as insights for responsible investors to
              seize the opportunity and to help transform the African economy
              for the benefit of Africa.
            </p>
            <p>
              As a practical guide, the book will inspire a new generation of
              entrepreneurs to tackle the challenges of doing business and the
              steps to creating sustainable, successful companies, both large
              and small. It features interviews with entrepreneurs who are
              already having success, as well as business executives, artists
              and creatives who are inspiring the transformation of African
              business from within and from overseas.
            </p>
            <p>
              <Italic>
                Demi’s own story, which she draws upon to illustrate how to
                build a successful business from scratch
              </Italic>
              , starts in a London flat and traces the development of her
              company in Nigeria to becoming the premier manufacturer of luxury
              furniture in West Africa. It also tells her story from the
              perspective of a female entrepreneur.
            </p>
            <p>
              The book provides a hands-on roadmap for building and sustaining a
              business of any size and can be used on its own or in conjunction
              with training, either for entrepreneurs who are already in the
              process of building a business or for budding entrepreneurs in the
              classroom.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function Italic(props: React.ComponentProps<"i">) {
  return (
    <span
      {...props}
      className={cn(props.className, "italic text-purple-400 font-heading")}
    >
      {props.children}
    </span>
  );
}
