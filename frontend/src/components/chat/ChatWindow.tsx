import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";

export function ChatWindow() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col">
      <MessageList />
      <div className="sticky">
        qwerty
        <ChatInput />
        asdfg
      </div>
    </div>
  );
}
