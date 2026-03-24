import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Crosshair,
  FileText,
  Mail,
  MapPin,
} from 'lucide-react'
import { HlsVideo } from './components/hls-video'
import { Button } from './components/ui/button'
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
import { cn } from './lib/utils'

type WorkShowcaseItem = {
  id: string
  kind: 'Project' | 'Experience'
  title: string
  eyebrow: string
  summary: string
  period: string
  statValue: string
  statLabel: string
  tags: string[]
  sortKey: number
}

type SnapshotItem = {
  id: string
  summary: string
  name: string
  role: string
  initials: string
}

type StorySectionProps = {
  id?: string
  badgeLead: string
  badgeTail: string
  title: ReactNode
  body: string
  bullets?: string[]
  stats?: Array<{ value: string; label: string }>
  primaryAction: {
    label: string
    href: string
    icon: ReactNode
    external?: boolean
  }
  secondaryAction?: {
    label: string
    href: string
    icon: ReactNode
    external?: boolean
  }
  videoSrc: string
  mediaRight?: boolean
}

const heroVideoSrc =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260309_042944_4a2205b7-b061-490a-852b-92d9e9955ce9.mp4'
const featuresVideoSrc =
  'https://stream.mux.com/Jwr2RhmsNrd6GEspBNgm02vJsRZAGlaoQIh4AucGdASw.m3u8'
const routingVideoSrc =
  'https://stream.mux.com/1CCfG6mPC7LbMOAs6iBOfPeNd3WaKlZuHuKHp00G62j8.m3u8'
const studioVideoSrc =
  'https://stream.mux.com/f0001qPDy00mvqP023lqK3lWx31uHvxirFCHK1yNLczzqxY.m3u8'
const numbersVideoSrc =
  'https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8'
const footerVideoSrc =
  'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'

const navLinks = [
  { label: 'Work', href: '#work', withChevron: true },
  { label: 'Experience', href: '#experience' },
  { label: 'Results', href: '#results' },
  { label: 'Contact', href: '#contact' },
]

const workStats: Record<string, { value: string; label: string }> = {
  'healthy-amplified': { value: 'JPMorgan', label: 'capital raise support' },
  'handshake-ai': { value: 'LLM QA', label: 'evaluation systems' },
  'umd-research': { value: 'FIRE', label: 'faculty-led research' },
  'mirae-asset': { value: '30%+', label: 'retention support' },
  tailored: { value: 'App Store', label: 'launched product' },
  'object-detection-accessibility': { value: 'AI + Sensors', label: 'assistive prototype' },
  'blockchain-publication': { value: 'NHSJS', label: 'published research' },
}

