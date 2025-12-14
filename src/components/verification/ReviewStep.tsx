import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyFormData, RepresentativeFormData, VerificationChecks } from "@/lib/validation";

interface ReviewStepProps {
  companyData: CompanyFormData;
  representatives: RepresentativeFormData[];
  verificationChecks: VerificationChecks;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const ReviewStep = ({
  companyData,
  representatives,
  verificationChecks,
  onSubmit,
  onBack,
  isSubmitting,
}: ReviewStepProps) => {
  const primaryRep = representatives.find(rep => rep.isPrimary) || representatives[0];
  const domain = companyData.website ? new URL(companyData.website).hostname : '';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Review & Submit</h2>
        <p className="text-gray-500 text-sm">
          Please review your information before submitting for verification.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Company Name</p>
                <p className="font-medium">{companyData.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-medium">{domain}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{companyData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="font-medium">{companyData.industry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Company Size</p>
                <p className="font-medium">{companyData.size}</p>
              </div>
              {companyData.registrationNumber && (
                <div>
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="font-medium">{companyData.registrationNumber}</p>
                </div>
              )}
            </div>
            
            <div className="pt-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">
                {companyData.address}<br />
                {companyData.city}, {companyData.country} {companyData.postalCode}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              Representatives ({representatives.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {representatives.map((rep, index) => (
              <div 
                key={rep.id} 
                className={`p-4 rounded-lg ${rep.isPrimary ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{rep.name}</h3>
                      {rep.isPrimary && (
                        <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{rep.role}</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Email: </span>
                    <span className="font-medium">{rep.email}</span>
                  </div>
                  {rep.linkedin && (
                    <div>
                      <span className="text-gray-500">LinkedIn: </span>
                      <a 
                        href={rep.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {rep.linkedin.replace('https://', '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Verification Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${verificationChecks.domainVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span>Domain ownership verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${verificationChecks.emailVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span>Email access verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${verificationChecks.businessRegistrationVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span>Business registration verified</span>
                {verificationChecks.registrationNumber && (
                  <span className="text-sm text-gray-500">
                    (Registration #: {verificationChecks.registrationNumber})
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            By submitting, you confirm that all information is accurate. Verification typically takes 20-30 minutes.
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
        </Button>
      </div>
    </div>
  );
};
