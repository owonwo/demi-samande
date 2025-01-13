import SingleForm from "./single-form";
import { AtSignIcon, CheckCheck, CornerDownLeft, UserIcon } from "lucide-react";
import { Title } from "./heading";
import { motion } from "framer-motion";
import { cn } from "../libs/utils";
import { Container } from "./layouts/container";
import { z } from "astro/zod";
import React from "react";

export function NewsletterForm() {
  const [responseMessage, setResponseMessage] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.message) {
        setResponseMessage(data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-[1rem] mx-auto items-center">
      {/* <div className="flex gap-[1rem] *:flex-1">
        <label htmlFor="name" className="flex flex-col gap-1">
          First name
          <input type="text" id="name" name="name" autoComplete="name" required />
        </label>

        <label htmlFor="name" className="flex flex-col gap-1">
          Last name
          <input type="text" id="name" name="name" autoComplete="name" required />
        </label>
      </div>

      <label htmlFor="email" className="flex flex-col gap-1">
        Email
        <input type="email" id="email" name="email" autoComplete="email" required />
      </label> */}

      <div
        className="group/parent flex flex-col items-center gap-[1rem] justify-center w-full text-white"
        style={{
          "--ss-font-family": "var(--font-body)",
          "--ss-bg": "white",
          "--ss-btn-bg": "#333",
          "--ss-btn-color": "#fff",
          "--ss-height": "100px",
          "--ss-border-width": "1px",
          "--ss-text-color": "#fff",
          "--ss-border-color": "gray",
          "--ss-icon-bg": "#000",
          "--ss-cursor-color": "#ffd160",
        }}
      >
        <SingleForm
          form={[
            {
              name: "firstname",
              label: "First Name",
              type: "text",
              icon: <UserIcon />,
              validator: (v) => /\w+/.test(v),
            },
            {
              name: "lastname",
              label: "Last Name",
              type: "text",
              icon: <UserIcon />,
              validator: (v) => /\w+/.test(v),
            },
            {
              name: "email",
              label: "Email address",
              type: "text",
              icon: <AtSignIcon />,
              validator: (email) => z.string().email().safeParse(email).success,
            },
          ]}
          message={() => <SuccessContent />}
          isLoading={isLoading}
          onSubmit={async (data) => {
            const formData = new FormData();

            for (const prop in data) {
              formData.set(prop, String(data[prop]));
            }

            await submit(formData).then((e) => {
              // delay an extra second
              return new Promise((res) => setTimeout(res, 1000));
            });
          }}
        />

        <motion.div
          className={cn(
            "flex opacity-0 text-white/[0.9] transform translate-y-[-20%] items-center duration-200 ease-out",
            "group-focus-within/parent:translate-y-0 group-focus-within/parent:opacity-100",
          )}
        >
          <span>Press</span>&nbsp;
          <span className="inline-flex text-[14px] rounded-full mx-[1ch] bg-accent-500/[0.2] px-4 items-center text-accent-500 p-1 rounded-lg">
            <span>enter</span>&nbsp;
            <CornerDownLeft size={"1em"} />
          </span>
          to submit
        </motion.div>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

const fadeInBottom = {
  show: { opacity: 1, y: 0 },
  hide: { opacity: 0, y: "20%" },
};

function SuccessContent() {
  return (
    <motion.span
      initial="hide"
      animate="show"
      transition={{ staggerChildren: 0.4, delay: 5, staggerDirection: 1 }}
      className="text-lg items-center flex gap-[1rem]"
    >
      <motion.span custom={0} variants={fadeInBottom}>
        <CheckCheck className="text-accent-500" />
      </motion.span>

      <motion.span custom={1} variants={fadeInBottom}>
        Thanks for subscribing
      </motion.span>
    </motion.span>
  );
}

export function Newsletter() {
  return (
    <Container className="flex flex-col pt-12 pb-32 gap-[4rem] items-center text-white">
      <div className="flex flex-col gap-[1rem] items-center text-center">
        <Title size={"h2"}>
          <h1 className="text-balance font-body">Stay Inspired</h1>
        </Title>

        <p className="max-w-md opacity-60">Subscribe to my newsletter today</p>
      </div>

      <NewsletterForm />
    </Container>
  );
}
