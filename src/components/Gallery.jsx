import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

function VideoCard({ video, index, sectionInView, activeAudioIndex, setActiveAudioIndex }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const isMuted = activeAudioIndex !== index

  useEffect(() => {
    const vid = videoRef.current
    if (vid) {
      vid.muted = isMuted
    }
  }, [isMuted])

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setActiveAudioIndex(index)
    } else {
      setActiveAudioIndex(null)
    }
  }, [isMuted, index, setActiveAudioIndex])

  return (
    <motion.div
      ref={cardRef}
      className="clay-card gallery-item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.2, type: 'spring', bounce: 0.5 }}
      style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}
    >
      <div
        style={{ flex: 1, overflow: 'hidden', borderRadius: 'var(--radius-md)', cursor: 'pointer', marginBottom: '1rem' }}
        onClick={toggleMute}
      >
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

      <div className="gallery-card-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem' }}>
        <div>
          <h4 className="gallery-card-title">{video.title}</h4>
          <p className="gallery-card-desc" style={{ marginBottom: 0 }}>{video.description}</p>
        </div>
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: '2px solid var(--color-primary)',
            background: isMuted ? 'transparent' : 'var(--color-primary)',
            color: isMuted ? 'var(--color-primary)' : '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginLeft: '1rem',
            transition: 'all 0.25s ease',
            padding: 0,
            outline: 'none',
          }}
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
        </button>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [preloadRef] = useInView({ triggerOnce: true, rootMargin: '2500px 0px' })
  const [activeAudioIndex, setActiveAudioIndex] = useState(null)

  return (
    <section className="section" id="testimonies" ref={(node) => { ref(node); preloadRef(node); }}>
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


