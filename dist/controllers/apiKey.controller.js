"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApiKey = exports.updateApiKey = exports.getApiKey = exports.getApiKeys = exports.createApiKey = void 0;
const apiKey_service_1 = require("../services/apiKey.service");
const createApiKey = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "API key name is required",
            });
        }
        const apiKey = await (0, apiKey_service_1.createNewApiKey)(name);
        res.status(201).json({
            message: "API key created successfully",
            data: apiKey,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createApiKey = createApiKey;
const getApiKeys = async (req, res, next) => {
    try {
        const apiKeys = await (0, apiKey_service_1.getAllApiKeys)();
        res.status(200).json({
            message: "API keys retrieved successfully",
            data: apiKeys,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getApiKeys = getApiKeys;
const getApiKey = async (req, res, next) => {
    try {
        const { id } = req.params;
        const apiKey = await (0, apiKey_service_1.getApiKeyByIdentifier)(id);
        if (!apiKey) {
            return res.status(404).json({
                message: "API key not found",
            });
        }
        res.status(200).json({
            message: "API key retrieved successfully",
            data: apiKey,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getApiKey = getApiKey;
const updateApiKey = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, isActive } = req.body;
        const apiKey = await (0, apiKey_service_1.updateApiKeyDetails)(id, { name, isActive });
        res.status(200).json({
            message: "API key updated successfully",
            data: apiKey,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateApiKey = updateApiKey;
const deleteApiKey = async (req, res, next) => {
    try {
        const { id } = req.params;
        await (0, apiKey_service_1.deleteApiKeyById)(id);
        res.status(200).json({
            message: "API key deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteApiKey = deleteApiKey;
exports.default = {
    createApiKey: exports.createApiKey,
    getApiKeys: exports.getApiKeys,
    getApiKey: exports.getApiKey,
    updateApiKey: exports.updateApiKey,
    deleteApiKey: exports.deleteApiKey,
};
//# sourceMappingURL=apiKey.controller.js.map