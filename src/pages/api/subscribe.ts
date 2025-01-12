export const prerender = false; // Not needed in 'server' mode
import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { fetch, FetchError } from "ofetch";
import { safeObj } from "../../libs/data.helper";

const API_KEY = import.meta.env.FLODESK_API_KEY;
const SEGMENT_ID = import.meta.env.FLODESK_SEGMENT_ID;

const schema = z.object({
  firstname: z.string({
    required_error: "First name required"
  }).min(1, { message: "Name should contain a minimum of 1 char"}),
  lastname: z.string(
    {required_error: "Last name required"}
  ).min(1, { message: "Name should contain a minimum of 1 char"}),
  email: z.string({
    required_error: "Email address required"
  }).email({ message: "Please provide a valid email address"}),
});

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  try {
    const payload = Object.fromEntries(data.entries())

    const result = await schema.safeParseAsync(payload);
    if (!result.success) {
      throw result.error;
    }

    const { firstname, lastname, email } = result.data;
    const credential = Buffer.from(`${API_KEY}:`).toString("base64");
    const response = await fetch("https://api.flodesk.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credential}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // id: email,
        first_name: firstname,
        last_name: lastname,
        email: email,
        custom_fields: { source_tag: "Demi Samande Website" },
        double_optin: false, // don't send them an subscription email
        segment_ids: [SEGMENT_ID],
      }),
    });

    const res = await response.json();

    if (res.status === "bounced") {
      throw {
        kind: "Bounced",
        message: `We couldn't sign up this email: ${email}. Please try another email adddress`,
        ...res,
      };
    }

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (err) {
    const errObj = safeObj(err);
    let content: { success: boolean } & Record<string, unknown>;

    if (err instanceof z.ZodError) {
      content = {
        success: false,
        type: "ValidationError",
        data: err.errors.map((e) => e.message),
      };
    } else {
      content = {
        success: false,
        error:
          err instanceof FetchError
            ? err.response?._data
            : "kind" in errObj && errObj.kind === "Bounced"
              ? errObj.message
              : String(err),
      };
    }

    return new Response(JSON.stringify(content), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
