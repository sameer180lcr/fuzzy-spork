export type VerificationStep = 'company' | 'representatives' | 'verification' | 'review' | 'success';

export interface RepresentativeFormData {
  id: string;
  name: string;
  role: string;
  email: string;
  linkedin?: string;
  isPrimary: boolean;
}

export interface CompanyFormData {
  companyName: string;
  website: string;
  email: string;
  registrationNumber?: string;
  industry: string;
  size: string;
  foundedYear?: number;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  taxId?: string;
}

export interface VerificationChecks {
  domainVerified: boolean;
  emailVerified: boolean;
  businessRegistrationVerified: boolean;
  registrationNumber?: string;
}
