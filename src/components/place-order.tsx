import { BOOK_URL } from "../libs/constants.ts";

export function PlaceOrder() {
  return (
    <section className={"bg-base-100 py-64"}>
      <div className={"container mx-auto"}>
        <div className={"flex gap-16 items-center justify-center"}>
          <div className={"flex flex-col gap-4 justify-between self-stretch"}>
            <div className={"flex flex-col gap-4"}>
              <h1 className={"text-5xl font-heading font-bold text-left"}>
                Get it <br />
                in <i className={"text-base-500 z-20 relative"}>your hands</i>
                <br />
                today
              </h1>
              <p className={"max-w-xs"}>
                Pre-order currently available on Amazon.com. You can order the
                following options:
              </p>
              <ul>
                <li>— Hard cover</li>
                <li>— E-book</li>
              </ul>
            </div>
            <a href={BOOK_URL} target={"_blank"} rel={"noopener noreferrer"}>
              <button
                type={"button"}
                className={
                  "px-12 py-4 bg-base-500 text-white w-full text-center rounded-lg"
                }
              >
                Pre-order now
              </button>
            </a>
          </div>
          <figure
            className={
              "aspect-[388/573] w-full max-w-[300px] bg-base-200 shadow-xl"
            }
          ></figure>
        </div>
      </div>
    </section>
  );
}
