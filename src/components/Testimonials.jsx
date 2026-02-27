import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiStar, FiExternalLink, FiMessageCircle } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

const testimonials = [
    {
        text: "Playbox has been a transformative experience for my daughter. She comes home every day excited about what she learned. The teachers are incredibly caring.",
        name: 'Priya Sharma',
        role: 'Parent of Ananya, Nursery',
        avatar: '/assets/parent_1.png',
        rating: 5,
    },
    {
        text: "The best decision we made was enrolling our son at Playbox. The holistic approach to learning, combined with safety measures, gives us complete peace of mind.",
        name: 'Rajesh Gupta',
        role: 'Parent of Arjun, Play Group',
        avatar: '/assets/parent_2.png',
        rating: 5,
    },
    {
        text: "My child's confidence has grown tremendously since joining Playbox Preschool. The activities are engaging and the staff treats every child with so much love.",
        name: 'Sneha Agarwal',
        role: 'Parent of Riya, Junior KG',
        avatar: '/assets/parent_3.png',
        rating: 5,
    },
    {
        text: "Thank You to Playbox, that even we have learnt to say 'Namaskar'. Even at home my twin children always greet me with 'Namaskar'. Character building and academics are taken care of here.",
        name: 'Glory Agarwal',
        role: 'Parent of Hrida, Nursery',
        avatar: '/assets/parent_1.png',
        rating: 5,
    },
    {
        text: "As a working parent, I feel fortunate to have enrolled my child in Playbox Preschool. I don't have to worry about their studies or extracurricular activities because everything is taken care of at school.",
        name: 'Arshna Sharma',
        role: 'Parent of Prince, LKG',
        avatar: '/assets/parent_2.png',
        rating: 5,
    },
    {
        text: "Playbox feels like my child's second home. He doesn't cry or miss me when he goes to school. His motor and cognitive skills are being developed creatively and engagingly.",
        name: 'Sandhya Godara',
        role: 'Parent of Kabir, Nursery',
        avatar: '/assets/parent_3.png',
        rating: 5,
    },
]

// Simulated Google Reviews aggregate data
const googleReviewData = {
    rating: 4.8,
    totalReviews: 142,
    distribution: [
        { stars: 5, percentage: 82 },
        { stars: 4, percentage: 12 },
        { stars: 3, percentage: 4 },
        { stars: 2, percentage: 1 },
        { stars: 1, percentage: 1 },
    ]
}

function GoogleReviewBadge({ inView }) {
    const [animatedRating, setAnimatedRating] = useState(0)
    const [animatedCount, setAnimatedCount] = useState(0)

    useEffect(() => {
        if (!inView) return
        // Animate rating
        let start = 0
        const target = googleReviewData.rating
        const duration = 1500
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setAnimatedRating(+(start + (target - start) * eased).toFixed(1))
            setAnimatedCount(Math.round(googleReviewData.totalReviews * eased))
            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [inView])

    return (
        <motion.div
            className="google-review-badge"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
        >
            <div className="google-badge-top">
                <div className="google-icon-wrapper">
                    <FcGoogle size={36} />
                </div>
                <div>
                    <p className="google-badge-label">Google Reviews</p>
                    <div className="google-rating-row">
                        <span className="google-rating-number">{animatedRating}</span>
                        <div className="google-stars">
                            {[...Array(5)].map((_, i) => (
                                <FiStar
                                    key={i}
                                    fill={i < Math.round(googleReviewData.rating) ? '#FBBC04' : 'transparent'}
                                    stroke={i < Math.round(googleReviewData.rating) ? '#FBBC04' : '#CBD5E0'}
                                    size={18}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="google-review-count">
                        <FiMessageCircle size={14} /> {animatedCount} reviews
                    </p>
                </div>
            </div>

            <div className="google-distribution">
                {googleReviewData.distribution.map((item) => (
                    <div className="distribution-row" key={item.stars}>
                        <span className="dist-label">{item.stars}★</span>
                        <div className="dist-bar-bg">
                            <motion.div
                                className="dist-bar-fill"
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${item.percentage}%` } : {}}
                                transition={{ delay: 0.8 + (5 - item.stars) * 0.1, duration: 0.8 }}
                            />
                        </div>
                        <span className="dist-percent">{item.percentage}%</span>
                    </div>
                ))}
            </div>

            <a
                href="https://www.google.com/maps/place/Playbox+Preschool/"
                target="_blank"
                rel="noopener noreferrer"
                className="google-review-link"
            >
                <FiExternalLink size={14} /> Write a Review on Google
            </a>
        </motion.div>
    )
}

function ReviewCard({ t, index, inView }) {
    return (
        <motion.div
            className="clay-card testimonial-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15, type: 'spring', bounce: 0.3 }}
        >
            <div className="review-card-header">
                <FcGoogle size={20} />
                <span className="review-source">Google Review</span>
            </div>

            <div className="review-stars-row">
                {[...Array(t.rating)].map((_, i) => (
                    <FiStar key={i} fill="#FBBC04" stroke="#FBBC04" size={18} />
                ))}
            </div>

            <p className="testimonial-text">"{t.text}"</p>

            <div className="testimonial-author">
                <div className="author-img">
                    <img src={t.avatar} alt={t.name} />
                </div>
                <div>
                    <h4>{t.name}</h4>
                    <p className="author-role">{t.role}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default function Testimonials() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const [showAll, setShowAll] = useState(false)

    const displayed = showAll ? testimonials : testimonials.slice(0, 3)

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

                <div className="testimonials-layout">
                    {/* Google Review Badge */}
                    <GoogleReviewBadge inView={inView} />

                    {/* Review Cards */}
                    <div className="reviews-grid">
                        {displayed.map((t, index) => (
                            <ReviewCard key={index} t={t} index={index} inView={inView} />
                        ))}
                    </div>
                </div>

                {testimonials.length > 3 && (
                    <motion.div
                        className="reviews-toggle"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6 }}
                    >
                        <button
                            className="clay-btn"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'Show Less' : `View All ${testimonials.length} Reviews`}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
