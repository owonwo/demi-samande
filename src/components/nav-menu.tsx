"use client";
import { motion } from "framer-motion";
import React from "react";
// @ts-expect-error
import SymbolCut from "../assets/images/identity-shape.svg?react";
import { cn } from "../libs/utils.ts";
import { NavItem } from "./nav-item.tsx";

const links = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/books",
    title: "Books",
  },
  {
    href: "/about",
    title: "About",
  },
] as const;

export function NavMenu() {
  const [pathname] = React.useState(() => {
    return typeof window === "undefined" ? "" : window.location.pathname;
  });
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.height = "";
      document.body.style.overflowY = "";
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={
          "p-0 md:hidden outline-none font-thin z-[999] relative aspect-square inline-flex items-center justify-center appearance-none text-white"
        }
        onClick={() => setOpen((open) => !open)}
      >
        <DemiBrandSymbol size={24} data-active={!open} />
      </button>

      <nav
        className={cn(
          "z-[998] flex flex-col lg:hidden justify-end py-12 px-6 items-center fixed inset-0 inset-y-0",
          { "pointer-events-none": !open },
        )}
      >
        <motion.div
          initial={{ right: 0, left: 0, rotate: "45deg", scale: 3 }}
          animate={
            open
              ? { right: 0, left: 0, rotate: "45deg", scale: 3 }
              : { scale: 3, right: "100%", rotate: "45deg", left: "100%" }
          }
          transition={{
            duration: 0.8,
            delay: open ? 0 : 0.4,
            ease: "backOut",
          }}
          className={"bg-base_2-500 inset-y-0 absolute start-0 end-[100%]"}
        />

        <motion.ul
          animate={open ? "show" : "hide"}
          transition={{
            delayChildren: open ? 0.2 : 0,
            staggerChildren: 0.03,
            staggerDirection: !open ? -1 : 1,
          }}
          className={
            "flex relative items-stretch z-10 w-full flex-col gap-8 text-white text-5xl"
          }
        >
          {links.map(({ href, title }) => (
            <NavItem
              key={href}
              href={href}
              isActive={pathname === href}
              isVisible={open}
            >
              {title}
            </NavItem>
          ))}
        </motion.ul>
      </nav>
    </>
  );
}

function DemiBrandSymbol({ size = 40, ...props }) {
  const size_ = size / 2;
  const cn_ = (class_name: string) =>
    cn(
      "transition-all duration-200 ease-in-out transform",
      props.className,
      class_name,
    );

  return (
    <span
      data-active={false}
      {...props}
      className={
        "group aspect-square *:flex *:w-[--width] gap-0 grid grid-cols-2"
      }
      style={{
        "--width": `${size_}px`,
        width: size,
        height: size,
        fontSize: size_,
      }}
    >
      <div>
        <SymbolCut
          className={cn_(
            "w-[1em] h-[1em] rotate-90 group-data-[active=true]:rotate-0",
          )}
        />
      </div>
      <div>
        <SymbolCut
          className={cn_(
            "w-[1em] h-[1em] rotate-180 group-data-[active=true]:rotate-90",
          )}
        />
      </div>
      <div>
        <SymbolCut
          className={cn_(
            "w-[1em] h-[1em] rotate-0 group-data-[active=true]:rotate-[270deg]",
          )}
        />
      </div>
      <div>
        <SymbolCut
          className={cn_(
            "w-[1em] h-[1em] rotate-[270deg] group-data-[active=true]:rotate-[180deg]",
          )}
        />
      </div>
    </span>
  );
}
