import { Link } from "react-router-dom";
import ZeroXLogo from "./ZeroXLogo";
import { Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-10 px-6 bg-white border-t border-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ZeroXLogo size="sm" />
            <span className="text-sm text-gray-400">© 2025 ZeroX</span>
          </div>

          <nav className="flex items-center gap-8">
            <Link to="#" className="text-sm text-gray-400 hover:text-gray-900">Privacy</Link>
            <Link to="#" className="text-sm text-gray-400 hover:text-gray-900">Terms</Link>
            <Link to="#" className="text-sm text-gray-400 hover:text-gray-900">Docs</Link>
            <Link to="#" className="text-sm text-gray-400 hover:text-gray-900">Contact</Link>
          </nav>

          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
