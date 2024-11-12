import { Balancer } from "react-wrap-balancer";
import CoverImage from "../../public/assets/images/in-her-hands-cover.jpg";

export function Hero() {
  return (
    <div className="pb-32 pt-52 bg-base-500 text-white">
      <section
        className={
          "flex items-start container mx-auto px-6 justify-center gap-32 border-black min-h-[300]"
        }
      >
        <div className={"-rotate-[12deg]"}>
          <div id={"book-cover"} className={"relative bg-base-200 shadow-2xl"}>
            <img
              {...CoverImage}
              className={"w-[30vw] max-w-lg aspect-[388/575]"}
              alt={"In Her Hands cover"}
            />
          </div>
          <p className={"opacity-75 italic py-2 text-center font-body"}>
            Available from <b>2nd December, 2024</b>
          </p>
        </div>

        <div className={"flex self-stretch flex-col gap-16 max-w-[440px]"}>
          <h1 className={"italic text-5xl -ml-8"}>
            <Balancer>
              <span className={"font-[800] font-heading "}>In Her Hands</span>
              <br />
              <span
                className={"font-heading text-base-300 font-[300] text-outline"}
                style={{
                  fontWeight: 400,
                }}
              >
                Shaping the Future of Manufacturing in Africa: A Woman's Story
              </span>
            </Balancer>
          </h1>
          <p className={"text-base leading-[2.6ex] opacity-75 text-balance"}>
            Learn from award-winning entrepreneur Demi Samande as she guides
            African entrepreneurs and investors to drive transformative growth,
            offering practical tools, inspiring stories and expert insights for
            sustainable business success.{" "}
          </p>
        </div>
      </section>
    </div>
  );
}
