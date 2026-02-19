"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// Import routes
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const apiKey_routes_1 = __importDefault(require("./routes/apiKey.routes"));
// Use routes
app.use("/posts", post_routes_1.default);
app.use("/api-keys", apiKey_routes_1.default);
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map