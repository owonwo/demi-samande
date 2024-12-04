import type React from "react";
import Logo from "../../public/assets/images/logo-stacked-white.svg";
// @ts-expect-error
import LogoDark from "../../public/assets/images/logo.svg?react";
import { usePathname } from "../hooks/use-pathname.ts";
import { cn } from "../libs/utils.ts";
import { Container } from "./layouts/container.tsx";
import { animate } from "framer-motion";

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
  variant: "transparent" | "default";
  position: "sticky" | "relative";
  children?: React.ReactNode;
  className?: string;
}) {
  const { variant, position = "sticky", children } = props;

  return (
    <header
      className={cn(
        "z-40 w-full",
        {
          "absolute bg-black bg-opacity-[0.02]": position === "sticky",
          "relative bg-dm-background": position === "relative",
        },
        props.className,
      )}
    >
      <Container
        className={
          "flex justify-between py-2 md:py-5 items-center px-4 text-black"
        }
      >
        <a href={"/"}>
          <div
            className={cn(
              "w-[123px] top-2 md:top-0 h-[39.36] md:h-auto z-[999] relative md:inline-block md:w-[150px]",
              {
                "text-white": variant === "transparent",
              },
            )}
          >
            <LogoDark title={"Demi Samande"} />
          </div>
        </a>

        <nav
          className={cn("justify-end hidden items-center md:inline-flex", {
            "text-white": variant === "transparent",
          })}
        >
          <ul className={"flex gap-6 items-center"}>
            <NavItemDesktop href={"/books"}>Books</NavItemDesktop>
            <NavItemDesktop href={"/about"}>About</NavItemDesktop>
            <li>
              <button
                type={"button"}
                onClick={() => {
                  const el = document.querySelector('#contact');
                  if (!el) return;
                  const { y: top } = el.getBoundingClientRect();
                  animate(window.scrollY, top, {
                    duration: 1,
                    ease: "easeIn",
                    onUpdate: (value) => {
                      window.scrollTo({ top: value });
                    }
                  });
                }}
              >
                <span>Get in touch</span>
              </button>
            </li>
          </ul>
        </nav>

        {children}
      </Container>
    </header>
  );
}

function NavItemDesktop(props: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <li
      data-active={isActive}
      className={
        "group data-[active=true]:uppercase flex justify-center min-w-[6ch] data-[active=true]:italic data-[active=true]:font-heading"
      }
    >
      <span className="relative inline-block">
        <a href={props.href}>{props.children}</a>
        <span
          className={cn(
            { "group-hover:right-0": !isActive },
            "h-px transition-all ease-in-out duration-200 start-0 end-[100%] absolute bottom-0 bg-accent-500",
          )}
        />
      </span>
    </li>
  );
}
