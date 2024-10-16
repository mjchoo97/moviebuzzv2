import "server-only";

import { validateRequest } from "@/lib/auth";
import { cache } from "react";
import { AuthenticationError } from "../use-cases/error";
import { UserId } from "@/use-cases/type";
import { createSession, generateSessionToken } from "./auth-session";
import { setSessionTokenCookie } from "./cookies";

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();
  if (!session.user) {
    return undefined;
  }
  return session.user;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};

export async function setSession(userId: UserId) {
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  console.log(session.expiresAt);
  setSessionTokenCookie(token, session.expiresAt);
}
