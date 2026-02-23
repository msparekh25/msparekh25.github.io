import styles from '../styles/Portfolio.module.css'

interface BackgroundEffectsProps {
  reducedMotion: boolean
}

export function BackgroundEffects({ reducedMotion }: BackgroundEffectsProps) {
  return (
    <div className={styles.backgroundLayer} aria-hidden="true">
      <div className={styles.noiseOverlay} />
      <div className={styles.gridGlow} />
      <div className={styles.topVignette} />
      <div
        className={styles.orbOne}
        data-reduced-motion={reducedMotion ? 'true' : 'false'}
      />
      <div
        className={styles.orbTwo}
        data-reduced-motion={reducedMotion ? 'true' : 'false'}
      />
    </div>
  )
}
