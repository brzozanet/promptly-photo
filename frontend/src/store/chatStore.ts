import type { ChatState } from "@/types/chat";
import { create } from "zustand";

export const useChatStore = create<ChatState>()((set) => ({
  messages: [],
  isLoading: false,
  error: null,

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  clearMessages: () => set({ messages: [], error: null }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error: error }),
}));
