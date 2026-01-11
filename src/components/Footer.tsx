import { Link } from "react-router-dom";
import ZeroXLogo from "./ZeroXLogo";
import { Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="container mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-12">
          <div>
            <div className="flex items-center gap-2">
              <ZeroXLogo size="sm" />
              <span className="text-sm text-slate-500">© 2025</span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-slate-600">
              AI talent infrastructure for labs and teams—source, screen, and hire top experts with speed and confidence.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-900"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-900"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <div className="text-[12px] font-semibold text-slate-900">Product</div>
              <div className="mt-4 grid gap-3">
                <Link to="/" className="text-[13px] text-slate-600 hover:text-slate-900">Overview</Link>
                <Link to="/explore" className="text-[13px] text-slate-600 hover:text-slate-900">Explore</Link>
                <Link to="/dashboard" className="text-[13px] text-slate-600 hover:text-slate-900">Dashboard</Link>
              </div>
            </div>

            <div>
              <div className="text-[12px] font-semibold text-slate-900">Company</div>
              <div className="mt-4 grid gap-3">
                <Link to="/blog" className="text-[13px] text-slate-600 hover:text-slate-900">Blog</Link>
                <Link to="/privacy-policy" className="text-[13px] text-slate-600 hover:text-slate-900">Privacy policy</Link>
                <Link to="/terms-and-conditions" className="text-[13px] text-slate-600 hover:text-slate-900">Terms</Link>
              </div>
            </div>

            <div>
              <div className="text-[12px] font-semibold text-slate-900">Get started</div>
              <div className="mt-4 grid gap-3">
                <Link to="/signup" className="text-[13px] text-slate-600 hover:text-slate-900">Request access</Link>
                <Link to="/login" className="text-[13px] text-slate-600 hover:text-slate-900">Sign in</Link>
                <Link to="/contact" className="text-[13px] text-slate-600 hover:text-slate-900">Contact sales</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="text-[12px] text-slate-500">Built for modern AI hiring workflows.</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="text-[12px] text-slate-500 hover:text-slate-900">Privacy</Link>
            <Link to="/terms-and-conditions" className="text-[12px] text-slate-500 hover:text-slate-900">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
