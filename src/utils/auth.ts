import { createCookieSessionStorage } from "solid-start";
import { createSolidAuthClient } from "@solid-auth/core";
import { clientEnv } from "~/env/client";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    secrets: [clientEnv.VITE_SESSION_SECRET],
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  },
});

export const authClient = createSolidAuthClient(`${getBaseUrl()}/api/auth`);
