import styles from '../styles/Portfolio.module.css'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <div className={styles.sectionHeaderTop}>
        {eyebrow ? <p className={styles.sectionEyebrow}>{eyebrow}</p> : null}
        <span className={styles.sectionHeaderRule} aria-hidden="true" />
      </div>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
    </div>
  )
}
