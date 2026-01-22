import { GoogleGenAI, Type } from "@google/genai";
import { GeminiInsightData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getRetirementInsight = async (
  retirementYear: number, 
  isRetired: boolean
): Promise<GeminiInsightData> => {
  
  const model = "gemini-3-flash-preview";
  
  let prompt = "";
  if (isRetired) {
    prompt = `I retired in or before ${retirementYear}. Generate a short, congratulatory message about enjoying retirement and a fun fact about history from around that year.`;
  } else {
    prompt = `I will retire in the year ${retirementYear}. 
    1. Provide a short, optimistic, sci-fi style prediction about what technology or daily life might be like in ${retirementYear}.
    2. Provide a short motivational quote about career endurance and looking forward to the future.`;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prediction: {
              type: Type.STRING,
              description: "The prediction about the future year or history fact.",
            },
            motivation: {
              type: Type.STRING,
              description: "The motivational quote or congratulatory message.",
            },
          },
          required: ["prediction", "motivation"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }
    return JSON.parse(text) as GeminiInsightData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      prediction: "The future is unwritten, but it looks bright!",
      motivation: "Keep moving forward."
    };
  }
};