function App() {
  const reducedMotion = useReducedMotionPreference()
  const [loaded, setLoaded] = useState(false)

  const healthyAmplified = experience.find((item) => item.id === 'healthy-amplified')
  const handshakeAi = experience.find((item) => item.id === 'handshake-ai')
  const umdResearch = experience.find((item) => item.id === 'umd-research')
  const miraeAsset = experience.find((item) => item.id === 'mirae-asset')
  const tailored = projects.find((item) => item.id === 'tailored')

  const featuredWork = useMemo<WorkShowcaseItem[]>(() => {
    const experienceWork = experience
      .filter((item) => item.featured)
      .map((item) => ({
        id: item.id,
        kind: 'Experience' as const,
        title: item.organization,
        eyebrow: item.role,
        summary: item.summary,
        period: `${item.start} — ${item.end}`,
        statValue: workStats[item.id]?.value ?? item.end,
        statLabel: workStats[item.id]?.label ?? item.category,
        tags: item.tags.slice(0, 3),
        sortKey: monthLabelToTimestamp(item.end),
      }))

    const projectWork = projects
      .filter((item) => item.featured)
      .map((item) => ({
        id: item.id,
        kind: 'Project' as const,
        title: item.title,
        eyebrow: item.role,
        summary: item.summary,
        period: item.period,
        statValue: workStats[item.id]?.value ?? 'Featured',
        statLabel: workStats[item.id]?.label ?? 'selected work',
        tags: item.tech.slice(0, 3),
        sortKey: monthLabelToTimestamp(getPeriodEndLabel(item.period)),
      }))

    return [...experienceWork, ...projectWork]
      .sort((left, right) => right.sortKey - left.sortKey)
      .slice(0, 3)
  }, [])

  const snapshotItems = useMemo<SnapshotItem[]>(() => {
    const items = [
      handshakeAi && {
        id: handshakeAi.id,
        summary: handshakeAi.summary,
        name: handshakeAi.organization,
        role: handshakeAi.role,
        initials: 'HA',
      },
      umdResearch && {
        id: umdResearch.id,
        summary: umdResearch.summary,
        name: 'UMD Computing & Society',
        role: umdResearch.role,
        initials: 'UM',
      },
      tailored && {
        id: tailored.id,
        summary: tailored.summary,
        name: tailored.title,
        role: tailored.role,
        initials: 'TA',
      },
    ].filter(Boolean)

    return items as SnapshotItem[]
  }, [handshakeAi, tailored, umdResearch])

  const financeSkills = skillGroups.find((group) => group.id === 'finance')
  const dataSkills = skillGroups.find((group) => group.id === 'data-ai')
  const engineeringSkills = skillGroups.find((group) => group.id === 'engineering-tools')

  useEffect(() => {
    if (reducedMotion) {
      setLoaded(true)
      return
    }

    const frame = window.requestAnimationFrame(() => setLoaded(true))
    return () => window.cancelAnimationFrame(frame)
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
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12,
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [reducedMotion])

  if (!healthyAmplified || !miraeAsset || !handshakeAi || !umdResearch || !tailored) {
    return null
  }

  return (
    <div className="relative isolate overflow-x-clip bg-background text-foreground">
      <section id="top" className="relative min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(138,255,170,0.12),transparent_20%),radial-gradient(circle_at_78%_18%,rgba(104,72,255,0.24),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_38%)]" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, transparent 30%, hsl(260 87% 3% / 0.1) 45%, hsl(260 87% 3% / 0.4) 60%, hsl(260 87% 3% / 0.75) 75%, hsl(260 87% 3%) 95%)',
          }}
        />

        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="mx-auto w-full max-w-[850px] px-4 pt-6 sm:px-6">
            <div
              className={cn(
                'liquid-glass flex items-center justify-between rounded-[1.75rem] px-4 py-3 text-sm text-foreground/86 transition-all duration-700',
                loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
              )}
            >
              <a href="#top" className="flex items-center gap-3 pr-4">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-b from-secondary to-muted text-primary shadow-glass">
                  <Crosshair className="h-4 w-4" />
                </span>
                <span className="text-xl font-semibold tracking-tight">MANN</span>
              </a>

              <nav className="hidden items-center gap-7 md:flex">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-1 text-sm text-foreground/72 transition-colors hover:text-foreground"
                  >
                    <span>{item.label}</span>
                    {item.withChevron ? <ChevronDown className="h-4 w-4" /> : null}
                  </a>
                ))}
              </nav>

              <Button asChild variant="hero" size="sm">
                <a href={links.resumeUrl} target="_blank" rel="noreferrer">
                  Resume
                </a>
              </Button>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 pb-10 pt-10 sm:px-6 lg:px-8">
            <div className="max-w-5xl pt-12 sm:pt-20">
              <div
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-2 py-2 transition-all duration-700',
                  'liquid-glass',
                  loaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                )}
                style={{ transitionDelay: '120ms' }}
              >
                <span className="rounded-full px-4 py-1.5 text-sm text-foreground/82">
                  University of Maryland
                </span>
                <ChevronRight className="h-4 w-4 text-primary/90" />
                <span className="rounded-full bg-white/5 px-4 py-1.5 text-sm text-foreground/72">
                  Spring 2027
                </span>
              </div>

              <div
                className={cn(
                  'mt-8 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs uppercase tracking-[0.22em] text-foreground/60 transition-all duration-700',
                  loaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
                )}
                style={{ transitionDelay: '190ms' }}
              >
                <span>Finance Systems</span>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span>Analytics</span>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span>FP&amp;A</span>
              </div>

              <h1
                className={cn(
                  'mt-8 max-w-5xl text-hero-heading text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl transition-all duration-1000',
                  loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )}
                style={{ transitionDelay: '240ms' }}
              >
                <span className="block">Quantitative finance</span>
                <span className="block">and analytics,</span>
                <span className="block">built with technical rigor.</span>
              </h1>

              <p
                className={cn(
                  'mt-6 max-w-xl text-lg text-hero-sub/90 transition-all duration-1000',
                  loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )}
                style={{ transitionDelay: '320ms' }}
              >
                {siteMeta.intro}
              </p>

              <div
                className={cn(
                  'mt-8 flex flex-wrap gap-4 transition-all duration-1000',
                  loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )}
                style={{ transitionDelay: '400ms' }}
              >
                <Button asChild variant="hero">
                  <a href={links.resumeUrl} target="_blank" rel="noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    View Resume
                  </a>
                </Button>
                <Button asChild variant="heroSecondary">
                  <a href={`mailto:${links.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </a>
                </Button>
              </div>
            </div>

            <div
              className={cn(
                'mt-16 flex flex-col gap-6 rounded-[2rem] px-1 py-2 transition-all duration-1000 md:flex-row md:items-end md:justify-between',
                loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
              )}
              style={{ transitionDelay: '520ms' }}
            >
              <div className="max-w-xs">
                <p className="text-sm uppercase tracking-[0.18em] text-foreground/45">Selected signals</p>
                <p className="mt-3 text-sm text-foreground/55">
                  Experience across finance, research, product work, and analytics systems.
                </p>
              </div>

              <div className="overflow-hidden md:max-w-[760px]">
                <div className="flex w-max gap-4 animate-marquee pr-4">
                  {[...getMarqueeLabels(), ...getMarqueeLabels()].map((brand, index) => (
                    <div
                      key={`${brand}-${index}`}
                      className="liquid-glass flex items-center gap-3 rounded-full px-4 py-3 text-sm text-foreground/78"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-xs font-semibold uppercase text-primary">
                        {brand.charAt(0)}
                      </span>
                      <span>{brand}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="relative overflow-hidden py-28 scroll-mt-24">
        <HlsVideo src={featuresVideoSrc} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-background/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badgeLead="Selected Work"
            badgeTail="Portfolio"
            title={
              <>
                Recent work across finance,
                <br />
                analytics, and product systems
              </>
            }
            description="A few recent projects and roles where quantitative thinking, modeling, and execution translated into something tangible."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {featuredWork.map((item, index) => (
              <article
                key={item.id}
                data-reveal
                style={{ transitionDelay: `${index * 110}ms` }}
                className="liquid-glass group rounded-[1.75rem] p-8 transition-colors duration-300 hover:bg-white/[0.03]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-foreground/50">{item.kind}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-hero-heading">{item.title}</h3>
                  </div>
                  <span className="text-sm text-foreground/52">{item.period}</span>
                </div>

                <p className="mt-4 text-sm font-medium text-primary">{item.eyebrow}</p>
                <p className="mt-4 max-w-sm text-base leading-7 text-foreground/72">{item.summary}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-foreground/62"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-t border-border/50 pt-6">
                  <p className="text-3xl font-semibold tracking-tight text-hero-heading">{item.statValue}</p>
                  <p className="mt-2 text-sm text-foreground/55">{item.statLabel}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <StorySection
        id="experience"
        badgeLead="Healthy Amplified"
        badgeTail="FP&A"
        title={
          <>
            Executive reporting and
            <br />
            capital strategy support
          </>
        }
        body={healthyAmplified.summary}
        bullets={healthyAmplified.highlights}
        primaryAction={{
          label: 'View Resume',
          href: links.resumeUrl,
          icon: <FileText className="mr-2 h-4 w-4" />,
          external: true,
        }}
        secondaryAction={{
          label: 'Email Me',
          href: `mailto:${links.email}`,
          icon: <Mail className="mr-2 h-4 w-4" />,
        }}
        videoSrc={routingVideoSrc}
      />

      <StorySection
        badgeLead="Mirae Asset"
        badgeTail="Applied AI"
        title={
          <>
            Forecasting workflows
            <br />
            tied to retention strategy
          </>
        }
        body={miraeAsset.summary}
        stats={[
          { value: '30%+', label: 'client retention support' },
          { value: '2', label: 'core finance workflows shipped' },
          { value: 'Python + R', label: 'modeling stack' },
          { value: '20+', label: 'AI team collaborators' },
        ]}
        primaryAction={{
          label: 'Open Resume',
          href: links.resumeUrl,
          icon: <FileText className="mr-2 h-4 w-4" />,
          external: true,
        }}
        videoSrc={studioVideoSrc}
        mediaRight
      />

      <section id="results" className="relative overflow-hidden py-32 scroll-mt-24">
        <HlsVideo src={numbersVideoSrc} className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, hsl(260 87% 3%) 0%, hsl(260 87% 3% / 0.85) 15%, hsl(260 87% 3% / 0.4) 40%, hsl(260 87% 3% / 0.15) 60%, hsl(260 87% 3% / 0.3) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div data-reveal className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.26em] text-primary/80">Results</p>
            <div className="mt-8 text-7xl font-semibold tracking-tighter text-hero-heading sm:text-[8rem] lg:text-[10rem]">
              {metrics[0]?.value ?? '30%+'}
            </div>
            <p className="mt-4 text-xl font-medium text-hero-heading">Client retention support</p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-foreground/70">
              {metrics[0]?.detail}
            </p>
          </div>

          <div
            data-reveal
            className="liquid-glass mx-auto mt-20 grid max-w-5xl gap-0 rounded-[2rem] p-8 md:grid-cols-2 md:p-12"
            style={{ transitionDelay: '120ms' }}
          >
            <div className="flex flex-col justify-center gap-3 border-b border-border/50 py-6 md:border-b-0 md:border-r md:pr-12">
              <p className="text-5xl font-semibold tracking-tight text-hero-heading">{metrics[1]?.value}</p>
              <p className="text-xl text-foreground/80">{metrics[1]?.label}</p>
              <p className="max-w-md text-sm leading-7 text-foreground/58">{metrics[1]?.detail}</p>
            </div>
            <div className="flex flex-col justify-center gap-3 py-6 md:pl-12">
              <p className="text-5xl font-semibold tracking-tight text-hero-heading">{metrics[2]?.value}</p>
              <p className="text-xl text-foreground/80">{metrics[2]?.label}</p>
              <p className="max-w-md text-sm leading-7 text-foreground/58">{metrics[2]?.detail}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            centered
            badgeLead="Experience Snapshots"
            badgeTail="Selected"
            title={
              <>
                Built across finance,
                <br />
                research, and product work
              </>
            }
            description="Three environments where analysis had to be clear, reproducible, and useful for actual decisions."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {snapshotItems.map((item, index) => (
              <article
                key={item.id}
                data-reveal
                style={{ transitionDelay: `${index * 90}ms` }}
                className={cn(
                  'liquid-glass rounded-[1.75rem] p-8',
                  index === 1 ? 'md:-translate-y-6' : '',
                )}
              >
                <p className="text-base leading-8 text-foreground/74">{item.summary}</p>
                <div className="mt-8 border-t border-border/50 pt-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                      {item.initials}
                    </span>
                    <div>
                      <p className="font-medium text-hero-heading">{item.name}</p>
                      <p className="text-sm text-foreground/56">{item.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden pt-8">
        <HlsVideo src={footerVideoSrc} className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, hsl(260 87% 3%) 0%, hsl(260 87% 3% / 0.85) 15%, hsl(260 87% 3% / 0.4) 40%, hsl(260 87% 3% / 0.15) 60%, hsl(260 87% 3% / 0.3) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div data-reveal className="liquid-glass rounded-[2rem] p-12 text-center sm:p-20">
            <p className="text-sm uppercase tracking-[0.26em] text-primary/80">Connect</p>
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-tight text-hero-heading sm:text-5xl lg:text-6xl">
              Ready to review my work
              <br />
              in finance and analytics?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/70">
              If you&apos;re hiring for FP&amp;A, strategic finance, analytics, or technical research
              support, I&apos;d be glad to connect.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero">
                <a href={links.resumeUrl} target="_blank" rel="noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  Open Resume
                </a>
              </Button>
              <Button asChild variant="heroSecondary">
                <a href={`mailto:${links.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Me
                </a>
              </Button>
            </div>
          </div>

          <footer className="mt-14 border-t border-border/30 py-12">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-secondary to-muted text-primary">
                    <Crosshair className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-hero-heading">{siteMeta.name}</p>
                    <p className="text-sm text-foreground/58">{siteMeta.title}</p>
                  </div>
                </div>

                <p className="mt-5 max-w-md text-sm leading-7 text-foreground/62">{workingStyle}</p>

                <div className="mt-6 space-y-3 text-sm text-foreground/64">
                  <a href={`mailto:${links.email}`} className="flex items-center gap-3 hover:text-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{links.email}</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{links.location}</span>
                  </div>
                  {links.githubUrl ? (
                    <a
                      href={links.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 hover:text-foreground"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
                        G
                      </span>
                      <span>github.com/msparekh25</span>
                    </a>
                  ) : null}
                </div>
              </div>

              <FooterColumn title="Focus" items={resumeHighlights} />
              <FooterColumn
                title="Toolkit"
                items={[
                  financeSkills?.items[0],
                  financeSkills?.items[1],
                  dataSkills?.items[0],
                  dataSkills?.items[6],
                  engineeringSkills?.items[4],
                ]}
              />
              <FooterColumn
                title="Education"
                items={[
                  education.school,
                  education.degreeLine,
                  education.gpa,
                  education.honors[0],
                ]}
              />
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-border/30 pt-6 text-sm text-foreground/54 md:flex-row md:items-center md:justify-between">
              <p>© 2026 Mann Parekh.</p>
              <div className="flex flex-wrap gap-5">
                <a href={links.resumeUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
                  Resume
                </a>
                {links.githubUrl ? (
                  <a href={links.githubUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
                    GitHub
                  </a>
                ) : null}
                <a href={`mailto:${links.email}`} className="hover:text-foreground">
                  Email
                </a>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  )
}

function StorySection({
  id,
  badgeLead,
  badgeTail,
  title,
  body,
  bullets,
  stats,
  primaryAction,
  secondaryAction,
  videoSrc,
  mediaRight,
}: StorySectionProps) {
  return (
    <section id={id} className="relative py-32 scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className={cn(mediaRight ? 'order-1 lg:order-2' : 'order-1')}>
          <div className="liquid-glass aspect-[4/3] overflow-hidden rounded-[1.75rem]">
            <HlsVideo src={videoSrc} className="h-full w-full" />
          </div>
        </div>

        <div
          data-reveal
          className={cn(
            'flex flex-col justify-center',
            mediaRight ? 'order-2 lg:order-1' : 'order-2',
          )}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-2 py-2 liquid-glass w-fit">
            <span className="rounded-full px-4 py-1.5 text-sm text-foreground/82">{badgeLead}</span>
            <ChevronRight className="h-4 w-4 text-primary/90" />
            <span className="rounded-full bg-white/5 px-4 py-1.5 text-sm text-foreground/72">
              {badgeTail}
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-semibold leading-tight text-hero-heading sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-foreground/72">{body}</p>

          {bullets?.length ? (
            <div className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-4 text-sm leading-7 text-foreground/66">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          ) : null}

          {stats?.length ? (
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="liquid-glass rounded-2xl p-4">
                  <p className="text-2xl font-semibold text-hero-heading">{stat.value}</p>
                  <p className="mt-2 text-sm text-foreground/58">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild variant="hero">
              <a
                href={primaryAction.href}
                target={primaryAction.external ? '_blank' : undefined}
                rel={primaryAction.external ? 'noreferrer' : undefined}
              >
                {primaryAction.icon}
                {primaryAction.label}
              </a>
            </Button>
            {secondaryAction ? (
              <Button asChild variant="heroSecondary">
                <a
                  href={secondaryAction.href}
                  target={secondaryAction.external ? '_blank' : undefined}
                  rel={secondaryAction.external ? 'noreferrer' : undefined}
                >
                  {secondaryAction.icon}
                  {secondaryAction.label}
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({
  badgeLead,
  badgeTail,
  title,
  description,
  centered,
}: {
  badgeLead: string
  badgeTail: string
  title: ReactNode
  description: string
  centered?: boolean
}) {
  return (
    <div data-reveal className={cn('max-w-3xl', centered ? 'mx-auto text-center' : '')}>
      <div
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-2 py-2 liquid-glass',
          centered ? 'mx-auto' : '',
        )}
      >
        <span className="rounded-full px-4 py-1.5 text-sm text-foreground/82">{badgeLead}</span>
        <ChevronRight className="h-4 w-4 text-primary/90" />
        <span className="rounded-full bg-white/5 px-4 py-1.5 text-sm text-foreground/72">{badgeTail}</span>
      </div>
      <h2 className="mt-6 text-3xl font-semibold leading-tight text-hero-heading sm:text-5xl">{title}</h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/70">{description}</p>
    </div>
  )
}

function FooterColumn({ title, items }: { title: string; items: Array<string | undefined> }) {
  const filteredItems = items.filter(Boolean) as string[]

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground/46">{title}</p>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/63">
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function getMarqueeLabels() {
  return ['Healthy Amplified', 'Mirae Asset', 'Handshake AI', 'UMD FIRE', 'Tailored', 'vPhrase']
}

function getPeriodEndLabel(period: string) {
  return period.split('—').pop()?.trim() ?? period.trim()
}

function monthLabelToTimestamp(label: string) {
  const cleaned = label.replace(/\s+/g, ' ').trim()
  const [month, year] = cleaned.split(' ')
  const monthIndex = monthLookup[month] ?? 0
  const numericYear = Number.parseInt(year, 10)

  if (Number.isNaN(numericYear)) {
    return 0
  }

  return new Date(numericYear, monthIndex, 1).getTime()
}

const monthLookup: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
}

export default App
