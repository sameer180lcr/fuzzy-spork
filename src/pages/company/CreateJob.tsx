import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useParams, useNavigate } from 'react-router-dom';

const CreateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [benefits, setBenefits] = useState<string[]>(['Health Insurance', '401K']);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript']);
  const [newBenefit, setNewBenefit] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [formData, setFormData] = useState({
    jobTitle: 'Senior Frontend Developer',
    department: '',
    employmentType: '',
    experienceLevel: '',
    positions: '1',
    location: 'New York, NY',
    workArrangement: '',
    minSalary: '80000',
    maxSalary: '100000',
    requirements: '',
    jobDescription: 'Describe the role, team culture, and what makes this opportunity exciting...',
    responsibilities: 'List the main duties and responsibilities for this role.',
    applicationDeadline: '',
    urgentHiring: false,
    featuredListing: false,
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchJob = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/listings/${id}`);
          const data = await response.json();
          setFormData({
            jobTitle: data.jobTitle,
            department: data.department,
            employmentType: data.employmentType,
            experienceLevel: data.experienceLevel || '',
            positions: data.positions || '1',
            location: data.location,
            workArrangement: data.workArrangement || '',
            minSalary: data.minSalary.toString(),
            maxSalary: data.maxSalary.toString(),
            requirements: Array.isArray(data.requirements) ? data.requirements.join('\n') : data.requirements,
            jobDescription: data.description,
            responsibilities: data.responsibilities || '',
            applicationDeadline: data.applicationDeadline || '',
            urgentHiring: data.urgentHiring,
            featuredListing: data.featuredListing,
          });
          setBenefits(data.benefits || []);
          // If you have skills in the model, set them here too
        } catch (error) {
          console.error("Error fetching job for edit:", error);
        }
      };
      fetchJob();
    }
  }, [id, isEditMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit)) {
      setBenefits([...benefits, newBenefit]);
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefit: string) => {
    setBenefits(benefits.filter(b => b !== benefit));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const url = isEditMode ? `http://localhost:5000/api/listings/${id}` : 'http://localhost:5000/api/listings';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle: formData.jobTitle,
          department: formData.department || 'Engineering',
          location: formData.location,
          employmentType: formData.employmentType || 'Full-time',
          minSalary: Number(formData.minSalary),
          maxSalary: Number(formData.maxSalary),
          description: formData.jobDescription,
          requirements: formData.requirements ? formData.requirements.split('\n').filter(r => r.trim() !== '') : [],
          benefits: benefits,
          urgentHiring: formData.urgentHiring,
          featuredListing: formData.featuredListing,
          status: 'active',
          // applicants: 0, // Don't reset applicants on edit
        }),
      });

      if (!response.ok) {
        throw new Error(isEditMode ? 'Failed to update job' : 'Failed to publish job');
      }

      alert(isEditMode ? 'Job updated successfully!' : 'Job published successfully!');
      navigate('/company/jobs');
    } catch (error) {
      console.error('Error saving job:', error);
      alert(`Failed to ${isEditMode ? 'update' : 'publish'} job. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Job Listing' : 'Create New Job'}</h1>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={(value) => handleSelectChange('department', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select onValueChange={(value) => handleSelectChange('employmentType', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select onValueChange={(value) => handleSelectChange('experienceLevel', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry Level">Entry Level</SelectItem>
                    <SelectItem value="Mid Level">Mid Level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="positions">Number of Positions</Label>
                <Input
                  id="positions"
                  name="positions"
                  type="number"
                  min="1"
                  value={formData.positions}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="e.g., New York, NY"
                />
              </div>
              <div>
                <Label htmlFor="workArrangement">Work Arrangement</Label>
                <Select onValueChange={(value) => handleSelectChange('workArrangement', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select arrangement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="On-site">On-site</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Compensation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="minSalary">Minimum Salary (USD)</Label>
                <Input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  value={formData.minSalary}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="e.g., 80000"
                />
              </div>
              <div>
                <Label htmlFor="maxSalary">Maximum Salary (USD)</Label>
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  value={formData.maxSalary}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="e.g., 100000"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Benefits & Perks</Label>
                <div className="mt-1 flex gap-2 flex-wrap">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                      {benefit}
                      <button
                        type="button"
                        onClick={() => removeBenefit(benefit)}
                        className="ml-2 text-blue-400 hover:text-blue-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <div className="flex">
                    <Input
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="Add a benefit..."
                      className="w-40"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addBenefit}
                      className="ml-2"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Requirements */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Skills & Requirements</h2>
            <div className="space-y-6">
              <div>
                <Label>Required Skills</Label>
                <div className="mt-1 flex gap-2 flex-wrap">
                  {skills.map((skill) => (
                    <div key={skill} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-green-400 hover:text-green-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <div className="flex">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      className="w-40"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSkill}
                      className="ml-2"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="mt-1 min-h-[100px]"
                  placeholder="List the education, certifications, and experience required..."
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Job Details</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  className="mt-1 min-h-[120px]"
                />
              </div>
              <div>
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div className="md:w-1/2">
                <Label htmlFor="applicationDeadline">Application Deadline</Label>
                <Input
                  id="applicationDeadline"
                  name="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-l p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-6">Posting Options</h2>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="urgentHiring">Urgent Hiring</Label>
              <p className="text-sm text-gray-500">Highlight this job as urgent</p>
            </div>
            <Switch
              id="urgentHiring"
              checked={formData.urgentHiring}
              onCheckedChange={(checked) => setFormData({ ...formData, urgentHiring: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="featuredListing">Featured Listing</Label>
              <p className="text-sm text-gray-500">Feature this job at the top of search results</p>
            </div>
            <Switch
              id="featuredListing"
              checked={formData.featuredListing}
              onCheckedChange={(checked) => setFormData({ ...formData, featuredListing: checked })}
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Preview</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium">{formData.jobTitle || 'Job Title'}</h4>
            <p className="text-sm text-gray-500 mt-1">
              {formData.location || 'Location'} • {formData.employmentType || 'Employment Type'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              ${formData.minSalary || '0'} - ${formData.maxSalary || '0'} {formData.minSalary || formData.maxSalary ? 'per year' : ''}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Job'}
          </Button>
          <Button variant="outline" className="w-full">
            Save as Draft
          </Button>
          <Button variant="ghost" className="w-full text-gray-600 hover:bg-gray-100">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
