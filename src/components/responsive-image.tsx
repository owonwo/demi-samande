import { Image, Source } from "@unpic/react";
import type React from "react";
import { cn } from "../libs/utils.ts";

export type ResponsiveImage = {
  base: string;
  medium?: string;
  small?: string;
};

interface RIProps extends Omit<React.ComponentProps<typeof Image>, "src"> {
  image: ResponsiveImage;
}

export function ResponsiveImage(props: RIProps) {
  const {
    image: { small, base },
    className,
    priority = false,
    ...PROPS
  } = props;

  return (
    <picture className={cn(className, "absolute bg-purple-500/[0.3] inset-0")}>
      <Source src={base} media="(min-width: 601px)" layout="fullWidth" />
      {small ? (
        <Source
          src={small}
          media="(max-width: 600px)"
          layout={"constrained"}
          width={600}
          aspectRatio={1 / 1.5}
        />
      ) : null}
      {/* @ts-expect-error */}
      <Image
        src={base}
        width={1600}
        height={undefined}
        aspectRatio={16 / 9}
        layout={"constrained"}
        className={"w-full absolute object-top object-cover h-full inset-0"}
        alt={props.alt}
        unstyled
        priority={priority}
        {...PROPS}
      />
    </picture>
  );
}
