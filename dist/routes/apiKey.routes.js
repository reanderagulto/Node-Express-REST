"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiKey_controller_1 = __importDefault(require("../controllers/apiKey.controller"));
const apiKey_middleware_1 = require("../middleware/apiKey.middleware");
const router = express_1.default.Router();
// Create a new API key
router.post("/", apiKey_controller_1.default.createApiKey);
// Get all API keys
router.get("/", apiKey_middleware_1.apiKeyAuth, apiKey_controller_1.default.getApiKeys);
// Get a specific API key
router.get("/:id", apiKey_middleware_1.apiKeyAuth, apiKey_controller_1.default.getApiKey);
// Update an API key
router.put("/:id", apiKey_middleware_1.apiKeyAuth, apiKey_controller_1.default.updateApiKey);
// Delete an API key
router.delete("/:id", apiKey_middleware_1.apiKeyAuth, apiKey_controller_1.default.deleteApiKey);
exports.default = router;
//# sourceMappingURL=apiKey.routes.js.map