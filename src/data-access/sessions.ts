import prisma from "@/lib/client";
import { UserId } from "@/use-cases/type";

export async function deleteSessionForUser(userId: UserId) {
  await prisma.session.deleteMany({
    where: {
      userId,
    },
  });
}
