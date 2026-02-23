"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
const database_1 = __importDefault(require("../config/database"));
const findUserByEmail = (email) => {
    return database_1.default.user.findUnique({
        where: { email },
    });
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=auth.repository.js.map