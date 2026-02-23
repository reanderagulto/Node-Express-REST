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

export const findUserById = (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const getAllUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      status: true,
      verified_at: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUser = (id: number, data: Partial<User>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};
