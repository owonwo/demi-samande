import { Container } from "./layouts/container.tsx";
import Marquee, { MarqueeContainer } from "./marquee.tsx";

export function BooksBlock() {
  return (
    <div className="min-h-[60svh] bg-base-500">
      <div className={"bg-warning-secondary py-4"}>
        <MarqueeContainer speed={15}>
          <span className={"flex items-center gap-6 mr-6"}>
            <span className={"w-2 h-2 bg-black inline-block rounded-full"} />
            <span>NEW BOOK RELEASE PRE-ORDER NOW</span>
          </span>
        </MarqueeContainer>
      </div>
      <Container className="py-32">
        <div className="flex flex-col items-center">
          <figure className="w-[400px] shadow-2xl aspect-[4/5.2] bg-gray-200" />

          <div className="flex flex-col items-center text-white py-12 max-w-xs text-center gap-4">
            <h1 className="font-heading text-3xl italic">In Her Hands</h1>

            <p className="text-balance">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
              mollitia nam natus nostrum.
            </p>

            <button
              type="button"
              className="bg-white text-black p-4 rounded-lg"
            >
              Learn more
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
