import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is touch capable or screen is small
        const checkMobile = () => {
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const smallScreen = window.innerWidth <= 768;
            setIsMobile(hasTouch || smallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Don't track mouse on mobile

        let particleId = 0;

        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Randomly spawn a particle trail
            if (Math.random() > 0.6) {
                particleId += 1;
                const newParticle = {
                    id: particleId,
                    x: e.clientX,
                    y: e.clientY,
                    targetY: e.clientY + (Math.random() * 40 - 20)
                };

                setParticles((prev) => [...prev.slice(-15), newParticle]);

                setTimeout(() => {
                    setParticles((prev) => prev.filter(p => p.id !== newParticle.id));
                }, 800);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    if (isMobile) return null;

    return (
        <>
            <motion.div
                className="custom-cursor"
                animate={{
                    x: mousePosition.x - 10,
                    y: mousePosition.y - 10,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
                style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    boxShadow: '0 0 10px var(--color-primary), inset 0 0 5px white',
                    border: '2px solid white'
                }}
            />

            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="cursor-particle"
                        initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            y: p.targetY
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-secondary)'
                        }} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </>
    );
}
