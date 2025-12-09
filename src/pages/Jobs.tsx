import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import JobCard from "@/components/dashboard/JobCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Filter, 
  Search,
  Sparkles,
  X
} from "lucide-react";

const jobs = [
  {
    title: "Senior ML Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    applicants: 156,
    daysOpen: 5,
    status: "active" as const,
  },
  {
    title: "Product Designer",
    department: "Design",
    type: "Full-time",
    location: "San Francisco",
    applicants: 89,
    daysOpen: 12,
    status: "active" as const,
  },
  {
    title: "Backend Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "New York",
    applicants: 234,
    daysOpen: 8,
    status: "active" as const,
  },
  {
    title: "Data Analyst",
    department: "Data",
    type: "Contract",
    location: "Remote",
    applicants: 67,
    daysOpen: 3,
    status: "active" as const,
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Austin",
    applicants: 45,
    daysOpen: 15,
    status: "paused" as const,
  },
  {
    title: "Legal Counsel",
    department: "Legal",
    type: "Full-time",
    location: "San Francisco",
    applicants: 23,
    daysOpen: 20,
    status: "closed" as const,
  },
];

const Jobs = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Jobs" subtitle="Manage your open positions" />
        
        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Actions Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="h-10 w-72 rounded-lg border border-border bg-card pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
              
              <Button onClick={() => setShowCreateModal(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Create Job
              </Button>
            </div>
            
            {/* Status Tabs */}
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary" className="px-4 py-1.5 cursor-pointer">
                All (6)
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-secondary">
                Active (4)
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-secondary">
                Paused (1)
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-secondary">
                Closed (1)
              </Badge>
            </div>
            
            {/* Jobs Grid */}
            <div className="grid grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={`${job.title}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <JobCard {...job} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
      
      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-2xl border border-border w-full max-w-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold">Create New Job</h2>
                  <p className="text-sm text-muted-foreground">Describe the role and AI will help structure it</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowCreateModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6">
              <label className="block text-sm font-medium mb-2">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Describe the role in natural language. For example: 'We need a senior ML engineer with PyTorch experience who can lead our recommendation system team. Remote-friendly, competitive salary...'"
                className="w-full h-48 rounded-xl border border-border bg-secondary/30 p-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                AI will analyze your description and extract: required skills, experience level, location preferences, and more.
              </p>
            </div>
            
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button className="gap-2">
                <Sparkles className="w-4 h-4" />
                Generate Job Posting
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
