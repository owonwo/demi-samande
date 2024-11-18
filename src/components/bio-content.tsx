import React from "react";

import { Container } from "./layouts/container.tsx";
import {
  SmartAccordionItem,
  SmartAccordionRoot,
} from "./smart-accordion-root.tsx";

export function BioContent() {
  return (
    <section className="flex flex-col bg-dm-background py-24 gap-24 min-h-[100svh]">
      <Container className="">
        <div className="flex gap-4 items-end">
          <hgroup className="basis-1/2 flex flex-col gap-8">
            <h2 className="text-3xl font-heading">Hy, it's Demi Samande</h2>

            <p className="w-full text-balance font-[100]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
              culpa error, facere facilis necessitatibus obcaecati possimus
              quasi qui quidem, repudiandae saepe, soluta totam vero. Esse
              impedit ipsa iste molestias unde.
            </p>
          </hgroup>

          <div
            id="slider"
            className="basis-1/2 relative flex items-end overflow-hidden w-full h-[200px]"
          >
            <div className="absolute bottom-0 flex gap-4">
              {Array.from({ length: 7 }, (e, index) => (
                <div
                  key={index}
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
        ></figure>

        <InteractiveSlider />
      </Container>
    </section>
  );
}

function InteractiveSlider() {
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
        <SmartAccordionItem
          show={index === 0}
          heading={"Founder"}
          onClick={() => setIndex(0)}
        />
        <SmartAccordionItem
          show={index === 1}
          heading={"Speaker"}
          onClick={() => setIndex(1)}
        />
        <SmartAccordionItem
          show={index === 2}
          heading={"Author"}
          onClick={() => setIndex(2)}
        />
        <SmartAccordionItem
          show={index === 3}
          heading={"Podcaster"}
          onClick={() => setIndex(3)}
        />
      </div>
    </SmartAccordionRoot>
  );
}
