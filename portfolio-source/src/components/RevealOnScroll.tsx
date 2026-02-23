import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import styles from '../styles/Portfolio.module.css'
import { cn } from '../utils/cn'

type RevealTag = 'div' | 'section' | 'article' | 'li'

interface RevealOnScrollProps extends HTMLAttributes<HTMLElement> {
  as?: RevealTag
  children: ReactNode
  delay?: number
  threshold?: number
  offsetY?: number
  once?: boolean
  reducedMotion?: boolean
}

export function RevealOnScroll({
  as = 'div',
  children,
  className,
  delay = 0,
  threshold = 0.2,
  offsetY = 18,
  once = true,
  reducedMotion = false,
  style,
  ...rest
}: RevealOnScrollProps) {
  const Tag = as as ElementType
  const nodeRef = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true)
      return
    }

    const node = nodeRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          setIsVisible(true)
          if (once) {
            observer.disconnect()
            return
          }
        }

        if (!once) {
          const first = entries[0]
          if (first) {
            setIsVisible(first.isIntersecting)
          }
        }
      },
      { threshold },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once, reducedMotion, threshold])

  const revealStyle = {
    ...style,
    ['--reveal-delay' as string]: `${delay}ms`,
    ['--reveal-offset' as string]: `${offsetY}px`,
  } as CSSProperties

  return (
    <Tag
      ref={nodeRef}
      className={cn(styles.reveal, isVisible && styles.revealVisible, className)}
      style={revealStyle}
      {...rest}
    >
      {children}
    </Tag>
  )
}
