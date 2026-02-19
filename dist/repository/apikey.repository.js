"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApiKey = exports.updateApiKey = exports.getApiKeyById = exports.getApiKeys = exports.createApiKey = exports.findApiKey = void 0;
const database_1 = __importDefault(require("../config/database"));
const findApiKey = (key) => {
    return database_1.default.apiKey.findUnique({
        where: { key },
    });
};
exports.findApiKey = findApiKey;
const createApiKey = (data) => {
    return database_1.default.apiKey.create({
        data,
    });
};
exports.createApiKey = createApiKey;
const getApiKeys = () => {
    return database_1.default.apiKey.findMany({
        select: {
            id: true,
            name: true,
            isActive: true,
            createdAt: true,
        },
    });
};
exports.getApiKeys = getApiKeys;
const getApiKeyById = (id) => {
    return database_1.default.apiKey.findUnique({
        where: { id },
    });
};
exports.getApiKeyById = getApiKeyById;
const updateApiKey = (id, data) => {
    return database_1.default.apiKey.update({
        where: { id },
        data,
    });
};
exports.updateApiKey = updateApiKey;
const deleteApiKey = (id) => {
    return database_1.default.apiKey.delete({
        where: { id },
    });
};
exports.deleteApiKey = deleteApiKey;
//# sourceMappingURL=apikey.repository.js.map