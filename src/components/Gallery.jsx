import { useRef } from 'react'
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

function VideoCard({ video, index, sectionInView }) {
  const cardRef = useRef(null)

  return (
    <motion.div
      ref={cardRef}
      className="clay-card gallery-item"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.2, type: 'spring', bounce: 0.5 }}
      style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
        <video
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
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [preloadRef] = useInView({ triggerOnce: true, rootMargin: '2500px 0px' })

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
            />
          ))}
        </div>
      </div>
    </section>
  )
}
