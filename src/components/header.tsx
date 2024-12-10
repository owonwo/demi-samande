import { animate } from "framer-motion";
import React from "react";
import Logo from "../../public/assets/images/logo-stacked-white.svg";
// @ts-expect-error
import LogoDark from "../../public/assets/images/logo.svg?react";
import { usePathname } from "../hooks/use-pathname.ts";
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
  variant: "transparent" | "default";
  position: "sticky" | "relative";
  children?: React.ReactNode;
  className?: string;
}) {
  const { variant, position = "sticky", children } = props;

  React.useEffect(() => {
    const match = document.querySelectorAll(".page-section");
    const header = document.querySelector(
      "#demi-header",
    ) as HTMLDivElement | null;
    if (!header) return;

    const marginTop = header.clientHeight * 0.5;
    const header_ = header;

    function complementSection() {
      for (const el of match) {
        const { offsetTop } = el as HTMLElement;
        const threshold = offsetTop - marginTop;
        if (window.scrollY >= threshold) {
          const cssColorVariable =
            el.getAttribute("data-header-color") || "--foreground-alt";
          header_.style.setProperty(
            "--header-text-color",
            `var(${cssColorVariable})`,
          );
        }
      }
    }

    function setupScrollDir(
      fn: (direction: string, onComplete: () => void) => void,
    ) {
      const state = {
        lastScrollTop: 0,
        animating: false,
      };

      return function observeScrollDir() {
        if (state.animating) return;
        const dir = window.scrollY > state.lastScrollTop ? "down" : "up";
        state.animating = true;
        fn(dir, () => {
          state.animating = false;
        });
        state.lastScrollTop = window.scrollY;
      };
    }

    const abortControl = new AbortController();
    const observe = setupScrollDir((dir, onComplete) => {
      animate(
        header_,
        { y: dir === "down" ? `-${header_.clientHeight}px` : 0 },
        {
          onComplete: onComplete,
        },
      );
    });

    window.addEventListener(
      "scroll",
      () => {
        complementSection();
        // observe();
      },
      {
        signal: abortControl.signal,
      },
    );
    return () => {
      abortControl.abort();
    };
  }, []);

  return (
    <header
      id={"demi-header"}
      className={cn(
        "z-40 w-full text-[--header-text-color]",
        {
          "fixed top-0": position === "sticky",
          "relative bg-dm-background": position === "relative",
        },
        props.className,
      )}
      style={{
        "--header-text-color": "white",
      }}
    >
      <Container
        className={
          "flex justify-between py-2 md:py-5 items-center px-4 text-black"
        }
      >
        <a
          href={"/"}
          className="block text-[--header-text-color] w-[30svw] md:w-[123px] top-[0.5svw] md:top-0 aspect-[123/39.36] z-[999] relative md:inline-block md:w-[150px]"
        >
          <LogoDark title={"Demi Samande"} className={"w-full"} />
        </a>

        <nav
          className={cn("justify-end hidden items-center md:inline-flex", {
            "text-[--header-text-color]": variant === "transparent",
          })}
        >
          <ul className={"flex gap-6 items-center"}>
            <NavItemDesktop href={"/books"}>Books</NavItemDesktop>
            <NavItemDesktop href={"/about"}>About</NavItemDesktop>
            <li>
              <button
                type={"button"}
                onClick={() => {
                  const el = document.querySelector("#contact");
                  if (!el) return;
                  const { y: top } = el.getBoundingClientRect();
                  animate(window.scrollY, top, {
                    duration: 1,
                    ease: "easeIn",
                    onUpdate: (value) => {
                      window.scrollTo({ top: value });
                    },
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

function NavItemDesktop(props: { href: string; children: React.ReactNode }) {
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
