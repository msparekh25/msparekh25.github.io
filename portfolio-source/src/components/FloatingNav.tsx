import type { ExternalLinks, NavItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { cn } from '../utils/cn'

interface FloatingNavProps {
  items: NavItem[]
  activeSectionId: string
  isScrolled: boolean
  links: ExternalLinks
}

export function FloatingNav({ items, activeSectionId, isScrolled, links }: FloatingNavProps) {
  return (
    <nav className={cn(styles.floatingNav, isScrolled && styles.floatingNavScrolled)} aria-label="Primary">
      <a className={styles.brand} href="#top">
        <span className={styles.brandDot} />
        Mann Parekh
      </a>

      <div className={styles.navScrollWrap}>
        <ul className={styles.navList}>
          {items.map((item) => {
            const isActive = activeSectionId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(styles.navLink, isActive && styles.navLinkActive)}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <a className={styles.navEmail} href={`mailto:${links.email}`}>
        {links.email}
      </a>
    </nav>
  )
}
