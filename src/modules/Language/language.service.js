import { AzureKeyCredential, TextAnalysisClient } from "@azure/ai-language-text";

const key = process.env.AZURE_LANGUAGE_KEY;
const endpoint = process.env.AZURE_LANGUAGE_ENDPOINT;

if (!key || !endpoint) {
  throw new Error("Missing LANGUAGE_KEY or LANGUAGE_ENDPOINT environment variables.");
}

const client = new TextAnalysisClient(
  endpoint,
  new AzureKeyCredential(key)
);

export const detectLanguageService = async (text) => {
  try {
    const documents = [text];

      const result = await client.analyze("LanguageDetection", documents);
      console.log("result",result)
      for await (const doc of result) {
          if (!doc.error) {
        return {

          detectedLanguage: doc.primaryLanguage.name,
          isoCode: doc.primaryLanguage.iso6391Name,
          confidenceScore: doc.primaryLanguage.confidenceScore
        };
      }
    }

    throw new Error("No language detected");

  } catch (error) {
    console.error(error.message);
    throw new Error("Language detection failed");
  }
};

export const extractKeyPhraseService = async (text) => {
  try {
    const documents = [text];

    const result = await client.analyze("KeyPhraseExtraction", documents);

    for await (const doc of result) {
      if (!doc.error) {
        return {
          keyPhrases: doc.keyPhrases
        };
      }
    }

    throw new Error("No key phrases found");

  } catch (error) {
    console.error(error.message);
    throw new Error("Key phrase extraction failed");
  }
};

export const analyzeSentimentService = async (text) => {
  try {
    const documents = [text];

    const result = await client.analyze("SentimentAnalysis", documents);

    for await (const doc of result) {
      if (!doc.error) {
        return {
          sentiment: doc.sentiment,
          confidenceScores: {
            positive: doc.confidenceScores.positive,
            neutral: doc.confidenceScores.neutral,
            negative: doc.confidenceScores.negative
          }
        };
      }
    }

    throw new Error("No sentiment detected");

  } catch (error) {
    console.error(error.message);
    throw new Error("Sentiment analysis failed");
  }
};

export const extractEntitiesService = async (text) => {
  try {
    const documents = [text];

    const result = await client.analyze("EntityRecognition", documents);

    for await (const doc of result) {
      if (!doc.error) {
        return {
          entities: doc.entities.map((item) => ({
            text: item.text,
            category: item.category,
            confidenceScore: item.confidenceScore
          }))
        };
      }
    }

    throw new Error("No entities found");

  } catch (error) {
    console.error(error.message);
    throw new Error("Entity extraction failed");
  }
};

export const summarizeTextService = async (text) => {
  try {
    const documents = [text];

    const poller = await client.beginAnalyzeBatch(
      documents,
      {
        extractiveSummarizationTasks: [
          {
            parameters: {
              sentenceCount: 3
            }
          }
        ]
      }
    );

    const result = await poller.pollUntilDone();

    return result;

  } catch (error) {
    console.error(error);
    throw new Error("Summarization failed");
  }
};

export const detectPiiService = async (text) => {
  try {
    const documents = [text];

    const result = await client.analyze(
      "PiiEntityRecognition",
      documents
    );

    for await (const doc of result) {
      if (!doc.error) {
        return {
          redactedText: doc.redactedText,
          entities: doc.entities.map((item) => ({
            text: item.text,
            category: item.category,
            confidenceScore: item.confidenceScore
          }))
        };
      }
    }

    throw new Error("No PII detected");

  } catch (error) {
    console.error(error.message);
    throw new Error("PII detection failed");
  }
};