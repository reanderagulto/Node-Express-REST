export declare const findUserByEmail: (email: string) => import("../generated/prisma").Prisma.Prisma__UserClient<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    password: string;
    verified_at: Date | null;
} | null, null, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
