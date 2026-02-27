import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    icon: '/assets1/CA-Cc6Dv4Ov.svg',
    title: 'Play-Based Learning',
    description: 'Children learn best through play. Our curriculum blends structured activities with free exploration to build foundational skills naturally.',
    color: 'var(--color-primary)'
  },
  {
    icon: '/assets1/CB-CHdhLFj3.svg',
    title: 'Safe & Secure',
    description: 'CCTV monitored campus, trained staff, hygienic environment, and child-safe infrastructure ensuring complete peace of mind.',
    color: 'var(--color-secondary)'
  },
  {
    icon: '/assets1/CC-CcEBb6lc.svg',
    title: 'Holistic Development',
    description: 'We focus on cognitive, social, emotional, and physical development through music, art, language, math, and creative play.',
    color: 'var(--color-tertiary)'
  },
  {
    icon: '/assets1/CD-BbyQD7ds.svg',
    title: 'Expert Educators',
    description: 'Our passionate teachers are trained in early childhood education with international methodologies to nurture every child.',
    color: 'var(--color-quaternary)'
  },
  {
    icon: '/assets1/CE-DtgCKJFW.svg',
    title: 'Transport Facility',
    description: 'Safe and comfortable AC bus service with GPS tracking and a dedicated attendant, ensuring a smooth commute.',
    color: 'var(--color-quinary)'
  },
  {
    icon: '/assets1/CF-BICcQc5r.svg',
    title: 'Nutritious Meals',
    description: 'Balanced, freshly prepared vegetarian meals planned by nutritionists to keep children energized and healthy.',
    color: 'var(--color-primary)'
  },
]

export default function Features() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: "-100px 0px" })

  return (
    <section className="section" id="features" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title text-gradient"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Our Mission & Magic
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            A perfect balance of love, care, and quality education. Discover what makes us special.
          </motion.p>
        </div>

        <div className="features-timeline">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`timeline-row ${isEven ? 'row-left' : 'row-right'}`}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
              >
                <div className="timeline-content clay-blob" style={{ borderColor: feature.color }}>
                  <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem', fontSize: '1.6rem' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
                </div>

                <div className="timeline-center">
                  <div className="timeline-dot" style={{ background: feature.color }}>
                    <motion.img
                      src={feature.icon}
                      alt={feature.title}
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="timeline-empty"></div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
