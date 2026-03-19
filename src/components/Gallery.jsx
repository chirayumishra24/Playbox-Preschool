import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const videos = [
  {
    src: '/assets/video1.mp4',
    title: 'Fun Learning Activities',
    description: 'Watch our kids enjoy creative learning sessions',
    parentName: 'Ms Swati Baijal',
    childName: 'Swanika Baijal',
    grade: 'Grade 1 (2024)',
  },
  {
    src: '/assets/video2.mp4',
    title: 'Outdoor Adventures',
    description: 'Exploring nature and building teamwork skills',
    parentName: 'Ms Mumal Rathore',
    childName: 'Sanyukta Jain',
    grade: 'Grade 1 (2024)',
  },
  {
    src: '/assets/video3.mp4',
    title: 'Creative Expression',
    description: 'Art, music, and dance bring joy to every day',
    parentName: 'Ms Arshna Sharma',
    childName: 'Prince Sharma',
    grade: 'Grade 1 (2024)',
  },
]

function VideoCard({ video, index, sectionInView, activeAudioIndex, setActiveAudioIndex }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const hasInteracted = useRef(false)
  const isMuted = activeAudioIndex !== index

  // Lazy-load video: only set src when card is near viewport
  const [cardInViewRef, cardInView] = useInView({
    triggerOnce: true,
    rootMargin: '600px 0px', // Start loading 600px before visible
  })
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Once card is near viewport, set the video src
  useEffect(() => {
    if (!cardInView || videoLoaded) return
    const vid = videoRef.current
    if (!vid) return
    vid.src = video.src
    vid.load()
    // Attempt autoplay (must be muted for browser autoplay policy)
    vid.play().catch(() => {})
    setVideoLoaded(true)
  }, [cardInView, video.src, videoLoaded])

  // Track first user interaction (click/tap) on the document
  useEffect(() => {
    const markInteracted = () => { hasInteracted.current = true }
    document.addEventListener('click', markInteracted, { once: true })
    document.addEventListener('touchstart', markInteracted, { once: true })
    return () => {
      document.removeEventListener('click', markInteracted)
      document.removeEventListener('touchstart', markInteracted)
    }
  }, [])

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.muted = isMuted
    // If we just unmuted but the browser paused the video, re-play it muted
    if (!isMuted && vid.paused) {
      vid.play().catch(() => {
        vid.muted = true
        vid.play().catch(() => { })
      })
    }
  }, [isMuted])

  const handleMouseEnter = useCallback(() => {
    if (!hasInteracted.current) return
    setActiveAudioIndex(index)
  }, [index, setActiveAudioIndex])

  const handleMouseLeave = useCallback(() => {
    setActiveAudioIndex((prev) => (prev === index ? null : prev))
  }, [index, setActiveAudioIndex])

  return (
    <motion.div
      ref={(node) => { cardRef.current = node; cardInViewRef(node); }}
      className="clay-card gallery-item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.2, type: 'spring', bounce: 0.5 }}
      style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="gallery-parent-header">
        <span className="gallery-parent-label">Parent Testimony</span>
        <h4 className="gallery-parent-heading">{video.parentName}</h4>
      </div>

      <div className="gallery-video-wrap">
        {/* Video element: no src initially, loaded lazily via IntersectionObserver */}
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Loading skeleton until video is ready */}
        {!videoLoaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'inherit', fontSize: '2rem',
          }}>
            🎬
          </div>
        )}
        <div
          role="button"
          tabIndex={0}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          onClick={(e) => {
            e.stopPropagation()
            setActiveAudioIndex((prev) => (prev === index ? null : index))
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              e.stopPropagation()
              setActiveAudioIndex((prev) => (prev === index ? null : index))
            }
          }}
          className={`gallery-audio-toggle gallery-audio-toggle-overlay ${isMuted ? '' : 'is-active'}`}
        >
          {isMuted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </div>

      </div>

      <div className="gallery-person-row">
        <span className="gallery-child-name">{video.childName}</span>
        <span className="gallery-grade-pill">{video.grade}</span>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeAudioIndex, setActiveAudioIndex] = useState(null)

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
              activeAudioIndex={activeAudioIndex}
              setActiveAudioIndex={setActiveAudioIndex}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
