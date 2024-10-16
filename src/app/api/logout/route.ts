import { deleteSessionForUser } from "@/data-access/sessions";
import { validateRequest } from "@/lib/auth";
import { invalidateSession } from "@/lib/auth-session";
import { deleteSessionTokenCookie } from "@/lib/cookies";

import { redirect } from "next/navigation";

export async function GET(): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { session } = await validateRequest();
  if (!session) {
    redirect("/sign-in");
  }

  await invalidateSession(session.id);

  await deleteSessionForUser(session.userId);

  deleteSessionTokenCookie();

  redirect("/logout");
}
