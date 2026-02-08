import { Router, Request, Response } from "express";
import { ChatRequest, ChatResponse, ErrorResponse } from "../types/chat";
import OpenAI from "openai";
import dotenv from "dotenv";

// TODO: delete after integration with index
dotenv.config();

console.log("chat.ts running...");

const router = Router();

const client = new OpenAI();

const response = await client.responses.create({
  model: process.env.OPENAI_MODEL,
  input:
    "Test łączenia z API OpenAI, odpisz czy response dotarł i czy działa. Odpisz w języku polskim, w gwarze śląskiej, w żartobliwym stylu",
});

console.log(response.output_text);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { Router, Request, Response } from "express";
// import { ChatRequest, ChatResponse, ErrorResponse } from "../types/chat";
// import OpenAI from "openai";

// const router = Router();

// // NOTE: Konfiguracja OpenAI Client

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const MODEL = process.env.OPENAI_MODEL;
// const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

// // ═══════════════════════════════════════════════════════════
// // POST /api/chat - główny endpoint czatu
// // ═══════════════════════════════════════════════════════════

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     // 1. Odczytaj dane z request body
//     const { message, previousResponseId }: ChatRequest = req.body;

//     // 2. Walidacja - sprawdź czy wiadomość istnieje
//     if (!message || message.trim() === "") {
//       return res.status(400).json({
//         error: "Message is required",
//       } as ErrorResponse);
//     }

//     console.log(`📩 Otrzymano wiadomość: "${message}"`);
//     if (previousResponseId) {
//       console.log(`🔗 Historia: previous_response_id = ${previousResponseId}`);
//     }

//     // 3. Wywołanie OpenAI Responses API
//     const response = await openai.responses.create({
//       model: MODEL,
//       // Używamy modifiedInput zamiast input, aby dodać system prompt
//       modifiedInput: [
//         {
//           role: "system",
//           content: SYSTEM_PROMPT,
//         },
//         {
//           role: "user",
//           content: message,
//         },
//       ],
//       // Historia rozmowy - klucz do kontekstu (jak w example.ts)
//       previous_response_id: previousResponseId || undefined,
//     });

//     // 4. Wyciągnij odpowiedź z OpenAI
//     const aiMessage =
//       response.output_text ||
//       response.output?.[0]?.content ||
//       "Brak odpowiedzi";

//     console.log(`✅ Odpowiedź AI: "${aiMessage.substring(0, 50)}..."`);

//     // 5. Zwróć odpowiedź do frontendu
//     const chatResponse: ChatResponse = {
//       id: response.id,
//       message: aiMessage,
//       timestamp: new Date().toISOString(),
//     };

//     return res.status(200).json(chatResponse);
//   } catch (error: any) {
//     // ═══════════════════════════════════════════════════════════
//     // Error Handling - obsługa błędów
//     // ═══════════════════════════════════════════════════════════

//     console.error("❌ Błąd OpenAI API:", error);

//     // Różne typy błędów OpenAI
//     if (error.status === 401) {
//       return res.status(401).json({
//         error: "Invalid OpenAI API key",
//         details: "Check OPENAI_API_KEY in .env",
//       } as ErrorResponse);
//     }

//     if (error.status === 429) {
//       return res.status(429).json({
//         error: "Rate limit exceeded",
//         details: "Too many requests. Try again later.",
//       } as ErrorResponse);
//     }

//     if (error.status === 500) {
//       return res.status(500).json({
//         error: "OpenAI server error",
//         details: "OpenAI API is temporarily unavailable",
//       } as ErrorResponse);
//     }

//     // Ogólny błąd
//     return res.status(500).json({
//       error: "Failed to process chat request",
//       details: error.message,
//     } as ErrorResponse);
//   }
// });

// // ═══════════════════════════════════════════════════════════
// // Eksport routera
// // ═══════════════════════════════════════════════════════════

// export default router;
