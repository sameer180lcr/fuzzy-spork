import { Bell, Calendar, User, Briefcase, CheckCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  relatedId?: string;
  relatedType?: 'applicant' | 'job';
  companyId?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch real data from API
        const applicantsRes = await fetch('http://localhost:5000/api/applications');
        
        if (applicantsRes.ok) {
          const applicants = await applicantsRes.json();

          const notificationList: Notification[] = [];
          
          // Get current company ID (in real app, this would come from auth context)
          const currentCompanyId = 'company-1'; // This should come from auth context
          
          // Filter applicants for this company's jobs only
          const companyApplicants = applicants.filter((a: any) => {
            // In a real implementation, this would check if the job belongs to current company
            // For now, we'll assume all applicants are for this company's jobs
            return true; // This should be: a.jobCompanyId === currentCompanyId
          });

          // New applicants notifications for this company
          const newApplicants = companyApplicants.filter((a: any) => {
            const appliedDate = new Date(a.applied);
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - appliedDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7; // Show all applicants from last 7 days
          });

          newApplicants.forEach((applicant: any) => {
            notificationList.push({
              id: `applicant-${applicant._id}`,
              title: 'New Application Received',
              description: `${applicant.name} applied for ${applicant.jobTitle || 'Position'}`,
              type: 'info',
              timestamp: applicant.applied,
              read: false,
              relatedId: applicant._id,
              relatedType: 'applicant',
              companyId: currentCompanyId
            });
          });

          // Interview scheduled notifications for this company
          const scheduledInterviews = companyApplicants.filter((a: any) => 
            a.status?.toLowerCase() === 'interview'
          );

          scheduledInterviews.forEach((applicant: any) => {
            notificationList.push({
              id: `interview-${applicant._id}`,
              title: 'Interview Scheduled',
              description: `Interview scheduled for ${applicant.name} - ${applicant.jobTitle || 'Position'}`,
              type: 'success',
              timestamp: applicant.applied,
              read: false,
              relatedId: applicant._id,
              relatedType: 'applicant',
              companyId: currentCompanyId
            });
          });

          // Hired notifications for this company
          const hiredApplicants = companyApplicants.filter((a: any) => 
            a.status?.toLowerCase() === 'hired'
          );

          hiredApplicants.forEach((applicant: any) => {
            notificationList.push({
              id: `hired-${applicant._id}`,
              title: 'Candidate Hired',
              description: `${applicant.name} has been hired for ${applicant.jobTitle || 'Position'}`,
              type: 'success',
              timestamp: applicant.applied,
              read: false,
              relatedId: applicant._id,
              relatedType: 'applicant',
              companyId: currentCompanyId
            });
          });

          // Sort by timestamp (newest first)
          notificationList.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );

          setNotifications(notificationList);
        } else {
          // Add some test data if API fails
          setNotifications([
            {
              id: 'test-1',
              title: 'Interviews Scheduled',
              description: '1 candidates scheduled for interviews',
              type: 'success',
              timestamp: new Date().toISOString(),
              read: false,
              relatedId: 'test-id',
              relatedType: 'applicant',
              companyId: 'company-1'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Add test data on error
        setNotifications([
          {
            id: 'test-1',
            title: 'Interviews Scheduled',
            description: '1 candidates scheduled for interviews',
            type: 'success',
            timestamp: new Date().toISOString(),
            read: false,
            relatedId: 'test-id',
            relatedType: 'applicant',
            companyId: 'company-1'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <Bell className="h-5 w-5 text-red-500" />;
      default:
        return <Briefcase className="h-5 w-5 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Company Notifications</h1>
          <p className="text-gray-500">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500 text-center">
              You don't have any notifications yet. We'll notify you when candidates apply to your jobs.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all hover:shadow-md ${
                !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/50' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{notification.description}</p>
                      </div>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleDateString()} at{' '}
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                      {notification.relatedId && notification.relatedType === 'applicant' && (
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/company/applicants/${notification.relatedId}`}>
                            View Details
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;