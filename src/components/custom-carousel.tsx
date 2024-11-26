import React from "react";
import { cn } from "../libs/utils.ts";
import { CustomSlider } from "./custom-slider.ts";

export const MockCarouselImages = [
  {
    id: "1a8c737bb6fb4322b104da86c1dbdb13",
    src: "https://cdn.builder.io/api/v1/image/assets%2Fa9aee0a49b7a41018967c72016d0d762%2F3e2b65e32ad5439e9b1eefdad48c7c1e",
    alt: "Jon Ignite",
  },
  {
    id: "9a39164e12394269ad9eb13261dd3e9f",
    src: "https://cdn.builder.io/api/v1/image/assets%2Fa9aee0a49b7a41018967c72016d0d762%2F3e2b65e32ad5439e9b1eefdad48c7c1e",
    alt: "James Clear",
  },
  {
    id: "ad03db3fd0d24b118103e3fc6100173c",
    src: "https://cdn.builder.io/api/v1/image/assets%2Fa9aee0a49b7a41018967c72016d0d762%2F311990767b7c42579cd313534ac3e1b2",
    alt: "Kemi Loppa",
  },
];

type ImageCarouselProps = React.ComponentProps<"div"> & {
  className: string;
  pos: number;
  images: { src: string; alt: string }[];
};

export function ImageCarousel(props: ImageCarouselProps) {
  const { pos, images, className, ...PROPS } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const slider = React.useRef(new CustomSlider([])).current;

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const elements = container.children as unknown as HTMLElement[];
    slider.setElements([...elements]);
    slider.initialize();
  }, [slider]);

  React.useLayoutEffect(() => {
    slider.move(pos);
  }, [slider, pos]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center aspect-[--carousel-aspect-ratio] w-full",
        className,
      )}
      style={{
        "--carousel-aspect-ratio": "640/440",
        ...PROPS.style,
      }}
    >
      {images.map((image) => {
        return (
          <Figure
            key={image.alt}
            src={image.src}
            alt={image.alt}
            className={"w-full border-red-500 aspect-[--carousel-aspect-ratio]"}
          />
        );
      })}
    </div>
  );
}

function TestImageCarousel({ pos, images }: { images: string[]; pos: number }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const slider = React.useRef(new CustomSlider([])).current;

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const elements = container.children as unknown as HTMLElement[];
    slider.setElements([...elements]);
    slider.initialize();
  }, [slider]);

  React.useLayoutEffect(() => {
    slider.move(pos);
  }, [slider, pos]);

  return (
    <div
      ref={containerRef}
      className={
        "relative flex flex-col items-center aspect-[--carousel-aspect-ratio] w-full"
      }
    >
      <Figure className={"w-full bg-red-200"} />
      <Figure className={"w-full bg-purple-400"} />
      <Figure className={"w-full bg-blue-200"} />
    </div>
  );
}

function Figure(props: React.ComponentProps<"img">) {
  return (
    <figure
      {...props}
      className={cn(
        "absolute rounded-md pointer-events-none overflow-hidden",
        props.className,
      )}
    >
      <img
        src={props.src}
        alt={props.alt}
        draggable={false}
        className={
          "pointer-events-none aspect-[--carousel-aspect-ratio] w-full object-cover"
        }
      />
    </figure>
  );
}
