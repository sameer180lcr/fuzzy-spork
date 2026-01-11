import { useState, useEffect } from "react";
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
    Briefcase,
    ChevronRight
} from "lucide-react";

const JobDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<"details" | "applicants">("details");
    const [job, setJob] = useState<any>(null);
    const [jobApplicants, setJobApplicants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const [jobRes, appsRes] = await Promise.all([
                    fetch(`http://localhost:5000/api/listings/${id}`),
                    fetch(`http://localhost:5000/api/applications`)
                ]);
                const jobData = await jobRes.json();
                const appsData = await appsRes.json();

                setJob(jobData);
                // Filter applicants for this specific job
                const filteredApps = appsData.filter((a: any) => a.jobId === id).map((a: any) => ({
                    name: a.name,
                    role: "Applicant",
                    location: a.location || "Remote",
                    experience: "N/A",
                    skills: [],
                    matchScore: 90,
                    rating: 4.5
                }));
                setJobApplicants(filteredApps);
            } catch (error) {
                console.error("Error fetching job data:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchJobData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (!job) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <p>Job not found</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="ml-64">
                <TopBar title="Job Details" subtitle={job.jobTitle || job.title} />

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
                                            <h1 className="text-2xl font-bold">{job.jobTitle || job.title}</h1>
                                            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200">
                                                {job.status || "Active"}
                                            </Badge>
                                        </div>
                                        <p className="text-muted-foreground mb-3">{job.department}</p>
                                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" />
                                                {job.employmentType}
                                            </div>
                                            <div className="flex items-center gap-1.5 font-medium text-blue-600">
                                                <DollarSign className="w-4 h-4 font-normal" />
                                                ${Math.round((job.minSalary || 0) / 2000)} - ${Math.round((job.maxSalary || 0) / 2000)} / hr
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4" />
                                                {jobApplicants.length} applicants
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                Posted {job.postedDate || "Recently"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link to={`/dashboard/application/${id}`}>
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 font-bold px-6">
                                            Apply Now
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
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
                                Applicants ({jobApplicants.length})
                            </Badge>
                        </div>

                        {activeTab === "details" ? (
                            <div className="grid grid-cols-3 gap-6">
                                {/* Description */}
                                <div className="col-span-2 space-y-6">
                                    <div className="bg-card border border-border rounded-2xl p-6">
                                        <h2 className="text-lg font-semibold mb-4">About this role</h2>
                                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                            {job.description}
                                        </p>
                                    </div>

                                    <div className="bg-card border border-border rounded-2xl p-6">
                                        <h2 className="text-lg font-semibold mb-4">Requirements</h2>
                                        <ul className="space-y-3">
                                            {(Array.isArray(job.requirements) ? job.requirements : (job.requirements?.split('\n') || [])).map((req: string, index: number) => (
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
                                            {(job.benefits || []).map((benefit: string, index: number) => (
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
                                {jobApplicants.map((candidate, index) => (
                                    <motion.div
                                        key={candidate.name + index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Link to={`/company/applicants/${candidate.id || index}`}>
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
