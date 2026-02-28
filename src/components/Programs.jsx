import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { playPopSound, playHoverSound } from '../utils/sounds.js'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const programs = [
  {
    title: 'Play Group',
    age: '1.5 - 2.5 Years',
    description: 'A gentle introduction to learning through sensory play, rhymes, and motor skill activities in a nurturing setting.',
    tags: ['Sensory Play', 'Motor Skills', 'Rhymes', 'Social'],
    image: '/assets/program_playgroup.png',
    gradient: 'linear-gradient(135deg, #FFE4E6, #FEE2E2)',
    accent: '#F43F5E',
  },
  {
    title: 'Nursery',
    age: '2.5 - 3.5 Years',
    description: 'Building curiosity through structured play, early literacy, numeracy foundations, and creative arts.',
    tags: ['Early Literacy', 'Numbers', 'Art & Craft', 'Music'],
    image: '/assets/program_nursery.png',
    gradient: 'linear-gradient(135deg, #E0E7FF, #DBEAFE)',
    accent: '#3B82F6',
  },
  {
    title: 'Junior KG',
    age: '3.5 - 4.5 Years',
    description: 'Developing reading readiness, mathematical thinking, scientific curiosity, and communication skills.',
    tags: ['Reading Ready', 'Math Fun', 'Science', 'Communication'],
    image: '/assets/program_junior_kg.png',
    gradient: 'linear-gradient(135deg, #DCFCE7, #D1FAE5)',
    accent: '#10B981',
  },
  {
    title: 'Senior KG',
    age: '4.5 - 5.5 Years',
    description: 'Preparing children for formal schooling with phonics, writing practice, and problem-solving.',
    tags: ['Phonics', 'Writing', 'Problem Solving', 'Leadership'],
    image: '/assets/program_senior_kg.png',
    gradient: 'linear-gradient(135deg, #FEF3C7, #FEF08A)',
    accent: '#F59E0B',
  },
]

export default function Programs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: "-50px 0px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Touch handlers for swipe
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      next()
    }
    if (isRightSwipe) {
      prev()
    }
  }

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % programs.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isHovered])

  const next = () => { playPopSound(); setCurrentIndex((prev) => (prev + 1) % programs.length) }
  const prev = () => { playPopSound(); setCurrentIndex((prev) => (prev - 1 + programs.length) % programs.length) }

  return (
    <section className="section" id="programs" ref={ref} style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title text-gradient"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Our Programs
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Designed progressively for your child's developmental milestones.
          </motion.p>
        </div>

        <div className="carousel-wrapper" style={{ position: 'relative' }}>
          <motion.div
            className="carousel-container"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {programs.map((program, i) => {
              const isCenter = i === currentIndex;
              const isRight = i === (currentIndex + 1) % programs.length;
              const isLeft = i === (currentIndex - 1 + programs.length) % programs.length;

              let xPosition = 0;
              let zPosition = -400;
              let yRotation = 0;
              let cardOpacity = 0;
              let cardZIndex = 0;
              let blur = 'blur(10px)';
              let cardScale = 0.8;

              if (isCenter) {
                xPosition = 0; zPosition = 0; yRotation = 0; cardOpacity = 1; cardZIndex = 5; blur = 'blur(0px)'; cardScale = 1;
              } else if (isRight) {
                xPosition = '85%'; zPosition = -200; yRotation = -35; cardOpacity = 0.8; cardZIndex = 4; blur = 'blur(4px)'; cardScale = 0.85;
              } else if (isLeft) {
                xPosition = '-85%'; zPosition = -200; yRotation = 35; cardOpacity = 0.8; cardZIndex = 4; blur = 'blur(4px)'; cardScale = 0.85;
              } else {
                xPosition = 0; zPosition = -400; yRotation = 0; cardOpacity = 0; cardZIndex = 3; blur = 'blur(10px)'; cardScale = 0.7;
              }

              return (
                <motion.div
                  key={program.title}
                  className="clay-card program-card-3d"
                  animate={{
                    x: xPosition,
                    z: zPosition,
                    rotateY: yRotation,
                    opacity: cardOpacity,
                    zIndex: cardZIndex,
                    filter: blur,
                    scale: cardScale
                  }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                  style={{
                    borderColor: program.accent,
                    cursor: isCenter ? 'default' : 'pointer',
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      playPopSound();
                      setCurrentIndex(i);
                    }
                  }}
                >
                  <div
                    className="program-img-wrapper"
                    style={{ background: program.gradient }}
                  >
                    <div className="program-glow-3d" style={{ background: program.accent }}></div>
                    <img src={program.image} alt={program.title} />
                  </div>

                  <div className="program-content">
                    <span className="program-age" style={{ color: program.accent }}>{program.age}</span>
                    <h3 style={{ color: program.accent }}>{program.title}</h3>
                    <p>{program.description}</p>

                    <div className="program-tags">
                      {program.tags.map((tag, i) => (
                        <span key={i} className="program-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
          {/* Controls */}
          <motion.div
            className="carousel-controls"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <button className="clay-btn carousel-left-btn" onClick={prev} onMouseEnter={playHoverSound}>
              <FiChevronLeft size={28} />
            </button>
            <button className="clay-btn carousel-right-btn" onClick={next} onMouseEnter={playHoverSound}>
              <FiChevronRight size={28} />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
