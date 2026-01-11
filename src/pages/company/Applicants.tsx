import { Search, Filter, Calendar, Mail, Phone, MapPin, Clock, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type Applicant = {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  appliedDate: string;
  status: 'new' | 'review' | 'interview' | 'hired' | 'rejected';
  avatar: string;
};

import { useEffect, useState } from 'react';

const Applicants = () => {
  const [applicantList, setApplicantList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/applications');
        const data = await response.json();
        const mappedData = data.map((a: any) => ({
          id: a.id || a._id,
          name: a.name,
          email: a.email,
          phone: a.phone,
          location: a.location || 'Remote',
          position: a.jobTitle,
          appliedDate: a.applied,
          status: a.status?.toLowerCase() || 'new',
          avatar: '',
          details: a.details // Store the full details for the view
        }));
        setApplicantList(mappedData);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  const getStatusBadge = (status: Applicant['status']) => {
    const statusConfig = {
      new: { label: 'New', color: 'bg-blue-100 text-blue-800' },
      review: { label: 'In Review', color: 'bg-yellow-100 text-yellow-800' },
      interview: { label: 'Interview', color: 'bg-purple-100 text-purple-800' },
      hired: { label: 'Hired', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status] || statusConfig.new;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Applicants</h1>
          <p className="text-gray-500">Review and manage all job applicants</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            Export
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search applicants..."
                className="w-full pl-8"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="divide-y">
          {applicantList.map((applicant) => (
            <div key={applicant.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={applicant.avatar} alt={applicant.name} />
                    <AvatarFallback>{getInitials(applicant.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{applicant.name}</h3>
                      {getStatusBadge(applicant.status)}
                    </div>
                    <p className="text-sm text-gray-600">{applicant.position}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {applicant.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {applicant.phone}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {applicant.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Applied on {new Date(applicant.appliedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Link to={`/company/applicants/${applicant.id}`}>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{applicantList.length}</span> of{' '}
            <span className="font-medium">{applicantList.length}</span> applicants
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
