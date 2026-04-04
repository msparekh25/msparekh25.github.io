import type { ExternalLinks } from '../types/content'
import styles from '../styles/JoshwPortfolio.module.css'
import { ContactForm } from './ContactForm'

interface ContactSectionProps {
  links: ExternalLinks
}

export function ContactSection({ links }: ContactSectionProps) {
  return (
    <div className={styles.contactGrid}>
      <div className={styles.contactCard}>
        <label className={styles.microLabel}>Let’s Talk</label>
        <h3>Quantitative finance and analytics work, built for real decisions.</h3>
        <p>
          I&apos;m interested in opportunities where modeling, structured analysis, and technical execution support
          finance teams, operators, and leadership.
        </p>
        <ContactForm recipientEmail={links.email} />
      </div>
      <div className={styles.contactCard}>
        <label className={styles.microLabel}>Details</label>
        <div className={styles.contactRows}>
          <ContactRow label="Location" value={links.location} />
          <ContactRow label="Email" value={links.email} href={`mailto:${links.email}`} />
          {links.githubUrl ? <ContactRow label="GitHub" value={links.githubUrl} href={links.githubUrl} /> : null}
          <ContactRow label="Resume" value="Mann_Parekh_Resume.pdf" href={links.resumeUrl} />
        </div>
      </div>
    </div>
  )
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className={styles.contactRow}>
      <label>{label}</label>
      {href ? (
        <a
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        >
          {value}
        </a>
      ) : (
        <p>{value}</p>
      )}
    </div>
  )
}
