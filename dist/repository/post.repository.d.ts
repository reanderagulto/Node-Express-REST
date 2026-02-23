export interface CreatePostData {
    title: string;
    content: string;
    authorId?: number;
}
export interface UpdatePostData {
    title?: string;
    content?: string;
    authorId?: number;
}
export interface GetPostsQueryParams {
    page?: string;
    limit?: string;
    sort?: string;
    order?: string;
    s?: string;
}
export declare const findPostById: (id: number) => import("../generated/prisma").Prisma.Prisma__PostClient<({
    author: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../generated/prisma").$Enums.UserStatus;
        name: string | null;
        email: string;
        password: string;
        verified_at: Date | null;
    } | null;
} & {
    id: number;
    title: string;
    content: string;
    authorId: number | null;
    createdAt: Date;
    updatedAt: Date | null;
    status: import("../generated/prisma").$Enums.PostStatus;
}) | null, null, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const findPostByTitle: (title: string, excludeId?: number) => import("../generated/prisma").Prisma.Prisma__PostClient<{
    id: number;
    title: string;
    content: string;
    authorId: number | null;
    createdAt: Date;
    updatedAt: Date | null;
    status: import("../generated/prisma").$Enums.PostStatus;
} | null, null, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const createPost: (data: CreatePostData) => import("../generated/prisma").Prisma.Prisma__PostClient<{
    author: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../generated/prisma").$Enums.UserStatus;
        name: string | null;
        email: string;
        password: string;
        verified_at: Date | null;
    } | null;
} & {
    id: number;
    title: string;
    content: string;
    authorId: number | null;
    createdAt: Date;
    updatedAt: Date | null;
    status: import("../generated/prisma").$Enums.PostStatus;
}, never, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const updatePost: (id: number, data: UpdatePostData) => import("../generated/prisma").Prisma.Prisma__PostClient<{
    author: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import("../generated/prisma").$Enums.UserStatus;
        name: string | null;
        email: string;
        password: string;
        verified_at: Date | null;
    } | null;
} & {
    id: number;
    title: string;
    content: string;
    authorId: number | null;
    createdAt: Date;
    updatedAt: Date | null;
    status: import("../generated/prisma").$Enums.PostStatus;
}, never, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const deletePost: (id: number) => import("../generated/prisma").Prisma.Prisma__PostClient<{
    id: number;
    title: string;
    content: string;
    authorId: number | null;
    createdAt: Date;
    updatedAt: Date | null;
    status: import("../generated/prisma").$Enums.PostStatus;
}, never, import("../generated/prisma/runtime/library").DefaultArgs, import("../generated/prisma").Prisma.PrismaClientOptions>;
export declare const getPosts: (params: GetPostsQueryParams) => Promise<{
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        sort: string;
        order: string;
    };
    data: ({
        author: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma").$Enums.UserStatus;
            name: string | null;
            email: string;
            password: string;
            verified_at: Date | null;
        } | null;
    } & {
        id: number;
        title: string;
        content: string;
        authorId: number | null;
        createdAt: Date;
        updatedAt: Date | null;
        status: import("../generated/prisma").$Enums.PostStatus;
    })[];
}>;
