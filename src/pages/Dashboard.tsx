import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, ArrowRight, CreditCard, Briefcase, Clock, Star, CheckSquare, ChevronRight, MapPin, Check, X } from "lucide-react";
import { useState, memo, useCallback, useEffect } from "react";

// Detail Panel Component
const DetailPanel = memo(({ item, type, onClose }: { item: any | null; type: string; onClose: () => void }) => {
  if (!item) return null;

  const getApplicationSteps = (type: string, status: string) => {
    if (type === "applications") {
      return [
        { name: "Resume", status: status === "In Progress" ? "Completed" : "Not done", completed: status === "In Progress" },
        { name: "Domain Expert Interview", status: "Not done", completed: false },
        { name: "Work Authorization", status: status === "Submitted" ? "Completed on 12/10/25" : "Not done", completed: status === "Submitted" },
      ];
    }
    if (type === "contracts") {
      return [
        { name: "Resume", status: "Completed", completed: true },
        { name: "Domain Expert Interview", status: "Completed", completed: true },
        { name: "Work Authorization", status: "Completed", completed: true },
      ];
    }
    if (type === "offers") {
      return [
        { name: "Resume", status: "Completed", completed: true },
        { name: "Domain Expert Interview", status: "Completed", completed: true },
        { name: "Work Authorization", status: "Pending approval", completed: false },
      ];
    }
    return [
      { name: "Resume", status: "Not done", completed: false },
      { name: "Domain Expert Interview", status: "Not done", completed: false },
      { name: "Work Authorization", status: "Not done", completed: false },
    ];
  };

  const steps = getApplicationSteps(type, item.status);
  const completedSteps = steps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedSteps / steps.length) * 100);

  const getDescription = (title: string) => {
    if (title.includes("Math")) return "Mercor is seeking Physics PhDs for a premier project with one of the world's top AI labs.\n\nIn this role, you will contribute your subject matter expertise to a cutting-edge project involving frontier large language models. Specifically, you will craft high-quality, challenging problems in your domain expertise with real-world applicability to inform the future of AI innovation.";
    if (title.includes("Frontend")) return "ZeroX is looking for experienced Frontend Software Engineers to build modern, responsive web applications using React and TypeScript. You will work on cutting-edge projects that push the boundaries of web development.";
    if (title.includes("Backend") || title.includes("Full Stack")) return "Join our engineering team to build scalable backend systems and APIs. You will work with modern technologies and contribute to high-impact projects.";
    if (title.includes("Data Scientist")) return "Work on advanced machine learning projects and data analysis for top-tier clients. This role requires strong statistical knowledge and experience with Python.";
    return "Join our team of experts to work on exciting projects with leading companies. Apply your specialized knowledge to solve challenging problems.";
  };

  const getQualifications = (title: string) => {
    if (title.includes("Math") || title.includes("Physics")) {
      return [
        "Have a Masters or PhD in Physics from a top US university.",
        "Have experience coding in Python, MATLAB for projects or research.",
        "Have field-specific experience in Condensed Matter Physics, Optics, Quantum Information/Computing, Computational Physics, Astrophysics, Particle Physics",
        "Have high attention to detail."
      ];
    }
    if (title.includes("Frontend")) {
      return [
        "3+ years of experience with React and TypeScript.",
        "Strong understanding of modern CSS and responsive design.",
        "Experience with state management libraries (Redux, Zustand).",
        "Familiarity with testing frameworks (Jest, Cypress)."
      ];
    }
    return [
      "Relevant degree or equivalent experience.",
      "Strong problem-solving skills.",
      "Excellent communication abilities.",
      "Ability to work independently and in a team."
    ];
  };

  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/20" onClick={onClose} />
      <div className="w-[500px] bg-white h-full shadow-xl overflow-y-auto animate-in slide-in-from-right">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
            <div className="text-right">
              <p className="text-xl font-semibold text-gray-900">{item.rate}</p>
              <p className="text-sm text-gray-400">per hour</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center gap-1.5 text-sm text-gray-500"><Briefcase className="w-4 h-4" />Hourly contract</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500"><MapPin className="w-4 h-4" />Remote</span>
          </div>
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center"><span className="text-white font-bold">M</span></div>
            <div><p className="font-medium text-gray-900">Posted by {item.company}</p><p className="text-sm text-gray-400">{item.company?.toLowerCase()}.com</p></div>
          </div>

          {/* Application Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Application</h3>
              <span className={`text-sm ${progressPercent === 100 ? "text-blue-600" : "text-gray-500"}`}>{progressPercent === 100 ? "Completed" : `${progressPercent}%`}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-500">{completedSteps} of {steps.length} steps completed</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <span className="text-sm text-gray-400">{progressPercent}%</span>
            </div>
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{step.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${step.completed ? "text-blue-600" : "text-gray-400"}`}>{step.status}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${step.completed ? "bg-blue-600 border-blue-600" : "border-gray-200"}`}>
                      {step.completed && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {item.description || getDescription(item.title)}
            </p>
          </div>

          {/* Qualifications */}
          {(item.qualifications?.length > 0 || getQualifications(item.title).length > 0) && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Ideal Qualifications:</h3>
              <ul className="space-y-2">
                {(item.qualifications?.length > 0 ? item.qualifications : getQualifications(item.title)).map((qual: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <Button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base"
            onClick={() => {
              if (type === "applications" || type === "offers" || type === "saved") {
                navigate(`/dashboard/application/${item.id}`);
              } else if (type === "contracts") {
                alert("Opening contract details...");
              } else {
                alert("Continuing...");
              }
            }}
          >
            {type === "contracts" ? "View Contract" : type === "offers" ? "Accept Offer" : progressPercent > 0 ? "Continue Application" : "Start Application"}
          </Button>
        </div>
      </div>
    </div>
  );
});

DetailPanel.displayName = 'DetailPanel';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("applications");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCardClick = useCallback((item: any, type: string) => {
    setSelectedItem(item);
    setSelectedType(type);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedItem(null);
    setSelectedType("");
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        const url = userEmail
          ? `http://localhost:5000/api/applications?email=${encodeURIComponent(userEmail)}`
          : 'http://localhost:5000/api/applications'; // Fallback or maybe empty?

        const response = await fetch(url);
        const data = await response.json();
        setApplications(data.map((a: any) => ({
          id: a.id || a._id,
          title: a.jobTitle,
          company: "ZeroX",
          rate: a.rate || "$50 - $80/ hour",
          type: "Hourly contract",
          startDate: a.applied,
          status: a.status,
          description: a.details?.summary || "",
          qualifications: [],
        })));
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Tab content data
  const tabContent = {
    contracts: [],
    offers: [],
    applications: applications,
    assessments: [],
    saved: [],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "contracts":
        return tabContent.contracts.length > 0 ? (
          tabContent.contracts.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition-all cursor-pointer" onClick={() => handleCardClick(item, "contracts")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Briefcase className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.rate} • {item.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full font-medium">{item.status}</span>
                  <p className="text-sm text-gray-400">Started {item.startDate}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">No active contracts yet. <button onClick={() => navigate("/dashboard/explore")} className="text-blue-600 hover:underline">Browse opportunities</button></div>
        );

      case "offers":
        return tabContent.offers.length > 0 ? (
          tabContent.offers.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition-all cursor-pointer" onClick={() => handleCardClick(item, "offers")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><CheckSquare className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.rate} • {item.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">{item.status}</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => alert("Offer accepted! 🎉")}>Accept</Button>
                  <Button size="sm" variant="outline" onClick={() => alert("Offer declined.")}>Decline</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">No offers yet. Keep applying!</div>
        );

      case "applications":
        return tabContent.applications.length > 0 ? (
          tabContent.applications.map((item) => (
            <div key={item.id} onClick={() => handleCardClick(item, "applications")} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><FileText className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.rate} • {item.type} • {item.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.status === "In Progress" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>{item.status}</span>
                  <p className="text-sm text-gray-400">Started on {item.startDate}</p>
                  <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
                    Continue <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No active applications.
            <button onClick={() => navigate("/dashboard/explore")} className="text-blue-600 hover:underline ml-1">
              Explore jobs
            </button>
          </div>
        );

      case "assessments":
        return tabContent.assessments.length > 0 ? (
          tabContent.assessments.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Clock className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.type} • {item.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">{item.status}</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => alert("Starting assessment...")}>Start Now</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">No assessments pending.</div>
        );

      case "saved":
        return tabContent.saved.length > 0 ? (
          tabContent.saved.map((item) => (
            <div key={item.id} onClick={() => handleCardClick(item, "saved")} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Star className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.rate} • {item.company}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); alert("Removed from saved jobs."); }}>Remove</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">No saved jobs. <button onClick={() => navigate("/dashboard/explore")} className="text-blue-600 hover:underline">Browse opportunities</button></div>
        );

      default:
        return null;
    }
  };

  // Task visibility state
  const [showPaymentTask, setShowPaymentTask] = useState(() => !localStorage.getItem("task_payment_done"));
  const [showProfileTask, setShowProfileTask] = useState(() => !localStorage.getItem("task_profile_done"));

  const handleTaskAction = (task: "payment" | "profile") => {
    if (task === "payment") {
      localStorage.setItem("task_payment_done", "true");
      setShowPaymentTask(false);
      navigate("/dashboard/earnings");
    } else {
      localStorage.setItem("task_profile_done", "true");
      setShowProfileTask(false);
      navigate("/dashboard/profile");
    }
  };

  const dismissTask = (task: "payment" | "profile", e: React.MouseEvent) => {
    e.stopPropagation();
    if (task === "payment") {
      localStorage.setItem("task_payment_done", "true");
      setShowPaymentTask(false);
    } else {
      localStorage.setItem("task_profile_done", "true");
      setShowProfileTask(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="ml-16">
        <div className="bg-white border-b border-gray-100 px-8 py-6">
          <h1 className="text-xl font-semibold text-gray-900">Welcome back, {localStorage.getItem("userName") || "User"}!</h1>
        </div>

        <main className="p-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

            {(showPaymentTask || showProfileTask) && (
              <div className="mb-8">
                <p className="text-blue-600 text-sm font-medium mb-4">Important Tasks ({(showPaymentTask ? 1 : 0) + (showProfileTask ? 1 : 0)})</p>
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                  {showPaymentTask && (
                    <div className="bg-white rounded-lg p-5 border border-gray-200 relative group">
                      <button onClick={(e) => dismissTask("payment", e)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><CreditCard className="w-5 h-5 text-blue-600" /></div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Setup Your Payments</h3>
                          <p className="text-sm text-gray-500 mb-4">Add your <span className="text-blue-600">payment details</span> to start getting paid.</p>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 text-sm" onClick={() => handleTaskAction("payment")}>Setup Now</Button>
                        </div>
                      </div>
                    </div>
                  )}
                  {showProfileTask && (
                    <div className="bg-white rounded-lg p-5 border border-gray-200 relative group">
                      <button onClick={(e) => dismissTask("profile", e)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-blue-600" /></div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Complete Your Profile</h3>
                          <p className="text-sm text-gray-500 mb-4">Completed profiles are <span className="text-blue-600">52% more likely</span> to be hired.</p>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 text-sm" onClick={() => handleTaskAction("profile")}>Complete now</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="border-b border-gray-200 mb-6">
              <nav className="flex gap-8">
                {[
                  { id: "contracts", label: "Contracts", count: tabContent.contracts.length },
                  { id: "offers", label: "Offers", count: tabContent.offers.length },
                  { id: "applications", label: "Applications", count: tabContent.applications.length },
                  { id: "assessments", label: "Assessments", count: tabContent.assessments.length },
                  { id: "saved", label: "Saved", count: tabContent.saved.length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-1 py-3 text-sm border-b-2 transition-colors capitalize ${activeTab === tab.id ? "font-medium text-blue-600 border-blue-600" : "text-gray-500 hover:text-gray-700 border-transparent"}`}
                  >
                    {tab.label}
                    {tab.count > 0 && <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>{tab.count}</span>}
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              {renderTabContent()}
            </div>
          </motion.div>
        </main>
      </div>
      <DetailPanel item={selectedItem} type={selectedType} onClose={handleClosePanel} />
    </div>
  );
};

export default Dashboard;
