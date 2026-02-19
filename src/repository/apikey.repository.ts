import prisma from "../config/database";

export const findApiKey = (key: string) => {
  return prisma.apiKey.findUnique({
    where: { key },
  });
};

export const createApiKey = (data: {
  key: string;
  name: string;
  isActive?: boolean;
}) => {
  return prisma.apiKey.create({
    data,
  });
};

export const getApiKeys = () => {
  return prisma.apiKey.findMany({
    select: {
      id: true,
      name: true,
      isActive: true,
      createdAt: true,
    },
  });
};

export const getApiKeyById = (id: string) => {
  return prisma.apiKey.findUnique({
    where: { id },
  });
};

export const updateApiKey = (
  id: string,
  data: { name?: string; isActive?: boolean },
) => {
  return prisma.apiKey.update({
    where: { id },
    data,
  });
};

export const deleteApiKey = (id: string) => {
  return prisma.apiKey.delete({
    where: { id },
  });
};
