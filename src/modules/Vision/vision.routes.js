import express from "express";
import { visionHandler } from "./vision.controller.js";

const router = express.Router();

// POST → Image Analysis API
router.post("/analyze-image", visionHandler);

// GET → Health check
router.get("/vision-test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vision API working",
  });
});

export default router;