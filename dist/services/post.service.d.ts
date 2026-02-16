export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreatePostData {
    title: string;
    content: string;
}
export interface UpdatePostData {
    title?: string;
    content?: string;
}
export interface GetPostsQueryParams {
    page?: string;
    limit?: string;
    sort?: string;
    order?: string;
    s?: string;
}
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
        data: {
            title: string;
            content: string;
            id: number;
            authorId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getPostById(id: number): Promise<{
        title: string;
        content: string;
        id: number;
        authorId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createPost(data: CreatePostData): Promise<{
        title: string;
        content: string;
        id: number;
        authorId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePost(id: number, data: UpdatePostData): Promise<{
        title: string;
        content: string;
        id: number;
        authorId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    patchPost(id: number, data: UpdatePostData): Promise<{
        title: string;
        content: string;
        id: number;
        authorId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletePost(id: number): Promise<void>;
}
declare const _default: PostService;
export default _default;
