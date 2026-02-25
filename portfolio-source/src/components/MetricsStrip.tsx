import type { MetricItem } from '../types/content'
import styles from '../styles/Portfolio.module.css'
import { RevealOnScroll } from './RevealOnScroll'

interface MetricsStripProps {
  items: MetricItem[]
  reducedMotion: boolean
}

export function MetricsStrip({ items, reducedMotion }: MetricsStripProps) {
  return (
    <section className={styles.metricsSection} aria-label="Key highlights">
      <div className={styles.metricsShell}>
        <RevealOnScroll className={styles.metricsLead} reducedMotion={reducedMotion}>
          <p className={styles.metricsLeadLabel}>Quick Signals</p>
          <p className={styles.metricsLeadTitle}>Business impact and academic rigor, at a glance.</p>
          <p className={styles.metricsLeadBody}>
            A compact reel inspired by premium portfolios, but optimized for recruiter scanability.
          </p>
        </RevealOnScroll>
        <div className={styles.metricsGrid}>
          {items.map((metric, index) => (
            <RevealOnScroll
              as="article"
              key={metric.label}
              className={styles.metricCard}
              delay={index * 60}
              reducedMotion={reducedMotion}
            >
              <p className={styles.metricLabel}>{metric.label}</p>
              <p className={styles.metricValue}>{metric.value}</p>
              <p className={styles.metricDetail}>{metric.detail}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
