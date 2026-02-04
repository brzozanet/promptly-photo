import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function ChatInput() {
  const isLoading = false;

  //   const handleSend = () => {
  //     if (input.trim()) {
  //       onSend(input);
  //       setInput("");
  //     }
  //   };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     e.preventDefault();
  //     handleSend();
  //   }
  // };

  return (
    <>
      <div className="p-4 flex gap-2">
        <Textarea
          className="min-h-30 resize-none backdrop-blur text-white"
          placeholder="Pytaj o fotografię... (Shift+Enter = nowa linia)"
          disabled={isLoading}
        />
        <Button className="w-24 bg-blue-500 shadow-lg shadow-blue-500/50 px-4 py-2 rounded-md font-bold self-end">
          {isLoading ? "Czekam..." : "Wyślij"}
        </Button>
      </div>
    </>
  );
}
