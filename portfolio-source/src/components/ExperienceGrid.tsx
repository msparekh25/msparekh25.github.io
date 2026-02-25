import type { ExperienceItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { RevealOnScroll } from './RevealOnScroll'
import { SectionHeader } from './SectionHeader'

interface ExperienceGridProps {
  items: ExperienceItem[]
  featuredOnly?: boolean
  reducedMotion: boolean
}

export function ExperienceGrid({ items, featuredOnly = false, reducedMotion }: ExperienceGridProps) {
  const featured = featuredOnly ? items.filter((item) => item.featured) : items
  const additional = items.filter((item) => !item.featured)

  return (
    <section id="experience" data-section className={styles.sectionBlock}>
      <SectionHeader
        eyebrow="Experience Spotlight"
        title="Experience across finance, analytics, and AI systems"
        description="A cleaner company-by-company view inspired by editorial portfolio lists, with outcome-oriented summaries."
      />

      <div className={styles.experienceListBoard}>
        {featured.map((item, index) => (
          <RevealOnScroll
            as="article"
            key={item.id}
            className={styles.experienceListRow}
            delay={index * 70}
            reducedMotion={reducedMotion}
          >
            <div className={styles.experienceListIndex}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className={styles.experienceListPrimary}>
              <p className={styles.experienceListOrg}>{item.organization}</p>
              <p className={styles.experienceListRole}>{item.role}</p>
              <p className={styles.experienceListCategory}>{item.category}</p>
            </div>
            <p className={styles.experienceListSummary}>{item.summary}</p>
            <div className={styles.experienceListMeta}>
              <span>{item.start} — {item.end}</span>
              <span>{item.location}</span>
            </div>
            <div className={styles.experienceListArrow} aria-hidden="true">
              +
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className={styles.experienceHighlightsGrid}>
        {featured.slice(0, 2).map((item, index) => (
          <RevealOnScroll
            as="article"
            key={`${item.id}-highlights`}
            className={styles.experienceHighlightCard}
            delay={120 + index * 60}
            reducedMotion={reducedMotion}
          >
            <p className={styles.experienceHighlightLabel}>{item.organization}</p>
            <p className={styles.experienceHighlightTitle}>{item.role}</p>
            <ul className={styles.experienceHighlightBullets}>
              {item.highlights.slice(0, 2).map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className={styles.experienceHighlightPills}>
              {item.impactMetrics.slice(0, 3).map((metric) => (
                <span key={metric}>{metric}</span>
              ))}
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {featuredOnly && additional.length > 0 ? (
        <RevealOnScroll className={styles.additionalExperienceWrap} delay={140} reducedMotion={reducedMotion}>
          <details className={styles.additionalExperienceDetails}>
            <summary className={styles.additionalExperienceSummary}>Additional experience & publication history</summary>
            <div className={styles.additionalExperienceList}>
              {additional.map((item) => (
                <article key={item.id} className={styles.additionalExperienceItem}>
                  <div>
                    <p className={styles.additionalRole}>{item.role}</p>
                    <p className={styles.additionalOrg}>
                      {item.organization} · {item.location}
                    </p>
                  </div>
                  <p className={styles.additionalDates}>
                    {item.start} — {item.end}
                  </p>
                </article>
              ))}
            </div>
          </details>
        </RevealOnScroll>
      ) : null}
    </section>
  )
}
