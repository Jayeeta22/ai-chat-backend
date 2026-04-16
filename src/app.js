import express from "express";
import cors from "cors";
import chatRoutes from "./modules/chat/chat.route.js";

const app = express();

app.use(cors());
app.use(express.json());

console.log("hitting"); // should print

// ✅ Correct way to use router
app.use("/api", chatRoutes);

export default app;