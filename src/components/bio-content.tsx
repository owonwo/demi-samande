import React from "react";
import { safeArray, safeStr } from "../libs/data.helper.ts";
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

  return (
    <section className="flex flex-col bg-dm-background py-24 gap-24 min-h-[60svh]">
      <Container className="">
        <div className="flex gap-4 items-end">
          <hgroup className="basis-1/2 flex flex-col gap-8">
            <h2 className="text-3xl font-heading">{safeStr(props.heading)}</h2>

            <p className="w-full text-balance font-[100]">
              {safeStr(props.paragraph)}
            </p>
          </hgroup>

          <div
            id="slider"
            className="basis-1/2 relative flex items-end overflow-hidden w-full h-[200px]"
          >
            <div className="absolute bottom-0 flex gap-4">
              {accomplishments.map(({ photo }, index) => (
                <div
                  key={photo}
                  className="w-[150px] bg-gray-100 aspect-[3/1]"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container className={"flex gap-4"}>
        <figure
          className={
            "border shrink-0 basis-1/2 bg-gray-200 rounded-lg aspect-[712/544]"
          }
        />
        <InteractiveSlider items={props.accomplishments} />
      </Container>
    </section>
  );
}

type Accomplishment = {
  heading: string;
  paragraph: string;
  photo: string;
};

function InteractiveSlider({ items }: { items: Accomplishment[] }) {
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
    <SmartAccordionRoot>
      <div className={"flex basis-1/2 justify-end shrink-0 grow-0"}>
        {safeArray(items).map((item, idx) => {
          return (
            <SmartAccordionItem
              key={item.heading}
              show={index === idx}
              heading={item.heading}
              onClick={() => setIndex(idx)}
            >
              {item.paragraph}
            </SmartAccordionItem>
          );
        })}
      </div>
    </SmartAccordionRoot>
  );
}
