import { useState, useRef, useEffect } from 'react'
import { animate, motion, useInView, useMotionValue } from 'framer-motion'

const transformations = [
    {
        before: { label: 'Separation Anxiety', emoji: '😢', image: '/assets/before_separation_anxiety.webp' },
        after: { label: 'Supportive, Caring Teachers', emoji: '🤗', image: '/assets/after_caring_teachers.webp' },
        accent: 'var(--color-primary)',
    },
    {
        before: { label: 'Excessive Screen Time', emoji: '📱', image: '/assets/before_screen_time.webp' },
        after: { label: 'Screenless Hands-On Activities', emoji: '🎨', image: '/assets/after_hands_on.webp' },
        accent: 'var(--color-secondary)',
    },
    {
        before: { label: 'Unstructured Routine', emoji: '😴', image: '/assets/before_unstructured.webp' },
        after: { label: 'Productive Utilization of Time', emoji: '⏰', image: '/assets/after_productive_time.webp' },
        accent: 'var(--color-quaternary)',
    },
    {
        before: { label: 'Aggressive Behavior', emoji: '😤', image: '/assets/before_aggressive.webp' },
        after: { label: 'Building Emotional Intelligence', emoji: '💛', image: '/assets/after_emotional_eq.webp' },
        accent: 'var(--color-quinary)',
    },
    {
        before: { label: 'Slow Language Development', emoji: '🤐', image: '/assets/before_slow_language.webp' },
        after: { label: 'Enhanced Social Skills', emoji: '🗣️', image: '/assets/after_social_skills.webp' },
        accent: 'var(--color-tertiary)',
    },
    {
        before: { label: 'Low Group Confidence', emoji: '😟', image: '/assets/before_separation_anxiety.webp' },
        after: { label: 'Confident Classroom Participation', emoji: '🌟', image: '/assets/after_confident.webp' },
        accent: 'var(--color-secondary)',
    },
]

/* ─── Before ↔ After Reveal Card ─── */
function RevealCard({ item, index, sectionInView }) {
    const reveal = useMotionValue(12)
    const [revealPercent, setRevealPercent] = useState(12)

    useEffect(() => {
        const unsubscribe = reveal.on('change', (value) => {
            setRevealPercent(value)
        })
        return () => unsubscribe()
    }, [reveal])

    useEffect(() => {
        if (!sectionInView) return undefined
        const controls = animate(reveal, [8, 8, 92, 92, 8], {
            duration: 6.2,
            times: [0, 0.16, 0.5, 0.82, 1],
            ease: 'easeInOut',
            repeat: Infinity,
            delay: index * 0.45,
        })
        return () => controls.stop()
    }, [sectionInView, index, reveal])

    return (
        <motion.div
            className="diff2-card"
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={sectionInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: index * 0.1, type: 'spring', bounce: 0.3 }}
        >
            {/* Image comparison area */}
            <div
                className="diff2-reveal-box"
            >
                {/* After image (underneath, full) */}
                <img src={item.after.image} alt={item.after.label} className="diff2-img diff2-img-after" draggable="false" loading="lazy" />

                {/* Before image (clipped by slider) */}
                <div className="diff2-before-clip" style={{ clipPath: `inset(0 ${100 - revealPercent}% 0 0)` }}>
                    <img src={item.before.image} alt={item.before.label} className="diff2-img diff2-img-before" draggable="false" loading="lazy" />
                    <div className="diff2-grayscale-overlay" />
                </div>

                {/* Slider handle */}
                <div className="diff2-slider-line" style={{ left: `${revealPercent}%` }}>
                    <div className="diff2-slider-knob">
                        <span className="diff2-knob-arrow">◀</span>
                        <span className="diff2-knob-arrow">▶</span>
                    </div>
                </div>

                {/* Corner badges */}
                <span className="diff2-badge diff2-badge-before">Before</span>
                <span className="diff2-badge diff2-badge-after" style={{ background: item.accent }}>After</span>
            </div>

            {/* Info row */}
            <div className="diff2-info">
                <div className="diff2-info-before">
                    <span className="diff2-emoji">{item.before.emoji}</span>
                    <span className="diff2-label-text">{item.before.label}</span>
                </div>
                <div className="diff2-arrow-divider">→</div>
                <div className="diff2-info-after">
                    <span className="diff2-emoji">{item.after.emoji}</span>
                    <span className="diff2-label-text diff2-label-after">{item.after.label}</span>
                </div>
            </div>
        </motion.div>
    )
}

/* ─── Animated Counter ─── */
function Counter({ target, label, sectionInView, delay = 0 }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!sectionInView) return
        const timeout = setTimeout(() => {
            let start = 0
            const duration = 2000
            const startTime = Date.now()
            const run = () => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(elapsed / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                setCount(Math.round(start + (target - start) * eased))
                if (progress < 1) requestAnimationFrame(run)
            }
            requestAnimationFrame(run)
        }, delay)
        return () => clearTimeout(timeout)
    }, [sectionInView, target, delay])

    return (
        <motion.div
            className="diff2-stat"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + delay / 1000, type: 'spring', bounce: 0.4 }}
        >
            <span className="diff2-stat-num">{count.toLocaleString()}+</span>
            <span className="diff2-stat-label">{label}</span>
        </motion.div>
    )
}

/* ─── Main Section ─── */
export default function Difference() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const preloadRef = useRef(null)
    const preloadInView = useInView(preloadRef, { once: true, margin: '2500px' })

    // Preload both before and after images when 2500px away
    useEffect(() => {
        if (!preloadInView) return
        transformations.forEach((item) => {
            const beforeImg = new Image()
            beforeImg.src = item.before.image
            const afterImg = new Image()
            afterImg.src = item.after.image
        })
    }, [preloadInView])

    return (
        <section className="section diff2-section" id="difference" ref={(node) => { ref.current = node; preloadRef.current = node; }}>
            <div className="diff2-bg-shape diff2-bg-1" />
            <div className="diff2-bg-shape diff2-bg-2" />

            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <motion.span
                        className="diff2-pill"
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ type: 'spring', bounce: 0.5 }}
                    >
                        ✨ The Playbox Effect
                    </motion.span>

                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1, type: 'spring', bounce: 0.4 }}
                    >
                        We Make a <span className="diff2-highlight">BIG</span> Difference
                    </motion.h2>

                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Watch each card automatically reveal the before and after transformation.
                    </motion.p>
                </div>

                {/* Reveal Cards */}
                <div className="diff2-grid">
                    {transformations.map((item, i) => (
                        <RevealCard key={i} item={item} index={i} sectionInView={inView} />
                    ))}
                </div>

                {/* Stats Row */}
                <div className="diff2-stats-row">
                    <Counter target={25000} label="Happy Mothers" sectionInView={inView} delay={0} />
                    <Counter target={500} label="Screenless Activities" sectionInView={inView} delay={200} />
                    <Counter target={100} label="Trained Teachers" sectionInView={inView} delay={400} />
                </div>

                <motion.p
                    className="diff2-tagline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                >
                    We have empowered over <strong>25,000 mothers</strong> to enjoy <strong>Stress-Free Motherhood!</strong>
                </motion.p>
            </div>
        </section>
    )
}
