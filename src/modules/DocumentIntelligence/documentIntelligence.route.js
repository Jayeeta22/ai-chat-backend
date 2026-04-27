import express from "express";
import { analyzeDocumentController } from "./documentIntelligence.controller.js";

const router = express.Router();

router.post("/document/analyze", analyzeDocumentController);

export default router;