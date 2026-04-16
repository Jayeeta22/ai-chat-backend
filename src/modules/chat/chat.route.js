import express from "express";
import { chatHandler } from "./chat.controller.js";

const router = express.Router();

// POST → Chat API
router.post("/chat", chatHandler);

// GET → Test / health check
router.get("/get", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

export default router;