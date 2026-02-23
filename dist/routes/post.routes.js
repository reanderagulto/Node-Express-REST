"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const apiKey_middleware_1 = require("../middleware/apiKey.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Get all posts with pagination and search - requires API key
router.get("/", apiKey_middleware_1.apiKeyAuth, post_controller_1.default.getPosts);
// Get post by ID - requires API key
router.get("/:id", apiKey_middleware_1.apiKeyAuth, post_controller_1.default.getPostById);
// Create a new post - requires both API key and JWT authentication
router.post("/", apiKey_middleware_1.apiKeyAuth, auth_middleware_1.authenticateJWT, post_controller_1.default.createPost);
// Update a post - requires both API key and JWT authentication
router.put("/:id", apiKey_middleware_1.apiKeyAuth, auth_middleware_1.authenticateJWT, post_controller_1.default.updatePost);
// Partially update a post - requires both API key and JWT authentication
router.patch("/:id", apiKey_middleware_1.apiKeyAuth, auth_middleware_1.authenticateJWT, post_controller_1.default.patchPost);
// Delete a post - requires both API key and JWT authentication
router.delete("/:id", apiKey_middleware_1.apiKeyAuth, auth_middleware_1.authenticateJWT, post_controller_1.default.deletePost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map