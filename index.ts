import xlsx from "xlsx";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
  apiKey: Bun.env.GEMINI_API_KEY,
  model: "gemini-pro-latest",
  baseUrl: "https://ne-phishing.ru",
});

let _ = xlsx.readFile("Караман_Александр_Игоревич_8145153869.xlsx");

let input_data = xlsx.utils.sheet_to_csv(
  _.Sheets["Лог баланса ClickHouse online"]!,
);

console.log(
  await llm
    .invoke([
      new SystemMessage(`
        ты вступаешь в роль аналитика финансов. тебе пользователь отправил csv своего ддс, дай краткую выжимку и подсчет данных. не лей воду в диалог, отвечай сухо и кратко
  `),
      new HumanMessage(input_data),
      new HumanMessage(
        `за какой период было больше всего переводов на номер телефона `,
      ),
    ])
    .then((e) => e.content),
);
