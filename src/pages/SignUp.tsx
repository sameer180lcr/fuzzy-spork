import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import ZeroXLogo from "@/components/ZeroXLogo";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", name);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to="/" className="block mb-8">
                    <ZeroXLogo size="lg" />
                </Link>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
                <p className="text-gray-500 mb-8">Start your free trial</p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full h-12 rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full h-12 rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-12 rounded-lg border border-gray-200 bg-white pl-12 pr-12 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600" />
                        <span className="text-sm text-gray-500">I agree to the <button type="button" className="text-blue-600 hover:underline">Terms</button> and <button type="button" className="text-blue-600 hover:underline">Privacy Policy</button></span>
                    </div>

                    <Button type="submit" className="w-full h-12 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
                        Create account
                    </Button>
                </form>

                <p className="mt-6 text-center text-gray-500">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
