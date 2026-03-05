import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import priyanshiImage from '../../img/priyanshi-mam.png'
import lataImage from '../../img/lata-mam.png'
import aarnaImage from '../../img/aarna-mam.png'

const mentors = [
  {
    name: 'Mrs. Priyanshi S. Rawat',
    role: 'CEO',
    image: priyanshiImage,
  },
  {
    name: 'Mrs. Lata Rawat',
    role: 'Founder & Director',
    image: lataImage,
  },
  {
    name: 'Ms. Aarna Singh',
    role: 'Creative Director',
    image: aarnaImage,
  }
]

export default function Mentors() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="section" id="mentors" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title text-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Loving Mentors
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Trained professionals who nurture curiosity, creativity, and confidence.
          </motion.p>
        </div>

        <div className="mentors-grid">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              className="clay-card mentor-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, type: 'spring', bounce: 0.5 }}
            >
              <div className="mentor-bg-blob"></div>
              <div className="mentor-img-wrapper">
                <img src={mentor.image} alt={mentor.name} />
              </div>
              <h3 className="text-gradient">{mentor.name}</h3>
              <p>{mentor.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
