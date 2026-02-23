"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const login = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                message: "No Request Body",
            });
        }
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const loginResult = await (0, auth_service_1.loginUser)(email, password);
        res.status(200).json({
            message: "Login successful",
            data: loginResult,
        });
    }
    catch (error) {
        if (error.message === "Invalid email or password" ||
            error.message === "User account is not active") {
            return res.status(401).json({
                message: error.message,
            });
        }
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.login = login;
exports.default = {
    login: exports.login,
};
//# sourceMappingURL=auth.controller.js.map