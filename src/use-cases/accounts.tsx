import {
  getAccountByGoogleId,
  getAccountByUserId,
} from "@/data-access/accounts";

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId);
}
export async function getAccountByUserIdUseCase(userId: string) {
  return await getAccountByUserId(userId);
}
