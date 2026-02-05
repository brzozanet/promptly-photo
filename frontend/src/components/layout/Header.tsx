import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useChatStore } from "@/store/chatStore";
import iconPromptly from "../../assets/icon-promptly.svg";

export function Header() {
  const { clearMessages } = useChatStore();
  const messages = useChatStore((store) => store.messages);
  const handleNewChatButtonClick = () => {
    clearMessages();
  };

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-80% px-6 py-4 w-full shadow-2xl">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex flex-row gap-3 items-center text-xl font-bold">
          <img
            src={iconPromptly}
            alt="Promptly"
            title="Promptly"
            className="h-10"
          />
          <div>Promptly Photo AI</div>
        </div>
        <nav>
          <ul className="flex flex-row gap-6 items-center font-bold">
            {messages.length !== 0 ? (
              <li>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-blue-500 shadow-lg shadow-black-500/50 hover:bg-emerald-600 disabled:opacity-50 px-6 py-4 rounded-md font-bold self-end cursor-pointer disabled:cursor-not-allowed">
                      Nowa rozmowa
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Czy na pewno?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Rozpoczęcie nowej rozmowy spowoduje nieodwracalne
                        usunięcie aktualnej. Historia rozmów będzie dostępna w
                        kolejnej wersji aplikacji 😀
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Wróć do aktualnej rozmowy
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleNewChatButtonClick}>
                        Tak, zacznij nową rozmowę
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            ) : (
              ""
            )}
            <li>
              <NavLink to="#">O projekcie</NavLink>
            </li>
            <li>
              <NavLink to="#">Jak to działa?</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
