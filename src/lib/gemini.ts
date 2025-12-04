import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
    console.warn("Missing VITE_GOOGLE_GENERATIVE_AI_API_KEY environment variable");
}

export const genAI = new GoogleGenerativeAI(apiKey || "");
