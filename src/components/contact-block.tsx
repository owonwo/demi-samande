import { Container } from "./layouts/container.tsx";

export function ContactBlock({
  contactEmail = "mailto:hello@demisamande.com",
}: { contactEmail?: string }) {
  return (
    <section
      id="contact"
      className="flex flex flex-col w-full bg-black text-white py-64"
    >
      <Container className="flex flex-col items-center flex-1 gap-8">
        <div className="flex flex-col items-center basis-4/12 gap-6">
          <h1 className="text-5xl font-heading">Get in touch</h1>

          <a
            href={contactEmail}
            type="button"
            className="bg-dm-background items-center gap-2 inline-flex text-black p-4"
          >
            <span>Let's get talking</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
