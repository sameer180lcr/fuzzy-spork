import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Calendar } from "lucide-react";

const Earnings = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Sidebar />
            <div className="ml-16">
                {/* Header */}
                <div className="bg-white border-b border-gray-100 px-8 py-6">
                    <h1 className="text-xl font-semibold text-gray-900">Earnings</h1>
                </div>

                <main className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-gray-500">
                                    Your total earnings to date are <span className="text-blue-600 font-semibold">$0.00</span>.{" "}
                                    <Link to="/dashboard/explore" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                                        Explore open roles <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500">No payment method connected</span>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg gap-2"
                                    onClick={() => alert("Connect payment provider - feature coming soon!")}
                                >
                                    Connect provider
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>

                        {/* Earnings Over Time Chart */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-medium text-gray-900">Earnings Over Time</h2>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        Paid Earnings
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                                        Pending Earnings
                                    </div>
                                    <span className="text-sm text-gray-400">Data refreshes every hour.</span>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="flex items-center gap-3 mb-6">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-gray-300 transition-colors">
                                    <Calendar className="w-4 h-4" />
                                    Billing Date : Dec 1 - Dec 9, 2025
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-gray-300 transition-colors">
                                    Contracts
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-gray-300 transition-colors">
                                    Type
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Earnings total */}
                            <div className="flex items-center justify-between mb-4">
                                <div></div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Earnings total</p>
                                    <p className="text-3xl font-bold text-gray-900">$0.00</p>
                                </div>
                            </div>

                            {/* Chart placeholder */}
                            <div className="h-48 border border-gray-100 rounded-lg flex items-end px-4 pb-4">
                                <div className="flex-1 flex items-end justify-between gap-2">
                                    {['Dec 1', 'Dec 2', 'Dec 3', 'Dec 4', 'Dec 5', 'Dec 6', 'Dec 7', 'Dec 8', 'Dec 9'].map((date) => (
                                        <div key={date} className="flex-1 flex flex-col items-center">
                                            <div className="w-full bg-gray-100 h-1 rounded-full"></div>
                                            <span className="text-xs text-gray-400 mt-2">{date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Payments Table */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <h2 className="font-medium text-gray-900">Payments</h2>
                                <Button
                                    variant="outline"
                                    className="rounded-lg gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                                    onClick={() => alert("Download feature coming soon!")}
                                >
                                    <Download className="w-4 h-4" />
                                    Download Payment Report
                                </Button>
                            </div>

                            <table className="w-full">
                                <thead className="border-b border-gray-100">
                                    <tr>
                                        <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Payout date</th>
                                        <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Type</th>
                                        <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Description</th>
                                        <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Status</th>
                                        <th className="text-left text-sm font-medium text-gray-500 px-6 py-4">Hours</th>
                                        <th className="text-right text-sm font-medium text-gray-500 px-6 py-4">Earned</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={6} className="text-center text-gray-400 py-12">
                                            No payments yet
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Earnings;
