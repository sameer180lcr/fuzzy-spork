import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { representativeFormSchema, RepresentativeFormData as BaseRepresentativeFormData } from "@/lib/validation";

export interface RepresentativeFormData extends Omit<BaseRepresentativeFormData, 'id'> {
  id: string;
}

interface RepresentativesStepProps {
  initialData?: RepresentativeFormData[];
  onNext: (data: RepresentativeFormData[]) => void;
  onBack: () => void;
}

export const RepresentativesStep = ({ initialData = [], onNext, onBack }: RepresentativesStepProps) => {
  const [representatives, setRepresentatives] = useState<RepresentativeFormData[]>(
    initialData.length > 0 ? initialData : [
      { id: uuidv4(), name: "", role: "", email: "", linkedin: "", isPrimary: true }
    ]
  );

  const form = useForm<RepresentativeFormData>({
    resolver: zodResolver(representativeFormSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      linkedin: "",
      isPrimary: false,
    },
  });

  const addRepresentative = () => {
    const newRep: RepresentativeFormData = {
      id: uuidv4(),
      name: "",
      role: "",
      email: "",
      linkedin: "",
      isPrimary: false,
    };
    setRepresentatives([...representatives, newRep]);
  };

  const removeRepresentative = (id: string) => {
    if (representatives.length <= 1) return;
    const newReps = representatives.filter(rep => rep.id !== id);
    
    // If we removed the primary, make the first one primary
    if (newReps.length > 0 && !newReps.some(rep => rep.isPrimary)) {
      newReps[0].isPrimary = true;
    }
    
    setRepresentatives(newReps);
  };

  const setPrimary = (id: string) => {
    setRepresentatives(representatives.map(rep => ({
      ...rep,
      isPrimary: rep.id === id
    })));
  };

  const updateRepresentative = (id: string, data: Partial<RepresentativeFormData>) => {
    setRepresentatives(representatives.map(rep => 
      rep.id === id ? { ...rep, ...data } : rep
    ));
  };

  const onSubmit = () => {
    // Check if at least one representative is marked as primary
    const hasPrimary = representatives.some(rep => rep.isPrimary);
    if (!hasPrimary && representatives.length > 0) {
      // If no primary is set, make the first one primary
      setPrimary(representatives[0].id);
    }

    // Validate all representatives
    const validationResults = representatives.map(rep => {
      const result = representativeFormSchema.safeParse(rep);
      return { rep, isValid: result.success };
    });

    const allValid = validationResults.every(r => r.isValid);
    
    if (!allValid) {
      // Log validation errors for debugging
      validationResults.forEach(({ rep, isValid }) => {
        if (!isValid) {
          console.error("Invalid representative data:", rep);
        }
      });
      // In a real app, you'd want to show these errors to the user
      alert('Please fill in all required fields for each representative.');
      return;
    }
    
    if (representatives.length === 0) {
      alert('Please add at least one representative.');
      return;
    }
    
    // Ensure at least one primary is set
    const finalRepresentatives = [...representatives];
    if (finalRepresentatives.length > 0 && !finalRepresentatives.some(r => r.isPrimary)) {
      finalRepresentatives[0].isPrimary = true;
    }
    
    onNext(finalRepresentatives);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Company Representatives</h2>
        <p className="text-gray-500 text-sm">Add at least one representative who can verify company information.</p>
      </div>

      <div className="space-y-6">
        {representatives.map((rep, index) => (
          <div key={rep.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Representative {index + 1}</h3>
              {representatives.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRepresentative(rep.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${rep.id}`}>Full Name *</Label>
                <Input
                  id={`name-${rep.id}`}
                  value={rep.name}
                  onChange={(e) => updateRepresentative(rep.id, { name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`role-${rep.id}`}>Job Title *</Label>
                <Input
                  id={`role-${rep.id}`}
                  value={rep.role}
                  onChange={(e) => updateRepresentative(rep.id, { role: e.target.value })}
                  placeholder="e.g., CEO, HR Manager"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`email-${rep.id}`}>Email *</Label>
                <Input
                  id={`email-${rep.id}`}
                  type="email"
                  value={rep.email}
                  onChange={(e) => updateRepresentative(rep.id, { email: e.target.value })}
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`linkedin-${rep.id}`}>LinkedIn Profile (Optional)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    linkedin.com/in/
                  </span>
                  <Input
                    id={`linkedin-${rep.id}`}
                    className="rounded-l-none"
                    value={rep.linkedin?.replace('https://linkedin.com/in/', '').replace('linkedin.com/in/', '')}
                    onChange={(e) => updateRepresentative(rep.id, { linkedin: `https://linkedin.com/in/${e.target.value}` })}
                    placeholder="username"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id={`primary-${rep.id}`}
                  checked={rep.isPrimary}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPrimary(rep.id);
                    }
                  }}
                />
                <Label htmlFor={`primary-${rep.id}`} className="text-sm font-normal">
                  Primary contact
                </Label>
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addRepresentative}
          className="w-full"
        >
          + Add Another Representative
        </Button>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onSubmit}>
          Continue
        </Button>
      </div>
    </div>
  );
};
