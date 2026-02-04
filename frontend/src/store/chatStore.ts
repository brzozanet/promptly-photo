import type { ChatState } from "@/types/chat";
import { create } from "zustand";

export const useChatStore = create<ChatState>()((set) => ({
  messages: [
    {
      id: "cum-itaque-iste",
      role: "user",
      content:
        "Odio tempore vel a. Quidem sit impedit distinctio. Voluptate qui expedita est illo omnis alias harum facere. Vel tempore distinctio eum dolorem ut. Optio qui quia illo illo amet.",
      timestamp: new Date(),
    },
    {
      id: "iure-dignissimos-aut",
      role: "assistant",
      content:
        "Eius voluptas explicabo explicabo est aliquam. Aspernatur ratione dolorem et veritatis sequi eius eius quia mollitia. Sed ipsum aut. Quo maxime laborum cupiditate repellendus minima sint nemo eum libero. Odit porro minus harum iste eaque necessitatibus distinctio. Repellendus vitae dolorem debitis consequuntur omnis necessitatibus.",
      timestamp: new Date(),
    },
    {
      id: "est-saepe-velit",
      role: "user",
      content:
        "Sint quas neque distinctio quibusdam iure ea. Ea repudiandae similique voluptatem earum velit aut voluptates quibusdam. Veniam sunt officiis est laudantium. Tenetur recusandae nulla et.",
      timestamp: new Date(),
    },
    {
      id: "nam-impedit-velit",
      role: "assistant",
      content:
        "Quia nobis eius est modi. Et nobis numquam qui voluptas est eum repellendus. Et a distinctio in.",
      timestamp: new Date(),
    },
    {
      id: "laboriosam-mollitia-explicabo",
      role: "user",
      content:
        "Possimus molestiae autem voluptas consequatur eos blanditiis sequi laudantium. Voluptas voluptatibus laudantium quibusdam accusantium. Vitae odit fugiat hic iste est fuga. Facere quia qui.",
      timestamp: new Date(),
    },
    {
      id: "excepturi-aut-aut",
      role: "assistant",
      content:
        "Voluptatum iusto corrupti velit perferendis dolorem labore nesciunt dolores. Repudiandae aliquam aut. Aspernatur autem temporibus temporibus adipisci qui.",
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  error: null,

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  clearMessages: () => set({ messages: [], error: null }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error: error }),
}));
