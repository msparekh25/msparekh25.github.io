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
  headline,
  subheadline,
  intro,
}: HeroSectionProps) {
  return (
    <header id="top" data-section className={styles.heroSection}>
      <div className={styles.heroFrame}>
        <div className={styles.heroWatermark} aria-hidden="true">
          MANN PAREKH
        </div>
        <div className={styles.heroGridAccent} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={cn(styles.heroSequence, (loaded || reducedMotion) && styles.heroSequenceReady)}>
            <p className={cn(styles.heroBadge, styles.heroStep1)}>
              Finance • FP&amp;A • Analytics • AI
            </p>
            <h1 className={cn(styles.heroTitle, styles.heroStep2)}>
              {headline.split(' and analytics, built with technical rigor.')[0]}
              <span className={styles.heroAccent}> and analytics</span>
              <br />
              <span className={styles.heroMuted}>built with technical rigor.</span>
            </h1>
            <p className={cn(styles.heroSubheadline, styles.heroStep3)}>{subheadline}</p>
            <p className={cn(styles.heroIntro, styles.heroStep4)}>{intro}</p>
            <div className={cn(styles.heroCtas, styles.heroStep5)}>
              <a
                className={cn(styles.button, styles.buttonPrimary)}
                href={links.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
              <a className={cn(styles.button, styles.buttonSecondary)} href="#experience">
                See Experience
              </a>
              <a className={cn(styles.button, styles.buttonGhost)} href={`mailto:${links.email}`}>
                Email Me
              </a>
            </div>
            <div className={cn(styles.heroMetaRow, styles.heroStep6)}>
              <span>University of Maryland · Applied Mathematics + Economics</span>
              <span className={styles.dotDivider} aria-hidden="true">
                •
              </span>
              <span>Expected Spring 2027</span>
            </div>
          </div>
        </div>

        <aside className={styles.heroSidePanel}>
          <div className={styles.heroSidePanelGlow} aria-hidden="true" />
          <div className={styles.sidePanelHeader}>
            <span className={styles.sidePanelDot} />
            Current Focus
          </div>
          <div className={styles.heroMiniRail} aria-hidden="true">
            <div className={cn(styles.heroMiniCard, styles.heroMiniCardPrimary)}>
              <p className={styles.heroMiniCardLabel}>Capital Strategy</p>
              <p className={styles.heroMiniCardValue}>FP&amp;A</p>
              <p className={styles.heroMiniCardNote}>Executive dashboards / diligence support</p>
            </div>
            <div className={cn(styles.heroMiniCard, styles.heroMiniCardSecondary)}>
              <p className={styles.heroMiniCardLabel}>Analytics Layer</p>
              <p className={styles.heroMiniCardValue}>Forecasting + AI</p>
              <p className={styles.heroMiniCardNote}>Retention models / evaluation workflows</p>
            </div>
          </div>
          <p className={styles.sidePanelTitle}>FP&amp;A + strategic analytics</p>
          <p className={styles.sidePanelBody}>
            Building financial models and executive-ready analysis while bringing AI/data workflows into practical decision support.
          </p>
          <ul className={styles.sidePanelList}>
            <li>Executive dashboards for due diligence</li>
            <li>Forecasting and retention analytics in financial services</li>
            <li>Quantitative coursework across math, stats, and economics</li>
          </ul>
          <div className={styles.heroSignalLine}>
            <span className={styles.heroSignalLabel}>Selected themes</span>
            <span className={styles.heroSignalValue}>FP&amp;A · Forecasting · AI Evaluation · Research Analytics</span>
          </div>
        </aside>
      </div>
    </header>
  )
}
