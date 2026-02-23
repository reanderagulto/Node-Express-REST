import prisma from "../config/database";

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

export const findPostById = (id: number) => {
  return prisma.post.findUnique({
    where: { id },
    include: { author: true },
  });
};

export const findPostByTitle = (title: string, excludeId?: number) => {
  const whereClause: any = {
    title: { equals: title, mode: "insensitive" },
  };

  if (excludeId) {
    whereClause.id = { not: excludeId };
  }

  return prisma.post.findFirst({
    where: whereClause,
  });
};

export const createPost = (data: CreatePostData) => {
  return prisma.post.create({
    data,
    include: { author: true },
  });
};

export const updatePost = (id: number, data: UpdatePostData) => {
  return prisma.post.update({
    where: { id },
    data,
    include: { author: true },
  });
};

export const deletePost = (id: number) => {
  return prisma.post.delete({
    where: { id },
  });
};

export const getPosts = async (params: GetPostsQueryParams) => {
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
    include: { author: true },
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
};
