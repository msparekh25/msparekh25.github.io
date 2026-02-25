import { useEffect, useMemo, useRef, useState } from 'react'
import type { ProjectItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { ProjectCard } from './ProjectCard'
import { ProjectDetailPanel } from './ProjectDetailPanel'
import { RevealOnScroll } from './RevealOnScroll'
import { SectionHeader } from './SectionHeader'

interface ProjectsSectionProps {
  projects: ProjectItem[]
  reducedMotion: boolean
}

const DETAIL_PANEL_ID = 'project-detail-panel'

export function ProjectsSection({ projects, reducedMotion }: ProjectsSectionProps) {
  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), [projects])
  const [selectedId, setSelectedId] = useState<string | null>(featuredProjects[0]?.id ?? null)
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const selectedProject = featuredProjects.find((project) => project.id === selectedId) ?? null

  const registerButton = (projectId: string, element: HTMLButtonElement | null) => {
    buttonRefs.current[projectId] = element
  }

  const handleToggle = (projectId: string) => {
    setSelectedId((current) => (current === projectId ? null : projectId))
  }

  const handleClose = () => {
    setSelectedId((current) => {
      if (current) {
        const trigger = buttonRefs.current[current]
        requestAnimationFrame(() => {
          trigger?.focus()
        })
      }
      return null
    })
  }

  useEffect(() => {
    if (!selectedId) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedId])

  return (
    <section id="projects" data-section className={styles.sectionBlock}>
      <SectionHeader
        eyebrow="Featured Projects"
        title="Selected work in a showcase-first format"
        description="A Conor-inspired project rail with large visual previews, then expandable notes for implementation and business context."
      />

      <div className={styles.projectShowcaseTop}>
        <p className={styles.projectShowcaseCaption}>Scroll / drag the showcase cards to browse projects</p>
      </div>

      <div className={styles.projectShowcaseRail} role="list" aria-label="Project showcase cards">
        {featuredProjects.map((project, index) => (
          <RevealOnScroll
            key={project.id}
            delay={index * 70}
            reducedMotion={reducedMotion}
            className={styles.projectShowcaseItem}
          >
            <ProjectCard
              project={project}
              isSelected={selectedId === project.id}
              displayIndex={index + 1}
              isFeature={index === 0}
              onToggle={handleToggle}
              registerButton={registerButton}
              panelId={DETAIL_PANEL_ID}
            />
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={120} reducedMotion={reducedMotion}>
        <ProjectDetailPanel
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={handleClose}
          closeButtonRef={closeButtonRef}
          panelId={DETAIL_PANEL_ID}
        />
      </RevealOnScroll>
    </section>
  )
}
