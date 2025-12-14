import { useState } from "react";
import { VerificationProgress } from "@/components/verification/VerificationProgress";
import { CompanyInfoStep } from "@/components/verification/CompanyInfoStep";
import { RepresentativesStep } from "@/components/verification/RepresentativesStep";
import { VerificationChecksStep } from "@/components/verification/VerificationChecksStep";
import { ReviewStep } from "@/components/verification/ReviewStep";
import { VerificationSuccess } from "@/components/verification/VerificationSuccess";
import { 
  CompanyFormData, 
  RepresentativeFormData, 
  VerificationChecks 
} from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";

type VerificationStep = 'company' | 'representatives' | 'verification' | 'review' | 'success';

const Verification = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<VerificationStep>('company');
  const [completedSteps, setCompletedSteps] = useState<VerificationStep[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [companyData, setCompanyData] = useState<CompanyFormData | null>(null);
  const [representatives, setRepresentatives] = useState<RepresentativeFormData[]>([]);
  const [verificationChecks, setVerificationChecks] = useState<VerificationChecks | null>(null);

  const handleCompanyNext = (data: CompanyFormData) => {
    setCompanyData(data);
    setCompletedSteps(prev => [...prev.filter(s => s !== 'company'), 'company']);
    setCurrentStep('representatives');
  };

  const handleRepresentativesNext = (data: RepresentativeFormData[]) => {
    setRepresentatives(data);
    setCompletedSteps(prev => [...prev.filter(s => s !== 'representatives'), 'representatives']);
    setCurrentStep('verification');
  };

  const handleVerificationNext = (data: VerificationChecks) => {
    setVerificationChecks(data);
    setCompletedSteps(prev => [...prev.filter(s => s !== 'verification'), 'verification']);
    setCurrentStep('review');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setCompletedSteps(prev => [...prev, 'review']);
    
    toast({
      title: "Submitted",
      description: "Your verification request has been received.",
    });
  };

  const handleBack = () => {
    const steps: VerificationStep[] = ['company', 'representatives', 'verification', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'company':
        return (
          <CompanyInfoStep
            initialData={companyData}
            onNext={handleCompanyNext}
            onBack={() => {}}
          />
        );
      case 'representatives':
        return (
          <RepresentativesStep
            initialData={representatives}
            onNext={handleRepresentativesNext}
            onBack={handleBack}
          />
        );
      case 'verification':
        return (
          <VerificationChecksStep
            companyData={companyData}
            onNext={handleVerificationNext}
            onBack={handleBack}
          />
        );
      case 'review':
        return (
          <ReviewStep
            companyData={companyData!}
            representatives={representatives}
            verificationChecks={verificationChecks!}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        );
      case 'success':
        return <VerificationSuccess />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return <VerificationSuccess />;
  }

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Company Verification</h1>
          <p className="text-gray-500">Complete the verification process to access all features</p>
        </div>

        <VerificationProgress currentStep={currentStep} completedSteps={completedSteps} />
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Verification;
