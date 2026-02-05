import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import bgImage from "../../assets/bg-photo-dark.jpg";

export function Layout() {
  return (
    <div
      className="flex h-screen flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
