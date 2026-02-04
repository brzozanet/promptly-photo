import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function ChatInput() {
  return (
    <>
      <div className="p-4 flex gap-2">
        <Textarea
          className="min-h-20 resize-none backdrop-blur text-white"
          placeholder="Zapytaj o cokolwiek związanego z fotografią..."
        />
        <Button className="self-end bg-blue-500 shadow-lg shadow-blue-500/50 px-4 py-2 rounded-md">
          Wyślij
        </Button>
      </div>
    </>
  );
}

//TODO:
// Textarea (z shadcn/ui)
// Button  (z shadcn/ui)
// Stan lokalny (useState) dla input value
// Handler onSubmit (wysyłanie wiadomości)
