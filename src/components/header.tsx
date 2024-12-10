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
    const match = document.querySelectorAll("[data-header-color]");
    const _header = document.querySelector(
      "#demi-header",
    ) as HTMLDivElement | null;
    const logoElement = document.querySelector("#demi-logo");

    if (!_header) return;

    const marginTop = _header.clientHeight * 0.5;
    const header = _header;

    function getCSSVariable(
      variable: string,
      element = document.documentElement,
    ) {
      return getComputedStyle(element).getPropertyValue(variable);
    }

    let activeSection: Element;

    // change text color for every section
    function complementSection() {
      for (const el of match) {
        const { offsetTop } = el as HTMLElement;
        const threshold = offsetTop - marginTop;
        const isNear = window.scrollY >= threshold;
        const isActive = activeSection === el;
        const distance = window.innerHeight;
        const isWithinBounds = isNear && window.scrollY < distance + offsetTop;

        if (isNear && !isActive && isWithinBounds) {
          const cssColorVariable =
            el.getAttribute("data-header-color") || "--foreground-alt";

          const new_value = getCSSVariable(cssColorVariable);
          const current = getCSSVariable("--header-text-color", header);

          animate(current, new_value, {
            duration: 0.4,
            onUpdate: (color_value) => {
              header.style.setProperty("--header-text-color", color_value);
            },
          });
          activeSection = el;
        }
      }
    }

    // hide the navbar while user scrolls down
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
        header,
        { y: dir === "down" ? `-${header.clientHeight}px` : 0 },
        {
          onComplete: onComplete,
        },
      );
    });

    // expands the logo when the user scrolls to the top
    const expandLogo = function expandLogo() {
      if (!logoElement) return null;
      if (window.scrollY <= 10) {
        return animate(
          logoElement,
          {
            scale: 1.5,
          },
          {
            duration: 0.2,
            ease: "anticipate",
          },
        );
      }
      if (window.scrollY < window.innerHeight / 2) {
        return animate(logoElement, { scale: 1 }, { duration: 0.2 });
      }
    };

    window.addEventListener(
      "scroll",
      () => {
        expandLogo();
        complementSection();
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
          <LogoDark
            id="demi-logo"
            title={"Demi Samande"}
            className={"w-full"}
            style={{ transformOrigin: "top left" }}
          />
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
