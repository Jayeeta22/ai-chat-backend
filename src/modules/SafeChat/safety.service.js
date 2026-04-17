import ContentSafetyClient from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";


console.log("ENV KEY:", process.env.AZURE_CONTENT_SAFETY_KEY);
console.log("ENV ENDPOINT:", process.env.AZURE_CONTENT_SAFETY_KEY);
// Create client once (not inside function)
const client = ContentSafetyClient(
  process.env.AZURE_CONTENT_SAFETY_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_CONTENT_SAFETY_KEY)
);

// 🔐 Analyze Text
export async function analyzeText(text) {
  const response = await client.path("/text:analyze").post({
    body: { text },
  });

  if (response.status !== "200") {
    throw new Error("Content safety API failed");
  }

  return response.body.categoriesAnalysis;
}

// 🚨 Check Unsafe
export function isUnsafe(categories) {
  return categories.some((c) => c.severity >= 3);
}