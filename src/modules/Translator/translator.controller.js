import { translateTextService } from "./translator.service.js";

export const translateTextController = async (req, res, next) => {
  try {
    const { text, to } = req.body;

    const result = await translateTextService(text, to);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};