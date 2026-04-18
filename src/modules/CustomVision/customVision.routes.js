import express from "express";
import { predictImageController } from "./customVision.controller.js";

const router = express.Router();

router.post("/customvision/predict", predictImageController);

export default router;