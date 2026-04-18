import axios from "axios";

const endpoint = process.env.CUSTOM_VISION_ENDPOINT;
const key = process.env.CUSTOM_VISION_KEY;
const projectId = process.env.CUSTOM_VISION_PROJECT_ID;
const publishedName = process.env.CUSTOM_VISION_PUBLISHED_NAME;

export const predictImageService = async (imageUrl) => {
   
  try {
    const response = await axios.post(
      `${endpoint}customvision/v3.0/Prediction/${projectId}/classify/iterations/${publishedName}/url`,
      {
        Url: imageUrl
      },
      {
        headers: {
          "Prediction-Key": key,
          "Content-Type": "application/json"
        }
      }
    );

    return formatPrediction(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    throw new Error("Prediction failed");
  }
};

const formatPrediction = (data) => {
  return data.predictions.map((item) => ({
    tag: item.tagName,
    confidence: (item.probability * 100).toFixed(2) + "%"
  }));
};