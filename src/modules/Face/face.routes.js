import express from "express";
import { detectFaceController } from "./face.controller.js";

const router = express.Router();

router.post("/face/detect", detectFaceController);

export default router;