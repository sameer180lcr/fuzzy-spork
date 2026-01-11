import { Search, Filter, Edit, Trash2, Eye, MoreHorizontal, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobListings = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleView = (id: string) => {
    navigate(`/dashboard/jobs/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/company/jobs/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    console.log("Attempting to delete job with ID:", id);
    if (!id) {
      alert("Error: Job ID is missing.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let result: any = {};
      try {
        result = await response.json();
      } catch (e) {
        console.error("Failed to parse delete response:", e);
      }

      console.log("Delete response:", response.status, result);

      if (response.ok) {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
        alert("Job deleted successfully");
      } else {
        alert(`Failed to delete job: ${result.error || response.statusText || 'Unknown error'}. Make sure the backend server is restarted.`);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Error deleting job. Check console for details.");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings');
        const data = await response.json();
        console.log("Fetched jobs raw data:", data);
        const mappedData = data.map((j: any) => ({
          id: String(j._id || j.id),
          title: j.jobTitle,
          department: j.department,
          location: j.location,
          type: j.employmentType,
          minSalary: j.minSalary,
          maxSalary: j.maxSalary,
          applicants: j.applicants || 0,
          status: j.status,
          posted: j.postedDate || "Recently",
          description: j.description,
          requirements: j.requirements,
        }));
        setJobs(mappedData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Job Listings</h1>
          <p className="text-gray-500">Manage and track your job postings</p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => navigate('/company/jobs/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Job
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search jobs..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Salary/hr</TableHead>
              <TableHead>Applicants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell className="text-blue-600 font-medium whitespace-nowrap">
                  ${Math.round((job.minSalary || 0) / 2000)} - ${Math.round((job.maxSalary || 0) / 2000)}
                </TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto">
                    {job.applicants} applicants
                  </Button>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={job.status === 'active' ? 'default' : job.status === 'draft' ? 'secondary' : 'outline'}
                    className={job.status === 'closed' ? 'border-red-200 text-red-700 bg-red-50' : ''}
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(job.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(job.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onSelect={(e) => { e.preventDefault(); handleDelete(job.id); }}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{jobs.length}</span> of{' '}
            <span className="font-medium">{jobs.length}</span> jobs
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

export default JobListings;
