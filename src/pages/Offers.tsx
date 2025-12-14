import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/button";
import { Gift, Building2, MapPin, DollarSign, Calendar, CheckCircle2, XCircle } from "lucide-react";

const offers = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        company: "Apple Inc.",
        location: "Cupertino, CA",
        salary: "$185,000/year",
        deadline: "Dec 20, 2024",
        status: "pending",
    },
    {
        id: "2",
        title: "Staff Engineer",
        company: "Stripe",
        location: "Remote",
        salary: "$220,000/year",
        deadline: "Dec 15, 2024",
        status: "pending",
    },
];

const Offers = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f7]">
            <Sidebar />
            <div className="ml-64">
                <TopBar title="Offers" subtitle="Review and respond to job offers" />

                <main className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header Stats */}
                        <div className="bg-white rounded-2xl p-6 border border-[#e5e5e5] mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#ff9500]/10 flex items-center justify-center">
                                    <Gift className="w-7 h-7 text-[#ff9500]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-[#1d1d1f]">{offers.length} Active Offers</h2>
                                    <p className="text-[#86868b]">Review and respond before deadlines</p>
                                </div>
                            </div>
                        </div>

                        {/* Offers */}
                        <div className="space-y-5">
                            {offers.map((offer, index) => (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-8 border border-[#e5e5e5]"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center">
                                                <Building2 className="w-7 h-7 text-[#86868b]" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#1d1d1f]">{offer.title}</h3>
                                                <p className="text-[#86868b]">{offer.company}</p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2 rounded-full bg-[#ff9500]/10 text-[#ff9500] text-sm font-medium">
                                            Pending Response
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-6 mb-8">
                                        <div>
                                            <div className="flex items-center gap-2 text-[#86868b] text-sm mb-1">
                                                <MapPin className="w-4 h-4" />
                                                Location
                                            </div>
                                            <p className="font-medium text-[#1d1d1f]">{offer.location}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-[#86868b] text-sm mb-1">
                                                <DollarSign className="w-4 h-4" />
                                                Compensation
                                            </div>
                                            <p className="font-medium text-[#1d1d1f]">{offer.salary}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-[#86868b] text-sm mb-1">
                                                <Calendar className="w-4 h-4" />
                                                Response Deadline
                                            </div>
                                            <p className="font-medium text-[#1d1d1f]">{offer.deadline}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pt-6 border-t border-[#e5e5e5]">
                                        <Button variant="hero" size="lg" className="gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Accept Offer
                                        </Button>
                                        <Button variant="outline" size="lg" className="gap-2">
                                            <XCircle className="w-4 h-4" />
                                            Decline
                                        </Button>
                                        <Button variant="ghost" size="lg">
                                            View Details
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Offers;
