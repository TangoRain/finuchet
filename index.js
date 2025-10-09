import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
  apiKey: Bun.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash-lite",
  baseUrl: "https://ne-phishing.ru",
});

console.log(await llm.invoke("тест").then((e) => e.content));
