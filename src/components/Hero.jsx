import { motion } from 'framer-motion'

export default function Hero() {
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
          <div className="hero-clay-blob"></div>
          <img
            src="/assets1/Desktop1img-CM_Qx_Vk.svg"
            alt="Happy children playing at Playbox Preschool"
            className="hero-main-img"
          />

          <motion.div
            className="hero-floating-icon icon-1"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <img src="/assets1/Bus-fuaEdFvh.svg" alt="Bus" />
          </motion.div>
          <motion.div
            className="hero-floating-icon icon-2"
            whileHover={{ scale: 1.1, rotate: -10 }}
          >
            <img src="/assets1/Rocket-C2fMEe1p.svg" alt="Rocket" />
          </motion.div>
          <motion.div
            className="hero-floating-icon icon-3"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <img src="/assets1/Tree-DW9bhG9B.svg" alt="Tree" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
