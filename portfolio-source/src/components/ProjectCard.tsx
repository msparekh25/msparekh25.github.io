import type { ProjectItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { cn } from '../utils/cn'

interface ProjectCardProps {
  project: ProjectItem
  isSelected: boolean
  isFeature?: boolean
  onToggle: (projectId: string) => void
  registerButton: (projectId: string, element: HTMLButtonElement | null) => void
  panelId: string
}

const visualThemeClassMap: Record<ProjectItem['visualTheme'], string> = {
  tailored: styles.projectPreviewTailored,
  accessibility: styles.projectPreviewAccessibility,
  research: styles.projectPreviewResearch,
}

export function ProjectCard({
  project,
  isSelected,
  isFeature = false,
  onToggle,
  registerButton,
  panelId,
}: ProjectCardProps) {
  return (
    <button
      ref={(element) => registerButton(project.id, element)}
      type="button"
      className={cn(
        styles.projectCardButton,
        isFeature && styles.projectCardButtonFeature,
        isSelected && styles.projectCardButtonActive,
      )}
      onClick={() => onToggle(project.id)}
      aria-expanded={isSelected}
      aria-controls={panelId}
    >
      <span className={styles.projectCardChrome} aria-hidden="true" />
      <span className={cn(styles.projectPreview, visualThemeClassMap[project.visualTheme])} aria-hidden="true">
        <span className={styles.projectPreviewNoise} />
        <span className={styles.projectPreviewOverlay} />
        <span className={styles.projectPreviewContent}>
          <span className={styles.projectPreviewKicker}>{project.previewKicker}</span>
          <span className={styles.projectPreviewTitle}>{project.previewTitle}</span>
          <span className={styles.projectPreviewRule} />
          <span className={styles.projectPreviewStats}>
            {project.previewStats.map((stat) => (
              <span key={stat} className={styles.projectPreviewStat}>
                {stat}
              </span>
            ))}
          </span>
        </span>
      </span>
      <span className={styles.projectRole}>{project.role}</span>
      <span className={styles.projectTitle}>{project.title}</span>
      <span className={styles.projectPeriod}>{project.period}</span>
      <span className={styles.projectSummary}>{project.summary}</span>
      <span className={styles.projectBusiness}>
        <span className={styles.projectBusinessLabel}>Why it matters</span>
        <span className={styles.projectBusinessText}>{project.businessRelevance}</span>
      </span>
      <span className={styles.projectTechRow}>
        {project.tech.map((item) => (
          <span key={item} className={styles.projectTechPill}>
            {item}
          </span>
        ))}
      </span>
      <span className={styles.projectActionRow}>
        <span>{isSelected ? 'Hide case notes' : 'Open case notes'}</span>
        <span className={cn(styles.projectChevron, isSelected && styles.projectChevronOpen)} aria-hidden="true">
          ↗
        </span>
      </span>
    </button>
  )
}
