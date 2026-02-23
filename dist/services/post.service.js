"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("../repository/post.repository");
class PostService {
    // Get all posts with pagination and search
    async getPosts(params) {
        return (0, post_repository_1.getPosts)(params);
    }
    // Get post by ID
    async getPostById(id) {
        const post = await (0, post_repository_1.findPostById)(id);
        if (!post) {
            throw new Error("Post not found");
        }
        return post;
    }
    // Create a new post
    async createPost(data) {
        const { title, content, authorId } = data;
        if (!title || !content) {
            throw new Error("Title and content are required");
        }
        const existingPost = await (0, post_repository_1.findPostByTitle)(title);
        if (existingPost) {
            throw new Error("A post with this title already exists");
        }
        return (0, post_repository_1.createPost)(data);
    }
    // Update a post
    async updatePost(id, data) {
        const { title, content, authorId } = data;
        if (!title || !content) {
            throw new Error("Title and content are required");
        }
        const existingPost = await (0, post_repository_1.findPostByTitle)(title, id);
        if (existingPost) {
            throw new Error("A post with this title already exists");
        }
        return (0, post_repository_1.updatePost)(id, data);
    }
    // Partially update a post
    async patchPost(id, data) {
        const { title, content, authorId } = data;
        if (!title && !content && authorId === undefined) {
            throw new Error("At least one field is required");
        }
        // Check for duplicate title if updating title
        if (title) {
            const existingPost = await (0, post_repository_1.findPostByTitle)(title, id);
            if (existingPost) {
                throw new Error("A post with this title already exists");
            }
        }
        return (0, post_repository_1.updatePost)(id, data);
    }
    // Delete a post
    async deletePost(id) {
        return (0, post_repository_1.deletePost)(id);
    }
}
exports.default = new PostService();
//# sourceMappingURL=post.service.js.map