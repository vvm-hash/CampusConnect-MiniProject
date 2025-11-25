import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "@env";

if (!GEMINI_API_KEY) {
  console.warn("⚠️ Missing Gemini API key in .env");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function askGemini(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",   // FAST + FREE
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (err) {
    console.log("Gemini error:", err);
    return "Error connecting to AI server.";
  }
}
