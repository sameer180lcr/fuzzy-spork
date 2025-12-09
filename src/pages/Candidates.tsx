import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import CandidateCard from "@/components/dashboard/CandidateCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  Search,
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";

const candidates = [
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
  {
    name: "Alex Rivera",
    role: "Backend Engineer",
    location: "Seattle, WA",
    experience: "7 years",
    skills: ["Go", "Kubernetes", "AWS", "PostgreSQL", "Redis"],
    matchScore: 87,
    rating: 4.6,
  },
  {
    name: "Emma Wilson",
    role: "Product Designer",
    location: "Los Angeles, CA",
    experience: "5 years",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    matchScore: 85,
    rating: 4.9,
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    location: "Chicago, IL",
    experience: "6 years",
    skills: ["Docker", "Terraform", "CI/CD", "AWS", "Linux"],
    matchScore: 84,
    rating: 4.5,
  },
  {
    name: "Lisa Wang",
    role: "Frontend Developer",
    location: "Boston, MA",
    experience: "4 years",
    skills: ["React", "Vue", "CSS", "TypeScript", "Testing"],
    matchScore: 82,
    rating: 4.7,
  },
  {
    name: "James Brown",
    role: "Security Engineer",
    location: "Denver, CO",
    experience: "8 years",
    skills: ["Penetration Testing", "SIEM", "AWS Security", "Python"],
    matchScore: 80,
    rating: 4.6,
  },
];

const Candidates = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Candidates" subtitle="Browse and manage your talent pool" />
        
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
                    placeholder="Search by name, role, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-80 rounded-lg border border-border bg-card pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Sort
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">
                  {filteredCandidates.length} candidates
                </span>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-secondary" : "hover:bg-secondary/50"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-secondary" : "hover:bg-secondary/50"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Filters */}
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary" className="px-4 py-1.5 cursor-pointer">
                All Candidates
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-secondary">
                Engineering
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-secondary">
                Design
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-secondary">
                Data
              </Badge>
              <Badge variant="outline" className="px-4 py-1.5 cursor-pointer hover:bg-secondary">
                90%+ Match
              </Badge>
            </div>
            
            {/* Candidates Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-3 gap-6" : "space-y-4"}>
              {filteredCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <Link to="/candidate/1">
                    <CandidateCard {...candidate} />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {filteredCandidates.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No candidates found matching your search.</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Candidates;
