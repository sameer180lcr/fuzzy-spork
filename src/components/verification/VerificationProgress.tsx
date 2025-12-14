import { VerificationStep } from "@/types/company";

interface VerificationProgressProps {
  currentStep: VerificationStep;
  completedSteps: VerificationStep[];
}

const steps = [
  { id: 'company', name: 'Company Info' },
  { id: 'representatives', name: 'Representatives' },
  { id: 'verification', name: 'Verification' },
  { id: 'review', name: 'Review' },
];

export const VerificationProgress = ({ currentStep, completedSteps }: VerificationProgressProps) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <nav className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id as VerificationStep);
          const isCurrent = step.id === currentStep;
          const status = isCurrent ? 'current' : isCompleted ? 'completed' : 'upcoming';

          return (
            <li key={step.id} className="flex-1">
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${status === 'completed' ? 'bg-blue-600 text-white' : status === 'current' ? 'bg-white border-2 border-blue-600 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                  {status === 'completed' ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium ${status === 'current' ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
