import type { ProjectItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { cn } from '../utils/cn'

interface ProjectCardProps {
  project: ProjectItem
  isSelected: boolean
  onToggle: (projectId: string) => void
  registerButton: (projectId: string, element: HTMLButtonElement | null) => void
  panelId: string
}

export function ProjectCard({
  project,
  isSelected,
  onToggle,
  registerButton,
  panelId,
}: ProjectCardProps) {
  return (
    <button
      ref={(element) => registerButton(project.id, element)}
      type="button"
      className={cn(styles.projectCardButton, isSelected && styles.projectCardButtonActive)}
      onClick={() => onToggle(project.id)}
      aria-expanded={isSelected}
      aria-controls={panelId}
    >
      <span className={styles.projectCardChrome} aria-hidden="true" />
      <span className={styles.projectRole}>{project.role}</span>
      <span className={styles.projectTitle}>{project.title}</span>
      <span className={styles.projectPeriod}>{project.period}</span>
      <span className={styles.projectSummary}>{project.summary}</span>
      <span className={styles.projectBusiness}>{project.businessRelevance}</span>
      <span className={styles.projectTechRow}>
        {project.tech.map((item) => (
          <span key={item} className={styles.projectTechPill}>
            {item}
          </span>
        ))}
      </span>
      <span className={styles.projectActionRow}>
        <span>{isSelected ? 'Hide details' : 'Expand details'}</span>
        <span className={cn(styles.projectChevron, isSelected && styles.projectChevronOpen)} aria-hidden="true">
          ↗
        </span>
      </span>
    </button>
  )
}
