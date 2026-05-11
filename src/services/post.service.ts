import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  findPostById,
  findPostByTitle,
  CreatePostData,
  UpdatePostData,
  GetPostsQueryParams,
} from "../repository/post.repository";
import {
  delCache,
  delCacheByPattern,
  getCache,
  setCache,
} from "../config/cache";

class PostService {
  // Get all posts with pagination and search
  async getPosts(params: GetPostsQueryParams) {
    const normalizedParams = {
      page: params.page || "1",
      limit: params.limit || "10",
      sort: params.sort || "title",
      order: params.order || "asc",
      s: params.s || "",
    };

    const cacheKey = `posts:${normalizedParams.page}:${normalizedParams.limit}:${normalizedParams.sort}:${normalizedParams.order}:${normalizedParams.s}`;
    const cached = await getCache<typeof normalizedParams>(cacheKey);

    if (cached) {
      return cached;
    }

    const result = await getPosts(params);
    await setCache(cacheKey, result, 60);

    return result;
  }

  // Get post by ID
  async getPostById(id: number) {
    const cacheKey = `post:${id}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      return cached;
    }

    const post = await findPostById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    await setCache(cacheKey, post, 120);
    return post;
  }

  // Create a new post or multiple posts
  async createPost(data: CreatePostData | CreatePostData[]) {
    const postsToCreate = Array.isArray(data) ? data : [data];

    if (postsToCreate.length === 0) {
      throw new Error("At least one post is required");
    }

    for (const item of postsToCreate) {
      if (!item.title || !item.content) {
        throw new Error("Title and content are required for every post");
      }
    }

    const titles = postsToCreate.map((item) => item.title.trim().toLowerCase());
    const duplicateTitles = titles.filter(
      (title, index) => titles.indexOf(title) !== index,
    );

    if (duplicateTitles.length > 0) {
      throw new Error(
        "Duplicate titles are not allowed in the request payload",
      );
    }

    for (const item of postsToCreate) {
      const existingPost = await findPostByTitle(item.title);
      if (existingPost) {
        throw new Error(`A post with the title '${item.title}' already exists`);
      }
    }

    const createdPosts = [] as Array<Awaited<ReturnType<typeof createPost>>>;
    for (const item of postsToCreate) {
      const created = await createPost(item);
      createdPosts.push(created);
    }

    await delCacheByPattern("posts:*");

    return Array.isArray(data) ? createdPosts : createdPosts[0];
  }

  // Update a post
  async updatePost(id: number, data: UpdatePostData) {
    if (!data.title) {
      throw new Error("Title and content are required");
    }

    const existingPost = await findPostByTitle(data.title, id);
    if (existingPost) {
      throw new Error("A post with this title already exists");
    }

    const post = await updatePost(id, data);
    await delCacheByPattern("posts:*");
    await delCache(`post:${id}`);
    return post;
  }

  // PATCH Method - Partially update a post
  async patchPost(id: number, data: UpdatePostData) {
    if (!data.title && !data.content && data.authorId === undefined) {
      throw new Error("At least one field is required");
    }

    // Check for duplicate title if updating title
    if (data.title) {
      const existingPost = await findPostByTitle(data.title, id);
      if (existingPost) {
        throw new Error("A post with this title already exists");
      }
    }

    const post = await updatePost(id, data);
    await delCacheByPattern("posts:*");
    await delCache(`post:${id}`);
    return post;
  }

  // Delete a post
  async deletePost(id: number) {
    const deletedPost = await deletePost(id);
    await delCacheByPattern("posts:*");
    await delCache(`post:${id}`);
    return deletedPost;
  }
}

export default new PostService();
