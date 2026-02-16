import { Request, Response } from "express";
import postService from "../services/post.service";

class PostController {
  // GET Method - Get all posts with pagination and search
  async getPosts(req: Request, res: Response) {
    try {
      const result = await postService.getPosts(req.query);
      return res.status(200).json(result);
    } catch (err) {
      const error = err as Error;
      if (
        error.message.includes("Page and Limit") ||
        error.message.includes("Order must")
      ) {
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
  async getPostById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await postService.getPostById(parseInt(id as string));
      return res.status(200).json({
        data: post,
      });
    } catch (err) {
      const error = err as Error;
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
  async createPost(req: Request, res: Response) {
    const { title, content } = req.body;
    try {
      const post = await postService.createPost({ title, content });
      return res.status(201).json({
        message: "Post created successfully.",
        data: post,
      });
    } catch (err) {
      const error = err as Error;
      if (
        error.message.includes("required") ||
        error.message.includes("already exists")
      ) {
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
  async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const updatedPost = await postService.updatePost(parseInt(id as string), {
        title,
        content,
      });
      return res.status(200).json({
        message: "Post updated successfully.",
        data: updatedPost,
      });
    } catch (err) {
      const error = err as any;
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
            error: error.message,
          });
      }
      return res.status(500).json({
        error: `Database error ${error.message}`,
      });
    }
  }

  // PATCH Method - Partially update a post
  async patchPost(req: Request, res: Response) {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const updatedPost = await postService.patchPost(parseInt(id as string), {
        title,
        content,
      });
      return res.status(200).json({
        message: "Post updated successfully.",
        data: updatedPost,
      });
    } catch (err) {
      const error = err as any;
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
            error: error.message,
          });
      }
      return res.status(500).json({
        error: `Database error ${error.message}`,
      });
    }
  }

  // DELETE Method - Delete a post
  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await postService.deletePost(parseInt(id as string));
      return res.status(200).json({
        message: "Post deleted successfully.",
      });
    } catch (err) {
      const error = err as any;
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

export default new PostController();
