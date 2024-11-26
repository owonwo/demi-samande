import { z } from "astro:schema";
import { ArrowRight } from "lucide-react";
import type React from "react";
import { Balancer } from "react-wrap-balancer";
import { Container } from "./layouts/container.tsx";

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
    console.log(error);
    return null;
  }

  // @ts-expect-error
  if (!data?.visible) return null;

  return <>{props.children}</>;
}

export function SpeakerBlock({
  data,
}: { data: z.infer<typeof SpeakerSchema> }) {
  return (
    <ValidateCMSData data={data} schema={SpeakerSchema}>
      <section id="speaker" className="min-h-[60svh] bg-dm-background py-32">
        <Container className="flex gap-8 justify-between">
          <div className="flex flex-col basis-1/2 justify-between">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <h1 className="font-heading max-w-xl text-5xl">
                  <Balancer>{data.heading}</Balancer>
                </h1>
                <p className="text-base text-neutral-700 max-w-xl">
                  {data.paragraph}
                </p>
              </div>

              <div className="flex gap-12 text-sm">
                <div className="flex gap-2 items-center">
                  <span className="text-7xl font-semibold">
                    {data.noOfSpokenEvents ?? "1"}
                  </span>
                  <span className="text-[20px] w-[60px] leading-[1] font-normal">
                    speaking events
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="text-7xl font-semibold">
                    {data.noOfUniqueCountriesSpoken}
                  </span>
                  <span className="text-[20px] w-[60px] leading-[1] font-normal">
                    different countries
                  </span>
                </div>
              </div>
            </div>

            <a href={data.buttonAction} className="inline-block self-start">
              <button
                type="button"
                className="flex gap-2 bg-gray-100 rounded-md px-4 py-4 items-center"
              >
                <span>{data.buttonText}</span>
                <ArrowRight size="1em" />
              </button>
            </a>
          </div>

          <figure className="bg-gray-200 basis-1/2 aspect-[3/2]" />
        </Container>
      </section>
    </ValidateCMSData>
  );
}
