import { Router, Request, Response } from "express";
import { ChatRequest, ChatResponse, ErrorResponse } from "../types/chat";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// NOTE: Konfiguracja OpenAI Client

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL;
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

// NOTE: POST /api/chat - główny endpoint czatu

export const chatRouter = Router();

chatRouter.post("/", async (request: Request, response: Response) => {
  try {
    const { message, previousResponseId }: ChatRequest = request.body;

    if (!message || message.trim() === "") {
      return response
        .status(400)
        .json({ error: "Message is required" } as ErrorResponse);
    }

    const chatRequest = await client.responses.create({
      model: MODEL,
      previous_response_id: previousResponseId,
      input: [
        {
          role: "user",
          content: message,
        },
        {
          role: "system",
          content: `${SYSTEM_PROMPT}`,
        },
      ],
    });

    const chatResponse: ChatResponse = {
      id: chatRequest.id,
      message: chatRequest.output_text,
      timestamp: new Date().toISOString(),
    };

    response.send(chatResponse);
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Server crashed succesfully 😵‍💫" } as ErrorResponse);
  }
});

// TODO: Error handling

//   } catch (error: any) {
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
