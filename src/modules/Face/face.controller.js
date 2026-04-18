import { detectFaceService } from "./face.service.js";

export const detectFaceController = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;

    const result = await detectFaceService(imageUrl);

    res.status(200).json({
      success: true,
      totalFaces: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
};