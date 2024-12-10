import { z } from "astro:schema";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Balancer } from "react-wrap-balancer";
import uncrypto from "uncrypto";
import { type ImageSource, ImageSourceSchema } from "../models/index.ts";
import { Button } from "./button.tsx";
import { ImageCarousel } from "./custom-carousel.tsx";
import { Title } from "./heading.tsx";
import { Container } from "./layouts/container.tsx";
import { ThumbnailButton } from "./testimonial.tsx";

const buttonSchema = z.object({
  buttonText: z.string().default("Button text"),
  buttonAction: z.string().min(1),
});

const visibilitySchema = z.object({
  visible: z.boolean().default(false),
});

const headingSchema = z.object({
  heading: z.string({ coerce: true }).min(1),
  paragraph: z.string({ coerce: true }).min(1),
});

const SpeakerSchema = z
  .object({
    noOfSpokenEvents: z.string({ coerce: true }).min(1).default("N/A"),
    noOfUniqueCountriesSpoken: z.string({ coerce: true }).min(1).default("N/A"),
    images: z
      .array(z.any())
      .refine((images) => {
        const photos = images.map((e) => ({
          id: uncrypto.randomUUID(),
          src: e.src,
          caption: e.caption,
          alt: e.photoDescription,
        }));
        return z.array(ImageSourceSchema).default([]).parse(photos);
      })
      .default([]),
  })
  .merge(visibilitySchema)
  .merge(headingSchema)
  .merge(buttonSchema);

function ValidateCMSData<A, T>(props: {
  schema: z.Schema<A>;
  data: T;
  children: React.JSX.Element;
}) {
  const { success, data, error } = props.schema.safeParse(props.data);

  if (!success) {
    return null;
  }

  // @ts-expect-error
  if (!data?.visible) return null;

  return <>{props.children}</>;
}

export function SpeakerBlock({
  data,
}: {
  data: z.infer<typeof SpeakerSchema>;
}) {
  return (
    <ValidateCMSData data={data} schema={SpeakerSchema}>
      <section
        id="speaker"
        className="min-h-[60svh] bg-dm-background py-12 md:py-32"
      >
        <Container className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
          <div className="flex flex-col basis-1/2 justify-between gap-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <Title size={"h2"}>
                  <h1 className="font-heading text-black max-w-xl">
                    <Balancer>{data.heading}</Balancer>
                  </h1>
                </Title>
                <p className="text-base text-neutral-700 max-w-xl">
                  {data.paragraph}
                </p>
              </div>

              <div className="flex gap-12 text-sm text-black">
                <div className="flex gap-2 items-center">
                  <span className="text-5xl lg:text-7xl font-semibold">
                    {data.noOfSpokenEvents ?? "1"}
                  </span>
                  <span className="text-[20px] w-[60px] leading-[1] font-normal">
                    speaking events
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="text-5xl lg:text-7xl font-semibold">
                    {data.noOfUniqueCountriesSpoken}
                  </span>
                  <span className="text-[20px] w-[60px] leading-[1] font-normal">
                    different countries
                  </span>
                </div>
              </div>
            </div>

            <a href={data.buttonAction} className="inline-block self-start">
              <Button
                type="button"
                className="gap-2 bg-gray-100 text-sm md:text-base"
              >
                <span>{data.buttonText}</span>
                <ArrowRight size="1em" />
              </Button>
            </a>
          </div>

          <div className="flex-1">
            <Carousel images={data.images} />
          </div>
        </Container>
      </section>
    </ValidateCMSData>
  );
}

function Carousel({ images = [] }: { images: ImageSource[] }) {
  const [index, setIndex] = React.useState(0);

  return (
    <div className="w-full flex flex-col gap-4">
      <ImageCarousel
        images={images}
        pos={index}
        className={"shrink-0 basis-1/2 rounded-lg"}
        style={{
          "--carousel-aspect-ratio": "712/544",
        }}
      />

      {images.length > 1 ? (
        <div className="grid gap-4 grid-cols-[repeat(3,minmax(1.4rem,2.5rem))] self-center content-end items-start">
          {images.map((entry, idx) => {
            return (
              <ThumbnailButton
                key={entry.id}
                image={entry}
                className={"md:w-[2.5rem]"}
                isActive={index === idx}
                onClick={() => setIndex(idx)}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
