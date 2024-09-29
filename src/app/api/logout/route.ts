import { deleteSessionForUser } from "@/data-access/sessions";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { session } = await validateRequest();
  if (!session) {
    redirect("/sign-in");
  }

  await lucia.invalidateSession(session.id);
  await deleteSessionForUser(session.userId);
  // await lucia.auth.invalidateAllUserSessions(session.userId);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect("/logout");
}
