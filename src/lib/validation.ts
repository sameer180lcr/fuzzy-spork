import * as z from "zod";

export const companyFormSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  website: z.string().url("Please enter a valid URL"),
  email: z.string().email("Please enter a valid email"),
  registrationNumber: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Company size is required"),
  foundedYear: z.coerce.number().min(1800).max(new Date().getFullYear()).optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  taxId: z.string().optional(),
});

export const representativeFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  email: z.string().email("Please enter a valid email"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").or(z.literal("")),
  isPrimary: z.boolean().default(false),
});

export const verificationChecksSchema = z.object({
  domainVerified: z.boolean(),
  emailVerified: z.boolean(),
  businessRegistrationVerified: z.boolean(),
  registrationNumber: z.string().optional(),
});

export type CompanyFormData = z.infer<typeof companyFormSchema>;
export type RepresentativeFormData = z.infer<typeof representativeFormSchema> & { id: string };
export type VerificationChecks = z.infer<typeof verificationChecksSchema> & { id: string };
