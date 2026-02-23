import { useEffect, useMemo, useState } from 'react'
import { EducationSection } from './components/EducationSection'
import { ExperienceGrid } from './components/ExperienceGrid'
import { Footer } from './components/Footer'
import { HeroSection } from './components/HeroSection'
import { MetricsStrip } from './components/MetricsStrip'
import { ProjectsSection } from './components/ProjectsSection'
import { ResumeCTASection } from './components/ResumeCTASection'
import { SiteShell } from './components/SiteShell'
import { SkillsClusters } from './components/SkillsClusters'
import {
  education,
  experience,
  links,
  metrics,
  navItems,
  projects,
  resumeHighlights,
  siteMeta,
  skillGroups,
  workingStyle,
} from './data/portfolio'
import { useActiveSection } from './hooks/useActiveSection'
import { useReducedMotionPreference } from './hooks/useReducedMotionPreference'

function App() {
  const reducedMotion = useReducedMotionPreference()
  const [loaded, setLoaded] = useState(false)
  const sectionIds = useMemo(() => navItems.map((item) => item.id), [])
  const { activeSectionId, isScrolled } = useActiveSection(sectionIds)

  useEffect(() => {
    if (reducedMotion) {
      setLoaded(true)
      return
    }

    const frame = window.requestAnimationFrame(() => {
      setLoaded(true)
    })

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full'
  }, [reducedMotion])

  return (
    <SiteShell
      navItems={navItems}
      activeSectionId={activeSectionId}
      isScrolled={isScrolled}
      links={links}
      reducedMotion={reducedMotion}
    >
      <HeroSection
        loaded={loaded}
        reducedMotion={reducedMotion}
        links={links}
        headline={siteMeta.headline}
        subheadline={siteMeta.subheadline}
        intro={siteMeta.intro}
      />
      <MetricsStrip items={metrics} reducedMotion={reducedMotion} />
      <ExperienceGrid items={experience} featuredOnly reducedMotion={reducedMotion} />
      <ProjectsSection projects={projects} reducedMotion={reducedMotion} />
      <SkillsClusters groups={skillGroups} workingStyle={workingStyle} reducedMotion={reducedMotion} />
      <EducationSection education={education} reducedMotion={reducedMotion} />
      <ResumeCTASection links={links} highlights={resumeHighlights} reducedMotion={reducedMotion} />
      <Footer name={siteMeta.name} />
    </SiteShell>
  )
}

export default App
