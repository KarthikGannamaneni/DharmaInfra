// ===================================
// Type Definitions
// ===================================

export type ProjectData = {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'mixed';
  image: string;
  location: string;
  size: string;
  units: string;
  year: string;
  description: string;
  features: string[];
};

export type TestimonialData = {
  id: string;
  content: string;
  authorName: string;
  authorLocation: string;
  authorInitials: string;
};

export type ServiceData = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon?: string;
  features: string[];
};

export type StatData = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  icon?: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type ContactInfo = {
  icon: string;
  title: string;
  lines: string[];
};
