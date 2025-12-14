import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CompanyFormData } from "@/lib/validation";

export interface VerificationChecks {
  domainVerified: boolean;
  emailVerified: boolean;
  businessRegistrationVerified: boolean;
  registrationNumber?: string;
}

interface VerificationChecksStepProps {
  companyData: CompanyFormData;
  onNext: (data: VerificationChecks) => void;
  onBack: () => void;
}

export const VerificationChecksStep = ({ companyData, onNext, onBack }: VerificationChecksStepProps) => {
  const [verificationChecks, setVerificationChecks] = useState<VerificationChecks>({
    domainVerified: false,
    emailVerified: false,
    businessRegistrationVerified: false,
    registrationNumber: companyData.registrationNumber || '',
  });

  const handleChange = (field: keyof VerificationChecks, value: boolean | string) => {
    setVerificationChecks(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onNext(verificationChecks);
  };

  const domain = companyData.website ? new URL(companyData.website).hostname : '';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Verification Checks</h2>
        <p className="text-gray-500 text-sm">Complete the following verification steps to verify your company.</p>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="domain-verification"
              checked={verificationChecks.domainVerified}
              onCheckedChange={(checked) => handleChange('domainVerified', checked === true)}
            />
            <div className="space-y-1">
              <Label htmlFor="domain-verification" className="font-normal">
                Domain Ownership Verification
              </Label>
              <p className="text-sm text-gray-500">
                Add a TXT record to your domain's DNS to verify ownership of {domain}
              </p>
              {!verificationChecks.domainVerified && (
                <div className="mt-2 p-3 bg-blue-50 rounded-md text-sm">
                  <p className="font-medium">Add this TXT record to your domain's DNS:</p>
                  <div className="mt-1 p-2 bg-white rounded border border-gray-200 font-mono text-xs break-all">
                    {`_zerox-verification.${domain} TXT "zerox-verification=${crypto.randomUUID()}"`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="email-verification"
              checked={verificationChecks.emailVerified}
              onCheckedChange={(checked) => handleChange('emailVerified', checked === true)}
            />
            <div className="space-y-1">
              <Label htmlFor="email-verification" className="font-normal">
                Email Verification
              </Label>
              <p className="text-sm text-gray-500">
                We've sent a verification email to {companyData.email}. Please check your inbox.
              </p>
              {!verificationChecks.emailVerified && (
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Resend Verification Email
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="business-verification"
              checked={verificationChecks.businessRegistrationVerified}
              onCheckedChange={(checked) => handleChange('businessRegistrationVerified', checked === true)}
            />
            <div className="space-y-4 flex-1">
              <div className="space-y-1">
                <Label htmlFor="business-verification" className="font-normal">
                  Business Registration Verification
                </Label>
                <p className="text-sm text-gray-500">
                  Verify your business registration details
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registration-number" className="text-sm">
                  Business Registration Number
                </Label>
                <Input
                  id="registration-number"
                  value={verificationChecks.registrationNumber || ''}
                  onChange={(e) => handleChange('registrationNumber', e.target.value)}
                  placeholder="Enter registration number"
                />
                <p className="text-xs text-gray-500">
                  This should match your official business registration document.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Upload Documents</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500">
                      Upload a file
                    </span>{' '}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit}
          disabled={!verificationChecks.domainVerified || 
                   !verificationChecks.emailVerified || 
                   !verificationChecks.businessRegistrationVerified}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
