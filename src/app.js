import express from "express";
import cors from "cors";
import chatRoutes from "./modules/chat/chat.route.js";
import safeChatRoutes from "./modules/SafeChat/safeChat.routes.js";
import VisionRouts from "./modules/Vision/vision.routes.js"
import faceRoutes from "./modules/Face/face.routes.js";
import customVisionRoutes from "./modules/CustomVision/customVision.routes.js";
import languageRoutes from "./modules/Language/language.route.js"
import TranslateRoutes from "./modules/Translator/translator.route.js"
import SpeechRoutes from "./modules/Speech/speech.route.js"
import conversationRoute from "./modules/Conversation/conversation.route.js";
import decumentIntelligenceRoute from "./modules/DocumentIntelligence/documentIntelligence.route.js";

const app = express();

app.use(cors());
app.use(express.json());

console.log("hitting"); // should print

app.use("/api", chatRoutes);
app.use("/api", safeChatRoutes);
app.use("/api", VisionRouts)
app.use("/api", faceRoutes);
app.use("/api", customVisionRoutes);
app.use("/api", languageRoutes);
app.use("/api", TranslateRoutes);
app.use("/api", SpeechRoutes);
app.use("/api", conversationRoute);
app.use("/api", decumentIntelligenceRoute);

export default app;