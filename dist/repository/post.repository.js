"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.deletePost = exports.updatePost = exports.createPost = exports.findPostByTitle = exports.findPostById = void 0;
const database_1 = __importDefault(require("../config/database"));
const findPostById = (id) => {
    return database_1.default.post.findUnique({
        where: { id },
        include: { author: true },
    });
};
exports.findPostById = findPostById;
const findPostByTitle = (title, excludeId) => {
    const whereClause = {
        title: { equals: title, mode: "insensitive" },
    };
    if (excludeId) {
        whereClause.id = { not: excludeId };
    }
    return database_1.default.post.findFirst({
        where: whereClause,
    });
};
exports.findPostByTitle = findPostByTitle;
const createPost = (data) => {
    return database_1.default.post.create({
        data,
        include: { author: true },
    });
};
exports.createPost = createPost;
const updatePost = (id, data) => {
    return database_1.default.post.update({
        where: { id },
        data,
        include: { author: true },
    });
};
exports.updatePost = updatePost;
const deletePost = (id) => {
    return database_1.default.post.delete({
        where: { id },
    });
};
exports.deletePost = deletePost;
const getPosts = async (params) => {
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
        include: { author: true },
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
};
exports.getPosts = getPosts;
//# sourceMappingURL=post.repository.js.map