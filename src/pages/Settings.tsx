import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Lock, 
  CreditCard, 
  Users, 
  Palette,
  Globe,
  Zap,
  ChevronRight,
  Check
} from "lucide-react";

const settingsSections = [
  {
    icon: User,
    title: "Profile",
    description: "Manage your personal information and preferences",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure email and push notification settings",
  },
  {
    icon: Lock,
    title: "Security",
    description: "Password, two-factor authentication, and sessions",
  },
  {
    icon: CreditCard,
    title: "Billing",
    description: "Manage your subscription and payment methods",
  },
  {
    icon: Users,
    title: "Team",
    description: "Invite team members and manage permissions",
  },
  {
    icon: Zap,
    title: "Integrations",
    description: "Connect with third-party tools and services",
  },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newCandidates: true,
    interviewReminders: true,
    weeklyDigest: false,
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Settings" subtitle="Manage your account and preferences" />
        
        <main className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-4 gap-8"
          >
            {/* Settings Navigation */}
            <div className="col-span-1">
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.title}
                    onClick={() => setActiveSection(section.title)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.title
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Settings Content */}
            <div className="col-span-3">
              {activeSection === "Profile" && (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-lg font-semibold mb-6">Profile Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center">
                        <span className="text-2xl font-semibold">JD</span>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Change Photo</Button>
                        <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full h-10 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full h-10 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="john@company.com"
                        className="w-full h-10 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        defaultValue="Acme Inc."
                        className="w-full h-10 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === "Notifications" && (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: "emailAlerts", label: "Email alerts", desc: "Receive important updates via email" },
                      { key: "newCandidates", label: "New candidate matches", desc: "Get notified when AI finds new matches" },
                      { key: "interviewReminders", label: "Interview reminders", desc: "Reminders before scheduled interviews" },
                      { key: "weeklyDigest", label: "Weekly digest", desc: "Summary of hiring activity" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                        <div>
                          <p className="font-medium text-sm">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                          className={`w-11 h-6 rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-secondary"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-background shadow-sm transition-transform ${
                            notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeSection === "Security" && (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-lg font-semibold mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-secondary/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Password</p>
                          <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-secondary/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Two-factor authentication</p>
                          <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-secondary/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Active sessions</p>
                          <p className="text-xs text-muted-foreground">2 devices currently logged in</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === "Billing" && (
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold">Current Plan</h2>
                        <p className="text-sm text-muted-foreground">You're on the Pro plan</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-0">Pro</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 rounded-xl bg-secondary/30">
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-muted-foreground">Active jobs</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30">
                        <p className="text-2xl font-bold">∞</p>
                        <p className="text-xs text-muted-foreground">AI interviews</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30">
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-xs text-muted-foreground">Team members</p>
                      </div>
                    </div>
                    
                    <Button variant="outline">Upgrade Plan</Button>
                  </div>
                  
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-7 rounded bg-foreground flex items-center justify-center">
                          <span className="text-background text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                          <p className="text-xs text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === "Team" && (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Team Members</h2>
                    <Button size="sm">Invite Member</Button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: "John Doe", email: "john@company.com", role: "Admin" },
                      { name: "Sarah Chen", email: "sarah@company.com", role: "Recruiter" },
                      { name: "Mike Johnson", email: "mike@company.com", role: "Viewer" },
                    ].map((member) => (
                      <div key={member.email} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-sm font-medium">{member.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{member.role}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeSection === "Integrations" && (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-lg font-semibold mb-6">Connected Integrations</h2>
                  
                  <div className="space-y-4">
                    {[
                      { name: "Slack", desc: "Get notifications in Slack channels", connected: true },
                      { name: "Google Calendar", desc: "Sync interview schedules", connected: true },
                      { name: "LinkedIn", desc: "Import candidate profiles", connected: false },
                      { name: "GitHub", desc: "Verify candidate contributions", connected: false },
                    ].map((integration) => (
                      <div key={integration.name} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                            <Globe className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{integration.name}</p>
                            <p className="text-xs text-muted-foreground">{integration.desc}</p>
                          </div>
                        </div>
                        <Button variant={integration.connected ? "outline" : "default"} size="sm">
                          {integration.connected ? "Connected" : "Connect"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
