import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizes = {
    sm: { text: "text-2xl", subtext: "text-[8px]" },
    md: { text: "text-3xl", subtext: "text-[10px]" },
    lg: { text: "text-4xl", subtext: "text-xs" },
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        className={`relative flex items-center justify-center ${sizes[size].text}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span 
          className="font-bold text-slate-900"
          style={{
            fontFamily: "'STIX Two Math', serif",
            fontWeight: 600,
            lineHeight: 1
          }}
        >
          𝒯 ⊂ ℒ
        </span>
      </motion.div>
      <div className={`mt-1 font-mono font-bold tracking-widest text-gray-600 ${sizes[size].subtext}`}>
        TEAM INSIDE AI LAB
      </div>
    </div>
  );
};

export default Logo;
