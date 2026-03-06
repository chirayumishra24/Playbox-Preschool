import { useMemo } from 'react'
import { motion } from 'framer-motion'

/* ── Load every image from img/gm ── */
const imageModules = import.meta.glob('../../img/gm/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP}', {
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
  const columns = useMemo(() => distributeImages(galleryImages), [])

  if (!galleryImages.length) return null

  return (
    <section className="section" id="gallery">
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

      {/* ── 3-column auto-scrolling grid ── */}
      <div className="gallery-scroll-stage">
        {columns.map((colImages, colIdx) => {
          const dir = scrollDirection(colIdx)
          // Double the images so the marquee loops seamlessly
          const doubled = [...colImages, ...colImages]

          return (
            <div className="gallery-scroll-col" key={colIdx}>
              <div
                className={`gallery-scroll-track gallery-scroll-${dir}`}
              >
                {doubled.map((img, i) => (
                  <div className="gallery-scroll-item" key={`${img.src}-${i}`}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
