import { CreatePostData, UpdatePostData, GetPostsQueryParams } from "../repository/post.repository";
declare class PostService {
    getPosts(params: GetPostsQueryParams): Promise<{
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
    getPostById(id: number): Promise<{
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
    }>;
    createPost(data: CreatePostData): Promise<{
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
    }>;
    updatePost(id: number, data: UpdatePostData): Promise<{
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
    }>;
    patchPost(id: number, data: UpdatePostData): Promise<{
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
    }>;
    deletePost(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        authorId: number | null;
        createdAt: Date;
        updatedAt: Date | null;
        status: import("../generated/prisma").$Enums.PostStatus;
    }>;
}
declare const _default: PostService;
export default _default;
