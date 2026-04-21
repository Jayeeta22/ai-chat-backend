import { generateVoiceService } from "./speech.service.js";

export const generateVoiceController = async (
  req,
  res,
  next
) => {
  try {
    const { text } = req.body;

    const fileName = await generateVoiceService(text);

    res.json({
      success: true,
      file: fileName
    });

  } catch (error) {
    next(error);
  }
};