import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

type Theme = 'dark' | 'light'
const THEME_STORAGE_KEY = 'portfolio-theme-v2'
const ProjectPage = lazy(async () => {
  const module = await import('./pages/ProjectPage')
  return { default: module.ProjectPage }
})

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage theme={theme} onToggleTheme={() => setTheme(toggleTheme)} />} />
          <Route
            path="/projects/:slug"
            element={<ProjectPage theme={theme} onToggleTheme={() => setTheme(toggleTheme)} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return null
}

function toggleTheme(currentTheme: Theme): Theme {
  return currentTheme === 'dark' ? 'light' : 'dark'
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return 'light'
}

export default App
