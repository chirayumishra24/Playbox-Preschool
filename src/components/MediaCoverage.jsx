import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* ── Load brand logos from img/media/logos ── */
const logoModules = import.meta.glob('../../img/media/logos/*.webp', {
  eager: true,
  import: 'default',
})

const brandLogos = Object.entries(logoModules)
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

/* ── Load newspaper cuttings from img/media ── */
const mediaModules = import.meta.glob('../../img/media/*.webp', {
  eager: true,
  import: 'default',
})

const mediaCuttings = Object.entries(mediaModules)
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

export default function MediaCoverage() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = useCallback((img) => {
    setLightbox(img)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    document.body.style.overflow = ''
  }, [])

  const [preloadRef, preloadInView] = useInView({ triggerOnce: true, rootMargin: '2500px 0px' })

  // Preload logos and cuttings silently in the background when 2500px away
  useEffect(() => {
    if (!preloadInView) return
    const allImages = [...brandLogos, ...mediaCuttings]
    allImages.forEach((item) => {
      const img = new Image()
      img.src = item.src
    })
  }, [preloadInView])


  return (
    <section className="section media-coverage-section" id="media-coverage" ref={preloadRef}>
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title text-gradient"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Media Coverage
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
          >
            Proudly featured in leading national publications and media outlets.
          </motion.p>
        </div>
      </div>

      {/* ── Brand Logos Auto-Scrolling Carousel ── */}
      {brandLogos.length > 0 && (
        <div className="media-logos-marquee">
          <div className="media-logos-track">
            {Array(6).fill(brandLogos).flat().map((logo, i) => (
              <div className="media-logo-item" key={`${logo.alt}-${i}`}>
                <img src={logo.src} alt={logo.alt} draggable={false} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Newspaper Cuttings Grid ── */}
      <div className="container">
        <motion.div
          className="media-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, staggerChildren: 0.08 }}
        >
          {mediaCuttings.map((img, idx) => (
            <motion.div
              className="media-grid-item"
              key={img.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.06, duration: 0.5 }}
              onClick={() => openLightbox(img)}
              whileHover={{ scale: 1.03, zIndex: 5 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                draggable={false}
              />
              <div className="media-grid-overlay">
                <span>🔍 View</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="media-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="media-lightbox-content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="media-lightbox-close"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                ✕
              </button>
              <img src={lightbox.src} alt={lightbox.alt} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
