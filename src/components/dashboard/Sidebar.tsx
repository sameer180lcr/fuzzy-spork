import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Home,
  Users,
  DollarSign,
  User,
  MessageCircle,
  Settings,
  Brain,
} from "lucide-react";

const navItems = [
  { icon: Search, label: "Explore", href: "/dashboard/explore" },
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: DollarSign, label: "Earnings", href: "/dashboard/earnings" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

// Animated X Logo
const AnimatedXLogo = () => (
  <motion.svg viewBox="0 0 40 40" className="w-9 h-9">
    <motion.path
      d="M10 10 L30 30"
      stroke="url(#sidebarGrad)"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
    <motion.path
      d="M30 10 L10 30"
      stroke="url(#sidebarGrad)"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
    />
    <motion.circle
      cx="30"
      cy="10"
      r="3"
      fill="#3B82F6"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
    />
    <defs>
      <linearGradient id="sidebarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
  </motion.svg>
);

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-100 flex flex-col">
      {/* Animated X Logo */}
      <div className="h-14 flex items-center justify-center border-b border-gray-50">
        <NavLink to="/">
          <AnimatedXLogo />
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                end={item.href === "/dashboard"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group relative mx-auto",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 font-medium">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom icons */}
      <div className="py-4 px-2 space-y-1">
        <NavLink
          to="/dashboard/messages"
          className="flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 mx-auto"
        >
          <MessageCircle className="w-5 h-5" />
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className="flex items-center justify-center w-12 h-12 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 mx-auto"
        >
          <Settings className="w-5 h-5" />
        </NavLink>
      </div>

      {/* Avatar */}
      <div className="py-4 px-2 flex justify-center border-t border-gray-100">
        <NavLink to="/dashboard/profile" className="w-9 h-9 rounded-full overflow-hidden">
          <div className="w-full h-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {(localStorage.getItem("userName") || "U").charAt(0).toUpperCase()}
            </span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
