import express from "express";
import { generateVoiceController } from "./speech.controller.js";

const router = express.Router();

router.post(
  "/speech/generate-voice",
  generateVoiceController
);

export default router;