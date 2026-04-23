import { analyzeConversationService } from "./conversation.service.js";

export const analyzeConversationController = async (
  req,
  res,
  next
) => {
  try {
    const { text } = req.body;

    const data = await analyzeConversationService(text);

    res.json({
      success: true,
      data
    });

  } catch (error) {
    next(error);
  }
};