import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    Users,
    Clock,
    Target,
    ArrowUp,
    ArrowDown
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from "recharts";

const hiringTrends = [
    { month: "Jan", candidates: 45, hires: 8 },
    { month: "Feb", candidates: 52, hires: 12 },
    { month: "Mar", candidates: 78, hires: 15 },
    { month: "Apr", candidates: 65, hires: 10 },
    { month: "May", candidates: 89, hires: 18 },
    { month: "Jun", candidates: 102, hires: 22 },
];

const sourceData = [
    { name: "LinkedIn", value: 35, color: "#0077B5" },
    { name: "Direct Apply", value: 28, color: "#10B981" },
    { name: "Referrals", value: 22, color: "#8B5CF6" },
    { name: "Job Boards", value: 15, color: "#F59E0B" },
];

const interviewStats = [
    { stage: "Applied", count: 1284 },
    { stage: "Screened", count: 456 },
    { stage: "Interviewed", count: 189 },
    { stage: "Offered", count: 45 },
    { stage: "Hired", count: 32 },
];

const metrics = [
    {
        icon: Users,
        label: "Total Candidates",
        value: "1,284",
        change: "+18%",
        positive: true
    },
    {
        icon: Clock,
        label: "Avg. Time to Hire",
        value: "3.2 days",
        change: "-12%",
        positive: true
    },
    {
        icon: Target,
        label: "Interview Rate",
        value: "68%",
        change: "+5%",
        positive: true
    },
    {
        icon: TrendingUp,
        label: "Offer Accept Rate",
        value: "71%",
        change: "-3%",
        positive: false
    },
];

const Analytics = () => {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="ml-64">
                <TopBar title="Analytics" subtitle="Hiring metrics and insights" />

                <main className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Metrics Cards */}
                        <div className="grid grid-cols-4 gap-6 mb-8">
                            {metrics.map((metric, index) => (
                                <motion.div
                                    key={metric.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-card border border-border rounded-2xl p-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                                            <metric.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm ${metric.positive ? "text-emerald-500" : "text-rose-500"
                                            }`}>
                                            {metric.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                            {metric.change}
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold mb-1">{metric.value}</p>
                                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            {/* Hiring Trends Chart */}
                            <div className="col-span-2 bg-card border border-border rounded-2xl p-6">
                                <h2 className="text-lg font-semibold mb-6">Hiring Trends</h2>
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={hiringTrends}>
                                            <defs>
                                                <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                            <XAxis dataKey="month" className="text-xs" />
                                            <YAxis className="text-xs" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "hsl(var(--card))",
                                                    border: "1px solid hsl(var(--border))",
                                                    borderRadius: "8px"
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="candidates"
                                                stroke="hsl(var(--primary))"
                                                fillOpacity={1}
                                                fill="url(#colorCandidates)"
                                                strokeWidth={2}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="hires"
                                                stroke="hsl(142, 76%, 36%)"
                                                fill="transparent"
                                                strokeWidth={2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex items-center gap-6 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                        <span className="text-sm text-muted-foreground">Candidates</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className="text-sm text-muted-foreground">Hires</span>
                                    </div>
                                </div>
                            </div>

                            {/* Source Breakdown */}
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h2 className="text-lg font-semibold mb-6">Candidate Sources</h2>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={sourceData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={50}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {sourceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-2 mt-4">
                                    {sourceData.map((source) => (
                                        <div key={source.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: source.color }}
                                                />
                                                <span className="text-sm">{source.name}</span>
                                            </div>
                                            <span className="text-sm font-medium">{source.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Hiring Funnel */}
                        <div className="mt-8 bg-card border border-border rounded-2xl p-6">
                            <h2 className="text-lg font-semibold mb-6">Hiring Funnel</h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={interviewStats} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                        <XAxis type="number" className="text-xs" />
                                        <YAxis dataKey="stage" type="category" className="text-xs" width={100} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "hsl(var(--card))",
                                                border: "1px solid hsl(var(--border))",
                                                borderRadius: "8px"
                                            }}
                                        />
                                        <Bar
                                            dataKey="count"
                                            fill="hsl(var(--primary))"
                                            radius={[0, 4, 4, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Analytics;
