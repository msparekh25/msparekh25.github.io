import type { ExperienceItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { ExperienceCard } from './ExperienceCard'
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
        title="Finance, analytics, and AI work with business impact"
        description="Curated roles that best represent FP&A execution, financial analytics, and data-driven decision support."
      />

      <div className={styles.cardGrid}>
        {featured.map((item, index) => (
          <RevealOnScroll
            as="div"
            key={item.id}
            delay={index * 70}
            reducedMotion={reducedMotion}
          >
            <ExperienceCard item={item} />
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
