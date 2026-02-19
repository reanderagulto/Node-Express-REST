"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyAuth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const apiKey_service_1 = require("../services/apiKey.service");
dotenv_1.default.config();
const apiKeyAuth = async (req, res, next) => {
    try {
        const key = req.header("x-api-key");
        if (!key) {
            return res.status(401).json({
                message: "API Key is missing",
            });
        }
        const apiKey = await (0, apiKey_service_1.validateApiKey)(key);
        if (!apiKey) {
            return res.status(403).json({
                message: "Invalid or inactive API Key",
            });
        }
        req.apiKey = apiKey;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.apiKeyAuth = apiKeyAuth;
//# sourceMappingURL=apiKey.middleware.js.map