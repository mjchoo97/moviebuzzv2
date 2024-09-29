import prisma from "@/lib/client";
import { UserId } from "@/use-cases/type";

export async function createUser(email: string) {
  const user = await prisma.user.create({
    data: {
      email,
    },
  });

  return user;
}

export async function deleteUser(userId: UserId) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}
