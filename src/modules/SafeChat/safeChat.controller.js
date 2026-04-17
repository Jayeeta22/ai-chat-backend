import { generateChat } from "../chat/chat.service.js";
import { analyzeText, isUnsafe } from "./safety.service.js";
import { detectPromptInjection } from "../../utils/promptShield.js";

// reuse your existing logic
import { detectContentType, systemPrompts }  from "../chat/chat.controller.js";  

export const safeChatHandler = async (req, res, next) => {
  try {
    const { message } = req.body;

    // 🚨 Step 1: Prompt Injection Check
    if (detectPromptInjection(message)) {
      return res.status(400).json({
        success: false,
        message: "⚠️ Prompt injection detected",
      });
    }

    // 🔐 Step 2: Input Content Safety
    const inputSafety = await analyzeText(message);

    if (isUnsafe(inputSafety)) {
      return res.status(400).json({
        success: false,
        message: inputSafety,
      });
    }

    // 🧠 Step 3: Your Existing Logic
    const contentType = detectContentType(message);
    const systemContent = systemPrompts[contentType];

    const messages = [
      { role: "system", content: systemContent },
      { role: "user", content: message },
    ];

    const reply = await generateChat(messages);

    // 🔐 Step 4: Output Safety
    const outputSafety = await analyzeText(reply);

    if (isUnsafe(outputSafety)) {
      return res.json({
        success: false,
        message: outputSafety,
      });
    }

    res.json({
      success: true,
      reply,
      contentType,
    });
  } catch (err) {
    next(err);
  }
};