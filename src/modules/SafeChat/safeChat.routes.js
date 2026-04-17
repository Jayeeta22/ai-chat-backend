import express from "express";
import { safeChatHandler } from "./safeChat.controller.js";

const router = express.Router();

// 🔐 Safe Chat Route
router.post("/safe-chat", safeChatHandler);

export default router;