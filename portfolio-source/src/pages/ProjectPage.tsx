import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getCaseStudyBySlug } from '../data/caseStudies'
import { links, siteMeta } from '../data/portfolio'
import styles from '../styles/JoshwPortfolio.module.css'

interface ProjectPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function ProjectPage({ theme, onToggleTheme }: ProjectPageProps) {
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = slug ? getCaseStudyBySlug(slug) : null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!caseStudy) {
    return <Navigate to="/" replace />
  }

  return (
    <div className={styles.pageShell}>
      <main id="main-content" className={styles.pageWrapper}>
        <div className={styles.projectPageShell}>
          <header className={styles.projectPageHeader}>
            <Link to="/" className={styles.backLink}>
              ← Back to portfolio
            </Link>
            <div className={styles.projectPageActions}>
              <a href={`mailto:${links.email}`} className={styles.navButton}>
                Email Mann
              </a>
              <button
                type="button"
                className={styles.themeToggle}
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                aria-pressed={theme === 'light'}
              >
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
          </header>

          <section className={styles.projectPageIntro}>
            <p className={styles.microLabel}>{caseStudy.kind} Case Study</p>
            <h1 className={styles.projectPageTitle}>{caseStudy.title}</h1>
            <p className={styles.projectPageSubtitle}>{caseStudy.subtitle}</p>
            <div className={styles.projectPageMeta}>
              <span>{caseStudy.period}</span>
              {caseStudy.location ? <span>{caseStudy.location}</span> : null}
              <span>{siteMeta.name}</span>
            </div>
            <p className={styles.projectPageSummary}>{caseStudy.summary}</p>
            <div className={styles.tagRow}>
              {caseStudy.tags.map((tag) => (
                <span key={tag} className={styles.tagPill}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className={styles.projectPageGrid}>
            <aside className={styles.projectPageSidebar}>
              <div className={styles.contactCard}>
                <p className={styles.microLabel}>Quick Context</p>
                <p className={styles.projectSidebarText}>{caseStudy.summaryLine}</p>
                <a
                  href={links.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryCta}
                >
                  Open resume
                </a>
              </div>
            </aside>

            <div className={styles.projectPageBody}>
              {caseStudy.sections.map((section) => (
                <section key={section.title} className={styles.projectPageSection}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className={styles.projectBulletList}>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
