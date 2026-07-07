import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing VITE_GEMINI_API_KEY. Add it to your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Load the Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // gemini-1.5-pro is not supported on v1beta; use gemini-2.0-flash or another supported model
});

// Generation config
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

export async function generateResponse(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);

    const message = error?.message || String(error);
    if (message.includes("quota") || message.includes("429")) {
      throw new Error(
        "Gemini quota exceeded. Enable billing or use a different Google Cloud project/API key."
      );
    }

    throw new Error(message || "Failed to get response from Zyra's brain.");
  }
}


// export default run();
export default generateResponse;