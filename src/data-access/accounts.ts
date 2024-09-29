import prisma from "@/lib/client";
import { UserId } from "@/use-cases/type";

export async function getUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function createAccountViaGoogle(
  userId: UserId,
  googleId: string,
  name: string,
  image: string
) {
  await prisma.account.create({
    data: {
      userId,
      googleId,
      name,
      image,
    },
  });
}

export async function getAccountByGoogleId(googleId: string) {
  return await prisma.account.findFirst({
    where: {
      googleId,
    },
  });
}

export async function getAccountByUserId(userId: string) {
  return await prisma.account.findFirst({
    where: {
      userId,
    },
  });
}
