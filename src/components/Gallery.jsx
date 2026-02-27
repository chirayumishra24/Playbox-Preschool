import { useState, useRef, useEffect } from 'react'
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

// Detect touch/mobile device
const isMobileDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

function VideoCard({ video, index, sectionInView }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const fadeAnim = useRef(null)

  // Keep video always playing — re-trigger play if browser pauses it
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const ensurePlaying = () => {
      if (vid.paused) {
        vid.play().catch(() => { })
      }
    }

    // Re-trigger play on pause events (browser autoplay policy can pause)
    vid.addEventListener('pause', ensurePlaying)
    // Also try to play on mount
    ensurePlaying()

    return () => vid.removeEventListener('pause', ensurePlaying)
  }, [])

  // Helper: set muted state on the DOM element directly (avoids React re-render pausing video)
  const setMutedState = (mute) => {
    setIsMuted(mute)
    if (videoRef.current) {
      videoRef.current.muted = mute
    }
  }

  // On mobile: use IntersectionObserver to auto-unmute when in view
  useEffect(() => {
    if (!isMobileDevice()) return
    if (!cardRef.current || !videoRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          // Fade in audio
          videoRef.current.muted = false
          setIsMuted(false)
          fadeVolume(videoRef.current, 0, 1, 600)
        } else {
          // Fade out audio
          fadeVolume(videoRef.current, videoRef.current.volume, 0, 400, () => {
            if (videoRef.current) {
              videoRef.current.muted = true
            }
            setIsMuted(true)
          })
        }
      },
      { threshold: [0, 0.5, 1.0] }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [sectionInView])

  // Smooth volume fade utility
  const fadeVolume = (videoEl, fromVol, toVol, duration, onDone) => {
    cancelAnimationFrame(fadeAnim.current)
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = fromVol + (toVol - fromVol) * progress
      try { videoEl.volume = Math.max(0, Math.min(1, current)) } catch (_) { }
      if (progress < 1) {
        fadeAnim.current = requestAnimationFrame(tick)
      } else {
        onDone && onDone()
      }
    }
    fadeAnim.current = requestAnimationFrame(tick)
  }

  // Desktop: hover to unmute (directly on DOM, no React re-render)
  const handleMouseEnter = () => {
    if (isMobileDevice()) return
    setMutedState(false)
  }

  const handleMouseLeave = () => {
    if (isMobileDevice()) return
    setMutedState(true)
  }

  const toggleMute = () => {
    setMutedState(!isMuted)
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
        {/* Video always starts muted via HTML attribute — we control muted via JS only */}
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
          onClick={(e) => { e.stopPropagation(); toggleMute() }}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
        </button>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section" id="gallery" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Gallery Moments
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            See the joy of learning in action.
          </motion.p>
        </div>

        <div className="gallery-grid">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} index={index} sectionInView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
