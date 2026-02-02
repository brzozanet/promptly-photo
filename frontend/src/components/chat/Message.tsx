import type { Message as MessageType } from "@/types/chat";
import iconAssitant from "../../assets/icon-assistant.svg";
import iconPromptly from "../../assets/icon-promptly.svg";
import iconUser from "../../assets/icon-user.svg";

export function Message({ id, role, content, timestamp }: MessageType) {
  return (
    <>
      <div>
        <div>{role}</div>
        <div>
          <p>
            {id}
            {content}
          </p>
          <p>{timestamp}</p>
        </div>
      </div>
    </>
  );
}
