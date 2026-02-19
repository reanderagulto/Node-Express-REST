export declare const findApiKey: (key: string) => import("../generated/prisma").Prisma.Prisma__ApiKeyClient<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
} | null, null, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const createApiKey: (data: {
    key: string;
    name: string;
    isActive?: boolean;
}) => import("../generated/prisma").Prisma.Prisma__ApiKeyClient<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
}, never, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const getApiKeys: () => import("../generated/prisma").Prisma.PrismaPromise<{
    id: string;
    createdAt: Date;
    name: string;
    isActive: boolean;
}[]>;
export declare const getApiKeyById: (id: string) => import("../generated/prisma").Prisma.Prisma__ApiKeyClient<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
} | null, null, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const updateApiKey: (id: string, data: {
    name?: string;
    isActive?: boolean;
}) => import("../generated/prisma").Prisma.Prisma__ApiKeyClient<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
}, never, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const deleteApiKey: (id: string) => import("../generated/prisma").Prisma.Prisma__ApiKeyClient<{
    id: string;
    createdAt: Date;
    name: string;
    key: string;
    isActive: boolean;
}, never, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
