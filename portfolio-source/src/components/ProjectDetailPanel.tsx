import { type RefObject } from 'react'
import type { ProjectItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { cn } from '../utils/cn'

interface ProjectDetailPanelProps {
  project: ProjectItem | null
  isOpen: boolean
  onClose: () => void
  closeButtonRef: RefObject<HTMLButtonElement | null>
  panelId: string
}

export function ProjectDetailPanel({
  project,
  isOpen,
  onClose,
  closeButtonRef,
  panelId,
}: ProjectDetailPanelProps) {
  return (
    <section
      id={panelId}
      className={cn(styles.projectDetailPanel, isOpen && styles.projectDetailPanelOpen)}
      aria-label="Project details"
      aria-live="polite"
      role="region"
    >
      {project ? (
        <>
          <div className={styles.projectDetailHeader}>
            <div>
              <p className={styles.projectDetailEyebrow}>{project.role}</p>
              <h3 className={styles.projectDetailTitle}>{project.title}</h3>
              <p className={styles.projectDetailPeriod}>{project.period}</p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.projectDetailClose}
              onClick={onClose}
            >
              Close
            </button>
          </div>

          <div className={styles.projectDetailIntroGrid}>
            <div>
              <h4 className={styles.projectDetailSubhead}>Summary</h4>
              <p className={styles.projectDetailText}>{project.summary}</p>
            </div>
            <div>
              <h4 className={styles.projectDetailSubhead}>Business Relevance</h4>
              <p className={styles.projectDetailText}>{project.businessRelevance}</p>
            </div>
          </div>

          <div className={styles.projectDetailTags}>
            {project.tech.map((tech) => (
              <span key={tech} className={styles.projectTechPill}>
                {tech}
              </span>
            ))}
          </div>

          <div className={styles.projectDetailColumns}>
            <div className={styles.projectDetailBlock}>
              <h4 className={styles.projectDetailSubhead}>Key Highlights</h4>
              <ul className={styles.bulletList}>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className={styles.projectDetailBlock}>
              {project.detailSections.map((section) => (
                <div key={section.title} className={styles.projectDetailSection}>
                  <h4 className={styles.projectDetailSubhead}>{section.title}</h4>
                  <ul className={styles.bulletList}>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {project.links && project.links.length ? (
            <div className={styles.projectLinksRow}>
              {project.links.map((link) => (
                <a key={link.href} className={styles.inlineLink} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className={styles.projectDetailEmpty}>
          <p>Select a project card to view implementation details, analytical framing, and outcomes.</p>
        </div>
      )}
    </section>
  )
}
