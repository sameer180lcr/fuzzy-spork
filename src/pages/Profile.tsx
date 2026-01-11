import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Upload, Plus, X, Clock, Calendar, HelpCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = ["Resume", "Availability", "Work Preferences", "Communications", "Account"];

const API_URL = "http://localhost:5000/api/profile";
const getUserID = () => localStorage.getItem("userEmail") || "test_user";

// Resume Tab
const ResumeTab = ({ data, onSave }: any) => {
    const [profile, setProfile] = useState({
        fullName: localStorage.getItem("userName") || "",
        email: localStorage.getItem("userEmail") || "",
        phone: "",
        city: "",
        country: "",
        linkedin: "",
        noLinkedin: false,
        summary: "",
        resumeFileName: "",
    });

    useEffect(() => {
        if (data) {
            setProfile(prev => ({
                ...prev,
                fullName: data.account?.fullName || prev.fullName,
                email: data.communication?.email || prev.email,
                phone: data.communication?.phone || data.phone || "",
                city: data.city || "",
                country: data.country || "",
                linkedin: data.linkedin || "",
                noLinkedin: data.noLinkedin || false,
                summary: data.resume || "",
                resumeFileName: data.resumeFileName || "",
            }));
            // If there's a saved resume file name, show it
            if (data.resumeFileName) {
                // Create a mock file object to show the saved file name
                setResumeFile(new File([""], data.resumeFileName, { type: "application/pdf" }));
            }
        }
    }, [data]);

    const [saved, setSaved] = useState(false);
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const handleSave = async () => {
        const updatedData = {
            userId: getUserID(),
            account: { ...data?.account, fullName: profile.fullName },
            communication: { ...data?.communication, email: profile.email, phone: profile.phone },
            resume: profile.summary, // using summary field for resume text
            city: profile.city,
            country: profile.country,
            linkedin: profile.linkedin,
            noLinkedin: profile.noLinkedin,
            resumeFileName: resumeFile?.name || profile.resumeFileName,
        };
        await onSave(updatedData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex gap-16">
            <div className="w-40 shrink-0">
                <h3 className="font-medium text-gray-900 mb-1">Resume</h3>
                <p className="text-sm text-blue-600">This will be shown to companies to find you opportunities</p>
            </div>
            <div className="flex-1 max-w-2xl space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <HelpCircle className="w-3.5 h-3.5 inline text-gray-400 ml-1" /></label>
                        <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:border-blue-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                        <div className="flex">
                            <div className="h-10 px-3 rounded-l-lg border border-r-0 border-gray-200 flex items-center gap-2 bg-gray-50">
                                <span className="text-lg">🇮🇳</span>
                                <span className="text-sm text-gray-500">▼</span>
                            </div>
                            <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="flex-1 h-10 rounded-r-lg border border-gray-200 px-3 text-sm focus:outline-none focus:border-blue-400" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">City <span className="text-red-500">*</span></label>
                        <input type="text" value={profile.city} placeholder="Enter your city" onChange={(e) => setProfile({ ...profile, city: e.target.value })} className={`w-full h-10 rounded-lg border px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 ${!profile.city ? "border-orange-300" : "border-gray-200"}`} />
                        {!profile.city && <p className="text-xs text-orange-500 mt-1">City is required</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Country <span className="text-red-500">*</span></label>
                        <select value={profile.country} onChange={(e) => setProfile({ ...profile, country: e.target.value })} className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:border-blue-400 bg-white">
                            <option value="">Select Country</option>
                            <option value="IN">India</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn URL <span className="text-red-500">*</span></label>
                    <input type="text" value={profile.linkedin} disabled={profile.noLinkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:border-blue-400 ${profile.noLinkedin ? "bg-gray-50 text-gray-400" : !profile.linkedin ? "border-orange-300" : "border-gray-200"}`} />
                    {!profile.noLinkedin && !profile.linkedin && <p className="text-xs text-orange-500 mt-1">LinkedIn URL is required</p>}
                    <label className="flex items-center gap-2 mt-2 text-sm text-gray-500 cursor-pointer">
                        <input type="checkbox" checked={profile.noLinkedin} onChange={(e) => setProfile({ ...profile, noLinkedin: e.target.checked })} className="rounded border-gray-300" />
                        I don't have a LinkedIn
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Resume <span className="text-red-500">*</span></label>
                    <div
                        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${resumeFile ? "border-green-300 bg-green-50" : "border-blue-300 hover:border-blue-400"}`}
                        onClick={() => document.getElementById('resume-upload')?.click()}
                    >
                        <input type="file" id="resume-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                        {resumeFile ? (
                            <>
                                <Check className="w-8 h-8 text-green-500 mx-auto mb-3" />
                                <p className="text-sm font-medium text-gray-900">{resumeFile.name}</p>
                                <p className="text-sm text-gray-400">Click to replace</p>
                            </>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                                <p className="text-sm font-medium text-gray-900">Drop your resume here</p>
                                <p className="text-sm text-gray-400">or <span className="text-blue-600">browse files</span> on your computer</p>
                                <p className="text-xs text-gray-400 mt-2">Supports PDF up to 5MB</p>
                            </>
                        )}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Summary</label>
                    <textarea
                        value={profile.summary}
                        placeholder="Profile Summary - Tell employers about yourself..."
                        onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                        className="w-full h-24 rounded-lg border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                    />
                </div>
                <div className="flex justify-end pt-4">
                    <Button
                        onClick={handleSave}
                        className={`px-8 ${saved ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                    >
                        {saved ? <><Check className="w-4 h-4 mr-2" /> Saved!</> : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Availability Tab
const AvailabilityTab = ({ data, onSave }: any) => {
    const [availability, setAvailability] = useState({
        start: "Immediately",
        hours: "40",
        timezone: "Asia/Kolkata"
    });

    useEffect(() => {
        if (data) {
            setAvailability({
                start: data.availability || "Immediately",
                hours: data.availabilityHours || "40",
                timezone: data.timezone || "Asia/Kolkata"
            });
            if (data.workingHours && data.workingHours.length > 0) {
                setDays(data.workingHours);
            }
        }
    }, [data]);

    const [days, setDays] = useState([
        { day: "S", label: "Sun", active: false, start: "", end: "" },
        { day: "M", label: "Mon", active: true, start: "9:00am", end: "5:00pm" },
        { day: "T", label: "Tue", active: true, start: "9:00am", end: "5:00pm" },
        { day: "W", label: "Wed", active: true, start: "9:00am", end: "5:00pm" },
        { day: "T", label: "Thu", active: true, start: "9:00am", end: "5:00pm" },
        { day: "F", label: "Fri", active: true, start: "9:00am", end: "5:00pm" },
        { day: "S", label: "Sat", active: false, start: "", end: "" },
    ]);
    const [saved, setSaved] = useState(false);

    const toggleDay = (index: number) => {
        const newDays = [...days];
        newDays[index].active = !newDays[index].active;
        if (newDays[index].active) {
            newDays[index].start = "9:00am";
            newDays[index].end = "5:00pm";
        }
        setDays(newDays);
    };

    const updateTime = (index: number, field: 'start' | 'end', value: string) => {
        const newDays = [...days];
        newDays[index][field] = value;
        setDays(newDays);
    };

    const handleSave = async () => {
        const updatedData = {
            userId: getUserID(),
            availability: availability.start,
            availabilityHours: availability.hours,
            timezone: availability.timezone,
            workingHours: days
        };
        await onSave(updatedData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="flex gap-16">
            <div className="w-40 shrink-0">
                <h3 className="font-medium text-gray-900 mb-1">Availability</h3>
                <p className="text-sm text-blue-600">Set when you are typically available for work.</p>
                <p className="text-xs text-gray-400 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex-1 max-w-2xl space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability to start <span className="text-red-500">*</span></label>
                        <p className="text-xs text-gray-400 mb-2">How soon you could begin a new role if offered</p>
                        <select value={availability.start} onChange={(e) => setAvailability({ ...availability, start: e.target.value })} className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:border-blue-400 bg-white">
                            <option>Immediately</option>
                            <option>1-2 weeks</option>
                            <option>2-4 weeks</option>
                            <option>1+ month</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred time commitment <span className="text-red-500">*</span></label>
                        <p className="text-xs text-gray-400 mb-2">Ideal number of hours you'd like to work each week</p>
                        <input type="text" value={availability.hours} placeholder="Ex: 40" onChange={(e) => setAvailability({ ...availability, hours: e.target.value })} className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone <span className="text-red-500">*</span></label>
                    <p className="text-xs text-gray-400 mb-2">Select the time zone you primarily work from.</p>
                    <select value={availability.timezone} onChange={(e) => setAvailability({ ...availability, timezone: e.target.value })} className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:border-blue-400 bg-white">
                        <option value="">Select timezone</option>
                        <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                        <option value="America/New_York">America/New_York (GMT-5)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (GMT-8)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                    </select>
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <h4 className="font-medium text-gray-900">Working hours</h4>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Select when you are typically available to work</p>
                    <div className="space-y-3">
                        {days.map((d, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleDay(i)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${d.active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                                >
                                    {d.day}
                                </button>
                                {d.active ? (
                                    <>
                                        <input
                                            type="text"
                                            value={d.start}
                                            onChange={(e) => updateTime(i, 'start', e.target.value)}
                                            className="w-24 h-9 rounded-lg border border-gray-200 px-3 text-sm text-center focus:outline-none focus:border-blue-400"
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input
                                            type="text"
                                            value={d.end}
                                            onChange={(e) => updateTime(i, 'end', e.target.value)}
                                            className="w-24 h-9 rounded-lg border border-gray-200 px-3 text-sm text-center focus:outline-none focus:border-blue-400"
                                        />
                                        <button onClick={() => toggleDay(i)} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                                        <button className="text-gray-400 hover:text-blue-600"><Plus className="w-4 h-4" /></button>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-sm text-gray-400">Unavailable</span>
                                        <button onClick={() => toggleDay(i)} className="text-gray-400 hover:text-blue-600"><Plus className="w-4 h-4" /></button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <h4 className="font-medium text-gray-900">Date-specific hours</h4>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1"><Plus className="w-4 h-4" /> Add exceptions</Button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Specify date-based exceptions to your weekly availability.</p>
                    <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-blue-600">No active exceptions</div>
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={handleSave} className={`px-8 ${saved ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
                        {saved ? <><Check className="w-4 h-4 mr-2" /> Saved!</> : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Work Preferences Tab
const WorkPreferencesTab = ({ data, onSave }: any) => {
    const domains = ["Software Engineering", "Medicine", "Law", "Data Analysis", "Finance", "Business Operations", "Life, Physical, and Social Science", "Arts & Design", "Language and Audio", "Humanities", "Miscellaneous"];
    const [selected, setSelected] = useState<string[]>([]);
    const [other, setOther] = useState("");

    useEffect(() => {
        if (data) {
            setOther(data.workPreference || "");
            if (data.domainInterests) setSelected(data.domainInterests);
            if (data.compensationFullTime) setFullTime(data.compensationFullTime.toString());
            if (data.compensationPartTime) setPartTime(data.compensationPartTime.toString());
        }
    }, [data]);

    const [fullTime, setFullTime] = useState("0");
    const [partTime, setPartTime] = useState("0");
    const [saved, setSaved] = useState(false);

    const toggleDomain = (d: string) => {
        setSelected(selected.includes(d) ? selected.filter(x => x !== d) : [...selected, d]);
    };

    const handleSave = async () => {
        const updatedData = {
            userId: getUserID(),
            workPreference: other,
            domainInterests: selected,
            compensationFullTime: parseInt(fullTime) || 0,
            compensationPartTime: parseInt(partTime) || 0
        };
        await onSave(updatedData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="flex gap-16">
            <div className="w-40 shrink-0">
                <h3 className="font-medium text-gray-900 mb-1">Work Preferences</h3>
                <p className="text-sm text-blue-600">Define how and when you'd like to work.</p>
            </div>
            <div className="flex-1 max-w-2xl space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900">Domain Interests</h4>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm mb-4"><span className="text-orange-500">What domains are you interested in?</span> <span className="text-gray-500">Select all that apply:</span></p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {domains.map((d) => (
                            <button key={d} onClick={() => toggleDomain(d)} className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${selected.includes(d) ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                                {d}
                            </button>
                        ))}
                    </div>
                    <input type="text" value={other} onChange={(e) => setOther(e.target.value)} placeholder="Others (please specify)" className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h4 className="font-medium text-gray-900">Minimum expected compensation</h4>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full-time</label>
                            <div className="flex items-center">
                                <span className="h-10 px-3 rounded-l-lg border border-r-0 border-gray-200 flex items-center bg-gray-50 text-sm text-gray-500">$</span>
                                <input type="number" value={fullTime} onChange={(e) => setFullTime(e.target.value)} className="flex-1 h-10 border border-gray-200 px-3 text-sm focus:outline-none focus:border-blue-400" />
                                <span className="h-10 px-3 rounded-r-lg border border-l-0 border-gray-200 flex items-center bg-gray-50 text-sm text-gray-500">/ year</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">We won't reach out about roles below this. This stays private.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Part-time</label>
                            <div className="flex items-center">
                                <span className="h-10 px-3 rounded-l-lg border border-r-0 border-gray-200 flex items-center bg-gray-50 text-sm text-gray-500">$</span>
                                <input type="number" value={partTime} onChange={(e) => setPartTime(e.target.value)} className="flex-1 h-10 border border-gray-200 px-3 text-sm focus:outline-none focus:border-blue-400" />
                                <span className="h-10 px-3 rounded-r-lg border border-l-0 border-gray-200 flex items-center bg-gray-50 text-sm text-gray-500">/ hour</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">We won't reach out about roles below this. This stays private.</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={handleSave} className={`px-8 ${saved ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
                        {saved ? <><Check className="w-4 h-4 mr-2" /> Saved!</> : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Communications Tab
const CommunicationsTab = ({ data, onSave }: any) => {
    const [settings, setSettings] = useState({
        email: true, sms: true, fullTime: true, partTime: true, referral: true, jobOpps: true, workUpdates: true, unsubscribe: false
    });
    useEffect(() => {
        if (data && data.communicationPreferences) {
            setSettings({
                email: data.communicationPreferences.emailEnabled ?? true,
                sms: data.communicationPreferences.smsEnabled ?? true,
                fullTime: data.communicationPreferences.fullTimeOpps ?? true,
                partTime: data.communicationPreferences.partTimeOpps ?? true,
                referral: data.communicationPreferences.referralOpps ?? true,
                jobOpps: data.communicationPreferences.jobOpps ?? true,
                workUpdates: data.communicationPreferences.workUpdates ?? true,
                unsubscribe: data.communicationPreferences.unsubscribeAll ?? false
            });
        }
    }, [data]);

    const [saved, setSaved] = useState(false);

    const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
        <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-200"}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );

    const handleSave = async () => {
        const updatedData = {
            userId: getUserID(),
            communicationPreferences: {
                emailEnabled: settings.email,
                smsEnabled: settings.sms,
                fullTimeOpps: settings.fullTime,
                partTimeOpps: settings.partTime,
                referralOpps: settings.referral,
                jobOpps: settings.jobOpps,
                workUpdates: settings.workUpdates,
                unsubscribeAll: settings.unsubscribe
            }
        };
        await onSave(updatedData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="flex gap-16">
            <div className="w-40 shrink-0">
                <h3 className="font-medium text-gray-900 mb-1">Communications</h3>
                <p className="text-sm text-blue-600">Choose how and where you'd like to receive updates.</p>
            </div>
            <div className="flex-1 max-w-2xl space-y-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h4 className="font-medium text-gray-900">Communication channels</h4>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between"><span className="text-sm text-gray-700">Email</span><Toggle checked={settings.email} onChange={() => setSettings({ ...settings, email: !settings.email })} /></div>
                        <div className="flex items-center justify-between"><span className="text-sm text-blue-600">Text message (SMS)</span><Toggle checked={settings.sms} onChange={() => setSettings({ ...settings, sms: !settings.sms })} /></div>
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h4 className="font-medium text-gray-900">Opportunity types</h4>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-blue-600">Full-time opportunities</p><p className="text-sm text-gray-400">Contact me about full-time roles</p></div><Toggle checked={settings.fullTime} onChange={() => setSettings({ ...settings, fullTime: !settings.fullTime })} /></div>
                        <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-blue-600">Part-time opportunities</p><p className="text-sm text-gray-400">Contact me about part-time roles</p></div><Toggle checked={settings.partTime} onChange={() => setSettings({ ...settings, partTime: !settings.partTime })} /></div>
                        <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-blue-600">Referral opportunities</p><p className="text-sm text-gray-400">Contact me about referral opportunities</p></div><Toggle checked={settings.referral} onChange={() => setSettings({ ...settings, referral: !settings.referral })} /></div>
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h4 className="font-medium text-gray-900">General</h4>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-blue-600">Job opportunities</p><p className="text-sm text-gray-400">Receive notifications about new job openings</p></div><Toggle checked={settings.jobOpps} onChange={() => setSettings({ ...settings, jobOpps: !settings.jobOpps })} /></div>
                        <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-blue-600">Work-related updates</p><p className="text-sm text-gray-400">Get updates about offers and contracts</p></div><Toggle checked={settings.workUpdates} onChange={() => setSettings({ ...settings, workUpdates: !settings.workUpdates })} /></div>
                        <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-700">Unsubscribe from all</p><p className="text-sm text-gray-400">Turn this on to stop all outreach</p></div><Toggle checked={settings.unsubscribe} onChange={() => setSettings({ ...settings, unsubscribe: !settings.unsubscribe })} /></div>
                    </div>
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={handleSave} className={`px-8 ${saved ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
                        {saved ? <><Check className="w-4 h-4 mr-2" /> Saved!</> : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Account Tab
const AccountTab = ({ data, onSave }: any) => {
    const [genAI, setGenAI] = useState(true);
    const [saved, setSaved] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    useEffect(() => {
        if (data && data.account) {
            setGenAI(data.account.genAI ?? true);
            if (data.account.avatar) {
                // Mock creating a file object from string for display if needed, or just skip if using URL
                // For now, let's assume if we have a string it's a mock URL or filename
            }
        }
    }, [data]);

    const handleSave = async () => {
        const updatedData = {
            userId: getUserID(),
            account: {
                genAI: genAI,
                avatar: avatarFile ? avatarFile.name : (data?.account?.avatar || "")
            }
        };
        await onSave(updatedData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex gap-16">
            <div className="w-40 shrink-0">
                <h3 className="font-medium text-gray-900 mb-1">Account</h3>
                <p className="text-sm text-blue-600">Input your preference and delete your account.</p>
            </div>
            <div className="flex-1 max-w-2xl space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                        {avatarFile ? <img src={URL.createObjectURL(avatarFile)} alt="Avatar" className="w-full h-full object-cover" /> : "S"}
                    </div>
                    <div>
                        <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                        <Button variant="outline" size="sm" onClick={() => document.getElementById('avatar-upload')?.click()}>Change avatar</Button>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG, or GIF. Max 2 MB.</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-medium text-gray-900 mb-1">Generative profile pictures</h4>
                    <p className="text-sm text-gray-500 mb-2">Let us generate a professional photo from your AI interview.</p>
                    <button onClick={() => setGenAI(!genAI)} className={`w-11 h-6 rounded-full transition-colors ${genAI ? "bg-blue-600" : "bg-gray-200"}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${genAI ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-medium text-gray-900 mb-1">Payout preferences</h4>
                    <p className="text-sm text-gray-500 mb-4">Choose how you want to receive your payouts.</p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 mb-3">
                        <p className="text-sm text-orange-600 font-medium">Only one payout option available</p>
                        <p className="text-sm text-orange-500">This option has been automatically selected for you.</p>
                    </div>
                    <div className="border-2 border-blue-600 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-4 border-blue-600"></div>
                            <div>
                                <p className="font-medium text-gray-900">Standard Payout</p>
                                <p className="text-sm text-gray-500">Funds arrive in your Stripe account, then transfer to bank</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-green-600 font-medium text-sm">Free</span>
                            <p className="text-xs text-gray-400">Up to 5 business days</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-medium text-gray-900 mb-1">Referral status</h4>
                    <p className="text-sm text-gray-500 mb-3">You've been referred by ZeroX</p>
                    <Button variant="outline" size="sm">Not your referrer?</Button>
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-medium text-gray-900 mb-1">Change email</h4>
                    <p className="text-sm text-gray-500 mb-3">Transfer all your data to a new email address.</p>
                    <Button variant="outline" size="sm" onClick={() => alert("Email change feature - Enter your new email")}>Change email</Button>
                </div>
                <div className="border-t border-gray-100 pt-6">
                    <h4 className="font-medium text-gray-900 mb-1">Delete account</h4>
                    <p className="text-sm text-gray-500 mb-3">Permanently delete the account and all data.</p>
                    <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => alert("Are you sure you want to delete your account? This cannot be undone.")}>Delete account</Button>
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={handleSave} className={`px-8 ${saved ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
                        {saved ? <><Check className="w-4 h-4 mr-2" /> Saved!</> : "Save Changes"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Profile = () => {
    const [activeTab, setActiveTab] = useState("Resume");
    const [profileData, setProfileData] = useState<any>(null);

    const fetchProfile = async () => {
        try {
            const res = await fetch(`${API_URL}/${getUserID()}`);
            if (res.ok) {
                const data = await res.json();
                setProfileData(data);
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const saveProfile = async (data: any) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const newData = await res.json();
                setProfileData(newData);
            }
        } catch (error) {
            console.error("Failed to save profile", error);
        }
    };

    const renderTabContent = () => {
        // We pass profileData and saveProfile function to each tab
        // Note: For a real app, use Context or State Management
        switch (activeTab) {
            case "Resume": return <ResumeTab data={profileData} onSave={saveProfile} />;
            case "Availability": return <AvailabilityTab data={profileData} onSave={saveProfile} />;
            case "Work Preferences": return <WorkPreferencesTab data={profileData} onSave={saveProfile} />;
            case "Communications": return <CommunicationsTab data={profileData} onSave={saveProfile} />;
            case "Account": return <AccountTab data={profileData} onSave={saveProfile} />;
            default: return <ResumeTab data={profileData} onSave={saveProfile} />;
        }
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            <Sidebar />
            <div className="ml-16">
                <div className="px-8 pt-6">
                    <h1 className="text-xl font-semibold text-gray-900 mb-6">Profile</h1>
                    <nav className="flex gap-8 border-b border-gray-100">
                        {tabs.map((tab) => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm transition-colors ${activeTab === tab ? "font-medium text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}>
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                <main className="p-8">{renderTabContent()}</main>
            </div>
        </div>
    );
};

export default Profile;
