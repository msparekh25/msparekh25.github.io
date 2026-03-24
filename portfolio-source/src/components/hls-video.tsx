import { useEffect, useRef } from 'react'
import { cn } from '../lib/utils'

type HlsVideoProps = {
  src: string
  className?: string
  poster?: string
}

export function HlsVideo({ src, className, poster }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let mounted = true
    let hlsInstance: { destroy: () => void } | null = null

    video.muted = true
    video.playsInline = true
    video.loop = true

    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay can be blocked in some environments; background video can fail silently.
      })
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      video.load()
      playVideo()
      return
    }

    import('hls.js')
      .then(({ default: Hls }) => {
        if (!mounted || !Hls.isSupported()) return

        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        })

        hlsInstance = hls
        hls.loadSource(src)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, playVideo)
      })
      .catch(() => {
        // If dynamic loading fails, the background video simply remains static.
      })

    return () => {
      mounted = false
      hlsInstance?.destroy()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className={cn('h-full w-full object-cover', className)}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
    />
  )
}
