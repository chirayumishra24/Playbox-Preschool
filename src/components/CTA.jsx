import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function CTA() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

    return (
        <section className="section" id="cta" ref={ref} style={{ background: 'var(--color-primary)' }}>
            <div className="container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0' }}>
                <motion.div
                    className="clay-blob cta-blob"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: 'spring', bounce: 0.5 }}
                >
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#a41632' }}>
                        Ready to Give Your Child the Best Start?
                    </h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: 'var(--text-dark)' }}>
                        Join the Playbox family today! Limited seats available for the
                        2025-26 academic session. Don't miss out on this wonderful
                        learning journey for your little one.
                    </p>
                    <motion.a
                        href="https://forms.zohopublic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clay-btn clay-btn-primary"
                        style={{ fontSize: '1.2rem', padding: '1.2rem 3rem' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Enroll Now — Free Trial Class
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
