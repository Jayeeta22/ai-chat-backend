import axios from "axios";
import { formatVisionResponse } from "./vision.validationoutput.js";

const endpoint = process.env.AZURE_VISION_ENDPOINT;
const apiKey = process.env.AZURE_VISION_KEY;

export const analyzeImage = async (imageUrl) => {
  try {
    const response = await axios.post(
      `${endpoint}vision/v3.2/analyze?visualFeatures=Description,Tags,Objects`,
      {
        url: imageUrl,
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    return formatVisionResponse(response?.data);
  } catch (error) {
    console.error("Vision API Error:", error.response?.data || error.message);
    throw new Error("Image analysis failed");
  }
};