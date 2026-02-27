import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiStar } from 'react-icons/fi'

const testimonials = [
    {
        text: "Playbox has been a transformative experience for my daughter. She comes home every day excited about what she learned. The teachers are incredibly caring.",
        name: 'Priya Sharma',
        role: 'Parent of Ananya, Nursery',
        avatar: '/assets1/FourthContentImage1-gFl2nu9g.png',
    },
    {
        text: "The best decision we made was enrolling our son at Playbox. The holistic approach to learning, combined with safety measures, gives us complete peace of mind.",
        name: 'Rajesh Gupta',
        role: 'Parent of Arjun, Play Group',
        avatar: '/assets1/FourthContentImage2-CXcML8iX.png',
    },
    {
        text: "My child's confidence has grown tremendously since joining Playbox Preschool. The activities are engaging and the staff treats every child with so much love.",
        name: 'Sneha Agarwal',
        role: 'Parent of Riya, Junior KG',
        avatar: '/assets1/FourthContentImage3-CuLKi4jj.png',
    }
]

export default function Testimonials() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
        <section className="section" id="testimonials" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ type: 'spring', bounce: 0.5 }}
                    >
                        What Parents Say
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Join hundreds of happy families who trust Playbox Preschool.
                    </motion.p>
                </div>

                <div className="features-grid">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            className="clay-card testimonial-card"
                            initial={{ opacity: 0, x: 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.2, type: 'spring' }}
                        >
                            <div style={{ display: 'flex', gap: '5px', marginBottom: '1rem' }}>
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} fill="#FFD93D" stroke="#FFD93D" size={20} />
                                ))}
                            </div>
                            <p className="testimonial-text">"{t.text}"</p>

                            <div className="testimonial-author">
                                <div className="author-img">
                                    <img src={t.avatar} alt={t.name} />
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-dark)', marginBottom: '0.2rem' }}>{t.name}</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
