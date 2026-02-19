"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteApiKeyById = exports.updateApiKeyDetails = exports.getApiKeyByIdentifier = exports.getAllApiKeys = exports.createNewApiKey = exports.validateApiKey = void 0;
const apikey_repository_1 = require("../repository/apikey.repository");
const generate_apikey_1 = require("../helpers/generate.apikey");
const validateApiKey = async (key) => {
    const apiKey = await (0, apikey_repository_1.findApiKey)(key);
    if (!apiKey || !apiKey.isActive) {
        return null;
    }
    return apiKey;
};
exports.validateApiKey = validateApiKey;
const createNewApiKey = async (name) => {
    const key = (0, generate_apikey_1.generateApiKey)();
    const apiKey = await (0, apikey_repository_1.createApiKey)({
        key,
        name,
        isActive: true,
    });
    return apiKey;
};
exports.createNewApiKey = createNewApiKey;
const getAllApiKeys = async () => {
    return (0, apikey_repository_1.getApiKeys)();
};
exports.getAllApiKeys = getAllApiKeys;
const getApiKeyByIdentifier = async (id) => {
    return (0, apikey_repository_1.getApiKeyById)(id);
};
exports.getApiKeyByIdentifier = getApiKeyByIdentifier;
const updateApiKeyDetails = async (id, data) => {
    return (0, apikey_repository_1.updateApiKey)(id, data);
};
exports.updateApiKeyDetails = updateApiKeyDetails;
const deleteApiKeyById = async (id) => {
    return (0, apikey_repository_1.deleteApiKey)(id);
};
exports.deleteApiKeyById = deleteApiKeyById;
//# sourceMappingURL=apiKey.service.js.map