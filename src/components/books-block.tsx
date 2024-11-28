import { z } from "astro:schema";
import { Balancer } from "react-wrap-balancer";
import { Container } from "./layouts/container.tsx";
import { MarqueeContainer } from "./marquee.tsx";

const BookSchema = z.object({
  title: z.string().min(1),
  shortDescription: z.string(),
});

export function BooksBlock({
  list = [],
}: { list: z.infer<typeof BookSchema>[] }) {
  const [first_book] = list;

  return (
    <div className="min-h-[60svh] bg-base-500">
      <div className={"bg-warning-secondary py-2 md:py-4"}>
        <MarqueeContainer speed={15}>
          <span className={"flex items-center gap-6 text-xs md:text-base mr-6"}>
            <span className={"w-2 h-2 bg-black inline-block rounded-full"} />
            <span>NEW BOOK RELEASE PRE-ORDER NOW</span>
          </span>
        </MarqueeContainer>
      </div>

      <Container className="py-12 md:py-32">
        <div className="flex flex-col items-center mx-auto max-w-md">
          <figure className="w-full shadow-2xl aspect-[4/5.2] bg-gray-200" />

          <div className="flex flex-col items-center text-white py-12 text-center gap-4">
            <h1 className="font-heading text-3xl font-medium">
              {first_book.title}
            </h1>

            <p className="text-balance mb-8">
              <Balancer>{first_book.shortDescription}</Balancer>
            </p>

            <a href={"/books"}>
              <button
                type="button"
                className="bg-white text-black text-sm md:text-base p-4 rounded-lg"
              >
                Learn more
              </button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
