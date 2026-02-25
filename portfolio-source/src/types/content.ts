export interface NavItem {
  id: string
  label: string
}

export interface MetricItem {
  label: string
  value: string
  detail: string
}

export interface ExperienceItem {
  id: string
  role: string
  organization: string
  location: string
  start: string
  end: string
  category: string
  summary: string
  highlights: string[]
  impactMetrics: string[]
  tags: string[]
  featured: boolean
}

export interface ProjectDetailSection {
  title: string
  bullets: string[]
}

export interface ProjectLink {
  label: string
  href: string
}

export type ProjectVisualTheme = 'tailored' | 'accessibility' | 'research'

export interface ProjectItem {
  id: string
  title: string
  role: string
  period: string
  previewKicker: string
  previewTitle: string
  previewStats: string[]
  visualTheme: ProjectVisualTheme
  summary: string
  businessRelevance: string
  tech: string[]
  highlights: string[]
  links?: ProjectLink[]
  featured: boolean
  detailSections: ProjectDetailSection[]
}

export interface SkillGroup {
  id: string
  label: string
  items: string[]
}

export interface EducationEntry {
  school: string
  degreeLine: string
  gradTerm: string
  gpa: string
  honors: string[]
  coursework: string[]
}

export interface ExternalLinks {
  email: string
  location: string
  resumeUrl: string
  githubUrl?: string
  linkedinUrl?: string
}
