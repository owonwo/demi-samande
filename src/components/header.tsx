import { ArrowRightIcon } from "lucide-react";
import Logo from "../../public/assets/images/logo-stacked-white.svg";
import LogoDark from "../../public/assets/images/logo.svg";
import { cn } from "../libs/utils.ts";

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

export function MainHeader({ variant = "sticky" }) {
  return (
    <header className={"absolute w-full bg-black bg-opacity-[0.02]"}>
      <div
        className={
          "flex justify-between container py-5 ner px-4 mx-auto text-black"
        }
      >
        <a href={"/"}>
          <img {...LogoDark} className={"w-[150px]"} alt={"Demi Samande"} />
        </a>

        <nav className={"justify-end items-center inline-flex"}>
          <ul className={"flex gap-6 items-center"}>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Books</a>
            </li>
            <li>
              <button
                type={"button"}
                className={
                  "bg-white px-4 inline-flex items-center gap-2 py-2 rounded-lg base-button"
                }
              >
                <span>Get to know her</span>
                <ArrowRightIcon size={18} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
