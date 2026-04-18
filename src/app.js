import express from "express";
import cors from "cors";
import chatRoutes from "./modules/chat/chat.route.js";
import safeChatRoutes from "./modules/SafeChat/safeChat.routes.js";
import VisionRouts from "./modules/Vision/vision.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

console.log("hitting"); // should print

app.use("/api", chatRoutes);
app.use("/api", safeChatRoutes);
app.use("/api", VisionRouts)

export default app;