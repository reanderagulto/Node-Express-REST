"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// Register a new user
router.post("/", user_controller_1.default.registerUser);
// Get all users (requires authentication)
router.get("/", auth_middleware_1.authenticateJWT, user_controller_1.default.getUsers);
// Get a specific user (requires authentication)
router.get("/:id", auth_middleware_1.authenticateJWT, user_controller_1.default.getUser);
// Update a user (requires authentication)
router.put("/:id", auth_middleware_1.authenticateJWT, user_controller_1.default.updateUser);
// Delete a user (requires authentication)
router.delete("/:id", auth_middleware_1.authenticateJWT, user_controller_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map