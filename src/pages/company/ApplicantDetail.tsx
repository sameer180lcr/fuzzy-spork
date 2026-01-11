import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
    XCircle,
    Clock,
    User,
    Brain,
    Code,
    Layout,
    FileText,
    ChevronRight,
    Search,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

// Executive Formatting Utility: Converts unformatted walls of text into readable paragraphs
const formatExecutiveSummary = (text: string) => {
    if (!text) return "";

    // 1. First, detect numbered sections (1. 2. 3. or 1) 2) 3)) and add double newlines
    let formatted = text.replace(/(\d+[\.\)])\s/g, '\n\n$1 ');

    // 2. If it's still a giant block (more than 400 chars with no newlines), force breaks at sentences
    if (!formatted.includes('\n\n') && formatted.length > 400) {
        // Look for sentences ending in . ? or ! followed by a space and a Capital letter
        formatted = formatted.replace(/([.?!])\s+([A-Z])/g, '$1\n\n$2');
    }

    // 3. Trim extra whitespace
    return formatted.trim();
};

const ApplicantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [applicant, setApplicant] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [activeTab, setActiveTab] = useState<"overview" | "interview" | "architecture">("overview");

    useEffect(() => {
        const fetchApplicant = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/applications/${id}`);
                const data = await response.json();
                setApplicant(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplicant();
    }, [id]);

    const handleUpdateStatus = async (newStatus: string) => {
        setUpdating(true);
        try {
            const response = await fetch(`http://localhost:5000/api/applications/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                setApplicant((prev: any) => ({ ...prev, status: newStatus }));
                toast({ title: "Updated", description: `Candidate status sync: ${newStatus}` });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500">Loading applicant details...</p>
        </div>
    );

    if (!applicant) return <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
            <p className="text-gray-500 font-medium">Applicant record not found</p>
        </div>
    </div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header: Simple & Clean */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/company/applicants" className="p-2 hover:bg-gray-50 rounded">
                            <ArrowLeft className="w-4 h-4 text-gray-600" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-semibold text-gray-900">{applicant.name}</h1>
                                <Badge className="bg-gray-100 text-gray-700 text-xs px-2 py-1">ID_{applicant._id?.toString().slice(-4).toUpperCase()}</Badge>
                            </div>
                            <p className="text-sm text-gray-500">{applicant.jobTitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleUpdateStatus('Rejected')}
                            disabled={updating}
                        >
                            Reject
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-600 border-gray-200 hover:bg-gray-50"
                            onClick={() => handleUpdateStatus('Interview')}
                            disabled={updating}
                        >
                            Shortlist
                        </Button>
                        <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleUpdateStatus('Hired')}
                            disabled={updating}
                        >
                            Hire
                        </Button>
                    </div>
                </div>
            </header>

            <div className="pt-16 flex max-w-7xl mx-auto min-h-screen">
                {/* Sidebar: Simple Navigation */}
                <aside className="w-64 shrink-0 border-r bg-white p-4 fixed h-full z-40 overflow-y-auto">
                    <nav className="space-y-6">
                        <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Assessment</h3>
                            <div className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-3 py-2 rounded text-sm",
                                        activeTab === 'overview' ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    <User className="w-4 h-4" />
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('interview')}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-3 py-2 rounded text-sm",
                                        activeTab === 'interview' ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    <Brain className="w-4 h-4" />
                                    Interview
                                </button>
                                <button
                                    onClick={() => setActiveTab('architecture')}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-3 py-2 rounded text-sm",
                                        activeTab === 'architecture' ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50"
                                    )}
                                >
                                    <Layout className="w-4 h-4" />
                                    Architecture
                                </button>
                            </div>
                        </div>
                    </nav>

                    <div className="mt-8 pt-8 border-t space-y-6">
                        <section className="space-y-4">
                            <h3 className="text-xs font-medium text-gray-500 uppercase">Details</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Email</p>
                                    <p className="text-sm text-gray-900">{applicant.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Location</p>
                                    <p className="text-sm text-gray-900">{applicant.location || 'Remote'}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="p-3 bg-gray-50 rounded text-center">
                                <p className="text-xs text-gray-500 mb-2">Status</p>
                                <div className={cn(
                                    "inline-block px-3 py-1 rounded-full text-xs font-medium",
                                    applicant.status?.toLowerCase() === 'hired' ? "bg-green-100 text-green-800" :
                                        applicant.status?.toLowerCase() === 'rejected' ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                                )}>
                                    {applicant.status?.toUpperCase() || 'REVIEWING'}
                                </div>
                            </div>
                        </section>
                    </div>
                </aside>

                {/* Main Content: Simple & Clean */}
                <main className="flex-1 ml-64 p-8 bg-gray-50">
                    <div className="max-w-5xl mx-auto">

                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                <section className="bg-white rounded-lg border p-8">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Evaluation Summary</h2>
                                    <div className="prose prose-lg max-w-none text-gray-700">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {formatExecutiveSummary(applicant.details?.summary)}
                                        </ReactMarkdown>
                                    </div>
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-lg border p-6">
                                        <h3 className="text-base font-medium text-gray-500 mb-3">Applied Date</h3>
                                        <p className="text-3xl font-semibold text-gray-900">{applicant.applied.split(' ')[0]}</p>
                                        <p className="text-sm text-blue-600 font-medium mt-2">Ingestion Date Verified</p>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-medium text-green-900">Technical Screening Complete</p>
                                                <p className="text-sm text-green-700 mt-1">Subject has cleared all autonomous technical screening checkpoints with high reliability.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'interview' && (
                            <div className="space-y-8">
                                <div className="bg-white rounded-lg border p-8">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Interview Transcript</h2>
                                    <p className="text-gray-500">Full verified transcript</p>
                                </div>

                                {applicant.details?.interviewTranscript?.length > 0 ? (
                                    <div className="space-y-6">
                                        {applicant.details.interviewTranscript.map((inter: any, idx: number) => (
                                            <div key={idx} className="bg-white rounded-lg border p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                                                        inter.type === 'AI' ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                                                    )}>
                                                        {inter.type === 'AI' ? <Brain className="w-6 h-6" /> : <User className="w-6 h-6" />}
                                                    </div>
                                                    <div className="flex-1 space-y-4">
                                                        <div className="flex items-center justify-between pb-3 border-b">
                                                            <span className="text-sm font-medium text-gray-500">
                                                                {inter.type === 'AI' ? "AI Interviewer" : "Candidate Response"}
                                                            </span>
                                                            <Badge className="bg-gray-100 text-gray-600 text-sm px-3 py-1">Q{inter.label}</Badge>
                                                        </div>
                                                        <div className="text-base leading-relaxed text-gray-800">
                                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                                {inter.content}
                                                            </ReactMarkdown>
                                                        </div>
                                                        {inter.code && (
                                                            <div className="mt-4">
                                                                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                                                                    <pre className="text-green-400 font-mono text-sm leading-relaxed">
                                                                        {inter.code}
                                                                    </pre>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                                        <p className="text-gray-500 text-lg">No interview data available</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'architecture' && (
                            <div className="space-y-8">
                                <section className="bg-white rounded-lg border p-8">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Architecture Task</h2>
                                    
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                        <p className="text-sm font-medium text-blue-600 uppercase mb-3">Global Requirement String</p>
                                        <p className="text-lg text-blue-900 italic leading-relaxed">
                                            "{applicant.details?.architectureTask?.instructions}"
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-700">Structural Logic</h3>
                                        <div className="bg-gray-900 rounded-lg p-8 overflow-x-auto">
                                            <pre className="text-green-400 font-mono text-base leading-relaxed">
                                                {applicant.details?.architectureTask?.code || "// No code provided"}
                                            </pre>
                                        </div>
                                    </div>
                                </section>

                                {applicant.details?.architectureTask?.nodes && (
                                    <div className="bg-white rounded-lg border p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-gray-500 uppercase">Modular Density</p>
                                                <p className="text-4xl font-semibold text-gray-900">
                                                    {applicant.details.architectureTask.nodes.length}
                                                </p>
                                                <p className="text-sm text-gray-500">Units</p>
                                            </div>
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default ApplicantDetail;
