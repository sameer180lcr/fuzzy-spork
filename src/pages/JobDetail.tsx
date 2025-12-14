import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import CandidateCard from "@/components/dashboard/CandidateCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    MapPin,
    Clock,
    DollarSign,
    Users,
    Calendar,
    Edit2,
    Share2,
    MoreHorizontal,
    Briefcase
} from "lucide-react";

const jobData = {
    id: "1",
    title: "Senior ML Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    salary: "$180k - $220k",
    postedDate: "Dec 1, 2024",
    applicants: 156,
    status: "active",
    description: `We're looking for a Senior Machine Learning Engineer to join our team and help build the next generation of AI-powered hiring tools.

You'll work on cutting-edge ML systems including natural language processing, recommendation systems, and automated candidate evaluation.`,
    requirements: [
        "5+ years experience in machine learning",
        "Strong proficiency in Python, PyTorch or TensorFlow",
        "Experience with production ML systems at scale",
        "Strong communication and collaboration skills",
        "Bachelor's or Master's in Computer Science or related field",
    ],
    benefits: [
        "Competitive salary and equity",
        "Remote-first culture",
        "Unlimited PTO",
        "Health, dental, and vision insurance",
        "401(k) matching",
        "Learning & development budget",
    ],
};

const applicants = [
    {
        name: "Sarah Chen",
        role: "Senior ML Engineer",
        location: "San Francisco, CA",
        experience: "6 years",
        skills: ["PyTorch", "TensorFlow", "MLOps", "Python", "Kubernetes"],
        matchScore: 96,
        rating: 4.9,
    },
    {
        name: "Marcus Johnson",
        role: "ML Engineer",
        location: "New York, NY",
        experience: "4 years",
        skills: ["TensorFlow", "Python", "AWS", "Docker"],
        matchScore: 88,
        rating: 4.6,
    },
    {
        name: "Priya Patel",
        role: "Data Scientist",
        location: "Austin, TX",
        experience: "5 years",
        skills: ["Python", "PyTorch", "SQL", "Machine Learning"],
        matchScore: 85,
        rating: 4.7,
    },
];

const JobDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<"details" | "applicants">("details");

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="ml-64">
                <TopBar title="Job Details" subtitle={jobData.title} />

                <main className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Back Button */}
                        <Link
                            to="/dashboard/jobs"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Jobs
                        </Link>

                        {/* Job Header */}
                        <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                                        <Briefcase className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h1 className="text-2xl font-bold">{jobData.title}</h1>
                                            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200">
                                                Active
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground mb-3">{jobData.department}</p>
                                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                {jobData.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                {jobData.type}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <DollarSign className="w-4 h-4" />
                                                {jobData.salary}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4" />
                                                {jobData.applicants} applicants
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                Posted {jobData.postedDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex items-center gap-2 mb-6">
                            <Badge
                                variant={activeTab === "details" ? "secondary" : "outline"}
                                className="px-4 py-1.5 cursor-pointer"
                                onClick={() => setActiveTab("details")}
                            >
                                Job Details
                            </Badge>
                            <Badge
                                variant={activeTab === "applicants" ? "secondary" : "outline"}
                                className="px-4 py-1.5 cursor-pointer"
                                onClick={() => setActiveTab("applicants")}
                            >
                                Applicants ({jobData.applicants})
                            </Badge>
                        </div>

                        {activeTab === "details" ? (
                            <div className="grid grid-cols-3 gap-6">
                                {/* Description */}
                                <div className="col-span-2 space-y-6">
                                    <div className="bg-card border border-border rounded-2xl p-6">
                                        <h2 className="text-lg font-semibold mb-4">About this role</h2>
                                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                            {jobData.description}
                                        </p>
                                    </div>

                                    <div className="bg-card border border-border rounded-2xl p-6">
                                        <h2 className="text-lg font-semibold mb-4">Requirements</h2>
                                        <ul className="space-y-3">
                                            {jobData.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Benefits Sidebar */}
                                <div>
                                    <div className="bg-card border border-border rounded-2xl p-6">
                                        <h2 className="text-lg font-semibold mb-4">Benefits</h2>
                                        <ul className="space-y-3">
                                            {jobData.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start gap-3 text-muted-foreground text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-6">
                                {applicants.map((candidate, index) => (
                                    <motion.div
                                        key={candidate.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Link to="/candidate/1">
                                            <CandidateCard {...candidate} />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default JobDetail;
