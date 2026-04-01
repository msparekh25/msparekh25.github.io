import type { ReactNode } from 'react'
import type { ExternalLinks, NavItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { BackgroundEffects } from './BackgroundEffects'
import { FloatingNav } from './FloatingNav'

interface SiteShellProps {
  children: ReactNode
  navItems: NavItem[]
  links: ExternalLinks
  reducedMotion: boolean
}

export function SiteShell({
  children,
  navItems,
  links,
  reducedMotion,
}: SiteShellProps) {
  return (
    <div className={styles.appShell}>
      <BackgroundEffects reducedMotion={reducedMotion} />
      <FloatingNav
        items={navItems}
        links={links}
        clockText=""
        onNavigate={() => undefined}
        theme="dark"
        onToggleTheme={() => undefined}
      />
      <main className={styles.mainContent}>{children}</main>
    </div>
  )
}
