export function Footer() {
  return (
    <>
      <footer className="text-center bg-gray-600/30 py-4">
        <p className="text-neutral-500">
          Asystent AI może popełniać błędy. Sprawdź ważne informacje.
        </p>
        <p className="text-white">
          Made with ❤️ by{" "}
          <a
            className="text-cyan-300 font-bold cursor-pointer"
            href="https://brzoza.net"
            target="_blank"
            rel="noreferrer"
          >
            brzoza.net
          </a>
        </p>
      </footer>
    </>
  );
}
