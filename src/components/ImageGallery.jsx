import { startTransition, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* ── Load optimized gallery images only ── */
const imageModules = import.meta.glob('../../img/gm-optimized/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', {
  eager: true,
  import: 'default',
})

const galleryImages = Object.entries(imageModules)
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

const NUM_COLS = 3
const PLACEHOLDER_ROWS = 4

/* ── Distribute images across 3 columns (round-robin) ── */
function distributeImages(images) {
  const cols = Array.from({ length: NUM_COLS }, () => [])
  images.forEach((img, i) => cols[i % NUM_COLS].push(img))
  return cols
}

/* ── Direction helper: col 0 → up, col 1 → down, col 2 → up ── */
function scrollDirection(colIdx) {
  return colIdx % 2 === 0 ? 'up' : 'down'
}

export default function ImageGallery() {
  const [sectionRef, inView] = useInView({ triggerOnce: true, rootMargin: '320px 0px', threshold: 0.05 })
  const [shouldRenderStage, setShouldRenderStage] = useState(false)
  const columns = useMemo(() => distributeImages(galleryImages), [])
  const placeholderColumns = useMemo(
    () => columns.map((colImages) => Math.min(Math.max(colImages.length, 1), PLACEHOLDER_ROWS)),
    [columns],
  )

  useEffect(() => {
    if (!inView || shouldRenderStage) return

    startTransition(() => {
      setShouldRenderStage(true)
    })
  }, [inView, shouldRenderStage])

  if (!galleryImages.length) return null

  return (
    <section className="section" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title text-gradient"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Gallery Moments
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
          >
            A living scrapbook of real moments from our school life.
          </motion.p>
        </div>
      </div>

      <div className="gallery-scroll-shell">
        {shouldRenderStage ? (
          <motion.div
            className="gallery-scroll-stage"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {columns.map((colImages, colIdx) => {
              const dir = scrollDirection(colIdx)
              const doubled = [...colImages, ...colImages]

              return (
                <div className="gallery-scroll-col" key={colIdx}>
                  <div className={`gallery-scroll-track gallery-scroll-${dir}`}>
                    {doubled.map((img, i) => (
                      <div className="gallery-scroll-item" key={`${img.src}-${i}`}>
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        ) : (
          <div className="gallery-scroll-placeholder" aria-hidden="true">
            {placeholderColumns.map((itemCount, colIdx) => (
              <div className="gallery-scroll-col" key={`placeholder-${colIdx}`}>
                <div className="gallery-scroll-placeholder-track">
                  {Array.from({ length: itemCount }).map((_, itemIdx) => (
                    <div className="gallery-scroll-placeholder-item" key={`${colIdx}-${itemIdx}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
