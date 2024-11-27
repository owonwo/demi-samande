import { ArrowRightIcon } from "lucide-react";
import type React from "react";
import Logo from "../../public/assets/images/logo-stacked-white.svg";
import LogoWhite from "../../public/assets/images/logo-white.svg";
import { cn } from "../libs/utils.ts";
import { Container } from "./layouts/container.tsx";

export function Header({ variant = "sticky" }) {
  return (
    <div className={cn({ "h-0": variant === "sticky" })}>
      <header
        className={cn(
          "text-base-100 flex justify-center py-12 items-center",
          {},
        )}
      >
        <a href={"/"}>
          <img {...Logo} className={"w-[150px]"} alt={"Demi Samande"} />
        </a>
      </header>
    </div>
  );
}

export function MainHeader(props: {
  variant: "sticky" | "relative";
  children?: React.ReactNode;
}) {
  const { variant = "sticky", children } = props;

  return (
    <header className={"absolute z-40 w-full bg-black bg-opacity-[0.02]"}>
      <Container
        className={
          "flex justify-between py-2 md:py-5 items-center px-4 text-black"
        }
      >
        <a href={"/"}>
          <img
            {...LogoWhite}
            className={
              "w-[123px] top-2 md:top-0 h-[39.36] md:h-auto z-[999] relative md:inline-block md:w-[150px]"
            }
            alt={"Demi Samande"}
          />
        </a>

        <nav
          className={
            "justify-end hidden items-center text-white md:inline-flex"
          }
        >
          <ul className={"flex gap-6 items-center"}>
            <li className={"hover:underline"}>
              <a href="/about">About</a>
            </li>
            <li className={"hover:underline"}>
              <a href="/in-her-hands">Books</a>
            </li>
            <li>
              <button
                type={"button"}
                className={
                  "bg-white px-4 inline-flex text-black items-center gap-2 py-2 rounded-lg base-button"
                }
              >
                <span>Get to know her</span>
                <ArrowRightIcon size={18} />
              </button>
            </li>
          </ul>
        </nav>

        {children}
      </Container>
    </header>
  );
}
