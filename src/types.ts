export type Job = {
  id: number;
  title: string;
  company: string;
  category: 'AI Training' | 'Translation' | 'Content' | 'Data Annotation' | 'Quality Review';
  jobType: 'Remote' | 'Freelance' | 'Contract' | 'Part-time';
  experience: 'Entry' | 'Mid' | 'Senior';
  compensation: string;
  languageRequirements: string;
  eligibility: string;
  turkeyNote: string;
  isTurkeyEligible: boolean;
  description: string;
  referral: string;
  referralNote: string;
  applicationUrl: string;
};
