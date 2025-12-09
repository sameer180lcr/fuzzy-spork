import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import StatCard from "@/components/dashboard/StatCard";
import CandidateCard from "@/components/dashboard/CandidateCard";
import JobCard from "@/components/dashboard/JobCard";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, MessageSquare, TrendingUp, Plus, ArrowRight } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Active Jobs", value: "12", change: "+3 this week", positive: true },
  { icon: Users, label: "Total Candidates", value: "1,284", change: "+18%", positive: true },
  { icon: MessageSquare, label: "Interviews Today", value: "8", change: "2 pending", positive: true },
  { icon: TrendingUp, label: "Avg. Time to Hire", value: "3.2d", change: "-12%", positive: true },
];

const topCandidates = [
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
    role: "Full Stack Developer",
    location: "New York, NY",
    experience: "4 years",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    matchScore: 92,
    rating: 4.7,
  },
  {
    name: "Priya Patel",
    role: "Data Scientist",
    location: "Austin, TX",
    experience: "5 years",
    skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"],
    matchScore: 89,
    rating: 4.8,
  },
];

const recentJobs = [
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
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Dashboard" subtitle="Welcome back, here's what's happening" />
        
        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <StatCard {...stat} />
                </motion.div>
              ))}
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-3 gap-8">
              {/* Top Candidates */}
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Top Matched Candidates</h2>
                    <p className="text-sm text-muted-foreground">AI-ranked based on your open roles</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {topCandidates.slice(0, 2).map((candidate, index) => (
                    <motion.div
                      key={candidate.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    >
                      <CandidateCard {...candidate} />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Recent Jobs */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Recent Jobs</h2>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Job
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentJobs.map((job, index) => (
                    <motion.div
                      key={job.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    >
                      <JobCard {...job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
