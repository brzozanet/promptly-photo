import type { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import iconPromptly from "../../assets/icon-promptly.svg";
import iconClock8 from "../../assets/icon-clock8.svg";
import iconUser from "../../assets/icon-user.svg";

export function Message({ role, content, timestamp }: Message) {
  const isUser = role === "user";
  const avatar = isUser ? iconUser : iconPromptly;

  return (
    <div
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <img
          src={avatar}
          alt="assistant"
          title="assistant"
          className="h-8 w-8 rounded-full invert"
        />
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
          isUser
            ? "bg-linear-to-r from-gray-600 via-gray-650 to-gray-600 text-primary-foreground"
            : "bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-foreground"
        }`}
      >
        <div className="text-left text-[16px] mb-3">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-3">{children}</p>,
              strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-bold mt-3 mb-1">{children}</h3>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1 mb-3">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              a: ({ children }) => (
                <a
                  className="text-cyan-300 font-bold underline cursor-pointer"
                  href="https://fotowarsztaty.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  {children}
                </a>
              ),

              hr: ({ children }) => (
                <hr className="border-sky-500">{children}</hr>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={iconClock8}
            alt="timestamp"
            title="timestamp"
            className={`h-4 ${isUser && "invert"}`}
          />
          <p className="text-[11px] whitespace-pre-wrap text-left">
            {timestamp}
          </p>
        </div>
      </div>
      {isUser && (
        <img
          src={avatar}
          alt="user"
          title="user"
          className="h-8 w-8 rounded-full invert"
        />
      )}
    </div>
  );
}
