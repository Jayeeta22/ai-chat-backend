import { predictImageService } from "./customVision.service.js";

export const predictImageController = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;

    const result = await predictImageService(imageUrl);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};