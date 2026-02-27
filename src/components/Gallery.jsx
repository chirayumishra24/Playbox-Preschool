import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi'

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

function VideoCard({ video, index, inView }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const handleMouseEnter = () => {
    setMuted(false)
  }

  const handleMouseLeave = () => {
    setMuted(true)
  }

  const toggleMute = () => {
    setMuted(!muted)
  }

  return (
    <motion.div
      className="clay-card gallery-item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.2, type: 'spring', bounce: 0.5 }}
      style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ flex: 1, overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
        <video
          ref={videoRef}
          src={video.src}
          muted={muted}
          autoPlay
          loop
          playsInline
          preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ padding: '1rem 0.5rem 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--clay-bg)' }}>
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-dark)', marginBottom: '0.2rem' }}>
            {video.title}
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {video.description}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="clay-btn"
            style={{ padding: '0.5rem', borderRadius: '50%', minWidth: '40px', height: '40px' }}
            onClick={(e) => {
              e.stopPropagation()
              toggleMute()
            }}
          >
            {muted ? <FiVolumeX /> : <FiVolume2 />}
          </button>
        </div>
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
            <VideoCard key={index} video={video} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
