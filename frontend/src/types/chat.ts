export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface ChatRequest {
  message: string;
  previousResponseId?: string;
}

export interface ChatResponse {
  id: string; // to be used as previousResponseId
  message: string;
  timestamp: string;
}
