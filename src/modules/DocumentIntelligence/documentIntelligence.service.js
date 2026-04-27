// ===============================
// documentIntelligence.service.js
// Dynamic Prebuilt Model Structure
// ===============================

import DocumentIntelligence from "@azure-rest/ai-document-intelligence";
import {
  getLongRunningPoller,
  isUnexpected
} from "@azure-rest/ai-document-intelligence";

const key = process.env.AZURE_DOCUMENT_INTELLIGENCE_KEY;
const endpoint = process.env.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT;

const client = DocumentIntelligence(endpoint, { key });


// prebuilt-idDocument   // Aadhaar / Passport
// prebuilt-invoice      // GST Bills
// prebuilt-read         // OCR Bengali / English text
// prebuilt-layout       // Bank statement table
export const analyzeDocumentService = async (fileUrl, modelId) => {
  try {
    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", modelId)
      .post({
        contentType: "application/json",
        body: {
          urlSource: fileUrl
        }
      });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    const poller = getLongRunningPoller(client, initialResponse);

    const result = (await poller.pollUntilDone()).body.analyzeResult;

    return {
      modelUsed: modelId,
      content: result?.content || "",
      pages:
        result?.pages?.map((page) => ({
          pageNumber: page.pageNumber,
          lines: page.lines?.map((line) => line.content) || []
        })) || [],
      tables: result?.tables || [],
      documents: result?.documents || []
    };

  } catch (error) {
    console.error(error);
    throw new Error("Document analysis failed");
  }
};