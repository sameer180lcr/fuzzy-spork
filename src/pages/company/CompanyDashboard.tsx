import { Briefcase, Users, Clock, CheckCircle, Plus, Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const CompanyDashboard = () => {
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [recentApplicants, setRecentApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, applicantsRes] = await Promise.all([
          fetch('http://localhost:5000/api/listings'),
          fetch('http://localhost:5000/api/applications')
        ]);

        if (!jobsRes.ok || !applicantsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const jobsData = await jobsRes.json();
        const applicantsData = await applicantsRes.json();

        setAllJobs(jobsData);
        setAllApplicants(applicantsData);
        setRecentJobs(jobsData.slice(0, 5));
        setRecentApplicants(applicantsData.slice(0, 5));

        // Show success notification
        toast({
          title: "Dashboard Updated",
          description: `Loaded ${jobsData.length} jobs and ${applicantsData.length} applicants`,
        });

        // Set notifications for display
        const notificationList = [];
        
        // Add new applicants notification
        const newApplicants = applicantsData.filter((a: any) => {
          const appliedDate = new Date(a.applied);
          const today = new Date();
          const diffTime = Math.abs(today.getTime() - appliedDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 1;
        });

        if (newApplicants.length > 0) {
          notificationList.push({
            id: 'new-applicants',
            title: 'New Applicants',
            description: `${newApplicants.length} new applicants in the last 24 hours`,
            count: newApplicants.length,
            type: 'info'
          });
        }

        // Add scheduled interviews notification
        const scheduledInterviews = applicantsData.filter((a: any) => 
          a.status?.toLowerCase() === 'interview'
        );

        if (scheduledInterviews.length > 0) {
          notificationList.push({
            id: 'interviews-scheduled',
            title: 'Interviews Scheduled',
            description: `${scheduledInterviews.length} candidates scheduled for interviews`,
            count: scheduledInterviews.length,
            type: 'success'
          });
        }

        // Add test notification if no real notifications exist
        if (notificationList.length === 0) {
          notificationList.push({
            id: 'test-notification',
            title: 'Interviews Scheduled',
            description: '1 candidates scheduled for interviews',
            count: 1,
            type: 'success'
          });
        }

        setNotifications(notificationList);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
        
        // Add test notification even on error
        setNotifications([{
          id: 'test-notification',
          title: 'Interviews Scheduled',
          description: '1 candidates scheduled for interviews',
          count: 1,
          type: 'success'
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const [allJobs, setAllJobs] = useState<any[]>([]);
  const [allApplicants, setAllApplicants] = useState<any[]>([]);

  // Calculate stats based on data
  const stats = [
    {
      title: 'Active Jobs',
      value: allJobs.filter(j => j.status === 'active').length.toString(),
      icon: Briefcase,
      trend: '+2 from last month',
    },
    {
      title: 'Total Applicants',
      value: allApplicants.length.toString(),
      icon: Users,
      trend: '+12 from last month',
    },
    {
      title: 'Interviews Scheduled',
      value: allApplicants.filter(a => a.status?.toLowerCase() === 'interview').length.toString(),
      icon: Clock,
      trend: '+5 from last month',
    },
    {
      title: 'Hired',
      value: allApplicants.filter(a => a.status?.toLowerCase() === 'hired').length.toString(),
      icon: CheckCircle,
      trend: '3 this month',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/company/jobs/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New Job Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Jobs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Recent Job Postings</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/company/jobs" className="text-sm">
              View All
            </Link>
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentJobs.map((job) => (
                <TableRow key={job.id || job._id}>
                  <TableCell className="font-medium">
                    <Link to={`/company/jobs/${job.id || job._id}`} className="hover:underline">
                      {job.jobTitle || job.title}
                    </Link>
                  </TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.employmentType || job.type}</TableCell>
                  <TableCell>{job.applicants}</TableCell>
                  <TableCell>
                    <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Recent Applicants */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Recent Applicants</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/company/applicants" className="text-sm">
              View All
            </Link>
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplicants.map((applicant) => (
                <TableRow key={applicant.id || applicant._id}>
                  <TableCell className="font-medium">{applicant.name}</TableCell>
                  <TableCell>{applicant.jobTitle || applicant.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{applicant.status}</Badge>
                  </TableCell>
                  <TableCell>{applicant.applied}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/company/applicants/${applicant.id || applicant._id}`}>
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
