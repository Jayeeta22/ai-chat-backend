import express from "express";
import { translateTextController } from "./translator.controller.js";

const router = express.Router();

router.post("/translator/translate", translateTextController);

export default router;