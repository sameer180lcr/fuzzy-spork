import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Upload, Plus, Trash2, Camera, Mic, Video, CheckCircle2, Circle, X } from "lucide-react";
import ZeroXLogo from "@/components/ZeroXLogo";
import ExpertInterview from "./ExpertInterview";
import ExpertInterview2 from "./ExpertInterview2";

const ApplicationProcess = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);

    // Form States
    const [phoneCode, setPhoneCode] = useState("+91");
    const [country, setCountry] = useState("");

    // Dynamic Sections State
    const [sectionData, setSectionData] = useState<Record<string, any[]>>({
        "Education": [],
        "Work Experience": [],
        "Projects": [],
        "Publications": [],
        "Certifications": [],
        "Awards": [],
        "Profiles": [],
        "Links": []
    });

    // State for job details
    const [jobData, setJobData] = useState<any>(null);

    // Form data states
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [summary, setSummary] = useState("");
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [interviewPhase, setInterviewPhase] = useState(1);
    const [interviewTranscript, setInterviewTranscript] = useState<any[]>([]);
    const [architectureTask, setArchitectureTask] = useState<any>(null);

    // Fetch job data
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/listings/${id}`);
                const data = await response.json();
                setJobData(data);
            } catch (error) {
                console.error("Error fetching job:", error);
            }
        };
        if (id) fetchJob();
    }, [id]);

    // Fetch and autofill profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const USER_ID = localStorage.getItem("userEmail") || "test_user";
                const response = await fetch(`http://localhost:5000/api/profile/${USER_ID}`);
                if (response.ok) {
                    const profileData = await response.json();

                    // Autofill form fields from profile
                    if (profileData.account?.fullName) setFullName(profileData.account.fullName);
                    if (profileData.communication?.email) setEmail(profileData.communication.email);
                    if (profileData.communication?.phone) setPhoneNumber(profileData.communication.phone);
                    if (profileData.city) setCity(profileData.city);
                    if (profileData.linkedin) setLinkedIn(profileData.linkedin);
                    if (profileData.resume) setSummary(profileData.resume);

                    // Show previously uploaded resume file if exists
                    if (profileData.resumeFileName) {
                        // Create a mock file to show the filename
                        const mockFile = new File([""], profileData.resumeFileName, { type: "application/pdf" });
                        setResumeFile(mockFile);
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const steps = [
        { id: 1, title: "Upload Resume", status: currentStep > 1 ? "completed" : "current" },
        { id: 2, title: "Domain Expert Interview", status: currentStep > 2 ? "completed" : currentStep === 2 ? "current" : "upcoming" },
        { id: 3, title: "Work Authorization", status: currentStep > 3 ? "completed" : currentStep === 3 ? "current" : "upcoming" },
    ];

    const handleNext = async () => {
        if (currentStep < 3) {
            // Save partial progress to profile if needed
            try {
                await fetch("http://localhost:5000/api/profile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: email || localStorage.getItem("userEmail") || "test_user",
                        fullName,
                        city,
                        education: sectionData["Education"],
                        experience: sectionData["Work Experience"],
                        projects: sectionData["Projects"],
                    }),
                });
            } catch (e) {
                console.error("Failed to save progress", e);
            }
            setCurrentStep(currentStep + 1);
        } else {
            // Submit final application
            try {
                const applicationData = {
                    jobId: id,
                    jobTitle: jobData?.jobTitle || "Unknown Position",
                    name: fullName,
                    email: email,
                    phone: `${phoneCode} ${phoneNumber}`,
                    location: city,
                    status: "New",
                    applied: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    resumeFileName: resumeFile?.name || "",
                    details: {
                        summary,
                        linkedIn,
                        education: sectionData["Education"],
                        experience: sectionData["Work Experience"],
                        interviewTranscript,
                        architectureTask
                    }
                };

                const response = await fetch("http://localhost:5000/api/applications", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(applicationData),
                });

                if (!response.ok) throw new Error("Failed to submit application");

                alert("Application Submitted!");
                navigate("/dashboard");
            } catch (error) {
                console.error("Error submitting application:", error);
                alert("Failed to submit application. Please try again.");
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigate("/dashboard");
        }
    };

    const addItem = (section: string) => {
        setSectionData(prev => ({
            ...prev,
            [section]: [...(prev[section] || []), { id: Date.now() }]
        }));
    };

    const removeItem = (section: string, id: number) => {
        setSectionData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar - Hide on Step 2 */}
            {currentStep !== 2 && (
                <div className="w-80 border-r border-gray-100 flex flex-col h-screen sticky top-0 bg-white z-10">
                    <div className="p-6 border-b border-gray-100">
                        <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent text-gray-500 hover:text-gray-900" onClick={handleBack}>
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Go Back
                        </Button>
                        <h2 className="font-semibold text-gray-900 mb-2">{jobData?.jobTitle || "Loading..."}</h2>
                        <p className="text-xs text-gray-500 mb-4">Application</p>

                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex-1 h-1 bg-gray-100 rounded-full">
                                <div
                                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-400">
                                {currentStep} of 3 steps done
                            </span>
                        </div>
                    </div>

                    <div className="p-4 space-y-1 overflow-y-auto flex-1">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${step.status === "current" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                onClick={() => setCurrentStep(step.id)}
                            >
                                {step.status === "completed" ? (
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                ) : step.status === "current" ? (
                                    <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                                    </div>
                                ) : (
                                    <Circle className="w-5 h-5 text-gray-300" />
                                )}
                                <span className="text-sm font-medium">{step.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto h-screen bg-white">
                <main className={currentStep === 2 ? "h-full p-0" : "max-w-4xl mx-auto p-8 py-12"}>
                    {currentStep === 1 && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload resume</h1>
                                <p className="text-gray-500 text-sm">Please upload your resume to autofill the application. You can upload process and help us evaluate your qualifications.</p>
                            </div>

                            {/* Resume Upload Box */}
                            <div
                                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer group ${resumeFile ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50/50 hover:bg-blue-50/30 hover:border-blue-300'
                                    }`}
                                onClick={() => document.getElementById('resume-file-upload')?.click()}
                            >
                                <input
                                    type="file"
                                    id="resume-file-upload"
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setResumeFile(e.target.files[0]);
                                        }
                                    }}
                                />
                                {resumeFile ? (
                                    <>
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-1">{resumeFile.name}</h3>
                                        <p className="text-xs text-gray-500">Click to replace</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Click to upload or drag and drop</h3>
                                        <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max. 5MB)</p>
                                    </>
                                )}
                            </div>

                            {/* Personal Details */}
                            <div className="space-y-6 pt-4">
                                <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Personal Details</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Full name *</label>
                                        <Input
                                            placeholder="Enter your full name"
                                            className="bg-gray-100 border-gray-300 cursor-not-allowed"
                                            value={fullName}
                                            disabled
                                            readOnly
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email *</label>
                                        <Input
                                            placeholder="Enter your email"
                                            className="bg-gray-100 border-gray-300 cursor-not-allowed"
                                            value={email}
                                            disabled
                                            readOnly
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Phone</label>
                                        <div className="flex gap-2">
                                            <div className="w-24">
                                                <select
                                                    className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    value={phoneCode}
                                                    onChange={(e) => setPhoneCode(e.target.value)}
                                                >
                                                    <option value="+91">🇮🇳 +91</option>
                                                    <option value="+1">🇺🇸 +1</option>
                                                    <option value="+44">🇬🇧 +44</option>
                                                    <option value="+81">🇯🇵 +81</option>
                                                    <option value="+86">🇨🇳 +86</option>
                                                </select>
                                            </div>
                                            <Input
                                                placeholder="9876543210"
                                                className="flex-1 bg-gray-50 border-gray-200"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">City *</label>
                                        <Input
                                            placeholder="Enter your city"
                                            className="bg-gray-50 border-gray-200"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-sm font-medium text-gray-700">LinkedIn URL</label>
                                        <Input
                                            placeholder="https://linkedin.com/in/username"
                                            className="bg-gray-50 border-gray-200"
                                            value={linkedIn}
                                            onChange={(e) => setLinkedIn(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-sm font-medium text-gray-700">Summary</label>
                                        <textarea
                                            className="w-full min-h-[100px] p-3 rounded-md border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                            placeholder="Write a brief summary about yourself..."
                                            value={summary}
                                            onChange={(e) => setSummary(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Sections */}
                            {["Education", "Work Experience", "Projects", "Publications", "Certifications", "Awards", "Profiles", "Links"].map((section) => (
                                <div key={section} className="space-y-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">{section}</h3>
                                        <span className="text-xs text-gray-400">{sectionData[section]?.length || 0} items</span>
                                    </div>

                                    {/* Render Items */}
                                    <div className="space-y-4">
                                        {sectionData[section]?.map((item, index) => (
                                            <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group animate-in slide-in-from-bottom-2">
                                                <button
                                                    onClick={() => removeItem(section, item.id)}
                                                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-500">
                                                            {section === "Education" ? "Institution" : section === "Work Experience" ? "Company" : "Title / Name"}
                                                        </label>
                                                        <Input className="bg-white" placeholder="Enter name..." />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-medium text-gray-500">
                                                            {section === "Education" ? "Degree" : section === "Work Experience" ? "Role" : "Subtitle / Role"}
                                                        </label>
                                                        <Input className="bg-white" placeholder="Enter subtitle..." />
                                                    </div>
                                                    <div className="col-span-2 space-y-1">
                                                        <label className="text-xs font-medium text-gray-500">Description</label>
                                                        <textarea
                                                            className="w-full min-h-[60px] p-2 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                            placeholder="Add details..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-dashed border-blue-200 w-full"
                                        onClick={() => addItem(section)}
                                    >
                                        <Plus className="w-4 h-4 mr-1.5" /> Add {section}
                                    </Button>
                                </div>
                            ))}

                            {/* Bottom Action */}
                            <div className="pt-8 flex justify-end">
                                <Button
                                    onClick={handleNext}
                                    className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-in fade-in zoom-in-95 duration-500 h-full w-full">
                            {interviewPhase === 1 ? (
                                <ExpertInterview
                                    isEmbedded={true}
                                    onComplete={(transcript) => {
                                        setInterviewTranscript(transcript);
                                        setInterviewPhase(2);
                                    }}
                                />
                            ) : (
                                <ExpertInterview2
                                    onComplete={(taskData) => {
                                        setArchitectureTask(taskData);
                                        setCurrentStep(3);
                                    }}
                                />
                            )}
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Work authorization</h1>
                            <p className="text-gray-500 text-sm mb-8">Please ensure you meet legal employment requirements for work authorization. Incorrect information helps us process your application smoothly.</p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Date of birth (MM/DD/YYYY) *</label>
                                    <Input placeholder="MM/DD/YYYY" className="bg-white border-gray-200" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Country of Residence *</label>
                                    <select
                                        className="w-full h-10 px-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="" disabled>Select country</option>
                                        <option value="us">United States</option>
                                        <option value="in">India</option>
                                        <option value="uk">United Kingdom</option>
                                        <option value="ca">Canada</option>
                                        <option value="de">Germany</option>
                                        <option value="fr">France</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Physical Location *</label>
                                    <Input placeholder="City, Country" className="bg-white border-gray-200" />
                                </div>

                                <div className="pt-4 flex items-start gap-3">
                                    <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-600" id="auth" />
                                    <label htmlFor="auth" className="text-sm text-gray-600 leading-relaxed">
                                        I am authorized to work in this country. I am physically located and I HAVE READ visa sponsorship work. <span className="text-red-500">*</span>
                                    </label>
                                </div>

                                <div className="pt-4 text-xs text-blue-600">
                                    <a href="#" className="hover:underline">By completing this section, you confirm you've reviewed and agree with Mercor's Terms and Conditions</a>
                                </div>

                                <div className="pt-6">
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                                        onClick={handleNext}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ApplicationProcess;
