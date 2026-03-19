import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useMemo } from 'react'
import brochurePdf from '../../img/pdf/playboxpreschool.pdf'

/* ── Load landscape images properly using normal glob (lazy) ── */
const gmImgs = import.meta.glob('../../img/gm-optimized/*.{webp,WEBP,jpg,JPG,jpeg,JPEG,png,PNG}')
const buildImgs = import.meta.glob('../../img/build/*.webp')

const allLandscapeImageLoaders = [
    ...Object.entries(gmImgs)
        .filter(([p]) => !p.includes('222'))
        .map(([, loader]) => loader),
    ...Object.values(buildImgs),
]

export default function CTA() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

    /* Shuffle image loaders and cycle through them */
    const imageLoaders = useMemo(() => {
        const arr = [...allLandscapeImageLoaders]
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    }, [])

    const [imgIdx, setImgIdx] = useState(0)
    const [currentImageSrc, setCurrentImageSrc] = useState(null)

    // Load the current image
    useEffect(() => {
        if (!inView || imageLoaders.length === 0) return
        
        let isMounted = true;
        const loader = imageLoaders[imgIdx];
        
        loader().then((mod) => {
            if (isMounted) {
                setCurrentImageSrc(mod.default);
            }
        }).catch(err => console.error("Failed to load CTA image", err));

        return () => { isMounted = false };
    }, [imgIdx, inView, imageLoaders])

    useEffect(() => {
        if (!inView || imageLoaders.length <= 1) return
        const timer = setInterval(() => {
            setImgIdx(prev => (prev + 1) % imageLoaders.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [inView, imageLoaders])

    return (
        <section className="section cta-section-blob" id="cta" ref={ref}>
            <div className="container">
                <motion.div
                    className="cta-blob-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ type: 'spring', bounce: 0.3 }}
                >
                    {/* Left: Text Content */}
                    <div className="cta-blob-text">
                        <motion.h2
                            className="cta-blob-title"
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2, type: 'spring' }}
                        >
                            Ready to Give Your Child the Best Start?
                        </motion.h2>

                        <motion.p
                            className="cta-blob-subtitle"
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.35 }}
                        >
                            Schedule a Tour or Request Info to Learn More About Our Premium Programs.
                        </motion.p>

                        <motion.div
                            className="cta-blob-buttons"
                            initial={{ opacity: 0, y: 15 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.a
                                href="https://forms.zohopublic.in/skillizeecambridgecourtgroup1/form/PLAYBOXPRESCHOOL/formperma/wFHW4FGSaBDZ7zJftITO1SELaO1h6OtlQJ960NlCIIA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cta-blob-btn cta-blob-btn-primary"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Enroll Now
                            </motion.a>
                            <motion.a
                                href={brochurePdf}
                                download="Playbox_Preschool_Brochure.pdf"
                                className="cta-blob-btn cta-blob-btn-outline"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Download Brochure
                            </motion.a>
                        </motion.div>
                    </div>

                    {/* Right: Blob-Shaped Photo Cutout */}
                    <motion.div
                        className="cta-blob-photo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3, type: 'spring', bounce: 0.25 }}
                    >
                        {/* Decorative blob accent behind */}
                        <div className="cta-blob-accent" aria-hidden="true"></div>

                        <div className="cta-blob-mask">
                            <ImageWithSkeleton
                                key={imgIdx}
                                src={currentImageSrc}
                                alt="Happy child at Playbox Preschool"
                                loading="lazy"
                                aspectRatio="1.06/1" // Estimated from 320/300
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
