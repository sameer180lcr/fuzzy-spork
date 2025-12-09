import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  Video,
  MessageSquare,
  User,
  Play,
  Eye,
  MoreHorizontal,
  Plus,
  Filter,
  Search
} from "lucide-react";

const interviews = [
  {
    id: 1,
    candidate: "Sarah Chen",
    role: "Senior ML Engineer",
    type: "AI Interview",
    status: "completed",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "23 min",
    score: 95,
  },
  {
    id: 2,
    candidate: "Marcus Johnson",
    role: "Full Stack Developer",
    type: "AI Interview",
    status: "scheduled",
    date: "2024-01-16",
    time: "2:00 PM",
    duration: "—",
    score: null,
  },
  {
    id: 3,
    candidate: "Priya Patel",
    role: "Data Scientist",
    type: "Live Interview",
    status: "in_progress",
    date: "2024-01-15",
    time: "3:30 PM",
    duration: "18 min",
    score: null,
  },
  {
    id: 4,
    candidate: "Alex Rivera",
    role: "Backend Engineer",
    type: "AI Interview",
    status: "completed",
    date: "2024-01-14",
    time: "11:00 AM",
    duration: "25 min",
    score: 88,
  },
  {
    id: 5,
    candidate: "Emma Wilson",
    role: "Product Designer",
    type: "AI Interview",
    status: "cancelled",
    date: "2024-01-14",
    time: "4:00 PM",
    duration: "—",
    score: null,
  },
];

const statusConfig = {
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  scheduled: { label: "Scheduled", className: "bg-blue-50 text-blue-600 border-blue-200" },
  in_progress: { label: "In Progress", className: "bg-amber-50 text-amber-600 border-amber-200" },
  cancelled: { label: "Cancelled", className: "bg-secondary text-muted-foreground border-border" },
};

const Interviews = () => {
  const [filter, setFilter] = useState("all");

  const filteredInterviews = filter === "all" 
    ? interviews 
    : interviews.filter(i => i.status === filter);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Interviews" subtitle="Manage AI and live interviews" />
        
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
                    placeholder="Search interviews..."
                    className="h-10 w-72 rounded-lg border border-border bg-card pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
              
              <Button asChild className="gap-2">
                <Link to="/interview">
                  <Plus className="w-4 h-4" />
                  New Interview
                </Link>
              </Button>
            </div>
            
            {/* Status Tabs */}
            <div className="flex items-center gap-2 mb-6">
              {[
                { key: "all", label: `All (${interviews.length})` },
                { key: "scheduled", label: `Scheduled (${interviews.filter(i => i.status === "scheduled").length})` },
                { key: "in_progress", label: `In Progress (${interviews.filter(i => i.status === "in_progress").length})` },
                { key: "completed", label: `Completed (${interviews.filter(i => i.status === "completed").length})` },
              ].map((tab) => (
                <Badge
                  key={tab.key}
                  variant={filter === tab.key ? "secondary" : "outline"}
                  className="px-4 py-1.5 cursor-pointer hover:bg-secondary"
                  onClick={() => setFilter(tab.key)}
                >
                  {tab.label}
                </Badge>
              ))}
            </div>
            
            {/* Interviews Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Candidate</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Role</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Type</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Date & Time</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Duration</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">Score</th>
                    <th className="text-right text-xs font-medium text-muted-foreground px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInterviews.map((interview, index) => (
                    <motion.tr
                      key={interview.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {interview.candidate.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{interview.candidate}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{interview.role}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm">
                          {interview.type === "AI Interview" ? (
                            <MessageSquare className="w-3.5 h-3.5 text-primary" />
                          ) : (
                            <Video className="w-3.5 h-3.5 text-primary" />
                          )}
                          {interview.type}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                            {interview.date}
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            {interview.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{interview.duration}</td>
                      <td className="px-6 py-4">
                        <Badge className={`border ${statusConfig[interview.status as keyof typeof statusConfig].className}`}>
                          {statusConfig[interview.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {interview.score !== null ? (
                          <span className="text-lg font-bold text-primary">{interview.score}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {interview.status === "scheduled" && (
                            <Button size="sm" variant="outline" className="gap-1.5" asChild>
                              <Link to="/interview">
                                <Play className="w-3.5 h-3.5" />
                                Start
                              </Link>
                            </Button>
                          )}
                          {interview.status === "in_progress" && (
                            <Button size="sm" className="gap-1.5" asChild>
                              <Link to="/interview">
                                <Video className="w-3.5 h-3.5" />
                                Join
                              </Link>
                            </Button>
                          )}
                          {interview.status === "completed" && (
                            <Button size="sm" variant="outline" className="gap-1.5" asChild>
                              <Link to="/candidate/1">
                                <Eye className="w-3.5 h-3.5" />
                                View
                              </Link>
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Interviews;
