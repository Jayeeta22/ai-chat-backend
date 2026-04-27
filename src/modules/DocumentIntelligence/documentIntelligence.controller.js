
import { analyzeDocumentService } from "./documentIntelligence.service.js";

export const analyzeDocumentController = async (req, res, next) => {
  try {
    const { fileUrl, modelId } = req.body;

    if (!fileUrl || !modelId) {
      return res.status(400).json({
        success: false,
        message: "fileUrl and modelId are required"
      });
    }

    const result = await analyzeDocumentService(fileUrl, modelId);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};