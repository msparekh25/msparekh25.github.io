import { type CSSProperties, type MouseEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactSection } from '../components/ContactSection'
import { FloatingNav } from '../components/FloatingNav'
import { caseStudies } from '../data/caseStudies'
import {
  education,
  experience,
  links,
  metrics,
  resumeHighlights,
  siteMeta,
  skillGroups,
  workingStyle,
} from '../data/portfolio'
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference'
import styles from '../styles/JoshwPortfolio.module.css'
import { cn } from '../utils/cn'

type SectionKey = 'intro' | 'work' | 'experience' | 'toolkit' | 'contact'

interface HomePageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const navItems: Array<{ id: SectionKey; label: string }> = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
]

export function HomePage({ theme, onToggleTheme }: HomePageProps) {
  const reducedMotion = useReducedMotionPreference()
  const [loaded, setLoaded] = useState(false)
  const [clockText, setClockText] = useState(() => getEasternTime())
  const [heroFadeProgress, setHeroFadeProgress] = useState(0)
  const sectionRefs = useRef<Record<SectionKey, HTMLElement | null>>({
    intro: null,
    work: null,
    experience: null,
    toolkit: null,
    contact: null,
  })

  useEffect(() => {
    if (reducedMotion) {
      setLoaded(true)
      return
    }

    const frame = window.requestAnimationFrame(() => setLoaded(true))
    return () => window.cancelAnimationFrame(frame)
  }, [reducedMotion])

  useEffect(() => {
    const tick = () => setClockText(getEasternTime())
    tick()
    const interval = window.setInterval(tick, 60_000)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      setHeroFadeProgress(0)
      return
    }

    let ticking = false

    const update = () => {
      ticking = false
      const introSection = sectionRefs.current.intro
      const fadeDistance = introSection
        ? Math.max(Math.min(introSection.offsetHeight * 0.6, 340), 180)
        : Math.max(Math.min(window.innerHeight * 0.35, 340), 180)
      const progress = clamp(window.scrollY / fadeDistance, 0, 1)

      setHeroFadeProgress((prev) => (Math.abs(prev - progress) > 0.004 ? progress : prev))
    }

    const onScrollOrResize = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [reducedMotion])

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!nodes.length) return

    if (reducedMotion) {
      nodes.forEach((node) => {
        node.dataset.visible = 'true'
      })
      return
    }

    const fallback = window.setTimeout(() => {
      nodes.forEach((node) => {
        node.dataset.visible = 'true'
      })
    }, 1200)

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target as HTMLElement
          target.dataset.visible = 'true'
          currentObserver.unobserve(target)
        })
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
    }
  }, [reducedMotion])

  const setSectionRef = (key: SectionKey) => (node: HTMLElement | null) => {
    sectionRefs.current[key] = node
  }

  const scrollToSection = (key: SectionKey) => {
    const target = sectionRefs.current[key]
    if (!target) return

    const offset = key === 'intro' ? 0 : 24
    window.scrollTo({
      top: Math.max(window.scrollY + target.getBoundingClientRect().top - offset, 0),
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  const revealDelay = (index: number): CSSProperties =>
    ({ ['--reveal-delay' as string]: `${index * 80}ms` }) as CSSProperties

  const heroContentOpacity = reducedMotion ? 1 : clamp(1 - heroFadeProgress * 1.2, 0, 1)
  const heroContentShift = reducedMotion ? 0 : -Math.round(heroFadeProgress * 22)
  const heroContentStyle = {
    opacity: heroContentOpacity,
    transform: `translate3d(0, ${heroContentShift}px, 0)`,
  } satisfies CSSProperties
  const heroLinksStyle = {
    pointerEvents: heroContentOpacity < 0.08 ? 'none' : 'auto',
  } satisfies CSSProperties

  const financeSkills = skillGroups.find((group) => group.id === 'finance')?.items ?? []
  const dataSkills = skillGroups.find((group) => group.id === 'data-ai')?.items ?? []
  const toolSkills = skillGroups.find((group) => group.id === 'engineering-tools')?.items ?? []
  const additionalExperience = experience.filter((item) => !item.featured)

  return (
    <div className={styles.pageShell}>
      <div className={cn(styles.loadingBar, loaded && styles.loadingBarDone)} aria-hidden="true">
        <div className={styles.loadingBarFill} />
      </div>

      <main id="main-content" className={styles.pageWrapper}>
        <section id="intro" ref={setSectionRef('intro')} className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <div className={styles.heroInner}>
              <FloatingNav
                items={navItems}
                links={links}
                clockText={clockText}
                onNavigate={scrollToSection}
                theme={theme}
                onToggleTheme={onToggleTheme}
              />

              <div className={cn(styles.heroTextWrap, loaded && styles.heroTextWrapReady)}>
                <div className={styles.heroTextContent} style={heroContentStyle}>
                  <div className={styles.heroName}>
                    <h1>
                      Mann <span className={styles.heroLastName}>Parekh</span>
                    </h1>
                  </div>
                  <p className={styles.heroIntro}>
                    Hi! I&apos;m <span>Mann</span>, a finance and analytics builder focused on FP&amp;A, quantitative
                    modeling, and decision support. Currently studying at <span>University of Maryland</span> with
                    experience across finance, AI, and research systems.
                  </p>
                  <div className={styles.heroLinks} style={heroLinksStyle}>
                    <a href={links.resumeUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                      View Mann Parekh resume
                    </a>
                    <a href={`mailto:${links.email}`} className={styles.textLink}>
                      Email Mann Parekh
                    </a>
                    {links.githubUrl ? (
                      <a
                        href={links.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.textLink}
                      >
                        Open Mann Parekh GitHub profile
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.contentFlow}>
          <section className={styles.heroGradientFade} aria-hidden="true" />

          <section id="work" ref={setSectionRef('work')} className={styles.contentSection}>
            <SectionHeader
              title="Selected Work"
              subtitle="Projects and experience translated into portfolio-ready case previews"
              rightLabel="Featured"
            />

            <div className={styles.postGrid}>
              {caseStudies.map((card, index) => (
                <PostPreviewCard key={card.slug} card={card} index={index} />
              ))}
            </div>
          </section>

          <Divider />

          <section id="experience" ref={setSectionRef('experience')} className={styles.contentSection}>
            <SectionHeader
              title="Experience"
              subtitle="Finance, analytics, and applied AI work across research and industry settings"
              rightLabel={`${experience.length} roles`}
            />

            <div className={styles.timelineGrid}>
              {experience.map((item, index) => (
                <article key={item.id} className={styles.timelineRow} data-reveal style={revealDelay(index)}>
                  <div className={styles.timelineRowMeta}>
                    <label className={styles.microLabel}>{item.category}</label>
                    <p>{item.start}</p>
                    <p>{item.end}</p>
                  </div>
                  <div className={styles.timelineRowMain}>
                    <h3>{item.role}</h3>
                    <p className={styles.timelineOrg}>
                      {item.organization} <span>• {item.location}</span>
                    </p>
                    <p className={styles.timelineSummary}>{item.summary}</p>
                    <div className={styles.tagRow}>
                      {item.tags.map((tag) => (
                        <span key={tag} className={styles.tagPill}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.timelineRowAside}>
                    <ul>
                      {item.highlights.slice(0, 2).map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.subtleBlock} data-reveal style={revealDelay(experience.length + 1)}>
              <label className={styles.microLabel}>Additional Experience (compact)</label>
              <div className={styles.compactExperienceList}>
                {additionalExperience.map((item) => (
                  <div key={`compact-${item.id}`} className={styles.compactExperienceItem}>
                    <p>{item.organization}</p>
                    <span>
                      {item.role} • {item.start} — {item.end}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Divider />

          <section id="toolkit" ref={setSectionRef('toolkit')} className={styles.contentSection}>
            <SectionHeader
              title="Toolkit"
              subtitle="Finance, analytics, and engineering capabilities in a code-snippet inspired layout"
              rightLabel="Skills + Education"
            />

            <div className={styles.codePanelsGrid}>
              <CodePanel title="finance.ts" badge="FP&A" delayStyle={revealDelay(0)}>
                <CodeLine
                  index={1}
                  label="focus"
                  value="financial_analysis | modeling | budgeting | valuation"
                  accent="violet"
                />
                {financeSkills.slice(0, 6).map((skill, idx) => (
                  <CodeLine key={skill} index={idx + 2} label={`finance[${idx}]`} value={skill} />
                ))}
                <CodeLine
                  index={9}
                  label="signals"
                  value={metrics.map((metric) => metric.value).join(' | ')}
                  accent="blue"
                />
              </CodePanel>

              <CodePanel title="analytics.py" badge="Data & AI" delayStyle={revealDelay(1)}>
                <CodeLine index={1} label="stack" value="python, r, sql, pytorch, pandas" accent="teal" />
                {dataSkills.slice(0, 8).map((skill, idx) => (
                  <CodeLine key={skill} index={idx + 2} label={`tools[${idx}]`} value={skill} />
                ))}
              </CodePanel>

              <CodePanel title="education.md" badge="UMD" delayStyle={revealDelay(2)}>
                <CodeLine index={1} label="school" value={education.school} accent="indigo" />
                <CodeLine index={2} label="degree" value={education.degreeLine} />
                <CodeLine index={3} label="graduation" value={education.gradTerm} />
                <CodeLine index={4} label="gpa" value={education.gpa} />
                {education.honors.map((honor, idx) => (
                  <CodeLine key={honor} index={idx + 5} label={`honors[${idx}]`} value={honor} />
                ))}
              </CodePanel>

              <CodePanel title="tooling.json" badge="Engineering" delayStyle={revealDelay(3)}>
                {toolSkills.slice(0, 9).map((skill, idx) => (
                  <CodeLine key={skill} index={idx + 1} label={`item_${idx + 1}`} value={skill} />
                ))}
              </CodePanel>
            </div>

            <div className={styles.toolkitNotes} data-reveal style={revealDelay(4)}>
              <div>
                <label className={styles.microLabel}>Resume Highlights</label>
                <ul className={styles.detailList}>
                  {resumeHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className={styles.microLabel}>Working Style</label>
                <p className={styles.detailBodyText}>{workingStyle}</p>
                <p className={styles.detailBodyMuted}>Selected coursework</p>
                <div className={styles.courseworkWrap}>
                  {education.coursework.slice(0, 10).map((course) => (
                    <span key={course} className={styles.courseChip}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Divider />

          <section id="contact" ref={setSectionRef('contact')} className={styles.contentSection}>
            <SectionHeader
              title="Contact"
              subtitle="Open to finance, analytics, and strategic decision-support internships and roles"
              rightLabel="Reach Out"
            />

            <ContactSection links={links} />

            <footer className={styles.footerBar} data-reveal style={revealDelay(2)}>
              <span>{siteMeta.name}</span>
              <span>Finance • FP&amp;A • Analytics • AI</span>
              <span>{new Date().getFullYear()}</span>
            </footer>
          </section>
        </div>
      </main>
    </div>
  )
}

type SectionHeaderProps = {
  title: string
  subtitle: string
  rightLabel?: string
}

function SectionHeader({ title, subtitle, rightLabel }: SectionHeaderProps) {
  return (
    <header className={styles.sectionHeader} data-reveal>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      {rightLabel ? <label className={styles.microLabel}>{rightLabel}</label> : null}
    </header>
  )
}

type PostPreviewCardProps = {
  card: (typeof caseStudies)[number]
  index: number
}

function PostPreviewCard({ card, index }: PostPreviewCardProps) {
  const handlePointerMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const dx = x - rect.width / 2
    const dy = y - rect.height / 2
    event.currentTarget.style.setProperty('--mx', `${x}px`)
    event.currentTarget.style.setProperty('--my', `${y}px`)
    event.currentTarget.style.setProperty('--dx', `${dx}px`)
    event.currentTarget.style.setProperty('--dy', `${dy}px`)
  }

  const linkText = `Read full ${card.title} case study`

  return (
    <article
      className={styles.postCard}
      data-reveal
      style={{ ['--reveal-delay' as string]: `${index * 70}ms` } as CSSProperties}
    >
      <Link
        to={`/projects/${card.slug}`}
        className={styles.postCardLink}
        onMouseMove={handlePointerMove}
        aria-label={linkText}
      >
        <div className={cn(styles.mediaButton, styles[`theme${capitalize(card.visualTheme)}` as keyof typeof styles])}>
          <div className={styles.mediaShimmer} aria-hidden="true" />
          <div className={styles.mediaPattern} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.mediaMeta}>
            <p>{card.subtitle}</p>
            <p>{extractYear(card.period)}</p>
          </div>
          <div className={styles.mediaTitleWrap}>
            <h3>{card.title}</h3>
            <p>{card.kind}</p>
          </div>
          <div className={styles.mediaOverlay} aria-hidden="true">
            <div className={styles.mediaOverlayInner}>
              <h4>View Case</h4>
              <div className={styles.overlayCrosses}>
                <span className={styles.overlayCross} />
                <span className={styles.overlayCross} />
                <span className={styles.overlayCross} />
                <span className={styles.overlayCross} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.postContent}>
          <div>
            <p className={styles.postSummaryLine}>{card.summaryLine}</p>
            <h3>{card.title}</h3>
            <p className={styles.postDescription}>{card.summary}</p>
          </div>
          <div className={styles.postFooter}>
            <div className={styles.tagRow}>
              {card.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tagPill}>
                  {tag}
                </span>
              ))}
            </div>
            <SlidingLink text={linkText} />
          </div>
        </div>
      </Link>
    </article>
  )
}

function SlidingLink({ text }: { text: string }) {
  const letters = Array.from(text)
  return (
    <span className={styles.slidingLink} aria-hidden="true">
      <span className={styles.slidingText}>
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={styles.slidingLetter}
            data-letter={letter === ' ' ? 'space' : letter}
            style={{ ['--letter-delay' as string]: `${index * 12}ms` } as CSSProperties}
          >
            <span>{letter === ' ' ? '\u00A0' : letter}</span>
            <span>{letter === ' ' ? '\u00A0' : letter}</span>
          </span>
        ))}
      </span>
      <ArrowIcon className={styles.slidingArrow} />
    </span>
  )
}

type CodePanelProps = {
  title: string
  badge: string
  children: ReactNode
  delayStyle?: CSSProperties
}

function CodePanel({ title, badge, children, delayStyle }: CodePanelProps) {
  return (
    <section className={styles.codePanel} data-reveal style={delayStyle}>
      <header className={styles.codePanelHeader}>
        <div className={styles.codeDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>{title}</p>
        <label>{badge}</label>
      </header>
      <div className={styles.codePanelBody}>{children}</div>
    </section>
  )
}

type CodeLineProps = {
  index: number
  label: string
  value: string
  accent?: 'violet' | 'blue' | 'teal' | 'indigo'
}

function CodeLine({ index, label, value, accent }: CodeLineProps) {
  return (
    <div className={styles.codeLine}>
      <span className={styles.codeLineNumber}>{String(index).padStart(2, '0')}</span>
      <span className={styles.codeLabel}>{label}</span>
      <span className={styles.codeEquals}>=</span>
      <span className={cn(styles.codeValue, accent && styles[`accent${capitalize(accent)}` as keyof typeof styles])}>
        {value}
      </span>
    </div>
  )
}

function Divider() {
  return <div className={styles.divider} aria-hidden="true" />
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M3 8H13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path
        d="M9 4L13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function getEasternTime() {
  try {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  } catch {
    return '00:00'
  }
}

function extractYear(period: string) {
  const years = period.match(/20\d{2}/g)
  return years?.at(-1) ?? period
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function capitalize(value: string) {
  return value ? `${value[0].toUpperCase()}${value.slice(1)}` : value
}
