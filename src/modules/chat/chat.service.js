import client from "../../config/azureClient.js";

export const generateChat = async (messages) => {
  try {
    const response = await client.chat.completions.create({
      messages,
      max_tokens: 500,
      temperature: 0.7,
      // n:2, // No of response need 
      model: process.env.AZURE_DEPLOYMENT,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("AI generation failed");
  }
};