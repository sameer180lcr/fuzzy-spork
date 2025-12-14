import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import ExploreJobCard from "@/components/dashboard/ExploreJobCard";
import { Bookmark } from "lucide-react";

const savedJobs = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        company: "Apple Inc.",
        location: "Cupertino, CA",
        salary: "$150k - $200k",
        type: "Full-time",
        posted: "2d ago",
        tags: ["React", "TypeScript", "Design Systems"],
    },
    {
        id: "3",
        title: "ML Engineer",
        company: "OpenAI",
        location: "San Francisco, CA",
        salary: "$200k - $350k",
        type: "Full-time",
        posted: "3d ago",
        tags: ["Python", "PyTorch", "LLMs"],
    },
    {
        id: "5",
        title: "iOS Developer",
        company: "Airbnb",
        location: "San Francisco, CA",
        salary: "$160k - $210k",
        type: "Full-time",
        posted: "4d ago",
        tags: ["Swift", "SwiftUI", "iOS"],
    },
];

const Saved = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f7]">
            <Sidebar />
            <div className="ml-64">
                <TopBar title="Saved" subtitle="Jobs you've bookmarked for later" />

                <main className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5] mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#0071e3]/10 flex items-center justify-center">
                                    <Bookmark className="w-7 h-7 text-[#0071e3]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-[#1d1d1f]">{savedJobs.length} Saved Jobs</h2>
                                    <p className="text-[#86868b]">Keep track of opportunities you're interested in</p>
                                </div>
                            </div>
                        </div>

                        {/* Saved Jobs Grid */}
                        {savedJobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                {savedJobs.map((job, index) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <ExploreJobCard {...job} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 border border-[#e5e5e5] text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#f5f5f7] flex items-center justify-center mx-auto mb-4">
                                    <Bookmark className="w-8 h-8 text-[#86868b]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">No saved jobs yet</h3>
                                <p className="text-[#86868b]">Start exploring and save jobs you're interested in</p>
                            </div>
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Saved;
