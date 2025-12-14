import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const VerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 px-4">
      <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-gray-900">
        Verification Submitted Successfully!
      </h2>
      <p className="mt-2 text-gray-600">
        Thank you for submitting your company for verification. Our team will review your 
        information and get back to you within 24-48 hours.
      </p>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg text-left max-w-2xl mx-auto">
        <h3 className="font-medium text-blue-800">What happens next?</h3>
        <ul className="mt-2 text-sm text-blue-700 space-y-2 list-disc list-inside">
          <li>Our team will review your submitted information</li>
          <li>We may contact you for additional verification if needed</li>
          <li>You'll receive an email notification once verification is complete</li>
          <li>Your account will be upgraded with verified status upon approval</li>
        </ul>
      </div>

      <div className="mt-10">
        <Button
          type="button"
          className="mx-auto"
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};
