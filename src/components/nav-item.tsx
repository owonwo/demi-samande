import { type Variants, motion } from "framer-motion";
import type React from "react";
import { cn } from "../libs/utils.ts";

const lineVariant: Variants = {
  show: { width: "100%", transition: { delay: 1.2 } },
  hide: { width: 0 },
};

const linkVariants: Variants = {
  show: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  },
  hide: {
    x: "-4%",
    opacity: 0,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  },
};

type NavItemProps = React.ComponentProps<"a"> & {
  isActive: boolean;
  isVisible: boolean;
};

export function NavItem(props: NavItemProps) {
  const { isActive, isVisible, ...PROPS } = props;

  return (
    <motion.li variants={linkVariants} className={"relative inline-block"}>
      <a
        {...PROPS}
        className={cn("font-heading text-white font-[400]", props.className, {
          italic: isActive,
        })}
      >
        {props.children}
      </a>
      <motion.span
        variants={lineVariant}
        animate={isVisible && isActive ? "show" : "hide"}
        className={
          "absolute transform bottom-1/2 translate-y-1/2 h-1 skew-x-[-12deg] bg-accent-500 inset-x-0"
        }
      />
    </motion.li>
  );
}
