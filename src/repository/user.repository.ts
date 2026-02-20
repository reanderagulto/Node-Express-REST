import prisma from "../config/database";

type User = {
  email: string;
  password: string;
  name: string;
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (data: User) => {
  return prisma.user.create({
    data,
  });
};
