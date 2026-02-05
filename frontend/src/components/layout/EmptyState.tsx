import { Typewriter } from "react-simple-typewriter";
import { ChatInput } from "../chat/ChatInput";

export function EmptyState() {
  return (
    <div className="mx-auto flex min-h-[calc(90vh-260px)] w-full max-w-5xl flex-col justify-center">
      <h1 className="text-3xl ml-4 text-white text-left mb-6 font-light">
        Porozmawiaj z{" "}
        <span className="bg-linear-to-r from-indigo-500 from-5% via-sky-500 via-15% to-emerald-500 to-80% bg-clip-text text-transparent font-semibold">
          Promptly
        </span>{" "}
        o fotografii
      </h1>
      <h2 className="text-5xl ml-4 bg-linear-to-r from-indigo-500 from-5% via-sky-500 via-15% to-emerald-500 to-80% bg-clip-text text-transparent text-left mb-6 font-medium">
        <span className="text-white">Jak </span>

        <Typewriter
          words={[
            "robić ostre zdjęcia?",
            "fotografować ludzi w plenerze?",
            "upiększyć zdjęcia z wakacji?",
            "uzyskać rozmyte tło na zdjęciu?",
            "poprawnie ustawić balans bieli?",
            "robić zdjęcia w ostrym słońcu?",
            "fotografować zwierzęta w ruchu?",
            "fotografować krajobraz?",
            "robić zdjęcia nocne?",
            "dbać o aparat zimą?",
            "używać statywu?",
            "ustawiać przysłonę do portretu?",
            "szukać inspiracji do zdjęć?",
            "robić zdjęcia z drona?",
            "przewozić aparat w samolocie?",
            "wybrać najlepszy obiektyw?",
            "czytać histogram?",
            "robić zdjęcia makro?",
          ]}
          typeSpeed={80}
          deleteSpeed={20}
          loop={true}
          cursor={true}
          cursorBlinking={true}
        />
      </h2>
      <div className="sticky">
        <ChatInput />
      </div>
    </div>
  );
}
