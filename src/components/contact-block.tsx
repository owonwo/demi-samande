import { Button } from "./button.tsx";
import { Title } from "./heading.tsx";
import { Container } from "./layouts/container.tsx";

export function ContactBlock({
  contactEmail = "mailto:demi@majeursholdings.com",
}: {
  contactEmail?: string;
}) {
  return (
    <section
      id="contact"
      className="page-section flex flex flex-col w-full bg-black text-[--foreground-alt] py-64"
      data-header-color={"--foreground-alt"}
    >
      <Container className="flex flex-col items-center flex-1 gap-8">
        <div className="flex flex-col items-center basis-4/12 gap-6">
          <Title size={"h2"}>
            <h2 className={"mx-6"}>Get in touch</h2>
          </Title>

          <a href={contactEmail} className={"block w-full"}>
            <Button className={"w-full"}>Let's get talking</Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
