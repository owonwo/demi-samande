import type { z } from "astro:schema";
import { Balancer } from "react-wrap-balancer";
import type { BookSchema } from "../models";
import { Container } from "./layouts/container.tsx";
import { MarqueeContainer } from "./marquee.tsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Title } from "./heading.tsx";

export function NewBookBanner() {
  return <a href="/books">
   <div className={"group bg-warning-secondary py-2 md:py-4"}>
    <MarqueeContainer speed={15}>
      <span className={"flex items-center gap-6 text-xs mr-6"}>
        <span
          className={"w-2 h-2 bg-black group-hover:animate-none animate animate-spin inline-block"}
        />
        <span className={"text-black"}>NEW BOOK RELEASE</span>
      </span>
      <span className={"flex items-center gap-6 text-xs mr-6"}>
        <span
          className={"w-2 h-2 bg-black group-hover:animate-none animate animate-spin inline-block"}
        />
        <span className={"text-black"}>NEW BOOK RELEASE</span>
      </span>
    </MarqueeContainer>
   </div>
  </a>
}

export function BooksBlock({
  list = [],
}: {
  list: z.infer<typeof BookSchema>[];
}) {
  const [first_book] = list;

  return (
    <section
      className="page-section min-h-[60svh]"
      data-header-color={"--foreground-alt"}
    >
      <Container className="py-12 md:py-32">
        <div className="flex flex-col md:flex-row-reverse gap-[max(1rem,_10vw)] justify-center items-center mx-auto max-w-md md:max-w-[unset]">
          <figure className="w-full max-w-lg flex-1 shadow-2xl aspect-[4/5.2]">
            <img src={first_book.bookCoverImage} alt={first_book.title} />
          </figure>

          <div className="flex flex-1 w-full max-w-lg text-center md:text-left flex-col items-center md:items-stretch text-[--foreground-alt] py-12 gap-4">
            <Title size="h2">
              <h1 className="font-medium">
                {first_book.title}
              </h1>
            </Title>

            <p className="text-balance mb-8 opacity-75">
              <Balancer>{first_book.shortDescription}</Balancer>
            </p>

            <a href={"/books"}>
              <button
                type="button"
                className="text-foreground-alt group items-center gap-1.5 inline-flex text-sm md:text-base py-4 rounded-lg"
              >
                <span>See book</span>
                <ArrowRight size="1.1rem" className="transform duration-200 ease-in-out group-hover:translate-x-2" />
              </button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
