"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const apiKey_middleware_1 = require("../middleware/apiKey.middleware");
const router = express_1.default.Router();
// Get all posts with pagination and search
router.get("/", apiKey_middleware_1.apiKeyAuth, post_controller_1.default.getPosts);
// Get post by ID
router.get("/:id", apiKey_middleware_1.apiKeyAuth, post_controller_1.default.getPostById);
// Create a new post
router.post("/", apiKey_middleware_1.apiKeyAuth, post_controller_1.default.createPost);
// Update a post
router.put("/:id", apiKey_middleware_1.apiKeyAuth, post_controller_1.default.updatePost);
// Partially update a post
router.patch("/:id", apiKey_middleware_1.apiKeyAuth, post_controller_1.default.patchPost);
// Delete a post
router.delete("/:id", apiKey_middleware_1.apiKeyAuth, post_controller_1.default.deletePost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map