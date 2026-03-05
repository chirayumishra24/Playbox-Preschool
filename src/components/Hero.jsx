import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import heroBlobImage1 from '../../img/Copy of IMG_9899.JPG'
import heroBlobImage2 from '../../img/Copy of IMG_9996.JPG'
import heroBlobImage3 from '../../img/IMG_9198.JPG'
import heroBlobImage4 from '../../img/Copy of IMG_9950.JPG'
import heroBlobImage5 from '../../img/Copy of IMG_9817.JPG'

const heroSlides = [
  { src: heroBlobImage1, alt: 'Children enjoying guided play activity at Playbox Preschool' },
  { src: heroBlobImage2, alt: 'Children exploring outdoor play equipment' },
  { src: heroBlobImage3, alt: 'Kids participating in a group activity session' },
  { src: heroBlobImage4, alt: 'Child-focused motor skill and movement activity' },
  { src: heroBlobImage5, alt: 'Colorful preschool activity area setup' },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isBlobHovered, setIsBlobHovered] = useState(false)

  useEffect(() => {
    if (isBlobHovered) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [isBlobHovered])

  return (
    <section className="hero" id="home">
      <div className="container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
        >
          <motion.div
            className="hero-badge"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Admissions Open 2025-26
          </motion.div>

          <h2 className="hero-title">
            Where Every Child's{' '}
            <span className="text-gradient">Imagination</span>{' '}
            Takes Flight!
          </h2>

          <p className="hero-subtitle">
            At Playbox Preschool, we create a nurturing, joyful, and creative
            environment where little minds blossom into confident learners.
            Carefree Motherhood starts here!
          </p>

          <div className="hero-actions">
            <motion.a
              href="https://forms.zohopublic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn clay-btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Your Child
            </motion.a>
            <motion.a
              href="#programs"
              className="clay-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                const target = document.querySelector('#programs')
                if (target) {
                  const top = target.getBoundingClientRect().top + window.scrollY - 100
                  window.scrollTo({ top, behavior: 'smooth' })
                }
              }}
            >
              Explore Programs
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.6, duration: 1, delay: 0.2 }}
        >
          <div
            className="hero-clay-blob"
            onMouseEnter={() => setIsBlobHovered(true)}
            onMouseLeave={() => setIsBlobHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={heroSlides[activeSlide].src}
                src={heroSlides[activeSlide].src}
                alt={heroSlides[activeSlide].alt}
                className="hero-main-img hero-carousel-img"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </AnimatePresence>

            <div className="hero-carousel-dots">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  className={`hero-carousel-dot ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show hero image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="hero-floating-icon icon-1"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <img src="/assets/bus.svg" alt="Bus" />
          </motion.div>
          <motion.div
            className="hero-floating-icon icon-2"
            whileHover={{ scale: 1.1, rotate: -10 }}
          >
            <img src="/assets/rocket.svg" alt="Rocket" />
          </motion.div>
          <motion.div
            className="hero-floating-icon icon-3"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <img src="/assets/tree.svg" alt="Tree" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
