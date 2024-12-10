import CoverImage from "../../public/assets/images/in-her-hands-cover.jpg";
import { BOOK_URL } from "../libs/constants.ts";

export function PlaceOrder() {
  return (
    <>
      <div className={"container mx-auto px-6"}>
        <div
          className={
            "flex flex-col md:flex-row gap-16 items-center justify-center"
          }
        >
          <figure
            className={
              "aspect-[388/573] w-full max-w-[400px] bg-base-200 shadow-xl"
            }
          >
            <img {...CoverImage} alt={"In Her Hands cover"} />
          </figure>

          <div
            className={
              "flex md:flex-1 w-full md:max-w-[30vw] flex-col gap-12 justify-between self-stretch"
            }
          >
            <div className={"flex flex-col gap-8"}>
              <h1 className={"text-5xl font-heading font-bold text-left"}>
                Get it <br />
                <i className={"z-20 relative"}>in your hands</i>
                <br />
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

            <div className={"flex flex-col gap-4"}>
              <a href={BOOK_URL} target={"_blank"} rel={"noopener noreferrer"}>
                <button
                  type={"button"}
                  className={
                    "px-12 py-4 bg-secondary-500 text-[--foreground-alt] w-full text-center rounded-lg"
                  }
                >
                  Pre-order now
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={"flex justify-center"}>
        <div />
      </div>
    </>
  );
}
