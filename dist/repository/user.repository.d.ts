type User = {
    email: string;
    password: string;
    name: string;
};
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
export declare const createUser: (data: User) => import("../generated/prisma").Prisma.Prisma__UserClient<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    password: string;
    verified_at: Date | null;
}, never, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const findUserById: (id: number) => import("../generated/prisma").Prisma.Prisma__UserClient<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    password: string;
    verified_at: Date | null;
} | null, null, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const getAllUsers: () => import("../generated/prisma").Prisma.PrismaPromise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    verified_at: Date | null;
}[]>;
export declare const updateUser: (id: number, data: Partial<User>) => import("../generated/prisma").Prisma.Prisma__UserClient<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    password: string;
    verified_at: Date | null;
}, never, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const deleteUser: (id: number) => import("../generated/prisma").Prisma.Prisma__UserClient<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    password: string;
    verified_at: Date | null;
}, never, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export {};
