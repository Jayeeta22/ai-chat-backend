import TextTranslationClient from "@azure-rest/ai-translation-text";

const apiKey = process.env.AZURE_TRANSLATOR_KEY;
const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT;
const region = process.env.AZURE_TRANSLATOR_REGION;

const client = new TextTranslationClient(endpoint, {
  key: apiKey,
  region: region
});

export const translateTextService = async (text, to, from = "en") => {
  try {
    const inputText = [{ text }];

    const response = await client.path("/translate").post({
      body: inputText,
      queryParameters: {
        to,
        from
      }
    });

    const data = response.body[0];

    return {
      originalText: text,
      translatedText: data.translations[0].text,
      language: data.translations[0].to
    };

  } catch (error) {
    console.error(error);
    throw new Error("Translation failed");
  }
};