"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.findUserById = exports.createUser = exports.findUserByEmail = void 0;
const database_1 = __importDefault(require("../config/database"));
const findUserByEmail = (email) => {
    return database_1.default.user.findUnique({
        where: { email },
    });
};
exports.findUserByEmail = findUserByEmail;
const createUser = (data) => {
    return database_1.default.user.create({
        data,
    });
};
exports.createUser = createUser;
const findUserById = (id) => {
    return database_1.default.user.findUnique({
        where: { id },
    });
};
exports.findUserById = findUserById;
const getAllUsers = () => {
    return database_1.default.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            status: true,
            verified_at: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
exports.getAllUsers = getAllUsers;
const updateUser = (id, data) => {
    return database_1.default.user.update({
        where: { id },
        data,
    });
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    return database_1.default.user.delete({
        where: { id },
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.repository.js.map