import { Google } from "arctic";
import { cookies } from "next/headers";

import {
  SessionValidationResult,
  validateSessionToken,
} from "@/lib/auth-session";
import { deleteSessionTokenCookie, setSessionTokenCookie } from "./cookies";

export const validateRequest = async (): Promise<SessionValidationResult> => {
  const sessionId = cookies().get("session")?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await validateSessionToken(sessionId);

  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session) {
      console.log(result.session.expiresAt);
      setSessionTokenCookie(sessionId, result.session.expiresAt);
    }
    if (!result.session) {
      deleteSessionTokenCookie();
    }
  } catch {}

  return result;
};

export const googleAuth = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.HOST_NAME}/api/login/google/callback`,
);
