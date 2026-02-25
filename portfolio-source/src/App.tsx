import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import {
  education,
  experience,
  links,
  metrics,
  projects,
  resumeHighlights,
  siteMeta,
  skillGroups,
  workingStyle,
} from './data/portfolio'
import { useReducedMotionPreference } from './hooks/useReducedMotionPreference'
import { cn } from './utils/cn'
import styles from './styles/JkanePortfolio.module.css'

type SectionId = 'overview' | 'work' | 'experience' | 'education' | 'contact'

type AccordionKey = 'signals' | 'capabilities' | 'resume'

type TileVariant = 'charcoal' | 'graphite' | 'accent' | 'soft'

const sectionNav: Array<{ id: SectionId; label: string }> = [
  { id: 'overview', label: 'Info' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const tileVariants: TileVariant[] = ['charcoal', 'graphite', 'accent', 'soft']

function App() {
  const reducedMotion = useReducedMotionPreference()
  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), [])
  const featuredExperience = useMemo(() => experience.filter((item) => item.featured), [])
  const additionalExperience = useMemo(() => experience.filter((item) => !item.featured), [])

  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('overview')
  const [selectedProjectId, setSelectedProjectId] = useState(featuredProjects[0]?.id ?? '')
  const [expandedExperienceId, setExpandedExperienceId] = useState(featuredExperience[0]?.id ?? '')
  const [openAccordions, setOpenAccordions] = useState<Record<AccordionKey, boolean>>({
    signals: true,
    capabilities: false,
    resume: false,
  })
  const [showFloatingPrompt, setShowFloatingPrompt] = useState(true)

  const stageScrollRef = useRef<HTMLDivElement | null>(null)
  const sidebarScrollRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    overview: null,
    work: null,
    experience: null,
    education: null,
    contact: null,
  })

  const selectedProject = featuredProjects.find((project) => project.id === selectedProjectId) ?? featuredProjects[0]

  useEffect(() => {
    if (reducedMotion) {
      setLoaded(true)
      return
    }

    const frame = window.requestAnimationFrame(() => {
      setLoaded(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [reducedMotion])

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full'
  }, [reducedMotion])

  useEffect(() => {
    const root = stageScrollRef.current
    if (!root) return

    const sectionElements = (Object.keys(sectionRefs.current) as SectionId[])
      .map((id) => sectionRefs.current[id])
      .filter((node): node is HTMLElement => node instanceof HTMLElement)

    if (!sectionElements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) {
          const nextId = visible[0].target.id as SectionId
          setActiveSection(nextId)
        }
      },
      {
        root,
        rootMargin: '-8% 0px -58% 0px',
        threshold: [0.15, 0.35, 0.6],
      },
    )

    sectionElements.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const roots = [stageScrollRef.current, sidebarScrollRef.current].filter(
      (node): node is HTMLDivElement => node instanceof HTMLDivElement,
    )

    if (!roots.length) return

    const allRevealNodes = roots.flatMap((root) =>
      Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]')),
    )

    if (!allRevealNodes.length) return

    if (reducedMotion) {
      allRevealNodes.forEach((node) => {
        node.dataset.visible = 'true'
      })
      return
    }

    const observers = roots.map(
      (root) =>
        new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              const target = entry.target as HTMLElement
              target.dataset.visible = 'true'
              observer.unobserve(target)
            })
          },
          {
            root,
            rootMargin: '0px 0px -12% 0px',
            threshold: 0.14,
          },
        ),
    )

    roots.forEach((root, index) => {
      const observer = observers[index]
      Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]')).forEach((node) => observer.observe(node))
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [reducedMotion, selectedProjectId, expandedExperienceId])

  const setSectionRef = (id: SectionId) => (node: HTMLElement | null) => {
    sectionRefs.current[id] = node
  }

  const scrollToSection = (id: SectionId) => {
    const root = stageScrollRef.current
    const target = sectionRefs.current[id]
    if (!root || !target) return

    root.scrollTo({
      top: Math.max(target.offsetTop - 8, 0),
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  const toggleAccordion = (key: AccordionKey) => {
    setOpenAccordions((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  const revealStyle = (index: number): CSSProperties => ({
    ['--reveal-delay' as string]: `${index * 70}ms`,
  } as CSSProperties)

  return (
    <div className={styles.appFrame}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={cn(styles.sidebarTopBar, loaded && styles.sidebarTopBarReady)}>
            <button className={styles.logoButton} type="button" aria-label="Mann Parekh">
              <span className={styles.logoDot} />
              <span className={styles.logoStem} />
            </button>
            <div className={styles.topPillNav} role="tablist" aria-label="Portfolio sections">
              {sectionNav.map((item) => {
                const active = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(styles.pillButton, active && styles.pillButtonActive)}
                    onClick={() => scrollToSection(item.id)}
                    aria-pressed={active}
                  >
                    <span>{item.label}</span>
                    <span className={styles.plusIcon} aria-hidden="true">
                      <span className={styles.plusIconHorizontal} />
                      <span className={cn(styles.plusIconVertical, active && styles.plusIconVerticalCollapsed)} />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div ref={sidebarScrollRef} className={styles.sidebarScroll}>
            <section
              className={cn(styles.sidebarPanel, styles.illustrationPanel, loaded && styles.loadIn)}
              style={revealStyle(0)}
              data-reveal
            >
              <div className={styles.illustrationWrap} aria-hidden="true">
                <svg viewBox="0 0 420 520" className={styles.mascotSvg}>
                  <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="190" cy="120" rx="78" ry="70" />
                    <path d="M138 92c12-34 104-34 118 0" />
                    <circle cx="168" cy="118" r="10" />
                    <circle cx="212" cy="118" r="10" />
                    <path d="M164 152c18 16 48 16 66 0" />
                    <path d="M116 200c22-8 50-2 68 12" />
                    <path d="M238 212c20-15 48-22 72-16" />
                    <path d="M160 212c-18 32-20 74-8 120" />
                    <path d="M244 218c18 28 24 76 18 120" />
                    <path d="M152 332c-28 42-40 76-34 120" />
                    <path d="M244 338c24 38 44 72 62 108" />
                    <path d="M104 448c28-12 58-10 82 8" />
                    <path d="M270 446c24-16 52-16 74 4" />
                    <path d="M292 192c34-12 68-34 92-66" />
                    <path d="M334 102l42-20" />
                    <path d="M334 126l58-10" />
                    <path d="M326 150l52 8" />
                    <path d="M120 188c-22-18-44-28-70-30" />
                    <path d="M88 158l-42 12" />
                    <path d="M86 182l-52 0" />
                    <path d="M95 208l-44 20" />
                    <rect x="138" y="58" width="104" height="26" rx="13" />
                    <path d="M112 58c10-28 70-44 108-38" />
                  </g>
                  <g fill="currentColor">
                    <circle cx="94" cy="64" r="5" />
                    <circle cx="322" cy="68" r="4" />
                    <circle cx="344" cy="242" r="5" />
                    <circle cx="66" cy="274" r="4" />
                    <circle cx="214" cy="36" r="4" />
                  </g>
                </svg>
                <div className={styles.illustrationStamp}>MP</div>
              </div>
              <div className={styles.sidebarLabelRow}>
                <span className={styles.monoLabel}>Independent Quant Portfolio</span>
                <span className={styles.dotDivider} aria-hidden="true" />
                <span className={styles.monoLabel}>UMD / 2027</span>
              </div>
            </section>

            <section className={cn(styles.sidebarPanel, loaded && styles.loadIn)} style={revealStyle(1)} data-reveal>
              <div className={styles.panelHeadingRow}>
                <span className={styles.panelTag}>Info</span>
                <span className={styles.panelTagGhost}>Finance / Analytics</span>
              </div>
              <h1 className={styles.sidebarTitle}>{siteMeta.name}</h1>
              <p className={styles.sidebarSubtitle}>{siteMeta.title}</p>
              <p className={styles.sidebarBody}>{siteMeta.subheadline}</p>
              <div className={styles.inlineActions}>
                <a className={styles.actionButtonPrimary} href={links.resumeUrl} target="_blank" rel="noreferrer">
                  View Resume
                </a>
                <button className={styles.actionButtonGhost} type="button" onClick={() => scrollToSection('work')}>
                  See Work
                </button>
              </div>
            </section>

            <AccordionPanel
              title="Signals"
              isOpen={openAccordions.signals}
              onToggle={() => toggleAccordion('signals')}
              delayStyle={revealStyle(2)}
            >
              <ul className={styles.metricStack}>
                {metrics.map((metric) => (
                  <li key={metric.label} className={styles.metricRowCompact}>
                    <div>
                      <p className={styles.metricRowLabel}>{metric.label}</p>
                      <p className={styles.metricRowDetail}>{metric.detail}</p>
                    </div>
                    <p className={styles.metricRowValue}>{metric.value}</p>
                  </li>
                ))}
              </ul>
            </AccordionPanel>

            <AccordionPanel
              title="Capabilities"
              isOpen={openAccordions.capabilities}
              onToggle={() => toggleAccordion('capabilities')}
              delayStyle={revealStyle(3)}
            >
              <div className={styles.skillGroupList}>
                {skillGroups.map((group) => (
                  <div key={group.id} className={styles.skillGroupBlock}>
                    <p className={styles.skillGroupLabel}>{group.label}</p>
                    <div className={styles.skillChipWrap}>
                      {group.items.slice(0, 6).map((item) => (
                        <span key={item} className={styles.skillChip}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles.workingStyle}>{workingStyle}</p>
            </AccordionPanel>

            <AccordionPanel
              title="Resume"
              isOpen={openAccordions.resume}
              onToggle={() => toggleAccordion('resume')}
              delayStyle={revealStyle(4)}
            >
              <ul className={styles.bulletList}>
                {resumeHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className={styles.contactList}>
                <a href={`mailto:${links.email}`}>{links.email}</a>
                <p>{links.location}</p>
                {links.githubUrl ? (
                  <a href={links.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                ) : null}
              </div>
            </AccordionPanel>

            <section className={cn(styles.sidebarPanel, styles.sidebarFooterPanel, loaded && styles.loadIn)} style={revealStyle(5)} data-reveal>
              <div className={styles.logoTicker}>
                {['Healthy Amplified', 'Mirae Asset', 'Handshake AI', 'UMD FIRE'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </section>
          </div>
        </aside>

        <section className={cn(styles.stagePanelShell, loaded && styles.stagePanelShellReady)}>
          <div className={styles.stagePanelHeader}>
            <div className={styles.stageTitlePill}>
              <span className={styles.stageTitleDot} />
              <span>Portfolio</span>
            </div>
            <div className={styles.stageHeaderRight}>
              <span className={styles.monoLabel}>Active</span>
              <span className={styles.stageHeaderSection}>{labelForSection(activeSection)}</span>
            </div>
          </div>

          <div ref={stageScrollRef} className={styles.stagePanelScroll}>
            <section id="overview" ref={setSectionRef('overview')} className={styles.stageSection}>
              <div className={styles.heroGrid}>
                <div className={cn(styles.heroShowcase, styles.darkPanel)} data-reveal style={revealStyle(0)}>
                  <div className={styles.heroGlow} aria-hidden="true" />
                  <div className={styles.heroNoise} aria-hidden="true" />
                  <div className={styles.heroContent}>
                    <span className={styles.kickerPill}>Finance systems • Analytics • FP&amp;A</span>
                    <h2 className={styles.heroHeadline}>{siteMeta.headline}</h2>
                    <p className={styles.heroSummary}>{siteMeta.intro}</p>
                    <div className={styles.heroActionRow}>
                      <a href={links.resumeUrl} target="_blank" rel="noreferrer" className={styles.darkHeroActionPrimary}>
                        Resume PDF
                      </a>
                      <a href={`mailto:${links.email}`} className={styles.darkHeroActionSecondary}>
                        Email Me
                      </a>
                    </div>
                  </div>
                </div>

                <div className={styles.heroSideStack}>
                  <div className={styles.infoCard} data-reveal style={revealStyle(1)}>
                    <p className={styles.infoCardLabel}>Current Focus</p>
                    <p className={styles.infoCardTitle}>Finance, modeling, and analytics execution</p>
                    <p className={styles.infoCardBody}>
                      Targeting FP&amp;A, strategic finance, and analytics roles where quantitative rigor and communication both matter.
                    </p>
                  </div>
                  <div className={styles.infoCardGrid} data-reveal style={revealStyle(2)}>
                    {metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label} className={styles.infoMicroCard}>
                        <p className={styles.infoMicroLabel}>{metric.label}</p>
                        <p className={styles.infoMicroValue}>{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="work" ref={setSectionRef('work')} className={styles.stageSection}>
              <SectionBar title="Selected Work" subtitle="Projects and research translated into portfolio-ready case format" />
              <div className={styles.playgroundPanel} data-reveal style={revealStyle(0)}>
                <div className={styles.playgroundGrid}>
                  {featuredProjects.map((project, index) => {
                    const tileActive = selectedProject?.id === project.id
                    const tileVariant = tileVariants[index % tileVariants.length]
                    return (
                      <button
                        key={project.id}
                        type="button"
                        className={cn(
                          styles.playgroundTile,
                          styles[`tile${capitalize(tileVariant)}` as keyof typeof styles],
                          index === 0 && styles.playgroundTileWide,
                          tileActive && styles.playgroundTileActive,
                        )}
                        style={{ ['--tile-delay' as string]: `${index * 90}ms` } as CSSProperties}
                        onClick={() => setSelectedProjectId(project.id)}
                        aria-pressed={tileActive}
                      >
                        <div className={styles.tileBackdropPattern} aria-hidden="true" />
                        <div className={styles.tileBadgeRow}>
                          <span>{project.role}</span>
                          <span>{project.period.split('—').at(-1)?.trim() ?? project.period}</span>
                        </div>
                        <div className={styles.tileCenterMark} aria-hidden="true">
                          <span>{project.title.slice(0, 1)}</span>
                        </div>
                        <div className={styles.tileFooter}>
                          <p className={styles.tileTitle}>{project.title}</p>
                          <p className={styles.tileSubtitle}>{project.tech.slice(0, 3).join(' • ')}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedProject ? (
                <div className={styles.casePanel} data-reveal style={revealStyle(1)}>
                  <div className={styles.casePanelHeader}>
                    <div>
                      <p className={styles.casePanelKicker}>{selectedProject.role}</p>
                      <h3 className={styles.casePanelTitle}>{selectedProject.title}</h3>
                    </div>
                    <p className={styles.casePanelPeriod}>{selectedProject.period}</p>
                  </div>
                  <div className={styles.casePanelGrid}>
                    <div className={styles.casePrimaryColumn}>
                      <p className={styles.caseSummary}>{selectedProject.summary}</p>
                      <p className={styles.caseBusiness}>{selectedProject.businessRelevance}</p>
                      <ul className={styles.bulletList}>
                        {selectedProject.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.caseSecondaryColumn}>
                      {selectedProject.detailSections.map((section) => (
                        <div key={section.title} className={styles.caseDetailBlock}>
                          <p className={styles.caseDetailTitle}>{section.title}</p>
                          <ul className={styles.caseMiniBullets}>
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

            <section id="experience" ref={setSectionRef('experience')} className={styles.stageSection}>
              <SectionBar title="Experience" subtitle="Finance, analytics, and research roles organized as a working timeline" />
              <div className={styles.tablePanel} data-reveal style={revealStyle(0)}>
                <div className={styles.tableHeaderRow}>
                  <span>Role / Organization</span>
                  <span>Scope</span>
                  <span>Period</span>
                </div>
                <div className={styles.timelineRows}>
                  {[...featuredExperience, ...additionalExperience].map((item) => {
                    const open = expandedExperienceId === item.id
                    return (
                      <div key={item.id} className={cn(styles.timelineRow, open && styles.timelineRowOpen)}>
                        <button
                          type="button"
                          className={styles.timelineRowButton}
                          onClick={() => setExpandedExperienceId((current) => (current === item.id ? '' : item.id))}
                          aria-expanded={open}
                        >
                          <div className={styles.timelineRoleCell}>
                            <p className={styles.timelineRole}>{item.role}</p>
                            <p className={styles.timelineOrg}>
                              {item.organization} • {item.location}
                            </p>
                          </div>
                          <div className={styles.timelineScopeCell}>
                            <p className={styles.timelineCategory}>{item.category}</p>
                            <p className={styles.timelineSummary}>{item.summary}</p>
                          </div>
                          <div className={styles.timelineMetaCell}>
                            <p>{item.start}</p>
                            <p>{item.end}</p>
                            <span className={styles.plusToggle} aria-hidden="true">
                              <span />
                              <span className={cn(open && styles.plusToggleCollapsed)} />
                            </span>
                          </div>
                        </button>
                        <div className={cn(styles.timelineExpand, open && styles.timelineExpandOpen)}>
                          <div className={styles.timelineExpandInner}>
                            <div>
                              <p className={styles.expandLabel}>Highlights</p>
                              <ul className={styles.caseMiniBullets}>
                                {item.highlights.map((highlight) => (
                                  <li key={highlight}>{highlight}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className={styles.expandLabel}>Tags</p>
                              <div className={styles.skillChipWrap}>
                                {item.tags.map((tag) => (
                                  <span key={tag} className={styles.skillChip}>
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <p className={styles.expandLabel}>Impact</p>
                              <div className={styles.impactPills}>
                                {item.impactMetrics.map((metric) => (
                                  <span key={metric} className={styles.impactPill}>
                                    {metric}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            <section id="education" ref={setSectionRef('education')} className={styles.stageSection}>
              <SectionBar title="Education + Toolkit" subtitle="Academic foundation plus finance and technical toolset" />
              <div className={styles.twoColumnCards}>
                <div className={styles.infoCardLarge} data-reveal style={revealStyle(0)}>
                  <p className={styles.infoCardLabel}>Education</p>
                  <h3 className={styles.educationSchool}>{education.school}</h3>
                  <p className={styles.educationLine}>{education.degreeLine}</p>
                  <div className={styles.educationMetaRow}>
                    <span>{education.gradTerm}</span>
                    <span>{education.gpa}</span>
                  </div>
                  <ul className={styles.bulletList}>
                    {education.honors.map((honor) => (
                      <li key={honor}>{honor}</li>
                    ))}
                  </ul>
                  <div className={styles.courseworkGrid}>
                    {education.coursework.map((course) => (
                      <span key={course} className={styles.courseChip}>
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.stackColumn}>
                  {skillGroups.map((group, index) => (
                    <div key={group.id} className={styles.infoCard} data-reveal style={revealStyle(index + 1)}>
                      <p className={styles.infoCardLabel}>{group.label}</p>
                      <div className={styles.skillChipWrap}>
                        {group.items.map((item) => (
                          <span key={item} className={styles.skillChip}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="contact" ref={setSectionRef('contact')} className={styles.stageSection}>
              <SectionBar title="Contact" subtitle="Recruiter-ready summary and next-step links" />
              <div className={styles.contactGrid}>
                <div className={cn(styles.contactPanelDark, styles.darkPanel)} data-reveal style={revealStyle(0)}>
                  <div className={styles.heroGlow} aria-hidden="true" />
                  <p className={styles.contactDarkKicker}>Open to FP&amp;A + analytics opportunities</p>
                  <h3 className={styles.contactDarkTitle}>Let&apos;s talk about finance, modeling, and decision support work.</h3>
                  <p className={styles.contactDarkBody}>
                    I&apos;m focused on roles where quantitative analysis, business context, and communication all matter. Happy to share resume, project details, and coursework fit.
                  </p>
                  <div className={styles.heroActionRow}>
                    <a href={`mailto:${links.email}`} className={styles.darkHeroActionPrimary}>
                      Email {siteMeta.name.split(' ')[0]}
                    </a>
                    <a href={links.resumeUrl} target="_blank" rel="noreferrer" className={styles.darkHeroActionSecondary}>
                      Download Resume
                    </a>
                  </div>
                </div>

                <div className={styles.contactPanelLight} data-reveal style={revealStyle(1)}>
                  <div className={styles.contactRows}>
                    <ContactRow label="Email" value={links.email} href={`mailto:${links.email}`} />
                    <ContactRow label="Location" value={links.location} />
                    {links.githubUrl ? <ContactRow label="GitHub" value="msparekh25" href={links.githubUrl} /> : null}
                    <ContactRow label="Resume" value="Mann_Parekh_Resume.pdf" href={links.resumeUrl} />
                  </div>
                  <div className={styles.contactFooterNote}>
                    <p>Selected work formatted for quick review. Full resume includes additional details and prior experience.</p>
                  </div>
                </div>
              </div>

              <footer className={styles.stageFooter} data-reveal style={revealStyle(2)}>
                <span>{siteMeta.name}</span>
                <span>Finance • Analytics • AI</span>
                <span>{new Date().getFullYear()}</span>
              </footer>
            </section>
          </div>
        </section>
      </div>

      {showFloatingPrompt ? (
        <aside className={cn(styles.floatingPrompt, loaded && styles.floatingPromptReady)} aria-label="Quick contact prompt">
          <div className={styles.floatingPromptTop}>
            <span className={styles.floatingPromptTitle}>Quick Connect</span>
            <button
              type="button"
              className={styles.floatingPromptClose}
              onClick={() => setShowFloatingPrompt(false)}
              aria-label="Close quick connect"
            >
              ×
            </button>
          </div>
          <p className={styles.floatingPromptBody}>Want the latest resume or project context for recruiting review?</p>
          <div className={styles.floatingPromptActions}>
            <a href={links.resumeUrl} target="_blank" rel="noreferrer" className={styles.floatingPromptPrimary}>
              Resume
            </a>
            <a href={`mailto:${links.email}`} className={styles.floatingPromptSecondary}>
              Email
            </a>
          </div>
        </aside>
      ) : null}
    </div>
  )
}

type AccordionPanelProps = {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
  delayStyle?: CSSProperties
}

function AccordionPanel({ title, isOpen, onToggle, children, delayStyle }: AccordionPanelProps) {
  return (
    <section className={styles.sidebarPanel} data-reveal style={delayStyle}>
      <button type="button" className={styles.accordionHeader} onClick={onToggle} aria-expanded={isOpen}>
        <span>{title}</span>
        <span className={styles.plusToggle} aria-hidden="true">
          <span />
          <span className={cn(isOpen && styles.plusToggleCollapsed)} />
        </span>
      </button>
      <div className={cn(styles.accordionBody, isOpen && styles.accordionBodyOpen)}>
        <div className={styles.accordionBodyInner}>{children}</div>
      </div>
    </section>
  )
}

type SectionBarProps = {
  title: string
  subtitle: string
}

function SectionBar({ title, subtitle }: SectionBarProps) {
  return (
    <div className={styles.sectionBar}>
      <div className={styles.sectionBarLeft}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className={styles.sectionBarLine} aria-hidden="true" />
    </div>
  )
}

type ContactRowProps = {
  label: string
  value: string
  href?: string
}

function ContactRow({ label, value, href }: ContactRowProps) {
  return (
    <div className={styles.contactRow}>
      <span className={styles.contactRowLabel}>{label}</span>
      {href ? (
        <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}>
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </div>
  )
}

function labelForSection(id: SectionId) {
  return sectionNav.find((item) => item.id === id)?.label ?? 'Info'
}

function capitalize(value: string) {
  if (!value) return value
  return `${value[0].toUpperCase()}${value.slice(1)}`
}

export default App
