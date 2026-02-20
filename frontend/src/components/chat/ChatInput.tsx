import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useChatStore } from "@/store/chatStore";
import { nanoid } from "nanoid";
import { askAI } from "@/services/chatService";
import { ThreeCircles } from "react-loader-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
// import { Spinner } from "@/components/ui/spinner";

export function ChatInput() {
  const [input, setInput] = useState<string>("");
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);
  const error = useChatStore((state) => state.error);
  const { addMessage, setIsLoading, setError } = useChatStore();

  const sendPrompt = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
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
      setIsLoading(true);
      const { id, message, timestamp } = await askAI(
        input,
        lastAssistantMessage?.id,
      );
      addMessage({ id, role: "assistant", content: message, timestamp });
    } catch (error) {
      setError(true);
      console.error("[ChatInput] błąd:", error);
      throw new Error(
        "Nie można połączyć z serwerem. Sprawdź czy asasa działa.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  console.log(error);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      sendPrompt(event as unknown as React.SubmitEvent<HTMLFormElement>);
    }
  };

  // NOTE: inactive after integration with OpenAI API
  // const randomText = loremIpsum({ count: 7, units: "sentences" });
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
      {error ? (
        <div className="flex justify-center items-center py-4">
          {" "}
          <Alert variant="destructive" className="max-w-md text-left px-6 py-6">
            <AlertCircleIcon />
            <AlertTitle>Chwila przerwy w transmisji 🤖</AlertTitle>
            <AlertDescription>
              Serwer postanowił zrobić sobie przerwę i pójść na szybką sesję
              zdjęciową. Już go wołamy z powrotem. Odśwież stronę lub spróbuj
              ponownie za moment.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        ""
      )}
      {/* {isLoading && (
        <div className="flex w-fit items-center gap-4">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      )} */}
      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <ThreeCircles
            visible={true}
            height="120"
            width="120"
            color="#4fa94d"
            outerCircleColor="#10B981"
            middleCircleColor="#0EA5E9"
            innerCircleColor="#6366F1"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <form className="p-4 flex gap-2" onSubmit={sendPrompt}>
        <Textarea
          className="min-h-30 resize-none backdrop-blur text-white text-lg! md:text-lg! placeholder:text-lg"
          placeholder="Pytaj o fotografię... (Shift+Enter = nowa linia)"
          disabled={isLoading}
          value={input}
          onChange={(event) => setInput(event?.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="w-24 bg-blue-500 shadow-lg shadow-black-500/50 hover:bg-emerald-500 disabled:opacity-50 px-4 py-2 rounded-md font-bold self-end cursor-pointer disabled:cursor-not-allowed"
          disabled={!isInputValid}
          type="submit"
        >
          {isLoading ? "Czekaj" : "Wyślij"}
        </Button>
      </form>
    </>
  );
}
