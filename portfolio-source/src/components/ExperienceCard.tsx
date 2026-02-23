import type { ExperienceItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'

interface ExperienceCardProps {
  item: ExperienceItem
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <article className={styles.experienceCard}>
      <div className={styles.cardTopLine}>
        <span className={styles.cardCategory}>{item.category}</span>
        <span className={styles.cardDates}>
          {item.start} — {item.end}
        </span>
      </div>
      <h3 className={styles.cardTitle}>{item.role}</h3>
      <p className={styles.cardOrgLine}>
        <span>{item.organization}</span>
        <span className={styles.dotDivider} aria-hidden="true">
          •
        </span>
        <span>{item.location}</span>
      </p>
      <p className={styles.cardSummary}>{item.summary}</p>
      <ul className={styles.bulletList}>
        {item.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className={styles.tagRow}>
        {item.impactMetrics.map((metric) => (
          <span key={metric} className={styles.impactPill}>
            {metric}
          </span>
        ))}
      </div>
      <div className={styles.tagRow}>
        {item.tags.map((tag) => (
          <span key={tag} className={styles.tagPill}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}
