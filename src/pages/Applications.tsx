import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Send, Building2, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const applications = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        company: "Apple Inc.",
        appliedDate: "Dec 5, 2024",
        status: "interview",
        stage: "Technical Interview",
    },
    {
        id: "2",
        title: "Staff Engineer",
        company: "Stripe",
        appliedDate: "Dec 3, 2024",
        status: "review",
        stage: "Application Review",
    },
    {
        id: "3",
        title: "Product Designer",
        company: "Airbnb",
        appliedDate: "Nov 28, 2024",
        status: "offered",
        stage: "Offer Extended",
    },
    {
        id: "4",
        title: "ML Engineer",
        company: "OpenAI",
        appliedDate: "Nov 20, 2024",
        status: "rejected",
        stage: "Position Filled",
    },
    {
        id: "5",
        title: "Backend Developer",
        company: "Vercel",
        appliedDate: "Dec 7, 2024",
        status: "submitted",
        stage: "Submitted",
    },
];

const statusConfig = {
    submitted: { icon: Send, color: "text-[#86868b]", bg: "bg-[#f5f5f7]", label: "Submitted" },
    review: { icon: Clock, color: "text-[#0071e3]", bg: "bg-[#0071e3]/10", label: "In Review" },
    interview: { icon: AlertCircle, color: "text-[#ff9500]", bg: "bg-[#ff9500]/10", label: "Interview" },
    offered: { icon: CheckCircle2, color: "text-[#34c759]", bg: "bg-[#34c759]/10", label: "Offered" },
    rejected: { icon: XCircle, color: "text-[#ff3b30]", bg: "bg-[#ff3b30]/10", label: "Rejected" },
};

const Applications = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f7]">
            <Sidebar />
            <div className="ml-64">
                <TopBar title="Applications" subtitle="Track your job application progress" />

                <main className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Stats Row */}
                        <div className="grid grid-cols-5 gap-4 mb-8">
                            {Object.entries(statusConfig).map(([key, config]) => {
                                const count = applications.filter(a => a.status === key).length;
                                return (
                                    <div key={key} className="bg-white rounded-2xl p-5 border border-[#e5e5e5] text-center">
                                        <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center mx-auto mb-3`}>
                                            <config.icon className={`w-5 h-5 ${config.color}`} />
                                        </div>
                                        <p className="text-2xl font-semibold text-[#1d1d1f]">{count}</p>
                                        <p className="text-sm text-[#86868b]">{config.label}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Applications List */}
                        <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
                            <div className="p-6 border-b border-[#e5e5e5]">
                                <h2 className="text-lg font-semibold text-[#1d1d1f]">All Applications</h2>
                            </div>
                            <div className="divide-y divide-[#e5e5e5]">
                                {applications.map((app) => {
                                    const status = statusConfig[app.status as keyof typeof statusConfig];
                                    return (
                                        <div key={app.id} className="p-6 hover:bg-[#f5f5f7]/50 transition-colors cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center">
                                                        <Building2 className="w-6 h-6 text-[#86868b]" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-[#1d1d1f]">{app.title}</h3>
                                                        <p className="text-sm text-[#86868b]">{app.company}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right">
                                                        <p className="text-sm text-[#86868b]">Applied</p>
                                                        <p className="text-sm text-[#1d1d1f]">{app.appliedDate}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-[#86868b]">Stage</p>
                                                        <p className="text-sm text-[#1d1d1f]">{app.stage}</p>
                                                    </div>
                                                    <div className={`px-4 py-2 rounded-full ${status.bg} flex items-center gap-2`}>
                                                        <status.icon className={`w-4 h-4 ${status.color}`} />
                                                        <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Applications;
