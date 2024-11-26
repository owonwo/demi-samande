import Logo from "../../public/assets/images/logo-stacked-dark.svg";
import LogoWhite from "../../public/assets/images/logo-white.svg";
import { Container } from "./layouts/container.tsx";

export function Footer() {
  return (
    <footer className="py-24 bg-base-50 bg-gradient-to-b from-base-100 to-white">
      <div
        style={{ fontSize: "0.87rem" }}
        className={
          "container flex gap-8 flex-col items-center justify-center mx-auto"
        }
      >
        <img {...Logo} alt={"Demi Samande"} className={"w-[150px]"} />
        <p>COPYRIGHT &copy; {new Date().getFullYear()}. ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
}

export function MainFooter() {
  return (
    <footer className={"bg-black text-white flex flex-col gap-24"}>
      <Container className={"flex flex-col gap-2 text-sm"}>
        <div className={"border-[#1E1D1D] border-t w-full"} />
        <div
          className={
            "flex w-full py-4 justify-between text-white *:justify-center *:flex"
          }
        >
          <div className={"flex flex-wrap !justify-start gap-x-4 basis-4/12"}>
            <p>Demi Samande &copy; All Rights Reserved 2024</p>
          </div>

          <div className={"flex gap-4 basis-4/12"}>
            <a
              className={"hover:underline"}
              target={"_blank"}
              href={"https://www.linkedin.com/in/demi-samande-7529a2187"}
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className={"hover:underline"}
              target={"_blank"}
              href={"https://www.youtube.com/demisamande"}
              rel="noreferrer"
            >
              Youtube
            </a>
            <a
              className={"hover:underline"}
              target={"_blank"}
              href={"https://www.instagram.com/demisamande"}
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>

          <div className={"flex gap-4 !justify-end basis-4/12"}>
            <a className={"hover:underline"} href={"/books"}>
              Books
            </a>
            <a className={"hover:underline"} href={"/about"}>
              About
            </a>
          </div>
        </div>
      </Container>

      <div className={"h-[35vh] overflow-hidden"}>
        <img
          {...LogoWhite}
          alt={"Demi Samande"}
          className={"h-[60vh] -ml-[3vw] absolute top-0 inset-x-0 relative"}
        />
      </div>
    </footer>
  );
}
