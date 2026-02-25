import { useEffect, useMemo, useState } from 'react'
import {
  education,
  experience,
  links,
  metrics,
  projects,
  resumeHighlights,
  siteMeta,
  skillGroups,
} from './data/portfolio'
import { useActiveSection } from './hooks/useActiveSection'
import { useReducedMotionPreference } from './hooks/useReducedMotionPreference'
import styles from './styles/ConorTemplate.module.css'
import { cn } from './utils/cn'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

function App() {
  const reducedMotion = useReducedMotionPreference()
  const [loaded, setLoaded] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const sectionIds = useMemo(() => ['top', ...navItems.map((item) => item.id)], [])
  const { activeSectionId, isScrolled } = useActiveSection(sectionIds)

  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), [])
  const featuredExperience = useMemo(() => experience.filter((item) => item.featured), [])
  const additionalExperience = useMemo(() => experience.filter((item) => !item.featured), [])
  const selectedProject =
    featuredProjects.find((project) => project.id === selectedProjectId) ?? featuredProjects[0] ?? null

  const capabilities = useMemo(
    () => skillGroups.map((group) => ({ label: group.label, items: group.items.slice(0, 6) })),
    [],
  )

  useEffect(() => {
    setSelectedProjectId((current) => current ?? featuredProjects[0]?.id ?? null)
  }, [featuredProjects])

  useEffect(() => {
    if (reducedMotion) {
      setLoaded(true)
      return
    }

    const frame = window.requestAnimationFrame(() => setLoaded(true))
    return () => window.cancelAnimationFrame(frame)
  }, [reducedMotion])

  return (
    <div className={styles.pageShell}>
      <div className={styles.noiseLayer} aria-hidden="true" />
      <div className={styles.stripeLayer} aria-hidden="true" />
      <div className={styles.blobOne} aria-hidden="true" />
      <div className={styles.blobTwo} aria-hidden="true" />

      <header className={cn(styles.topNav, isScrolled && styles.topNavScrolled)}>
        <a href="#top" className={styles.topBrand}>
          MANN PAREKH
        </a>
        <nav aria-label="Primary">
          <ul className={styles.topNavList}>
            {navItems.map((item) => {
              const active = activeSectionId === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(styles.topNavLink, active && styles.topNavLinkActive)}
                    aria-current={active ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <main className={styles.mainWrap}>
        <section id="top" className={styles.heroSection}>
          <div className={styles.heroBadge} aria-hidden="true">
            <div className={styles.heroBadgePaper}>
              <div className={styles.heroBadgeGraphic}>
                <div className={styles.heroBadgeRingOuter} />
                <div className={styles.heroBadgeRingInner} />
                <div className={styles.heroBadgeCore}>MP</div>
                <div className={styles.heroBadgeStarOne} />
                <div className={styles.heroBadgeStarTwo} />
              </div>
              <div className={styles.heroBadgeDivider} />
              <p className={styles.heroBadgeName}>MANN</p>
              <p className={styles.heroBadgeName}>PAREKH</p>
            </div>
          </div>

          <div className={styles.heroCanvas}>
            <a href="#about" className={cn(styles.helloTag, loaded && styles.helloTagReady)}>
              HEY! I'M MANN.
            </a>

            <div className={cn(styles.heroCopy, loaded && styles.heroCopyReady)}>
              <p className={styles.heroKicker}>Finance / FP&amp;A / Analytics / AI</p>
              <h1 className={styles.heroTitle}>
                Building financial and analytical systems that make decisions clearer.
              </h1>
              <p className={styles.heroDescription}>{siteMeta.subheadline}</p>
              <p className={styles.heroDescriptionMuted}>{siteMeta.intro}</p>
              <div className={styles.heroActions}>
                <a href={links.resumeUrl} target="_blank" rel="noreferrer" className={styles.primaryAction}>
                  View Resume
                </a>
                <a href="#work" className={styles.secondaryAction}>
                  View Work
                </a>
              </div>
            </div>

            <div className={cn(styles.heroMetaPanel, loaded && styles.heroMetaPanelReady)}>
              <p className={styles.heroMetaHeading}>Current focus</p>
              <p className={styles.heroMetaBody}>
                FP&amp;A, strategic analytics, and finance-facing AI workflows for executive decision support.
              </p>
              <div className={styles.heroMetaRows}>
                <div>
                  <span>Based</span>
                  <p>{links.location}</p>
                </div>
                <div>
                  <span>Education</span>
                  <p>{education.school}</p>
                </div>
                <div>
                  <span>Program</span>
                  <p>{education.degreeLine}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className={styles.sectionBlock}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionLabel}>ABOUT</span>
            <span className={styles.sectionLine} aria-hidden="true" />
          </div>
          <div className={styles.aboutLayout}>
            <div className={styles.aboutColumnMain}>
              <h2 className={styles.sectionTitleLarge}>
                Quantitative finance, executive-ready reporting, and technical implementation in one profile.
              </h2>
              <p className={styles.bodyText}>{siteMeta.headline}</p>
              <p className={styles.bodyTextMuted}>
                I’m a University of Maryland student focused on Finance / FP&amp;A and analytics roles, with hands-on work across capital planning support, retention forecasting, LLM evaluation, and research-driven modeling.
              </p>
              <div className={styles.inlineResumeStrip}>
                <p className={styles.inlineResumeLabel}>Resume highlights</p>
                <ul className={styles.inlineResumeList}>
                  {resumeHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.aboutColumnSide}>
              <div className={styles.metricList}>
                {metrics.map((metric) => (
                  <div key={metric.label} className={styles.metricRow}>
                    <div>
                      <p className={styles.metricRowLabel}>{metric.label}</p>
                      <p className={styles.metricRowDetail}>{metric.detail}</p>
                    </div>
                    <p className={styles.metricRowValue}>{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className={styles.sectionBlock}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionLabel}>WORK</span>
            <span className={styles.sectionLine} aria-hidden="true" />
          </div>
          <div className={styles.workIntroRow}>
            <h2 className={styles.sectionTitle}>Selected project work</h2>
            <p className={styles.workIntroText}>
              A Conor-style showcase rail: large visual posters up front, followed by deep context below.
            </p>
          </div>

          <div className={styles.posterRail} role="list" aria-label="Project showcase">
            {featuredProjects.map((project, index) => {
              const selected = selectedProject?.id === project.id
              return (
                <button
                  key={project.id}
                  type="button"
                  role="listitem"
                  className={cn(styles.posterCard, selected && styles.posterCardSelected)}
                  onClick={() => setSelectedProjectId(project.id)}
                  aria-pressed={selected}
                >
                  <span className={styles.posterIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={cn(styles.posterArt, styles[`posterTheme_${project.visualTheme}` as keyof typeof styles])} aria-hidden="true">
                    <span className={styles.posterArtGrid} />
                    <span className={styles.posterArtGlow} />
                    <span className={styles.posterArtLabel}>{project.previewKicker}</span>
                    <span className={styles.posterArtTitle}>{project.previewTitle}</span>
                    <span className={styles.posterArtStats}>
                      {project.previewStats.map((stat) => (
                        <span key={stat}>{stat}</span>
                      ))}
                    </span>
                  </span>
                  <span className={styles.posterMeta}>
                    <span className={styles.posterRole}>{project.role}</span>
                    <span className={styles.posterTitle}>{project.title}</span>
                    <span className={styles.posterPeriod}>{project.period}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {selectedProject ? (
            <div className={styles.workDetailStage}>
              <div className={styles.workDetailHeader}>
                <div>
                  <p className={styles.workDetailLabel}>Project Notes</p>
                  <h3 className={styles.workDetailTitle}>{selectedProject.title}</h3>
                  <p className={styles.workDetailSubtitle}>{selectedProject.role} · {selectedProject.period}</p>
                </div>
                <div className={styles.workDetailTechList}>
                  {selectedProject.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.workDetailGrid}>
                <div>
                  <p className={styles.workDetailBlockTitle}>Summary</p>
                  <p className={styles.bodyText}>{selectedProject.summary}</p>
                </div>
                <div>
                  <p className={styles.workDetailBlockTitle}>Business Relevance</p>
                  <p className={styles.bodyTextMuted}>{selectedProject.businessRelevance}</p>
                </div>
              </div>

              <div className={styles.workDetailColumns}>
                <div>
                  <p className={styles.workDetailBlockTitle}>Highlights</p>
                  <ul className={styles.noteList}>
                    {selectedProject.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  {selectedProject.detailSections.map((section) => (
                    <div key={section.title} className={styles.workDetailSectionBlock}>
                      <p className={styles.workDetailBlockTitle}>{section.title}</p>
                      <ul className={styles.noteList}>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section id="experience" className={styles.sectionBlock}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionLabel}>EXPERIENCE</span>
            <span className={styles.sectionLine} aria-hidden="true" />
          </div>
          <div className={styles.experienceIntroRow}>
            <h2 className={styles.sectionTitle}>Finance + analytics experience</h2>
            <p className={styles.workIntroText}>
              Company-by-company list view inspired by editorial agency portfolios, tuned for recruiter scanning.
            </p>
          </div>

          <div className={styles.experienceTable}>
            <div className={styles.experienceTableHead} aria-hidden="true">
              <span>Company / Role</span>
              <span>Focus</span>
              <span>Timeline</span>
            </div>
            {featuredExperience.map((item) => (
              <article key={item.id} className={styles.experienceTableRow}>
                <div className={styles.experienceCompanyCell}>
                  <p className={styles.experienceCompany}>{item.organization}</p>
                  <p className={styles.experienceRole}>{item.role}</p>
                  <p className={styles.experienceLocation}>{item.location}</p>
                </div>
                <div className={styles.experienceSummaryCell}>
                  <p className={styles.experienceSummary}>{item.summary}</p>
                  <div className={styles.experienceTagsInline}>
                    {item.impactMetrics.slice(0, 3).map((metric) => (
                      <span key={metric}>{metric}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.experienceDateCell}>
                  <p>{item.start} — {item.end}</p>
                  <p>{item.category}</p>
                </div>
              </article>
            ))}
          </div>

          <details className={styles.additionalDisclosure}>
            <summary>Additional experience & publication history</summary>
            <div className={styles.additionalDisclosureList}>
              {additionalExperience.map((item) => (
                <div key={item.id} className={styles.additionalDisclosureRow}>
                  <div>
                    <p className={styles.additionalDisclosureTitle}>{item.role}</p>
                    <p className={styles.additionalDisclosureMeta}>{item.organization} · {item.location}</p>
                  </div>
                  <p className={styles.additionalDisclosureDates}>{item.start} — {item.end}</p>
                </div>
              ))}
            </div>
          </details>
        </section>

        <section id="contact" className={styles.sectionBlock}>
          <div className={styles.sectionHeaderRow}>
            <span className={styles.sectionLabel}>CONTACT</span>
            <span className={styles.sectionLine} aria-hidden="true" />
          </div>

          <div className={styles.contactHeroRow}>
            <div>
              <h2 className={styles.sectionTitleLarge}>Let’s talk about finance, analytics, and decision support work.</h2>
              <p className={styles.bodyTextMuted}>
                Open to internships and early-career roles across FP&amp;A, finance analytics, and AI/data functions where rigorous analysis supports strategy.
              </p>
            </div>
            <div className={styles.contactActionStack}>
              <a href={`mailto:${links.email}`} className={styles.contactPrimaryLink}>
                {links.email}
              </a>
              <a href={links.resumeUrl} target="_blank" rel="noreferrer" className={styles.contactSecondaryLink}>
                Resume PDF
              </a>
              {links.githubUrl ? (
                <a href={links.githubUrl} target="_blank" rel="noreferrer" className={styles.contactSecondaryLink}>
                  GitHub
                </a>
              ) : null}
            </div>
          </div>

          <div className={styles.capabilityBoard}>
            {capabilities.map((group) => (
              <section key={group.label} className={styles.capabilityColumn}>
                <p className={styles.capabilityLabel}>{group.label}</p>
                <ul className={styles.capabilityList}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className={styles.educationFooterStrip}>
            <div>
              <p className={styles.educationStripLabel}>Education</p>
              <p className={styles.educationStripValue}>{education.school}</p>
              <p className={styles.educationStripMeta}>{education.degreeLine} · {education.gradTerm} · {education.gpa}</p>
            </div>
            <div>
              <p className={styles.educationStripLabel}>Selected coursework</p>
              <p className={styles.educationStripMeta}>
                {education.coursework.slice(0, 5).join(' · ')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerTitle}>{siteMeta.name}</p>
        <p className={styles.footerMeta}>Quantitative finance & analytics portfolio · {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
