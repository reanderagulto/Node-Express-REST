import prisma from "../config/database";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};
