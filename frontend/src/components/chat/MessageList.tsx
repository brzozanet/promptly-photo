// import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef } from "react";
import { Message } from "./Message";

export function MessageList() {
  const messageMockup = {
    id: "1",
    content: `Saepe sit vel iste id est doloribus. Fugiat aliquid repellendus rerum blanditiis sunt sunt fugiat et. Possimus et qui autem harum molestiae architecto doloribus. Atque ut rem. Aut facilis placeat velit ratione et harum. Aut at animi nemo explicabo eum sunt dolorem voluptatum. Saepe dolorum in illum voluptatem. Consequuntur tempora ut odio rerum sit neque voluptatem consectetur.`,
    timestamp: "Tue Feb 03 2026 18:18:53",
  };

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [
      // TODO: tutaj dolecowo [messages]
    ],
  );

  return (
    <>
      <h2 className="text-white text-2xl text-left mb-6">
        Saepe sit vel iste id est doloribus...
      </h2>
      <ul className="space-y-4 px-4 mb-12">
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
      <div ref={endRef} />
    </>
  );
}
