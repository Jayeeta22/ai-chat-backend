import {
    detectLanguageService,
    extractKeyPhraseService,
    analyzeSentimentService,
    extractEntitiesService,
    summarizeTextService,
    detectPiiService
} from "./language.service.js";

export const detectLanguageController = async (req, res, next) => {
  try {
    const { text } = req.body;

    const result = await detectLanguageService(text);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const detectKeyPhaseController = async (req, res, next) => {
    try {
        const { text } = req.body;
        const result = await extractKeyPhraseService(text);

        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const analyzeSentimentController = async (req, res, next) => {
  try {
    const { text } = req.body;

    const result = await analyzeSentimentService(text);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const extractEntitiesController = async (req, res, next) => {
  try {
    const { text } = req.body;

    const result = await extractEntitiesService(text);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const summarizeTextController = async (req, res, next) => {
  try {
    const { text } = req.body;

    const result = await summarizeTextService(text);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

export const detectPiiController = async (req, res, next) => {
  try {
    const { text } = req.body;

    const result = await detectPiiService(text);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

