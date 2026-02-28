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

// Track if user has interacted with the page (required by browser autoplay policy)
let userHasInteracted = false
if (typeof window !== 'undefined') {
  const markInteracted = () => {
    userHasInteracted = true
    window.removeEventListener('click', markInteracted)
    window.removeEventListener('touchstart', markInteracted)
    window.removeEventListener('keydown', markInteracted)
  }
  window.addEventListener('click', markInteracted, { passive: true })
  window.addEventListener('touchstart', markInteracted, { passive: true })
  window.addEventListener('keydown', markInteracted, { passive: true })
}

function VideoCard({ video, index, sectionInView }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const fadeAnim = useRef(null)

  // Keep video always playing muted
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = true
    vid.play().catch(() => { })
  }, [])

  // Safe unmute — only if user has interacted
  const safeUnmute = (vid) => {
    if (!userHasInteracted || !vid) return false
    try {
      vid.muted = false
      setIsMuted(false)
      // If browser paused it due to policy, re-mute and resume
      if (vid.paused) {
        vid.muted = true
        setIsMuted(true)
        vid.play().catch(() => { })
        return false
      }
      return true
    } catch (_) {
      return false
    }
  }

  const safeMute = (vid) => {
    if (!vid) return
    vid.muted = true
    setIsMuted(true)
    // Ensure still playing
    if (vid.paused) vid.play().catch(() => { })
  }

  // Mobile: Videos simply play continuously in the background loop silently.
  // We no longer attempt to auto-unmute on scroll, as modern mobile browsers 
  // explicitly block this via Media Engagement Index (MEI) policies and throw warnings.

  // Desktop: hover to unmute
  const handleMouseEnter = () => {
    if (isMobileDevice()) return
    safeUnmute(videoRef.current)
  }

  const handleMouseLeave = () => {
    if (isMobileDevice()) return
    safeMute(videoRef.current)
  }

  const toggleMute = () => {
    const vid = videoRef.current
    if (!vid) return
    if (isMuted) {
      safeUnmute(vid)
    } else {
      safeMute(vid)
    }
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
