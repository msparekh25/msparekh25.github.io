import type { EducationEntry } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { RevealOnScroll } from './RevealOnScroll'
import { SectionHeader } from './SectionHeader'

interface EducationSectionProps {
  education: EducationEntry
  reducedMotion: boolean
}

export function EducationSection({ education, reducedMotion }: EducationSectionProps) {
  return (
    <section id="education" data-section className={styles.sectionBlock}>
      <SectionHeader
        eyebrow="Education"
        title="Quantitative foundation across mathematics, economics, and computing"
        description="Academic training that supports financial modeling, statistical analysis, and technical implementation."
      />

      <div className={styles.educationLayout}>
        <RevealOnScroll className={styles.educationCard} reducedMotion={reducedMotion}>
          <p className={styles.educationSchool}>{education.school}</p>
          <p className={styles.educationDegree}>{education.degreeLine}</p>
          <div className={styles.educationMetaRow}>
            <span>{education.gradTerm}</span>
            <span className={styles.dotDivider} aria-hidden="true">
              •
            </span>
            <span>{education.gpa}</span>
          </div>
          <ul className={styles.educationHonorsList}>
            {education.honors.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll className={styles.courseworkCard} delay={70} reducedMotion={reducedMotion}>
          <p className={styles.courseworkHeading}>Selected Coursework</p>
          <ul className={styles.courseworkList}>
            {education.coursework.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  )
}
