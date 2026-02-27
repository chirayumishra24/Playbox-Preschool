import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Faster progress simulation — completes in ~1.5s
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                // Bigger jumps = faster loading feel
                return Math.min(prev + Math.round(Math.random() * 20 + 8), 100)
            })
        }, 80)

        // If page is already loaded, fast-track to 100%
        const handleReady = () => {
            setProgress(100)
            clearInterval(interval)
        }

        if (document.readyState === 'complete') {
            setTimeout(handleReady, 300)
        } else {
            window.addEventListener('load', () => setTimeout(handleReady, 300))
        }

        return () => {
            clearInterval(interval)
            window.removeEventListener('load', handleReady)
        }
    }, [])

    useEffect(() => {
        if (progress >= 100) {
            // Short dismiss delay — just enough for the bar to visually reach 100%
            const timer = setTimeout(() => {
                setLoading(false)
                onComplete && onComplete()
            }, 400)
            return () => clearTimeout(timer)
        }
    }, [progress, onComplete])

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    <div className="preloader-content">
                        {/* Animated Logo */}
                        <motion.div
                            className="preloader-logo"
                            animate={{
                                scale: [1, 1.08, 1],
                                rotate: [0, 3, -3, 0],
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img src="/assets/logo.svg" alt="Playbox Preschool" />
                        </motion.div>

                        <motion.h2
                            className="preloader-title"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            Playbox Preschool
                        </motion.h2>

                        <motion.p
                            className="preloader-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            Getting things ready...
                        </motion.p>

                        {/* Progress Bar */}
                        <div className="preloader-bar-bg">
                            <motion.div
                                className="preloader-bar-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.15 }}
                            />
                        </div>

                        <motion.span
                            className="preloader-percent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {Math.min(progress, 100)}%
                        </motion.span>

                        {/* Floating decorative blobs */}
                        <motion.div
                            className="preloader-blob preloader-blob-1"
                            animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.div
                            className="preloader-blob preloader-blob-2"
                            animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <motion.div
                            className="preloader-blob preloader-blob-3"
                            animate={{ y: [-10, 25, -10], x: [-15, 5, -15] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
