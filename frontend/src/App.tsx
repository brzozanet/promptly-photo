import { Spinner } from "@/components/ui/spinner";
import fotowarsztatyLogo from "./assets/fotowarsztaty.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <img src={fotowarsztatyLogo} alt="Fotowarsztaty" width="140" />
        <h1>promptly photo AI</h1>
        <h3>AI Photography Assistant built with OpenAI API</h3>
        <Spinner className="size-16" />
      </div>
    </>
  );
}

export default App;
