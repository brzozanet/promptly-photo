// // Placeholder na integrację z backendem w Sprint 2

// export interface ChatRequest {
//   message: string;
//   previousResponseId?: string;
// }

// export interface ChatResponse {
//   id: string;
//   message: string;
//   timestamp: string;
// }

// export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
//   // TODO: Sprint 2 - Integracja z backend API
//   // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
//   //   method: 'POST',
//   //   headers: { 'Content-Type': 'application/json' },
//   //   body: JSON.stringify(request),
//   // });
//   // return response.json();

//   // Mockowanie na razie
//   return {
//     id: Date.now().toString(),
//     message: `[TODO] Rzeczywista odpowiedź z AI`,
//     timestamp: new Date().toISOString(),
//   };
// }
