import React from "react";
import { safeArray, safeStr } from "../libs/data.helper.ts";
import { cn } from "../libs/utils.ts";
import { ImageCarousel, MockCarouselImages } from "./custom-carousel.tsx";
import { Container } from "./layouts/container.tsx";
import {
  SmartAccordionItem,
  SmartAccordionRoot,
} from "./smart-accordion-root.tsx";

export function BioContent(props: {
  heading: string;
  paragraph: string;
  accomplishments: Accomplishment[];
}) {
  const { accomplishments } = props;
  const [index, setIndex] = React.useState(-1);

  React.useEffect(() => {
    setIndex(0);

    // const id = setInterval(() => {
    //   setIndex((v) => (v >= 3 ? 0 : v + 1));
    // }, 4000);
    //
    // return () => clearInterval(id);
  }, []);

  return (
    <section className="flex flex-col bg-dm-background py-12 md:py-24 gap-24 min-h-[60svh]">
      <Container>
        <div className="flex gap-4 flex-col md:flex-row items-end">
          <hgroup className="basis-1/2 flex flex-col gap-8">
            <h2 className="text-2xl font-medium lg:text-3xl font-heading">
              {safeStr(props.heading)}
            </h2>
            <p className="w-full md:text-base text-balance font-[100]">
              {safeStr(props.paragraph)}
            </p>
          </hgroup>

          <div
            id="slider"
            className="md:basis-1/2s relative flex items-end overflow-hidden w-full h-[10svh] md:h-[200px]"
          >
            <div className="absolute bottom-0 flex gap-4">
              {accomplishments.map(({ photo }) => (
                <div
                  key={photo}
                  className="w-[150px] bg-gray-100 aspect-[3/1]"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container className={"flex flex-col md:flex-row gap-4"}>
        <ImageCarousel
          images={MockCarouselImages}
          pos={index}
          className={"shrink-0 basis-1/2 rounded-lg"}
          style={{
            "--carousel-aspect-ratio": "712/544",
          }}
        />

        <InteractiveSlider
          items={props.accomplishments}
          index={index}
          className={"hidde md:inline-flex"}
          onIndexChange={(v) => setIndex(v)}
        />
      </Container>
    </section>
  );
}

type Accomplishment = {
  heading: string;
  paragraph: string;
  photo: string;
};

function InteractiveSlider(props: {
  items: Accomplishment[];
  index: number;
  className?: string;
  onIndexChange: (n: number) => void;
}) {
  const { items, index = 0 } = props;

  return (
    <SmartAccordionRoot>
      <div
        className={cn(
          "flex basis-1/2 justify-end shrink-0 grow-0",
          props.className,
        )}
      >
        {safeArray(items).map((item, idx) => {
          return (
            <SmartAccordionItem
              key={item.heading}
              show={index === idx}
              heading={item.heading}
              onClick={() => props.onIndexChange(idx)}
            >
              {item.paragraph}
            </SmartAccordionItem>
          );
        })}
      </div>
    </SmartAccordionRoot>
  );
}
