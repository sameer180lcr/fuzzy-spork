import { Outlet, Link, useLocation } from 'react-router-dom';
import { Briefcase, FileText, Users, CreditCard, Settings, ChevronDown, Bell, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState, useEffect } from 'react';

const CompanyLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);

  const navigation = [
    { name: 'Dashboard', href: '/company/dashboard', icon: Briefcase },
    { name: 'Job Listings', href: '/company/jobs', icon: FileText },
    { name: 'Applicants', href: '/company/applicants', icon: Users },
    { name: 'Payments', href: '/company/payments', icon: CreditCard },
  ];

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applications');
        if (response.ok) {
          const applicants = await response.json();
          
          // Get current company's jobs (assuming current company ID is stored or we need to filter by company)
          // For now, we'll assume we need to filter applicants that applied to jobs created by this company
          // This would typically require authentication to get the current company's ID
          
          // For demo purposes, let's assume we have a way to identify current company's jobs
          // In a real app, this would come from authentication context or user session
          const currentCompanyId = 'company-1'; // This should come from auth context
          
          // Count unread notifications for this company's jobs only
          const companyApplicants = applicants.filter((a: any) => {
            // For now, show all applicants (in real app, filter by company)
            const appliedDate = new Date(a.applied);
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - appliedDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7; // Last 7 days
          });

          // Show all recent applicants as notifications
          const newApplicants = companyApplicants.filter((a: any) => {
            // Include all statuses to show new applications
            return true;
          });

          const scheduledInterviews = companyApplicants.filter((a: any) => 
            a.status?.toLowerCase() === 'interview'
          );

          const hiredApplicants = companyApplicants.filter((a: any) => 
            a.status?.toLowerCase() === 'hired'
          );

          setNotificationCount(newApplicants.length + scheduledInterviews.length + hiredApplicants.length);

          // Set recent notifications for dropdown (max 5) - only for this company
          const recent = [];
          
          // Add recent applicants for this company
          newApplicants.slice(0, 3).forEach((applicant: any) => {
            recent.push({
              id: `applicant-${applicant._id}`,
              title: 'New Application',
              description: `${applicant.name} applied for ${applicant.jobTitle}`,
              type: 'info',
              timestamp: applicant.applied,
              relatedId: applicant._id,
              companyId: currentCompanyId
            });
          });

          // Add scheduled interviews for this company
          scheduledInterviews.slice(0, 2).forEach((applicant: any) => {
            recent.push({
              id: `interview-${applicant._id}`,
              title: 'Interview Scheduled',
              description: `Interview for ${applicant.name} - ${applicant.jobTitle}`,
              type: 'success',
              timestamp: applicant.applied,
              relatedId: applicant._id,
              companyId: currentCompanyId
            });
          });

          // Sort by timestamp and take latest 5
          recent.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setRecentNotifications(recent.slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching notification data:', error);
      }
    };

    fetchNotificationData();
    // Refresh count every 30 seconds
    const interval = setInterval(fetchNotificationData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="ml-2 text-lg font-semibold">Company Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end" sideOffset={5}>
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Notifications</h4>
                    <Link to="/company/notifications">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        View all
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {recentNotifications.length > 0 ? (
                    recentNotifications.map((notification) => (
                      <Link 
                        key={notification.id} 
                        to={`/company/applicants/${notification.relatedId}`}
                        className="block"
                      >
                        <div className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{notification.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                {new Date(notification.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No new notifications</p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 overflow-y-auto`}>
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <Briefcase className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-semibold">TalentForge</span>
            </div>
          </div>
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    location.pathname === item.href ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Bottom section */}
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <div className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Company Admin</p>
              </div>
              <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-64 pt-14 lg:pt-0">
          {/* Top bar */}
          <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-full max-w-md"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                          {notificationCount > 99 ? '99+' : notificationCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="end" sideOffset={5}>
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Notifications</h4>
                        <Link to="/company/notifications">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            View all
                          </Button>
                        </Link>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {recentNotifications.length > 0 ? (
                        recentNotifications.map((notification) => (
                          <Link 
                            key={notification.id} 
                            to={`/company/applicants/${notification.relatedId}`}
                            className="block"
                          >
                            <div className="p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors">
                              <div className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                  notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                }`} />
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                                  <p className="text-xs text-gray-500 mt-2">
                                    {new Date(notification.timestamp).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No new notifications</p>
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-sm font-medium text-gray-700">John Doe</span>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CompanyLayout;
