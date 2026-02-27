import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Gentle, slow progress — feels premium and polished
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return Math.min(prev + Math.round(Math.random() * 8 + 2), 100)
            })
        }, 150)

        // Wait for fonts + images + layout
        const handleReady = () => {
            setProgress(100)
            clearInterval(interval)
        }

        if (document.readyState === 'complete') {
            setTimeout(handleReady, 1000)
        } else {
            window.addEventListener('load', () => setTimeout(handleReady, 1000))
        }

        return () => {
            clearInterval(interval)
            window.removeEventListener('load', handleReady)
        }
    }, [])

    useEffect(() => {
        if (progress >= 100) {
            const timer = setTimeout(() => {
                setLoading(false)
                onComplete && onComplete()
            }, 800)
            return () => clearTimeout(timer)
        }
    }, [progress, onComplete])

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    <div className="preloader-content">
                        {/* Animated Logo */}
                        <motion.div
                            className="preloader-logo"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img src="/assets/logo.svg" alt="Playbox Preschool" />
                        </motion.div>

                        <motion.h2
                            className="preloader-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Playbox Preschool
                        </motion.h2>

                        <motion.p
                            className="preloader-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Getting things ready for you...
                        </motion.p>

                        {/* Progress Bar */}
                        <div className="preloader-bar-bg">
                            <motion.div
                                className="preloader-bar-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        <motion.span
                            className="preloader-percent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
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
