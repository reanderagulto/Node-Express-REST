"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
class PostService {
    // Get all posts with pagination and search
    async getPosts(params) {
        let { page = "1", limit = "10", sort = "title", order = "asc", s = "", } = params;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const orderDir = order.toLowerCase();
        if (pageNum < 1 || limitNum < 1) {
            throw new Error("Page and Limit must be positive numbers");
        }
        if (!["asc", "desc"].includes(orderDir)) {
            throw new Error("Order must be 'asc' or 'desc'");
        }
        const offset = (pageNum - 1) * limitNum;
        // Build where clause for search
        const searchTerm = typeof s === "string" ? s : "";
        const where = searchTerm
            ? {
                OR: [
                    { title: { contains: searchTerm, mode: "insensitive" } },
                    { content: { contains: searchTerm, mode: "insensitive" } },
                ],
            }
            : {};
        // Build order by
        const orderBy = { [sort]: orderDir };
        // Get posts with pagination
        const posts = await database_1.default.post.findMany({
            where,
            orderBy,
            skip: offset,
            take: limitNum,
        });
        // Get total count for pagination metadata
        const total = await database_1.default.post.count({ where });
        return {
            meta: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
                sort,
                order: orderDir,
            },
            data: posts,
        };
    }
    // Get post by ID
    async getPostById(id) {
        const post = await database_1.default.post.findUnique({
            where: { id },
        });
        if (!post) {
            throw new Error("Post not found");
        }
        return post;
    }
    // Create a new post
    async createPost(data) {
        const { title, content } = data;
        if (!title || !content) {
            throw new Error("Title and content are required");
        }
        const existingPost = await database_1.default.post.findFirst({
            where: { title: { equals: title, mode: "insensitive" } },
        });
        if (existingPost) {
            throw new Error("A post with this title already exists");
        }
        return await database_1.default.post.create({
            data,
        });
    }
    // Update a post
    async updatePost(id, data) {
        const { title, content } = data;
        if (!title || !content) {
            throw new Error("Title and content are required");
        }
        const existingPost = await database_1.default.post.findFirst({
            where: {
                title: { equals: title, mode: "insensitive" },
                id: { not: id },
            },
        });
        if (existingPost) {
            throw new Error("A post with this title already exists");
        }
        return await database_1.default.post.update({
            where: { id },
            data,
        });
    }
    // Partially update a post
    async patchPost(id, data) {
        const { title, content } = data;
        if (!title && !content) {
            throw new Error("At least one field is required");
        }
        // Check for duplicate title if updating title
        if (title) {
            const existingPost = await database_1.default.post.findFirst({
                where: {
                    title: { equals: title, mode: "insensitive" },
                    id: { not: id },
                },
            });
            if (existingPost) {
                throw new Error("A post with this title already exists");
            }
        }
        return await database_1.default.post.update({
            where: { id },
            data,
        });
    }
    // Delete a post
    async deletePost(id) {
        await database_1.default.post.delete({
            where: { id },
        });
    }
}
exports.default = new PostService();
//# sourceMappingURL=post.service.js.map