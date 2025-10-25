import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PDFParse } from "pdf-parse";
const llm = new ChatGoogleGenerativeAI({
  apiKey: Bun.env.GEMINI_API_KEY,
  model: "gemini-pro-latest",
  baseUrl: "https://ne-phishing.ru",
});

const pdf = new PDFParse({
  data: await Bun.file("Караман Александр Игоревич итог.pdf").bytes(),
});

console.log(
  await llm
    .invoke([
      new SystemMessage(`
        ты вступаешь в роль аналитика финансов. тебе пользователь отправил csv своего ддс, дай краткую выжимку и подсчет данных. не лей воду в диалог, отвечай сухо и кратко
  `),
      new HumanMessage((await pdf.getText()).text),
      new HumanMessage(`дай краткую сводку`),
    ])
    .then((e) => e.content),
);
