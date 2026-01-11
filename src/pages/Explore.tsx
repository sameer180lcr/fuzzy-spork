import { useState, useMemo, useCallback, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import { Search, Flame, Clock, DollarSign, Users, MapPin, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom debounce hook for search performance
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useMemo(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

// Custom interface for Opportunity
interface Opportunity {
    id: string;
    title: string;
    rate: string;
    minRate: number;
    hiredCount: number;
    budget: string;
    createdDays: number;
    location: string;
    type: string;
    description: string;
    qualifications: string[];
    avatars: { letter: string; color: string }[];
}

// Memoized Job Card Component - prevents unnecessary re-renders
const JobCard = memo(({ job, isSelected, onClick }: {
    job: Opportunity;
    isSelected: boolean;
    onClick: () => void
}) => (
    <div
        onClick={onClick}
        className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${isSelected ? "border-blue-600 shadow-sm" : "border-gray-100 hover:border-blue-300 hover:shadow-sm"}`}
    >
        <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">{job.title}</h3>
        <p className="text-sm mb-4">
            <span className="text-blue-600 font-medium">{job.rate}</span>
            <span className="text-gray-400"> / hour</span>
        </p>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                    {job.avatars.map((avatar, i) => (
                        <div key={i} className={`w-6 h-6 rounded-full ${avatar.color} flex items-center justify-center text-white text-xs font-bold ring-2 ring-white`}>
                            {avatar.letter}
                        </div>
                    ))}
                </div>
                <span className="text-xs text-gray-400">
                    <span className="text-black font-semibold">{job.hiredCount}</span> hired this month
                </span>
            </div>
            <span className="text-xs text-gray-400">$ {job.budget}</span>
        </div>
    </div>
));

JobCard.displayName = 'JobCard';

// Memoized Job Detail Panel - prevents unnecessary re-renders
const JobDetailPanel = memo(({ job, onClose }: { job: Opportunity | null; onClose: () => void }) => {
    const [profileData, setProfileData] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const USER_ID = localStorage.getItem("userEmail") || "test_user";
                const res = await fetch(`http://localhost:5000/api/profile/${USER_ID}`);
                if (res.ok) {
                    const data = await res.json();
                    setProfileData(data);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    if (!job) return null;

    // Check if Resume step is completed
    const isResumeCompleted = profileData &&
        profileData.resumeFileName &&
        profileData.account?.fullName &&
        profileData.city;

    const applicationSteps = [
        { name: "Resume", status: isResumeCompleted ? "Done" : "Not done", completed: isResumeCompleted },
        { name: "Domain Expert Interview", status: "Not done", completed: false },
        { name: "Rubric Calibration Assessment (AI)", status: "Not done", completed: false },
        { name: "Work Authorization", status: "Not done", completed: false },
    ];

    // Calculate progress percentage
    const completedSteps = applicationSteps.filter(step => step.completed).length;
    const progressPercentage = (completedSteps / applicationSteps.length) * 100;

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            {/* Panel */}
            <div className="relative z-10 w-full max-w-2xl bg-white h-screen overflow-y-auto ml-auto animate-in slide-in-from-right">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close panel"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                    </button>
                    <div className="text-sm font-medium text-gray-500">
                        {completedSteps} of {applicationSteps.length} steps completed
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                    {/* Job Title and Rate */}
                    <div className="flex items-start justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                        <div className="text-right">
                            <p className="text-xl font-semibold text-gray-900">{job.rate}</p>
                            <p className="text-sm text-gray-500">per hour</p>
                        </div>
                    </div>

                    {/* Job Meta */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            Hourly contract
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            Remote
                        </span>
                    </div>

                    {/* Company Info */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">Z</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Posted by ZeroX</p>
                            <p className="text-sm text-gray-500">zerox.com</p>
                        </div>
                    </div>

                    {/* Application Progress */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-medium text-gray-900">Application</h3>
                            <span className="text-sm font-medium text-gray-500">Not started</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>

                        {/* Steps */}
                        <div className="space-y-4">
                            {applicationSteps.map((step, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${step.completed ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                                            {step.completed ? (
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <span className="text-sm font-medium text-gray-400">{i + 1}</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{step.name}</p>
                                            <p className={`text-xs ${step.completed ? 'text-green-600' : 'text-gray-500'}`}>{step.status}</p>
                                        </div>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${step.completed ? 'border-green-500 bg-green-500' : 'border-gray-200'}`}>
                                        {step.completed && (
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Role Overview */}
                    <div className="mb-8">
                        <h3 className="text-base font-medium text-gray-900 mb-3">Role Overview</h3>
                        <div className="space-y-4 text-sm text-gray-600">
                            <p className="whitespace-pre-line">{job.description}</p>

                            {job.qualifications.length > 0 && (
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Qualifications</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {job.qualifications.map((q, i) => (
                                            <li key={i}>{q}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Project Duration</h4>
                                <p>{job.type || "Permanent"}, with flexible hours based on your availability</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                    <Button
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-medium transition-colors"
                        onClick={() => navigate(`/dashboard/application/${job.id}`)}
                    >
                        Continue Application
                    </Button>
                </div>
            </div>
        </div>
    );
});

JobDetailPanel.displayName = 'JobDetailPanel';

const ITEMS_PER_PAGE = 16;

const Explore = () => {
    const [liveOpportunities, setLiveOpportunities] = useState<any[]>([]);
    const [activeFilter, setActiveFilter] = useState("best");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJob, setSelectedJob] = useState<any | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/listings');
                const data = await response.json();
                // Map backend data to match the UI structure
                const mappedData = data.map((job: any) => ({
                    id: job.id || job._id,
                    title: job.jobTitle,
                    rate: job.minSalary ? `$${Math.round(job.minSalary / 2000)} - $${Math.round(job.maxSalary / 2000)}` : "$50 - $70",
                    minRate: job.minSalary / 2000 || 50,
                    hiredCount: job.applicants || 0,
                    budget: job.maxSalary ? (job.maxSalary / 1000).toString() : "100",
                    createdDays: 1,
                    location: job.location,
                    type: job.employmentType,
                    description: job.description || "No description provided.",
                    qualifications: Array.isArray(job.requirements) ? job.requirements : [job.requirements].filter(Boolean),
                    avatars: [{ letter: job.jobTitle[0], color: "bg-blue-600" }]
                }));
                setLiveOpportunities(mappedData);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();
    }, []);



    // Debounce search for better performance (300ms delay)
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Memoized filtering and sorting - only recalculates when dependencies change
    const filteredAndSortedOpportunities = useMemo(() => {
        let filtered = liveOpportunities.filter(opp =>
            opp.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        switch (activeFilter) {
            case "trending":
                return [...filtered].sort((a, b) => b.hiredCount - a.hiredCount);
            case "newest":
                return [...filtered].sort((a, b) => a.createdDays - b.createdDays);
            case "pay":
                return [...filtered].sort((a, b) => b.minRate - a.minRate);
            default:
                return [...filtered].sort((a, b) => (b.hiredCount * 0.5 + b.minRate * 0.5) - (a.hiredCount * 0.5 + a.minRate * 0.5));
        }
    }, [debouncedSearch, activeFilter, liveOpportunities]);

    // Memoized pagination
    const paginatedOpportunities = useMemo(() => {
        const totalPages = Math.ceil(filteredAndSortedOpportunities.length / ITEMS_PER_PAGE);
        const validPage = Math.min(currentPage, totalPages || 1);
        return filteredAndSortedOpportunities.slice((validPage - 1) * ITEMS_PER_PAGE, validPage * ITEMS_PER_PAGE);
    }, [filteredAndSortedOpportunities, currentPage]);

    const totalPages = Math.ceil(filteredAndSortedOpportunities.length / ITEMS_PER_PAGE);

    // Memoized callbacks - prevents re-creating functions on every render
    const handleFilterChange = useCallback((filter: string) => {
        setActiveFilter(filter);
        setCurrentPage(1);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    }, []);

    const handleJobSelect = useCallback((job: Opportunity) => {
        setSelectedJob(job);
    }, []);

    const handleClosePanel = useCallback(() => {
        setSelectedJob(null);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Sidebar />
            <div className="ml-16">
                {/* Header */}
                <div className="px-8 pt-6 pb-4">
                    <h1 className="text-xl font-semibold text-gray-900 mb-5">Explore opportunities</h1>

                    {/* Search & Filters */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button className="p-2.5 rounded-lg border border-gray-200 text-gray-400 hover:border-gray-300">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                            </button>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Type to search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="h-10 w-56 rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400"
                                />
                            </div>
                            <Button
                                variant="outline"
                                className="h-10 px-4 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                onClick={() => window.location.href = '/blog'}
                            >
                                Know More
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            {[
                                { id: "best", icon: null, label: "Best match" },
                                { id: "trending", icon: Flame, label: "Trending" },
                                { id: "newest", icon: Clock, label: "Newest" },
                                { id: "pay", icon: DollarSign, label: "Most pay" },
                            ].map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => handleFilterChange(filter.id)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === filter.id ? "border-2 border-blue-600 text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
                                >
                                    {filter.icon && <filter.icon className="w-4 h-4" />}
                                    {!filter.icon && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
                                    {filter.label}
                                </button>
                            ))}
                            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800"><Users className="w-4 h-4" /> Refer & earn</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 mx-8"></div>

                {/* Results count */}
                <div className="px-8 pt-4">
                    <p className="text-sm text-gray-500">
                        Showing {paginatedOpportunities.length} of {filteredAndSortedOpportunities.length} opportunities
                        {debouncedSearch && ` for "${debouncedSearch}"`}
                    </p>
                </div>

                {/* Opportunities Grid - uses memoized cards */}
                <div className="p-8 pt-4">
                    <div className="grid grid-cols-4 gap-4">
                        {paginatedOpportunities.map((opp) => (
                            <JobCard
                                key={opp.id}
                                job={opp}
                                isSelected={selectedJob?.id === opp.id}
                                onClick={() => handleJobSelect(opp)}
                            />
                        ))}
                    </div>

                    {paginatedOpportunities.length === 0 && (
                        <div className="text-center py-12 text-gray-500">No opportunities found. <button onClick={() => setSearchQuery("")} className="text-blue-600 hover:underline">Clear search</button></div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-1 mt-8">
                            <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="w-8 h-8 rounded text-gray-400 hover:text-gray-600 flex items-center justify-center disabled:opacity-50">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                                <button key={page} onClick={() => handlePageChange(page)} className={`w-8 h-8 rounded text-sm font-medium transition-colors ${currentPage === page ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{page}</button>
                            ))}
                            <button onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="w-8 h-8 rounded text-gray-400 hover:text-gray-600 flex items-center justify-center disabled:opacity-50">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <JobDetailPanel job={selectedJob} onClose={handleClosePanel} />
        </div>
    );
};

export default Explore;
