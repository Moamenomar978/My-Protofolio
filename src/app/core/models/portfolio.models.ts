export interface Skill {
  name: string;
  percent: number;
}

export type ProjectCategory = 'all' | 'ecommerce' | 'landing' | 'portfolio';

export interface Project {
  image: string;
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  liveUrl?: string;
  isCurrentSite?: boolean;
}

export interface ServiceOffer {
  icon: string;
  title: string;
  description: string;
  features: string[];
  priceFrom: string;
}

export interface ContactFormValue {
  from_name: string;
  reply_to: string;
  project_type: string;
  message: string;
}

export interface CvEducation {
  period: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CvExperience {
  period: string;
  title: string;
  subtitle: string;
  description: string;
}
