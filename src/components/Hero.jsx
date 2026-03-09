import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import heroBlobImage1 from '../../img/build/20230809_124004.webp'
import heroBlobImage2 from '../../img/build/20240313_161507.jpg'
import heroBlobImage3 from '../../img/build/20240313_161626.jpg'
import heroBlobImage4 from '../../img/build/4449e70f-f8f8-4a8e-a1b7-a09bd649c47b.webp'
import heroBlobImage5 from '../../img/build/Copy of 20230809_122955.jpg'
import heroBlobImage6 from '../../img/build/Copy of 20240313_161507.jpg'

const heroSlides = [
  { src: heroBlobImage1, alt: 'Playbox preschool building front view' },
  { src: heroBlobImage2, alt: 'Bright and colorful Playbox preschool campus' },
  { src: heroBlobImage3, alt: 'Fun learning spaces at Playbox Preschool' },
  { src: heroBlobImage4, alt: 'Playbox preschool activity area' },
  { src: heroBlobImage5, alt: 'Engaging outdoor setup at Playbox' },
  { src: heroBlobImage6, alt: 'Playbox preschool welcoming entrance' },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isBlobHovered, setIsBlobHovered] = useState(false)

  // Preload all images on mount so transitions are instant
  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image()
      img.src = slide.src
    })
  }, [])

  useEffect(() => {
    if (isBlobHovered) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 3000)

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
              href="https://forms.zohopublic.in/skillizeecambridgecourtgroup1/form/PLAYBOXPRESCHOOL/formperma/wFHW4FGSaBDZ7zJftITO1SELaO1h6OtlQJ960NlCIIA"
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
            {/* All images stacked — active one crossfades in, no blank gap */}
            {heroSlides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className="hero-main-img hero-carousel-img"
                style={{
                  opacity: index === activeSlide ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  zIndex: index === activeSlide ? 2 : 1,
                }}
              />
            ))}

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
