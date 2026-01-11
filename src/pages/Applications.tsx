import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Send, Building2, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

const statusConfig = {
    submitted: { icon: Send, color: "text-[#86868b]", bg: "bg-[#f5f5f7]", label: "Submitted" },
    review: { icon: Clock, color: "text-[#0071e3]", bg: "bg-[#0071e3]/10", label: "In Review" },
    interview: { icon: AlertCircle, color: "text-[#ff9500]", bg: "bg-[#ff9500]/10", label: "Interview" },
    offered: { icon: CheckCircle2, color: "text-[#34c759]", bg: "bg-[#34c759]/10", label: "Offered" },
    rejected: { icon: XCircle, color: "text-[#ff3b30]", bg: "bg-[#ff3b30]/10", label: "Rejected" },
};

const Applications = () => {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/applications');
                const data = await response.json();

                // Filter for current user if email is stored
                const userEmail = localStorage.getItem('userEmail');
                const filteredData = userEmail
                    ? data.filter((a: any) => a.email === userEmail)
                    : data;

                const mappedData = filteredData.map((a: any) => ({
                    id: a.id || a._id,
                    title: a.jobTitle,
                    company: "ZeroX", // Hardcoded for now as it's the main employer in this demo
                    appliedDate: a.applied,
                    status: a.status?.toLowerCase() === 'new' ? 'submitted' : a.status?.toLowerCase(),
                    stage: a.status || "Applied"
                }));
                setApplications(mappedData);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

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
                                {applications.length > 0 ? applications.map((app) => {
                                    const status = statusConfig[app.status as keyof typeof statusConfig] || statusConfig.submitted;
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
                                }) : (
                                    <div className="p-12 text-center text-gray-500">
                                        No applications found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Applications;
