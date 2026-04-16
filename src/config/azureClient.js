import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new AzureOpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  deployment: process.env.AZURE_DEPLOYMENT,
  apiVersion: process.env.AZURE_API_VERSION,
});

export default client;