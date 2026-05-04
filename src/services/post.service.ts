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

class PostService {
  // Get all posts with pagination and search
  async getPosts(params: GetPostsQueryParams) {
    return getPosts(params);
  }

  // Get post by ID
  async getPostById(id: number) {
    const post = await findPostById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  // Create a new post
  async createPost(data: CreatePostData) {
    if (!data.title || !data.content) {
      throw new Error("Title and content are required");
    }

    const existingPost = await findPostByTitle(data.title);
    if (existingPost) {
      throw new Error("A post with this title already exists");
    }

    return createPost(data);
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

    return updatePost(id, data);
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

    return updatePost(id, data);
  }

  // Delete a post
  async deletePost(id: number) {
    return deletePost(id);
  }
}

export default new PostService();
