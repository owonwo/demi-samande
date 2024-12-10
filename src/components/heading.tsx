import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type React from "react";

export function Title(props: {
  size: keyof typeof variantConfig.variants.size;
  children: React.ReactNode;
}) {
  return (
    <Slot className={headingVariant({ size: props.size })}>
      {props.children}
    </Slot>
  );
}

const variantConfig = {
  variants: {
    size: {
      title:
        "text-[40px] md:text-[60px] font-heading tracking-tighter font-bold",
      h1: "text-[2.5rem] md:text-6xl font-medium font-heading",
      h2: "text-[1.875rem] md:text-[2.25rem] leading-[2.2ex] tracking-tight font-heading font-bold",
      h3: "text-[28px] font-heading font-bold leading-[112.5%]",
      h4: "font-bold font-body text-mjc-dark-100 text-[24px] capitalize leading-[2ex] tracking-[0.03rem]",
      h5: "text-[20px] font-semibold",
      h6: "text-[18px] font-medium",
    },
  },
  defaultVariants: {
    size: "h2",
  },
} as const;

export const headingVariant = cva("font-heading font-light", variantConfig);
