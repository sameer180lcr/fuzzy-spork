import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { FileText, Calendar, DollarSign, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const contracts = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        company: "Apple Inc.",
        startDate: "Jan 15, 2025",
        endDate: "Jan 15, 2026",
        value: "$180,000",
        status: "active",
    },
    {
        id: "2",
        title: "Product Design Consultant",
        company: "Stripe",
        startDate: "Nov 1, 2024",
        endDate: "Apr 30, 2025",
        value: "$75,000",
        status: "active",
    },
    {
        id: "3",
        title: "ML Engineer (Contract)",
        company: "Meta",
        startDate: "Jun 1, 2024",
        endDate: "Nov 30, 2024",
        value: "$120,000",
        status: "completed",
    },
];

const statusConfig = {
    active: { icon: CheckCircle2, color: "text-[#34c759]", bg: "bg-[#34c759]/10", label: "Active" },
    pending: { icon: Clock, color: "text-[#ff9500]", bg: "bg-[#ff9500]/10", label: "Pending" },
    completed: { icon: CheckCircle2, color: "text-[#86868b]", bg: "bg-[#f5f5f7]", label: "Completed" },
    expired: { icon: AlertCircle, color: "text-[#ff3b30]", bg: "bg-[#ff3b30]/10", label: "Expired" },
};

const Contracts = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f7]">
            <Sidebar />
            <div className="ml-64">
                <TopBar title="Contracts" subtitle="Manage your active and past contracts" />

                <main className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-5 mb-8">
                            <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#34c759]/10 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-[#34c759]" />
                                    </div>
                                    <span className="text-[#86868b]">Active Contracts</span>
                                </div>
                                <p className="text-3xl font-semibold text-[#1d1d1f]">2</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-[#0071e3]" />
                                    </div>
                                    <span className="text-[#86868b]">Total Value</span>
                                </div>
                                <p className="text-3xl font-semibold text-[#1d1d1f]">$375,000</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#af52de]/10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-[#af52de]" />
                                    </div>
                                    <span className="text-[#86868b]">Avg. Duration</span>
                                </div>
                                <p className="text-3xl font-semibold text-[#1d1d1f]">8 months</p>
                            </div>
                        </div>

                        {/* Contracts List */}
                        <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
                            <div className="p-6 border-b border-[#e5e5e5]">
                                <h2 className="text-lg font-semibold text-[#1d1d1f]">All Contracts</h2>
                            </div>
                            <div className="divide-y divide-[#e5e5e5]">
                                {contracts.map((contract) => {
                                    const status = statusConfig[contract.status as keyof typeof statusConfig];
                                    return (
                                        <div key={contract.id} className="p-6 hover:bg-[#f5f5f7]/50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center">
                                                        <FileText className="w-6 h-6 text-[#86868b]" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-[#1d1d1f]">{contract.title}</h3>
                                                        <p className="text-sm text-[#86868b]">{contract.company}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="text-right">
                                                        <p className="text-sm text-[#86868b]">Duration</p>
                                                        <p className="text-sm text-[#1d1d1f]">{contract.startDate} - {contract.endDate}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-[#86868b]">Value</p>
                                                        <p className="text-sm font-medium text-[#1d1d1f]">{contract.value}</p>
                                                    </div>
                                                    <div className={`px-3 py-1.5 rounded-full ${status.bg} flex items-center gap-1.5`}>
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

export default Contracts;
