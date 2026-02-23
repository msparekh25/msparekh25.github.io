import styles from '../styles/Portfolio.module.css'

interface FooterProps {
  name: string
}

export function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p className={styles.footerName}>{name}</p>
        <p className={styles.footerLine}>
          Designed for recruiting conversations in FP&amp;A, finance analytics, and AI-enabled decision support.
        </p>
        <p className={styles.footerLine}>© {year} {name}</p>
      </div>
    </footer>
  )
}
