import { experience, projects } from './portfolio'

export type CaseStudyKind = 'Project' | 'Experience'

export interface CaseStudySection {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface CaseStudy {
  slug: string
  kind: CaseStudyKind
  title: string
  subtitle: string
  summary: string
  summaryLine: string
  period: string
  location?: string
  tags: string[]
  visualTheme: 'violet' | 'blue' | 'teal' | 'plum' | 'slate' | 'indigo'
  sortTime: number
  sections: CaseStudySection[]
}

const experienceThemes = ['plum', 'slate', 'indigo'] as const
const projectThemes = ['violet', 'blue', 'teal'] as const

export const caseStudies: CaseStudy[] = [
  ...experience
    .filter((item) => item.featured)
    .map((item, index) => ({
      slug: item.id,
      kind: 'Experience' as const,
      title: item.organization,
      subtitle: item.role,
      summary: item.summary,
      summaryLine: `${item.category} • ${item.location}`,
      period: `${item.start} — ${item.end}`,
      location: item.location,
      tags: item.tags,
      visualTheme: experienceThemes[index % experienceThemes.length],
      sortTime: monthYearToTimestamp(item.end),
      sections: [
        {
          title: 'Overview',
          paragraphs: [item.summary],
        },
        {
          title: 'Key Contributions',
          bullets: item.highlights,
        },
        {
          title: 'Impact Signals',
          bullets: item.impactMetrics,
        },
        {
          title: 'Relevant Toolkit',
          bullets: item.tags,
        },
      ],
    })),
  ...projects
    .filter((item) => item.featured)
    .map((item, index) => ({
      slug: item.id,
      kind: 'Project' as const,
      title: item.title,
      subtitle: item.role,
      summary: item.summary,
      summaryLine: `${item.role} • ${item.tech.slice(0, 2).join(' • ')}`,
      period: item.period,
      tags: item.tech,
      visualTheme: projectThemes[index % projectThemes.length],
      sortTime: monthYearToTimestamp(getPeriodEndLabel(item.period)),
      sections: [
        {
          title: 'Overview',
          paragraphs: [item.summary, item.businessRelevance],
        },
        ...item.detailSections.map((section) => ({
          title: section.title,
          bullets: section.bullets,
        })),
      ],
    })),
].sort((left, right) => right.sortTime - left.sortTime)

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug) ?? null
}

function getPeriodEndLabel(period: string) {
  const segments = period
    .split(/[—–]/)
    .map((segment) => segment.trim())
    .filter(Boolean)
  return segments.at(-1) ?? period
}

function monthYearToTimestamp(label: string) {
  const normalized = label.replace(/,/g, '').trim()
  const monthMap: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  }

  if (/present/i.test(normalized)) {
    return Number.MAX_SAFE_INTEGER
  }

  const parts = normalized.split(/\s+/)
  const monthKey = parts[0]?.slice(0, 3).toLowerCase()
  const month = monthKey in monthMap ? monthMap[monthKey] : 0
  const yearMatch = normalized.match(/20\d{2}/)
  const year = yearMatch ? Number(yearMatch[0]) : 0

  if (!year) return 0
  return new Date(year, month, 1).getTime()
}
