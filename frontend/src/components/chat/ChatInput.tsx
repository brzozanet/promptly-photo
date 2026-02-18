import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useChatStore } from "@/store/chatStore";
import { nanoid } from "nanoid";
import { askAI } from "@/services/chatService";

export function ChatInput() {
  const [input, setInput] = useState<string>("");
  const { addMessage } = useChatStore();
  const messages = useChatStore((state) => state.messages);
  // const randomText = loremIpsum({ count: 7, units: "sentences" });
  const isLoading = false;

  const sendPrompt = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    addMessage({
      id: nanoid(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    });
    setInput("");

    const lastAssistantMessage = messages
      .filter((message) => message.role === "assistant")
      .at(-1);

    try {
      const { id, message, timestamp } = await askAI(
        input,
        lastAssistantMessage?.id,
      );
      addMessage({ id, role: "assistant", content: message, timestamp });
    } catch (error) {
      console.error("[ChatInput] błąd:", error);
      throw new Error(
        "Nie można połączyć z serwerem. Sprawdź czy backend działa.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // NOTE: inactive after integration with OpenAI API
  // const fakeAssistantReply = () => {
  //   setTimeout(() => {
  //     addMessage({
  //       id: nanoid(),
  //       role: "assistant",
  //       content: randomText,
  //       timestamp: new Date().toISOString(),
  //     });
  //   }, 2000);
  // };

  // NOTE: unnecessary, functionality too strict
  // const lastUserMessage = messages
  //   .filter((message) => message.role === "user")
  //   .at(-1);
  // const isDuplicate = input.trim() === lastUserMessage?.content;

  const isInputValid =
    input.trim().length >= 3 && input.trim().length <= 5000 && !isLoading;

  return (
    <>
      <form className="p-4 flex gap-2" onSubmit={sendPrompt}>
        <Textarea
          className="min-h-30 resize-none backdrop-blur text-white text-lg! md:text-lg! placeholder:text-lg"
          placeholder="Pytaj o fotografię... (Shift+Enter = nowa linia)"
          disabled={isLoading}
          value={input}
          onChange={(event) => setInput(event?.target.value)}
        />
        <Button
          className="w-24 bg-blue-500 shadow-lg shadow-black-500/50 hover:bg-emerald-500 disabled:opacity-50 px-4 py-2 rounded-md font-bold self-end cursor-pointer disabled:cursor-not-allowed"
          disabled={!isInputValid}
          type="submit"
        >
          {isLoading ? "Czekam..." : "Wyślij"}
        </Button>
      </form>
    </>
  );
}

// TODO: send by Enter hit
