import { generateChat } from "./chat.service.js";

//  // Interview assistant
// { role: "system", content: "You are a strict technical interviewer." }

// // Code assistant
// { role: "system", content: "You are a senior MERN stack developer." }

// // Short answers
// { role: "system", content: "Answer in 2 lines only." }

// // JSON output
// { role: "system", content: "Always respond in JSON format." }


export const chatHandler = async (req, res, next) => {
  try {
    const { message } = req.body;

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: message },
    ];

    const reply = await generateChat(messages);

    res.json({ success: true, reply });
  } catch (err) {
    next(err);
  }
};