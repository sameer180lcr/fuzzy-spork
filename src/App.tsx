import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, Component, ReactNode } from "react";
import { Toaster } from "./components/ui/toaster";

// Lazy load pages for better initial load performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Explore = lazy(() => import("./pages/Explore"));
const Earnings = lazy(() => import("./pages/Earnings"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const ApplicationProcess = lazy(() => import("./pages/ApplicationProcess"));
const ExpertInterview = lazy(() => import("./pages/ExpertInterview"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const NewListing = lazy(() => import("./pages/NewListing"));
const Verification = lazy(() => import("./pages/Verification"));
const TestSupabase = lazy(() => import("./components/TestSupabase"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">Loading...</p>
        </div>
    </div>
);

// Error Boundary to prevent crashes
interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("App Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center p-8 max-w-md">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
                        <p className="text-gray-500 mb-4">We encountered an unexpected error. Please refresh the page.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <div className="min-h-screen bg-background">
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Index />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />

                            {/* Dashboard Routes */}
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard/explore" element={<Explore />} />
                            <Route path="/dashboard/earnings" element={<Earnings />} />
                            <Route path="/dashboard/profile" element={<Profile />} />
                            <Route path="/dashboard/jobs/:id" element={<JobDetail />} />
                            <Route path="/dashboard/application/:id" element={<ApplicationProcess />} />
                            <Route path="/expert-interview" element={<ExpertInterview />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/new-listing" element={<NewListing />} />
                            <Route path="/verification" element={<Verification />} />
                            <Route path="/test-supabase" element={<TestSupabase />} />
                        </Routes>
                    </Suspense>
                    <Toaster />
                </div>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
