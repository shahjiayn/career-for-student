import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getCareerAdvice(quizResults: Record<string, number>, userInterests: string) {
  const model = ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: [
      {
        role: "user",
        parts: [{
          text: `My quiz scores are: ${JSON.stringify(quizResults)}. My additional interests are: ${userInterests}. Please suggest the best career paths for me in India.`
        }]
      }
    ],
    config: {
      systemInstruction: "You are an expert career counselor for Indian students in Class 10. Based on their quiz scores and interests, provide a detailed, encouraging, and practical career roadmap. Include specific streams, entrance exams, and top Indian colleges.",
    }
  });

  const response = await model;
  return response.text;
}
