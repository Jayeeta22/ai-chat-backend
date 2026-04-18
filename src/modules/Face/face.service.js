import createFaceClient from "@azure-rest/ai-vision-face";
import { AzureKeyCredential } from "@azure/core-auth";

const endpoint = process.env.AZURE_FACE_ENDPOINT;
const apiKey = process.env.AZURE_FACE_APIKEY;

const client = createFaceClient(
  endpoint,
  new AzureKeyCredential(apiKey)
);

export const detectFaceService = async (imageUrl) => {
    try {
        const response = await client.path("/detect").post({
            contentType: "application/json",
            queryParameters: {
                detectionModel: "detection_03",
                returnFaceId: false,
                returnFaceAttributes: [
    //   "blur",
    //   "exposure",
    //   "glasses",
    //   "headPose",
    //   "mask",
    //   "occlusion",
      "qualityForRecognition"
    ]
            },
            body: {
                url: imageUrl
            }
        });

        return response.body;
    } catch (error) {
        console.log("Face API Error:", error);
        throw error;
    }
};