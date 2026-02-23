import type { ExternalLinks } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { cn } from '../utils/cn'
import { ContactSection } from './ContactSection'
import { RevealOnScroll } from './RevealOnScroll'
import { SectionHeader } from './SectionHeader'

interface ResumeCTASectionProps {
  links: ExternalLinks
  highlights: string[]
  reducedMotion: boolean
}

export function ResumeCTASection({ links, highlights, reducedMotion }: ResumeCTASectionProps) {
  return (
    <section id="resume" data-section className={styles.sectionBlock}>
      <SectionHeader
        eyebrow="Resume & Contact"
        title="Recruiter-ready summary with fast access to the full resume"
        description="Public contact details are limited to email and location; full phone information remains in the resume PDF."
      />

      <div className={styles.resumePanelLayout}>
        <RevealOnScroll className={styles.resumePanel} reducedMotion={reducedMotion}>
          <div className={styles.resumePanelGlow} aria-hidden="true" />
          <p className={styles.resumePanelLabel}>Resume Snapshot</p>
          <h3 className={styles.resumePanelTitle}>Quantitative finance + data analytics profile</h3>
          <ul className={styles.resumeHighlightsList}>
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className={styles.resumeCtaRow}>
            <a
              className={cn(styles.button, styles.buttonPrimary)}
              href={links.resumeUrl}
              download
            >
              Download Resume
            </a>
            <a
              className={cn(styles.button, styles.buttonSecondary)}
              href={links.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className={styles.contactPanel} delay={70} reducedMotion={reducedMotion}>
          <p className={styles.contactPanelHeading}>Get in touch</p>
          <p className={styles.contactPanelBody}>
            Open to finance, analytics, FP&A, and AI/data roles where strong quantitative analysis supports better strategic decisions.
          </p>
          <ContactSection links={links} />
        </RevealOnScroll>
      </div>
    </section>
  )
}
