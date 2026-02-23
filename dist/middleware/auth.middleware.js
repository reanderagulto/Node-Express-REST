"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const auth_service_1 = require("../services/auth.service");
const authenticateJWT = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                message: "Access token is missing",
            });
        }
        const decoded = (0, auth_service_1.verifyToken)(token);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid or expired token",
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.middleware.js.map