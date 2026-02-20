import type { ChatState } from "@/types/chat";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      error: null,

      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),

      clearMessages: () => set({ messages: [], error: null }),

      setIsLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error: error }),
    }),
    { name: "promptly-chat-storage" },
  ),
);
