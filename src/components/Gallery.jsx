import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

const videos = [
  {
    src: '/assets/video1.mp4',
    title: 'Fun Learning Activities',
    description: 'Watch our kids enjoy creative learning sessions',
  },
  {
    src: '/assets/video2.mp4',
    title: 'Outdoor Adventures',
    description: 'Exploring nature and building teamwork skills',
  },
  {
    src: '/assets/video3.mp4',
    title: 'Creative Expression',
    description: 'Art, music, and dance bring joy to every day',
  },
]

const MOBILE_MEDIA_QUERY = '(hover: none), (pointer: coarse)'
const MOBILE_AUDIO_THRESHOLD = 0.18

const isMobileDevice = () =>
  typeof window !== 'undefined' && window.matchMedia(MOBILE_MEDIA_QUERY).matches

// Track if user has interacted with the page (required by browser autoplay policy)
let userHasInteracted = false
if (typeof window !== 'undefined') {
  const markInteracted = () => {
    userHasInteracted = true
    window.removeEventListener('click', markInteracted)
    window.removeEventListener('touchstart', markInteracted)
    window.removeEventListener('touchend', markInteracted)
    window.removeEventListener('pointerdown', markInteracted)
    window.removeEventListener('keydown', markInteracted)
  }
  window.addEventListener('click', markInteracted, { passive: true })
  window.addEventListener('touchstart', markInteracted, { passive: true })
  window.addEventListener('touchend', markInteracted, { passive: true })
  window.addEventListener('pointerdown', markInteracted, { passive: true })
  window.addEventListener('keydown', markInteracted, { passive: true })
}

function VideoCard({
  video,
  index,
  sectionInView,
  isMobileView,
  hasAudioFocus,
  onRequestAudio,
  onReleaseAudio,
  onMobileVisibilityChange,
}) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  const ensurePlayback = useCallback((vid) => {
    if (!vid) return
    vid.loop = true
    if (vid.paused) {
      vid.play().catch(() => {})
    }
  }, [])

  const safeMute = useCallback(
    (vid) => {
      if (!vid) return
      vid.muted = true
      setIsMuted(true)
      ensurePlayback(vid)
    },
    [ensurePlayback],
  )

  const safeUnmute = useCallback(
    (vid, { allowWithoutInteraction = false } = {}) => {
      if (!vid) return false

      ensurePlayback(vid)

      if (!allowWithoutInteraction && !userHasInteracted) {
        safeMute(vid)
        return false
      }

      try {
        vid.muted = false
        setIsMuted(false)
        return true
      } catch {
        safeMute(vid)
        return false
      }
    },
    [ensurePlayback, safeMute],
  )

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = true
    ensurePlayback(vid)
  }, [ensurePlayback])

  useEffect(() => {
    if (!isMobileView) return
    if (!cardRef.current || !videoRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        onMobileVisibilityChange(index, entry)
      },
      { threshold: [0, MOBILE_AUDIO_THRESHOLD, 0.5, 1] },
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index, isMobileView, onMobileVisibilityChange])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    if (hasAudioFocus) {
      safeUnmute(vid, { allowWithoutInteraction: !isMobileView })
      return
    }

    safeMute(vid)
  }, [hasAudioFocus, isMobileView, safeMute, safeUnmute])

  const handleMouseEnter = () => {
    if (isMobileView) return
    onRequestAudio(index)
  }

  const handleMouseLeave = () => {
    if (isMobileView) return
    onReleaseAudio(index)
  }

  const toggleMute = () => {
    if (hasAudioFocus) {
      onReleaseAudio(index)
      return
    }

    onRequestAudio(index)
  }

  return (
    <motion.div
      ref={cardRef}
      className="clay-card gallery-item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.2, type: 'spring', bounce: 0.5 }}
      style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ flex: 1, overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
        <video
          ref={videoRef}
          src={video.src}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div className="gallery-card-footer">
        <div>
          <h4 className="gallery-card-title">{video.title}</h4>
          <p className="gallery-card-desc">{video.description}</p>
        </div>
        <button
          className="clay-btn gallery-mute-btn"
          onClick={(e) => {
            e.stopPropagation()
            toggleMute()
          }}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          aria-pressed={!isMuted}
        >
          {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
        </button>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isMobileView, setIsMobileView] = useState(() => isMobileDevice())
  const [activeAudioIndex, setActiveAudioIndex] = useState(null)
  const visibleCardsRef = useRef(new Map())

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY)
    const syncDeviceMode = () => {
      setIsMobileView(mediaQuery.matches)
      visibleCardsRef.current.clear()
      setActiveAudioIndex(null)
    }

    syncDeviceMode()
    mediaQuery.addEventListener('change', syncDeviceMode)
    return () => mediaQuery.removeEventListener('change', syncDeviceMode)
  }, [])

  const requestAudio = useCallback((index) => {
    setActiveAudioIndex(index)
  }, [])

  const releaseAudio = useCallback((index) => {
    setActiveAudioIndex((current) => (current === index ? null : current))
  }, [])

  const handleMobileVisibilityChange = useCallback(
    (index, entry) => {
      if (!isMobileView) return

      const isVisible = entry.isIntersecting && entry.intersectionRatio >= MOBILE_AUDIO_THRESHOLD
      const wasVisible = visibleCardsRef.current.has(index)

      if (isVisible) {
        visibleCardsRef.current.set(index, true)

        if (!wasVisible) {
          setActiveAudioIndex(index)
        }

        return
      }

      if (!wasVisible) return

      visibleCardsRef.current.delete(index)
      setActiveAudioIndex((current) => {
        if (current !== index) return current

        const remainingVisible = Array.from(visibleCardsRef.current.keys())
        return remainingVisible.length ? remainingVisible[remainingVisible.length - 1] : null
      })
    },
    [isMobileView],
  )

  return (
    <section className="section" id="testimonies" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Testimonies
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Real classroom and playtime moments shared through videos.
          </motion.p>
        </div>

        <div className="gallery-grid">
          {videos.map((video, index) => (
            <VideoCard
              key={video.src}
              video={video}
              index={index}
              sectionInView={inView}
              isMobileView={isMobileView}
              hasAudioFocus={activeAudioIndex === index}
              onRequestAudio={requestAudio}
              onReleaseAudio={releaseAudio}
              onMobileVisibilityChange={handleMobileVisibilityChange}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
