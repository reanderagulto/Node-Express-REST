"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.loginUser = void 0;
const auth_repository_1 = require("../repository/auth.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = async (email, password) => {
    // Find user by email
    const user = await (0, auth_repository_1.findUserByEmail)(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // Verify password
    const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }
    // Check if user is active
    if (user.status !== "ACTIVE") {
        throw new Error("User account is not active");
    }
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        name: user.name,
    }, (process.env.JWT_SECRET || "default_secret_key"), {
        expiresIn: "24h",
    });
    // Omit password from returned user
    const { password: _, ...userWithoutPassword } = user;
    return {
        user: userWithoutPassword,
        token,
    };
};
exports.loginUser = loginUser;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, (process.env.JWT_SECRET || "default_secret_key"));
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.service.js.map