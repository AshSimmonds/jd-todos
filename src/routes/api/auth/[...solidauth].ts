import { authenticator } from "~/server/auth";
import { createSolidAuthHandler } from "@solid-auth/core";
import { type User } from "@prisma/client";

const handler = createSolidAuthHandler<User>(authenticator);

export const POST = handler;
export const GET = handler;
