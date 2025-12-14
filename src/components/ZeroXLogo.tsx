import { motion } from "framer-motion";

interface ZeroXLogoProps {
    size?: "sm" | "md" | "lg";
    showText?: boolean;
}

const ZeroXLogo = ({ size = "md", showText = true }: ZeroXLogoProps) => {
    const sizes = {
        sm: { icon: 28, text: "text-base" },
        md: { icon: 32, text: "text-lg" },
        lg: { icon: 40, text: "text-2xl" },
    };

    return (
        <div className="flex items-center gap-0.5">
            {showText && (
                <span className={`font-bold tracking-tight ${sizes[size].text} text-gray-900`}>
                    Zero
                </span>
            )}
            <motion.svg
                viewBox="0 0 40 40"
                width={sizes[size].icon}
                height={sizes[size].icon}
            >
                <motion.path
                    d="M10 10 L30 30"
                    stroke="url(#xGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.path
                    d="M30 10 L10 30"
                    stroke="url(#xGradient)"
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
                    <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                </defs>
            </motion.svg>
        </div>
    );
};

export default ZeroXLogo;
