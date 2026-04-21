import {
  SpeechConfig,
  AudioConfig,
  SpeechSynthesizer,
  ResultReason
} from "microsoft-cognitiveservices-speech-sdk";

const key = process.env.AZURE_SPEECH_KEY;
const endpoint = process.env.AZURE_SPEECH_ENDPOINT;

export const generateVoiceService = async (text) => {
  return new Promise((resolve, reject) => {
    const fileName = `upload/audio/voice-${Date.now()}.wav`;

    const speechConfig = SpeechConfig.fromEndpoint(
      new URL(endpoint),
      key
    );

    speechConfig.speechSynthesisVoiceName =
      "en-US-Ava:DragonHDLatestNeural";

    const audioConfig =
      AudioConfig.fromAudioFileOutput(fileName);

    const synthesizer = new SpeechSynthesizer(
      speechConfig,
      audioConfig
    );

    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (
          result.reason ===
          ResultReason.SynthesizingAudioCompleted
        ) {
          resolve(fileName);
        } else {
          reject(
            new Error(
              "Speech synthesis canceled: " +
                result.errorDetails
            )
          );
        }

        synthesizer.close();
      },
      (error) => {
        synthesizer.close();
        reject(error);
      }
    );
  });
};