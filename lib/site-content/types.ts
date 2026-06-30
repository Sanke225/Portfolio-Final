export type IconKey =
  | "Code"
  | "Server"
  | "Brain"
  | "Palette"
  | "Globe"
  | "Layers"
  | "Zap"
  | "Smartphone";

export interface HeroStat {
  value: string;
  label: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  key: string;
  title: string;
  icon: IconKey;
  skills: string[];
}

export interface ServiceItem {
  icon: IconKey;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: {
    src: string;
    alt: string;
    gradient: string;
  };
  links: {
    demo?: string;
    github: string;
  };
  inDevelopment: boolean;
}

export interface SiteContent {
  hero: {
    badge: string;
    name: string;
    subtitle: string;
    subtitleBold: string;
    description: string;
    ctaProjects: string;
    ctaContact: string;
    status: string;
    stats: HeroStat[];
    techStack: string[];
  };
  about: {
    sectionNumber: string;
    title: string;
    subtitle: string;
    paragraphs: {
      intro: string;
      introBold: string;
      introEnd: string;
      training: string;
    };
    statsBoxes: {
      codeYears: string;
      codeLabel: string;
      projects: string;
      projectsLabel: string;
      skills: string;
      skillsLabel: string;
    };
    timeline: TimelineEntry[];
    techStack: string[];
    comment: string;
  };
  skills: {
    sectionNumber: string;
    title: string;
    subtitle: string;
    categories: SkillCategory[];
    comment: string;
  };
  services: {
    sectionNumber: string;
    title: string;
    subtitle: string;
    items: ServiceItem[];
    cta: {
      text: string;
      button: string;
    };
  };
  projects: {
    title: string;
    titleAccent: string;
    subtitle: string;
    items: ProjectItem[];
  };
  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    successTitle: string;
    successDescription: string;
    form: {
      nameLabel: string;
      emailLabel: string;
      subjectLabel: string;
      messageLabel: string;
      submit: string;
      submitting: string;
      successPlaceholderName: string;
      successPlaceholderEmail: string;
      successPlaceholderSubject: string;
      successPlaceholderMessage: string;
    };
    sidebar: {
      title: string;
      emailLabel: string;
      emailValue: string;
      linkedinLabel: string;
      linkedinValue: string;
      githubLabel: string;
      githubValue: string;
      locationLabel: string;
      locationValue: string;
      whatsappLabel: string;
      whatsappValue: string;
      availabilityLabel: string;
      availabilityValue: string;
    };
  };
}
