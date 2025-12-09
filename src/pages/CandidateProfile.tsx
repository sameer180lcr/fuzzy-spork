import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Star, 
  Github, 
  Linkedin, 
  Globe,
  Download,
  MessageSquare,
  CheckCircle2,
  Clock,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

const candidateData = {
  name: "Sarah Chen",
  role: "Senior ML Engineer",
  location: "San Francisco, CA",
  experience: "6 years",
  matchScore: 96,
  rating: 4.9,
  availability: "Immediately available",
  salary: "$180k - $220k",
  bio: "Experienced machine learning engineer with a focus on production ML systems. Previously at Google and Stripe, leading teams that shipped ML infrastructure at scale.",
  skills: [
    { name: "PyTorch", level: 95 },
    { name: "TensorFlow", level: 90 },
    { name: "MLOps", level: 88 },
    { name: "Python", level: 95 },
    { name: "Kubernetes", level: 82 },
    { name: "AWS", level: 85 },
  ],
  experience_history: [
    {
      company: "Google",
      role: "Senior ML Engineer",
      duration: "2021 - Present",
      description: "Led the development of ML infrastructure for Search quality improvements.",
    },
    {
      company: "Stripe",
      role: "ML Engineer",
      duration: "2019 - 2021",
      description: "Built fraud detection models processing millions of transactions daily.",
    },
  ],
  assessments: [
    { name: "Technical Interview", score: 95, status: "completed" },
    { name: "System Design", score: 92, status: "completed" },
    { name: "Coding Challenge", score: 98, status: "completed" },
  ],
};

const CandidateProfile = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center px-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Profile Header */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center">
                  <span className="text-2xl font-semibold">SC</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold">{candidateData.name}</h1>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10">
                      <span className="text-lg font-bold text-primary">{candidateData.matchScore}%</span>
                      <span className="text-sm text-primary/70">match</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{candidateData.role}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {candidateData.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {candidateData.experience}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {candidateData.rating}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {candidateData.availability}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
                <Button size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
              <Button variant="ghost" size="sm" className="gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                Portfolio
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="col-span-2 space-y-8">
              {/* About */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">{candidateData.bio}</p>
              </div>
              
              {/* Skills */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Skills</h2>
                <div className="space-y-4">
                  {candidateData.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Experience */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Experience</h2>
                <div className="space-y-6">
                  {candidateData.experience_history.map((exp, index) => (
                    <div key={exp.company} className="relative pl-6">
                      {index !== candidateData.experience_history.length - 1 && (
                        <div className="absolute left-[7px] top-8 w-px h-[calc(100%+1.5rem)] bg-border" />
                      )}
                      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-primary" />
                      <div>
                        <h3 className="font-medium">{exp.role}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{exp.company} • {exp.duration}</p>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Assessments */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">AI Assessments</h2>
                <div className="space-y-4">
                  {candidateData.assessments.map((assessment) => (
                    <div key={assessment.name} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{assessment.name}</p>
                          <p className="text-xs text-muted-foreground">Completed</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-primary">{assessment.score}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 gap-2">
                  <FileText className="w-4 h-4" />
                  View Full Report
                </Button>
              </div>
              
              {/* Salary */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-2">Expected Salary</h2>
                <p className="text-2xl font-bold text-primary">{candidateData.salary}</p>
                <p className="text-sm text-muted-foreground mt-1">Annual, negotiable</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CandidateProfile;
