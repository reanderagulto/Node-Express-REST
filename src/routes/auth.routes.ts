import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

// User login
router.post("/login", authController.login);

export default router;
