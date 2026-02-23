import type { ExternalLinks } from '../types/content'
import styles from '../styles/Portfolio.module.css'

interface ContactSectionProps {
  links: ExternalLinks
}

export function ContactSection({ links }: ContactSectionProps) {
  return (
    <div className={styles.contactGrid}>
      <div className={styles.contactCard}>
        <p className={styles.contactLabel}>Email</p>
        <a className={styles.contactValueLink} href={`mailto:${links.email}`}>
          {links.email}
        </a>
      </div>
      <div className={styles.contactCard}>
        <p className={styles.contactLabel}>Location</p>
        <p className={styles.contactValue}>{links.location}</p>
      </div>
      {links.githubUrl ? (
        <div className={styles.contactCard}>
          <p className={styles.contactLabel}>GitHub</p>
          <a className={styles.contactValueLink} href={links.githubUrl} target="_blank" rel="noreferrer">
            github.com/msparekh25
          </a>
        </div>
      ) : null}
    </div>
  )
}
