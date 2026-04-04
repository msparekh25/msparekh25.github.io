import { useActiveSection } from '../hooks/useActiveSection'
import styles from '../styles/JoshwPortfolio.module.css'
import { cn } from '../utils/cn'

interface FloatingNavProps {
  items: Array<{ id: string; label: string }>
  links: { email: string; location: string }
  clockText: string
  onNavigate: (sectionId: 'work' | 'experience' | 'toolkit' | 'contact') => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function FloatingNav({ items, links, clockText, onNavigate, theme, onToggleTheme }: FloatingNavProps) {
  const { activeSectionId } = useActiveSection(items.map((item) => item.id))

  return (
    <header className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <div className={styles.topChip}>
          {clockText} <span>(EST)</span>
        </div>
        <div className={styles.topChip}>{links.location}</div>
      </div>

      <nav className={styles.topBarNav} aria-label="Section navigation">
        <div className={styles.navPrimary}>
          {items.map((item) => {
            const isActive = activeSectionId === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id as 'work' | 'experience' | 'toolkit' | 'contact')}
                className={cn(styles.navButton, isActive && styles.navButtonActive)}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        <div className={styles.navUtility}>
          <a className={styles.navButton} href={`mailto:${links.email}`}>
            Email
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
      </nav>
    </header>
  )
}
