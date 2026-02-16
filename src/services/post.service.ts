import prisma from "../config/database";

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

class PostService {
  // Get all posts with pagination and search
  async getPosts(params: GetPostsQueryParams) {
    let {
      page = "1",
      limit = "10",
      sort = "title",
      order = "asc",
      s = "",
    } = params;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const orderDir = (order as string).toLowerCase();

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
            { title: { contains: searchTerm, mode: "insensitive" as const } },
            { content: { contains: searchTerm, mode: "insensitive" as const } },
          ],
        }
      : {};

    // Build order by
    const orderBy = { [sort as string]: orderDir };

    // Get posts with pagination
    const posts = await prisma.post.findMany({
      where,
      orderBy,
      skip: offset,
      take: limitNum,
    });

    // Get total count for pagination metadata
    const total = await prisma.post.count({ where });

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
  async getPostById(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  // Create a new post
  async createPost(data: CreatePostData) {
    const { title, content } = data;

    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    const existingPost = await prisma.post.findFirst({
      where: { title: { equals: title, mode: "insensitive" } },
    });

    if (existingPost) {
      throw new Error("A post with this title already exists");
    }

    return await prisma.post.create({
      data,
    });
  }

  // Update a post
  async updatePost(id: number, data: UpdatePostData) {
    const { title, content } = data;

    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    const existingPost = await prisma.post.findFirst({
      where: {
        title: { equals: title, mode: "insensitive" },
        id: { not: id },
      },
    });

    if (existingPost) {
      throw new Error("A post with this title already exists");
    }

    return await prisma.post.update({
      where: { id },
      data,
    });
  }

  // Partially update a post
  async patchPost(id: number, data: UpdatePostData) {
    const { title, content } = data;

    if (!title && !content) {
      throw new Error("At least one field is required");
    }

    // Check for duplicate title if updating title
    if (title) {
      const existingPost = await prisma.post.findFirst({
        where: {
          title: { equals: title, mode: "insensitive" },
          id: { not: id },
        },
      });

      if (existingPost) {
        throw new Error("A post with this title already exists");
      }
    }

    return await prisma.post.update({
      where: { id },
      data,
    });
  }

  // Delete a post
  async deletePost(id: number) {
    await prisma.post.delete({
      where: { id },
    });
  }
}

export default new PostService();
