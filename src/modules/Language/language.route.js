import express from "express";
import {
    detectLanguageController,
    detectKeyPhaseController,
    analyzeSentimentController,
    extractEntitiesController,
    summarizeTextController,
    detectPiiController
} from "./language.controller.js";

const router = express.Router();

router.post("/language/detect", detectLanguageController);
router.post("/language/keyphrases", detectKeyPhaseController);
router.post("/language/sentiment", analyzeSentimentController);
router.post("/language/entities", extractEntitiesController);
router.post("/language/summarize", summarizeTextController);
router.post("/language/pii", detectPiiController);

export default router;