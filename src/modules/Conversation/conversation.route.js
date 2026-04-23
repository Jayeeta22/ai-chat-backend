import express from "express";
import { analyzeConversationController } from "./conversation.controller.js";

const router = express.Router();

router.post(
  "/conversation/analyze",
  analyzeConversationController
);

export default router;