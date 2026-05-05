import prisma from "../config/database";

export const findApiKey = (key: string) => {
  return prisma.apiKey.findUnique({
    where: { key },
  });
};

export const findApiKeyByHash = (keyHash: string) => {
  return prisma.apiKey.findUnique({
    where: { keyHash },
  });
};

export const createApiKey = (data: {
  key: string;
  keyHash: string;
  name: string;
  isActive?: boolean;
  userId?: number;
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
      lastUsedAt: true,
    },
  });
};

export const getApiKeyById = (id: string) => {
  return prisma.apiKey.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      isActive: true,
      createdAt: true,
      lastUsedAt: true,
    },
  });
};

export const updateApiKey = (
  id: string,
  data: { name?: string; isActive?: boolean; lastUsedAt?: Date },
) => {
  return prisma.apiKey.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      isActive: true,
      createdAt: true,
      lastUsedAt: true,
    },
  });
};

export const deleteApiKey = (id: string) => {
  return prisma.apiKey.delete({
    where: { id },
  });
};
