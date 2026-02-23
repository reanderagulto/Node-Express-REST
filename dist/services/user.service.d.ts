export declare const validateEmail: (email: string) => boolean;
export declare const validatePassword: (password: string) => boolean;
export declare const hashPassword: (password: string) => Promise<string>;
export declare const createNewUser: (email: string, password: string, name: string) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    verified_at: Date | null;
}>;
export declare const getUserByEmail: (email: string) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    password: string;
    verified_at: Date | null;
} | null>;
export declare const getUserById: (id: number) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    password: string;
    verified_at: Date | null;
} | null>;
export declare const getUsers: () => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    verified_at: Date | null;
}[]>;
export declare const updateUserDetails: (id: number, data: {
    email?: string;
    name?: string;
    password?: string;
}) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    verified_at: Date | null;
}>;
export declare const deleteUserById: (id: number) => Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: import("../generated/prisma").$Enums.UserStatus;
    name: string | null;
    email: string;
    password: string;
    verified_at: Date | null;
}>;
