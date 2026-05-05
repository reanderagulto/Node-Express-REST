import { Request, Response } from "express";
import postService from "../services/post.service";
import logger from "../utils/logger";

class PostController {
  // GET Method - Get all posts with pagination and search
  async getPosts(req: Request, res: Response) {
    try {
      const result = await postService.getPosts(req.query);
      return res.status(200).json(result);
    } catch (err) {
      const error = err as Error;
      logger.error("Get posts error", {
        error: error.message,
      });
      if (
        error.message.includes("Page and Limit") ||
        error.message.includes("Order must")
      ) {
        return res.status(400).json({
          error:
            process.env.NODE_ENV === "development"
              ? error.message
              : "Invalid query parameters",
        });
      }
      return res.status(500).json({
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to retrieve posts",
      });
    }
  }

  // Get post by ID
  async getPostById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await postService.getPostById(parseInt(id as string));
      return res.status(200).json({
        data: post,
      });
    } catch (err) {
      const error = err as Error;
      logger.error("Get post error", {
        error: error.message,
      });
      if (error.message === "Post not found") {
        return res.status(404).json({
          error: error.message,
        });
      }
      return res.status(500).json({
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to retrieve post",
      });
    }
  }

  // POST Method - Create a new post
  async createPost(req: any, res: Response) {
    const body = req.body;
    try {
      // Get authorId from authenticated user if not provided
      const data = body.authorId ? body : { ...body, authorId: req.user?.id };

      const post = await postService.createPost(data);

      logger.info("Post created", { postId: post.id, userId: req.user?.id });

      return res.status(201).json({
        message: "Post created successfully.",
        data: post,
      });
    } catch (err) {
      const error = err as Error;
      logger.warn("Create post error", {
        error: error.message,
      });
      if (
        error.message.includes("required") ||
        error.message.includes("already exists")
      ) {
        return res
          .status(error.message.includes("already exists") ? 409 : 400)
          .json({
            error:
              process.env.NODE_ENV === "development"
                ? error.message
                : "Failed to create post",
          });
      }
      return res.status(500).json({
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to create post",
      });
    }
  }

  // PUT Method - Update a post
  async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedPost = await postService.updatePost(
        parseInt(id as string),
        req.body,
      );

      logger.info("Post updated", { postId: id });

      return res.status(200).json({
        message: "Post updated successfully.",
        data: updatedPost,
      });
    } catch (err) {
      const error = err as any;
      logger.error("Update post error", {
        error: error.message,
      });
      if (error.code === "P2025") {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      if (
        error.message.includes("required") ||
        error.message.includes("already exists")
      ) {
        return res
          .status(error.message.includes("already exists") ? 409 : 400)
          .json({
            error:
              process.env.NODE_ENV === "development"
                ? error.message
                : "Failed to update post",
          });
      }
      return res.status(500).json({
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to update post",
      });
    }
  }

  // PATCH Method - Partially update a post
  async patchPost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedPost = await postService.patchPost(
        parseInt(id as string),
        req.body,
      );

      logger.info("Post patched", { postId: id });

      return res.status(200).json({
        message: "Post updated successfully.",
        data: updatedPost,
      });
    } catch (err) {
      const error = err as any;
      logger.error("Patch post error", {
        error: error.message,
      });
      if (error.code === "P2025") {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      if (
        error.message.includes("required") ||
        error.message.includes("already exists")
      ) {
        return res
          .status(error.message.includes("already exists") ? 409 : 400)
          .json({
            error:
              process.env.NODE_ENV === "development"
                ? error.message
                : "Failed to update post",
          });
      }
      return res.status(500).json({
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to update post",
      });
    }
  }

  // DELETE Method - Delete a post
  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await postService.deletePost(parseInt(id as string));

      logger.info("Post deleted", { postId: id });

      return res.status(200).json({
        message: "Post deleted successfully.",
      });
    } catch (err) {
      const error = err as any;
      logger.error("Delete post error", {
        error: error.message,
      });
      if (error.code === "P2025") {
        return res.status(404).json({
          error: "Post not found",
        });
      }
      return res.status(500).json({
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to delete post",
      });
    }
  }
}

export default new PostController();
