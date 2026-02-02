import { ScrollArea } from "../ui/scroll-area";
import { Message } from "./Message";

export function MessageList() {
  const messageMockup = {
    id: "1",
    content:
      "Saepe sit vel iste id est doloribus. Fugiat aliquid repellendus rerum blanditiis sunt sunt fugiat et. Possimus et qui autem harum molestiae architecto doloribus. Atque ut rem. Aut facilis placeat velit ratione et harum. Aut at animi nemo explicabo eum sunt dolorem voluptatum. Saepe dolorum in illum voluptatem. Consequuntur tempora ut odio rerum sit neque voluptatem consectetur.",
    timestamp: new Date(),
  };

  return (
    <>
      <ScrollArea className="h-full px-4 py-6">
        <ul className="space-y-4">
          <li>
            <Message
              id={messageMockup.id}
              role="user"
              content={messageMockup.content}
              timestamp={messageMockup.timestamp}
            />
          </li>
          <li>
            <Message
              id={messageMockup.id}
              role="assistant"
              content={messageMockup.content}
              timestamp={messageMockup.timestamp}
            />
          </li>
          <li>
            <Message
              id={messageMockup.id}
              role="user"
              content={messageMockup.content}
              timestamp={messageMockup.timestamp}
            />
          </li>
          <li>
            <Message
              id={messageMockup.id}
              role="assistant"
              content={messageMockup.content}
              timestamp={messageMockup.timestamp}
            />
          </li>
        </ul>
      </ScrollArea>
    </>
  );
}

//TODO:
// Pobieranie messages z useChatStore
// Mapowaanie tablicy Message
// ScrollArea (scrollowanie wiadomości)
// Obsługa pustej listy
