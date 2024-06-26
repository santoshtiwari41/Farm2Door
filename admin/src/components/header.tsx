import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden md:block">
          <Link to={"/"} target="_blank">
            <div className="flex items-center gap-2 ml-4">
              <img
                src="/logo.jpeg"
                alt="logo"
                className="h-10 w-10 rounded-lg"
              />
              <h2 className="text-purple-900 text-xl">Farm2Door</h2>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2"></div>
      </nav>
    </div>
  );
}
