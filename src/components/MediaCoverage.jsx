import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ImageWithSkeleton from './ImageWithSkeleton'

/* ── Load brand logos lazily ── */
const logoModules = import.meta.glob('../../img/media/logos/*.webp')

/* ── Load newspaper cuttings lazily ── */
const mediaModules = import.meta.glob('../../img/media/*.webp')

const getBrandLogos = async () => {
  const entries = await Promise.all(
    Object.entries(logoModules).map(async ([path, loader]) => {
      const mod = await loader()
      return [path, mod.default]
    })
  )
  return entries
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => ({
      src,
      alt: path
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]/g, ' ')
        .trim(),
    }))
}

const getMediaCuttings = async () => {
  const entries = await Promise.all(
    Object.entries(mediaModules).map(async ([path, loader]) => {
      const mod = await loader()
      return [path, mod.default]
    })
  )
  return entries
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => ({
      src,
      alt: path
        .split('/')
        .pop()
        .replace(/\.[^.]+$/, '')
        .replace(/[_-]/g, ' ')
        .trim(),
    }))
}

export default function MediaCoverage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [logos, setLogos] = useState([])
  const [cuttings, setCuttings] = useState([])
  const [selectedImg, setSelectedImg] = useState(null)

  useEffect(() => {
    if (inView) {
      getBrandLogos().then(setLogos)
      getMediaCuttings().then(setCuttings)
    }
  }, [inView])

  const openLightbox = useCallback((img) => setSelectedImg(img), [])
  const closeLightbox = useCallback(() => setSelectedImg(null), [])

  return (
    <section className="section" id="media" ref={ref}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="section-header">
          <motion.h2
            className="section-title text-gradient"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
          >
            Media Coverage
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Spreading the joy and excellence of Playbox Preschool across the nation.
          </motion.p>
        </div>

        {/* Brand Logos */}
        <div className="media-logos-container">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="media-logo-item"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </motion.div>
          ))}
        </div>

        {/* News Grid */}
        <div className="media-grid">
          {cuttings.map((cut, index) => (
            <motion.div
              key={index}
              className="clay-card media-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => openLightbox(cut)}
              style={{ cursor: 'pointer' }}
            >
              <div className="media-grid-media">
                <ImageWithSkeleton
                  src={cut.src}
                  alt={cut.alt}
                  aspectRatio="4/3"
                  className="media-img"
                  loading="lazy"
                />
              </div>
              <div className="media-card-info">
                <h3 className="media-title">{cut.alt}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="media-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="media-lightbox-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImg.src} alt={selectedImg.alt} />
              <button className="media-lightbox-close" onClick={closeLightbox}>
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
