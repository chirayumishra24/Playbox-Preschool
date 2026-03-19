import { startTransition, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ImageWithSkeleton from './ImageWithSkeleton'

/* ── Load gallery images lazily ── */
const optimizedImageModules = import.meta.glob('../../img/gm-optimized/*.{webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}')

const mediaImageModules = import.meta.glob('../../img/media/*.{webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}')

const imageModules = Object.keys(optimizedImageModules).length ? optimizedImageModules : mediaImageModules

const galleryLoaders = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, loader]) => ({
    loader,
    alt: decodeURIComponent(path
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, '')
      .replace(/[_-]/g, ' ')
      .trim()),
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
  const [preloadRef, preloadInView] = useInView({ triggerOnce: true, rootMargin: '2500px 0px' })
  const [shouldRenderStage, setShouldRenderStage] = useState(false)
  
  // State for loaded images
  const [galleryImages, setGalleryImages] = useState([]);
  
  const columns = useMemo(() => distributeImages(galleryImages), [galleryImages])
  const placeholderColumns = useMemo(
    () => {
        // use dummy array if not loaded yet
        return distributeImages(galleryLoaders).map((colItems) => Math.min(Math.max(colItems.length, 1), PLACEHOLDER_ROWS))
    },
    [],
  )

  // Preload images silently in the background when the user gets within 2500px of the section
  useEffect(() => {
    if (!preloadInView || galleryImages.length > 0) return

    let isMounted = true;
    
    // Load all images
    Promise.all(galleryLoaders.map(async item => {
        const mod = await item.loader();
        return { src: mod.default || mod, alt: item.alt };
    })).then(loadedImages => {
        if (isMounted) {
            setGalleryImages(loadedImages);
            loadedImages.forEach((image) => {
              const img = new Image()
              img.src = image.src
            })
        }
    }).catch(err => console.error("Failed to load gallery images", err));

    return () => { isMounted = false };
  }, [preloadInView, galleryImages.length])

  // Render the gallery when it comes into the actual viewport. Because we preloaded them above,
  // the browser will fetch them instantly from disk/memory cache.
  useEffect(() => {
    if (!inView || shouldRenderStage || galleryImages.length === 0) return

    startTransition(() => {
      setShouldRenderStage(true)
    })
  }, [inView, shouldRenderStage, galleryImages.length])

  if (!galleryLoaders.length) return null

  return (
    <section className="section" id="gallery" ref={(node) => { sectionRef(node); preloadRef(node); }}>
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
                        <ImageWithSkeleton
                          src={img.src}
                          alt={img.alt}
                          wrapperClassName="gallery-scroll-media"
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                          aspectRatio="1/1"
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
