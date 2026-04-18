import { analyzeImage } from "./vision.service.js";

export const visionHandler = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "imageUrl is required",
      });
    }

    const result = await analyzeImage(imageUrl);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};