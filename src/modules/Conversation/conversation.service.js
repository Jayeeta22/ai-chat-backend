// conversation.service.js

import { AzureKeyCredential } from "@azure/core-auth";
import { ConversationAnalysisClient } from "@azure/ai-language-conversations";

const client = new ConversationAnalysisClient(
  process.env.AZURE_LANGUAGE_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_LANGUAGE_KEY)
);

export const analyzeConversationService = async (text) => {
  const result = await client.analyzeConversation({
    kind: "Conversation",
    analysisInput: {
      conversationItem: {
        id: "1",
        participantId: "user1",
        modality: "text",
        language: "en",
        text
      }
    },
    parameters: {
      projectName: process.env.AZURE_PROJECT_NAME,
      deploymentName: process.env.AZURE_DEPLOYMENT_NAME,
      verbose: true
    }
  });

  return result.result.prediction;
};