import { generateChat } from "./chat.service.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load JSONL and BUILD keyword map from it dynamically
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawLines = fs.readFileSync(
   path.join(__dirname, "../../data", "content_type_routing.jsonl"),  
  "utf-8"
)
  .trim()
  .split("\n")
  .map((line) => JSON.parse(line));

// Extract keywords from each prompt in the JSONL and group by contentType
const keywordMap = {};

for (const { prompt, contentType } of rawLines) {
  if (!keywordMap[contentType]) keywordMap[contentType] = new Set();

  // Pull every meaningful word (3+ chars) from the prompt as a keyword
  const words = prompt.toLowerCase().match(/[a-z]{3,}/g) || [];
  words.forEach((word) => keywordMap[contentType].add(word));
}

// Score user message against each contentType
function detectContentType(userMessage) {
  const words = userMessage.toLowerCase().match(/[a-z]{3,}/g) || [];

  const scores = {};

  for (const [contentType, keywordSet] of Object.entries(keywordMap)) {
    scores[contentType] = words.filter((word) => keywordSet.has(word)).length;
  }

  // Pick contentType with highest score, fallback to "general"
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] > 0 ? best[0] : "general";
}

// Map contentType → system prompt
const systemPrompts = {
  code: "You are a senior developer. Explain code clearly.",
  interview: "You are a strict technical interviewer.",
  general: "You are a helpful assistant.",
};

export const chatHandler = async (req, res, next) => {
  try {
    const { message } = req.body;

    const contentType = detectContentType(message);
    const systemContent = systemPrompts[contentType];

    const messages = [
      { role: "system", content: systemContent },
      { role: "user", content: message },
    ];

    const reply = await generateChat(messages);

    res.json({ success: true, reply, contentType });
  } catch (err) {
    next(err);
  }
};