import xlsx from "xlsx";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PDFParse } from "pdf-parse";
const llm = new ChatGoogleGenerativeAI({
  apiKey: Bun.env.GEMINI_API_KEY,
  model: "gemini-pro-latest",
  baseUrl: "https://ne-phishing.ru",
});
let _ = xlsx.readFile("Караман_Александр_Игоревич_8145153869.xlsx");

let input_data = xlsx.utils.sheet_to_csv(
  _.Sheets["Лог баланса ClickHouse online"]!,
);

const pdf = new PDFParse({
  data: await Bun.file("Караман Александр Игоревич итог.pdf").bytes(),
});

console.log(
  await llm
    .invoke([
      new SystemMessage(`
        ты вступаешь в роль аналитика финансов. тебе пользователь отправил csv своего ддс, дай краткую выжимку и подсчет данных. не лей воду в диалог, отвечай сухо и кратко
  `),
      new HumanMessage(
        "это наш файл Справка с изменением доступного остатка по договору" +
          (await pdf.getText()).text,
      ),
      new HumanMessage("это наш ддс" + input_data),
      new HumanMessage(`дай краткую сводку`),
    ])
    .then((e) => e.content),
);
