"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = __importDefault(require("../services/post.service"));
class PostController {
    // GET Method - Get all posts with pagination and search
    async getPosts(req, res) {
        try {
            const result = await post_service_1.default.getPosts(req.query);
            return res.status(200).json(result);
        }
        catch (err) {
            const error = err;
            if (error.message.includes("Page and Limit") ||
                error.message.includes("Order must")) {
                return res.status(400).json({
                    error: error.message,
                });
            }
            return res.status(500).json({
                error: `Database error ${error.message}`,
            });
        }
    }
    // Get post by ID
    async getPostById(req, res) {
        const { id } = req.params;
        try {
            const post = await post_service_1.default.getPostById(parseInt(id));
            return res.status(200).json({
                data: post,
            });
        }
        catch (err) {
            const error = err;
            if (error.message === "Post not found") {
                return res.status(404).json({
                    error: error.message,
                });
            }
            return res.status(500).json({
                error: `Database error ${error.message}`,
            });
        }
    }
    // POST Method - Create a new post
    async createPost(req, res) {
        const { title, content } = req.body;
        try {
            const post = await post_service_1.default.createPost({ title, content });
            return res.status(201).json({
                message: "Post created successfully.",
                data: post,
            });
        }
        catch (err) {
            const error = err;
            if (error.message.includes("required") ||
                error.message.includes("already exists")) {
                return res
                    .status(error.message.includes("already exists") ? 409 : 400)
                    .json({
                    error: error.message,
                });
            }
            return res.status(500).json({
                error: `Database error ${error.message}`,
            });
        }
    }
    // PUT Method - Update a post
    async updatePost(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;
        try {
            const updatedPost = await post_service_1.default.updatePost(parseInt(id), {
                title,
                content,
            });
            return res.status(200).json({
                message: "Post updated successfully.",
                data: updatedPost,
            });
        }
        catch (err) {
            const error = err;
            if (error.code === "P2025") {
                return res.status(404).json({
                    error: "Post not found",
                });
            }
            if (error.message.includes("required") ||
                error.message.includes("already exists")) {
                return res
                    .status(error.message.includes("already exists") ? 409 : 400)
                    .json({
                    error: error.message,
                });
            }
            return res.status(500).json({
                error: `Database error ${error.message}`,
            });
        }
    }
    // PATCH Method - Partially update a post
    async patchPost(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;
        try {
            const updatedPost = await post_service_1.default.patchPost(parseInt(id), {
                title,
                content,
            });
            return res.status(200).json({
                message: "Post updated successfully.",
                data: updatedPost,
            });
        }
        catch (err) {
            const error = err;
            if (error.code === "P2025") {
                return res.status(404).json({
                    error: "Post not found",
                });
            }
            if (error.message.includes("required") ||
                error.message.includes("already exists")) {
                return res
                    .status(error.message.includes("already exists") ? 409 : 400)
                    .json({
                    error: error.message,
                });
            }
            return res.status(500).json({
                error: `Database error ${error.message}`,
            });
        }
    }
    // DELETE Method - Delete a post
    async deletePost(req, res) {
        const { id } = req.params;
        try {
            await post_service_1.default.deletePost(parseInt(id));
            return res.status(200).json({
                message: "Post deleted successfully.",
            });
        }
        catch (err) {
            const error = err;
            if (error.code === "P2025") {
                return res.status(404).json({
                    error: "Post not found",
                });
            }
            return res.status(500).json({
                error: `Database error ${error.message}`,
            });
        }
    }
}
exports.default = new PostController();
//# sourceMappingURL=post.controller.js.map