import jwt from "jsonwebtoken";
export declare const loginUser: (email: string, password: string) => Promise<{
    user: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../generated/prisma").$Enums.UserStatus;
        name: string | null;
        email: string;
        verified_at: Date | null;
    };
    token: string;
}>;
export declare const verifyToken: (token: string) => string | jwt.JwtPayload | null;
