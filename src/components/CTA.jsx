import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import brochurePdf from '../../img/pdf/playboxpreschool.pdf'

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
                    <h2 className="cta-title">
                        Ready to Give Your Child the Best Start?
                    </h2>
                    <p className="cta-text">
                        Join the Playbox family today! Limited seats available for the
                        2025-26 academic session. Don't miss out on this wonderful
                        learning journey for your little one.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
                        <motion.a
                            href="https://forms.zohopublic.in/skillizeecambridgecourtgroup1/form/PLAYBOXPRESCHOOL/formperma/wFHW4FGSaBDZ7zJftITO1SELaO1h6OtlQJ960NlCIIA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="clay-btn clay-btn-primary cta-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ width: '100%', maxWidth: '300px', whiteSpace: 'nowrap' }}
                        >
                            Enroll Now
                        </motion.a>
                        <motion.a
                            href={brochurePdf}
                            download="Playbox_Preschool_Brochure.pdf"
                            className="clay-btn cta-btn"
                            style={{ background: 'white', color: 'var(--color-primary)', width: '100%', maxWidth: '300px', whiteSpace: 'nowrap' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            📥 Download Brochure
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
