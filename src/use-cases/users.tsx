import { createAccountViaGoogle, getUserByEmail } from "@/data-access/accounts";

import { GoogleUser } from "@/app/api/login/google/callback/route";
import { createUser, deleteUser } from "@/data-access/users";
import { AuthenticationError } from "./error";
import { UserId, UserSession } from "./type";

export async function deleteUserUseCase(
  authenticatedUser: UserSession,
  userToDeleteId: UserId
): Promise<void> {
  if (authenticatedUser.id !== userToDeleteId) {
    throw new AuthenticationError();
  }

  await deleteUser(userToDeleteId);
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createUser(googleUser.email);
  }

  await createAccountViaGoogle(
    existingUser.id,
    googleUser.sub,
    googleUser.name,
    googleUser.picture
  );

  return existingUser.id;
}
