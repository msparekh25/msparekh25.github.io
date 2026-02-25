import type { ExternalLinks } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { cn } from '../utils/cn'

interface HeroSectionProps {
  loaded: boolean
  reducedMotion: boolean
  links: ExternalLinks
  headline: string
  subheadline: string
  intro: string
}

export function HeroSection({
  loaded,
  reducedMotion,
  links,
  headline: _headline,
  subheadline,
  intro,
}: HeroSectionProps) {
  return (
    <header id="top" data-section className={styles.heroSection}>
      <div className={styles.conorHeroWrap}>
        <div className={styles.conorHeroGlow} aria-hidden="true" />
        <div className={styles.conorHeroGrid} aria-hidden="true" />
        <div className={cn(styles.heroSequence, (loaded || reducedMotion) && styles.heroSequenceReady)}>
          <div className={cn(styles.conorHeroTop, styles.heroStep1)}>
            <span className={styles.conorHeroDot} />
            <p className={styles.conorHeroLabel}>Mann Parekh · Finance / FP&amp;A / Analytics</p>
          </div>

          <h1 className={cn(styles.conorHeroTitle, styles.heroStep2)}>
            I build financial models, forecasting systems, and decision-ready analysis for ambitious teams.
          </h1>

          <p className={cn(styles.conorHeroBody, styles.heroStep3)}>{subheadline}</p>
          <p className={cn(styles.conorHeroBodyMuted, styles.heroStep4)}>{intro}</p>

          <div className={cn(styles.conorHeroActions, styles.heroStep5)}>
            <a
              className={cn(styles.button, styles.buttonPrimary)}
              href={links.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
            <a className={cn(styles.button, styles.buttonSecondary)} href="#projects">
              View Work
            </a>
            <a className={cn(styles.button, styles.buttonGhost)} href={`mailto:${links.email}`}>
              Contact
            </a>
          </div>

          <div className={cn(styles.conorHeroMetaCards, styles.heroStep6)}>
            <article className={styles.conorMetaCard}>
              <p className={styles.conorMetaLabel}>Currently focused on</p>
              <p className={styles.conorMetaTitle}>FP&amp;A + strategic analytics</p>
              <p className={styles.conorMetaText}>
                Executive dashboards, forecasting workflows, and finance-facing AI analysis.
              </p>
            </article>

            <article className={styles.conorMetaCard}>
              <p className={styles.conorMetaLabel}>Signals</p>
              <ul className={styles.conorMetaList}>
                <li>30%+ client retention support (Mirae Asset)</li>
                <li>JPMorgan capital raise support (Healthy Amplified)</li>
                <li>Applied Math + Economics @ UMD (GPA 3.55)</li>
              </ul>
            </article>

            <article className={styles.conorMetaCard}>
              <p className={styles.conorMetaLabel}>Based in</p>
              <p className={styles.conorMetaTitle}>College Park, MD</p>
              <p className={styles.conorMetaText}>
                Open to finance, analytics, FP&amp;A, and AI/data roles with strong quantitative decision support.
              </p>
            </article>
          </div>
        </div>
      </div>
    </header>
  )
}
