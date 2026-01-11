import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./ZeroXLogo";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/">
          <Logo size="md" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-500 hover:text-gray-900">Features</a>
          <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900">How it works</a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
            Sign in
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg"
            onClick={() => navigate("/verification")}
          >
            New Listing
          </Button>
          <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg" onClick={() => navigate("/signup")}>
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
