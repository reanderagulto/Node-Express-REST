import { Request, Response } from "express";
declare class PostController {
    getPosts(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getPostById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createPost(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePost(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    patchPost(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePost(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: PostController;
export default _default;
