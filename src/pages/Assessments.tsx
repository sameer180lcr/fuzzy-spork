import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Clock, CheckCircle2, Play, Trophy, Target } from "lucide-react";

const assessments = [
    {
        id: "1",
        title: "React & TypeScript Assessment",
        company: "Apple Inc.",
        duration: "60 minutes",
        deadline: "Dec 15, 2024",
        status: "pending",
        score: null,
    },
    {
        id: "2",
        title: "System Design Interview",
        company: "Stripe",
        duration: "90 minutes",
        deadline: "Dec 12, 2024",
        status: "pending",
        score: null,
    },
    {
        id: "3",
        title: "Coding Challenge",
        company: "Vercel",
        duration: "45 minutes",
        deadline: "Dec 10, 2024",
        status: "completed",
        score: 92,
    },
    {
        id: "4",
        title: "Technical Skills Assessment",
        company: "Meta",
        duration: "120 minutes",
        deadline: "Nov 25, 2024",
        status: "completed",
        score: 88,
    },
];

const Assessments = () => {
    const pending = assessments.filter(a => a.status === "pending");
    const completed = assessments.filter(a => a.status === "completed");

    return (
        <div className="min-h-screen bg-[#f5f5f7]">
            <Sidebar />
            <div className="ml-64">
                <TopBar title="Assessments" subtitle="Complete assessments to showcase your skills" />

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
                                    <div className="w-10 h-10 rounded-xl bg-[#ff9500]/10 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-[#ff9500]" />
                                    </div>
                                    <span className="text-[#86868b]">Pending</span>
                                </div>
                                <p className="text-3xl font-semibold text-[#1d1d1f]">{pending.length}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#34c759]/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-[#34c759]" />
                                    </div>
                                    <span className="text-[#86868b]">Completed</span>
                                </div>
                                <p className="text-3xl font-semibold text-[#1d1d1f]">{completed.length}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 flex items-center justify-center">
                                        <Trophy className="w-5 h-5 text-[#0071e3]" />
                                    </div>
                                    <span className="text-[#86868b]">Avg. Score</span>
                                </div>
                                <p className="text-3xl font-semibold text-[#1d1d1f]">90%</p>
                            </div>
                        </div>

                        {/* Pending Assessments */}
                        {pending.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Pending Assessments</h2>
                                <div className="space-y-4">
                                    {pending.map((assessment, index) => (
                                        <motion.div
                                            key={assessment.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            className="bg-white rounded-2xl p-6 border border-[#e5e5e5]"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-[#ff9500]/10 flex items-center justify-center">
                                                        <ClipboardCheck className="w-6 h-6 text-[#ff9500]" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-[#1d1d1f]">{assessment.title}</h3>
                                                        <p className="text-sm text-[#86868b]">{assessment.company}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="text-right">
                                                        <p className="text-sm text-[#86868b]">Duration</p>
                                                        <p className="text-sm text-[#1d1d1f]">{assessment.duration}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-[#86868b]">Deadline</p>
                                                        <p className="text-sm text-[#1d1d1f]">{assessment.deadline}</p>
                                                    </div>
                                                    <Button variant="hero" className="gap-2">
                                                        <Play className="w-4 h-4" />
                                                        Start
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Completed Assessments */}
                        {completed.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-[#1d1d1f] mb-4">Completed Assessments</h2>
                                <div className="bg-white rounded-2xl border border-[#e5e5e5] overflow-hidden">
                                    <div className="divide-y divide-[#e5e5e5]">
                                        {completed.map((assessment) => (
                                            <div key={assessment.id} className="p-6 hover:bg-[#f5f5f7]/50 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-[#34c759]/10 flex items-center justify-center">
                                                            <ClipboardCheck className="w-6 h-6 text-[#34c759]" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-[#1d1d1f]">{assessment.title}</h3>
                                                            <p className="text-sm text-[#86868b]">{assessment.company}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        <div className="text-right">
                                                            <p className="text-sm text-[#86868b]">Completed</p>
                                                            <p className="text-sm text-[#1d1d1f]">{assessment.deadline}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#34c759]/10">
                                                            <Target className="w-4 h-4 text-[#34c759]" />
                                                            <span className="font-semibold text-[#34c759]">{assessment.score}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Assessments;
