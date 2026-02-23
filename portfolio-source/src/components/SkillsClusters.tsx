import type { SkillGroup } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { RevealOnScroll } from './RevealOnScroll'
import { SectionHeader } from './SectionHeader'

interface SkillsClustersProps {
  groups: SkillGroup[]
  workingStyle: string
  reducedMotion: boolean
}

export function SkillsClusters({ groups, workingStyle, reducedMotion }: SkillsClustersProps) {
  return (
    <section id="skills" data-section className={styles.sectionBlock}>
      <SectionHeader
        eyebrow="Skills & Tools"
        title="A finance-first toolkit with technical depth"
        description="Organized by how the skills are used in real work, not as a generic keyword cloud."
      />

      <div className={styles.skillClusterGrid}>
        {groups.map((group, index) => (
          <RevealOnScroll
            as="article"
            key={group.id}
            className={styles.skillClusterCard}
            delay={index * 70}
            reducedMotion={reducedMotion}
          >
            <h3 className={styles.skillClusterTitle}>{group.label}</h3>
            <ul className={styles.skillList}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll className={styles.workingStyleCard} delay={120} reducedMotion={reducedMotion}>
        <p className={styles.workingStyleLabel}>Working Style</p>
        <p className={styles.workingStyleText}>{workingStyle}</p>
      </RevealOnScroll>
    </section>
  )
}
