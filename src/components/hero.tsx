import { Balancer } from "react-wrap-balancer";

export function Hero() {
  return (
    <div className="py-32 bg-base-500 text-white">
      <section
        className={
          "flex items-start container mx-auto justify-center gap-32 border-black min-h-[300]"
        }
      >
        <div>
          <div
            id={"book-cover"}
            className={"min-w-[30vw] aspect-[388/575] bg-base-200 shadow-2xl"}
          />
          <p className={"italic py-2 text-center font-body opaity-"}>
            Available from <b>2nd December, 2024</b>
          </p>
        </div>

        <div
          className={
            "flex self-stretch flex-col justify-between gap-4 max-w-[440px]"
          }
        >
          <h1 className={"font-heading italic text-5xl"}>
            <Balancer>
              <span className={""}>
                In Her Hands
                <br />
              </span>
              <span className={"opacity-[0.85] text-outline font-thin"}>
                Shaping the Future of Manufacturing in Africa: A Woman's Story
              </span>
            </Balancer>
          </h1>

          <p className={"text-[18px] leading-[2.6ex] text-balance"}>
            Award-winning entrepreneur Demi Samande guides African entrepreneurs
            and responsible investors to drive transformative growth, offering
            practical tools, inspiring stories and expert insights for
            sustainable business success.
          </p>
        </div>
      </section>
    </div>
  );
}
