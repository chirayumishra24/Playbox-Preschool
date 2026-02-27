import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Why Us', href: '#features' },
    { label: 'Programs', href: '#programs' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Mentors', href: '#mentors' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Locations', href: '#locations' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    // Removed scroll listener and intersection observer to prevent re-renders on scroll
    // which was causing the "reload problem and scroll trigger problem" on mobile

    // Lock body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const smoothScroll = useCallback((e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        const target = document.querySelector(href)
        if (target) {
            const navHeight = 100
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }, [])

    const menuVariants = {
        closed: {
            clipPath: 'circle(0% at calc(100% - 3rem) 3rem)',
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        },
        open: {
            clipPath: 'circle(150% at calc(100% - 3rem) 3rem)',
            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
        }
    }

    const linkVariants = {
        closed: { opacity: 0, x: 50 },
        open: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        })
    }

    return (
        <nav className="navbar scrolled" id="navbar">
            <div className="navbar-inner">
                <a href="#home" className="navbar-brand" onClick={(e) => smoothScroll(e, '#home')}>
                    <img src="/assets/logo.svg" alt="Playbox Preschool Logo" />
                    <div className="navbar-brand-text">
                        <h1>Playbox Preschool</h1>
                        <p>by Cambridge Court</p>
                    </div>
                </a>

                {/* Desktop Links */}
                <div className="navbar-links">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => smoothScroll(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="https://forms.zohopublic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clay-btn clay-btn-primary nav-enroll-btn"
                    >
                        Enroll Now
                    </a>
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <motion.div
                        animate={{ rotate: menuOpen ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                    </motion.div>
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            className="mobile-menu-overlay"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="mobile-menu-content">
                                <div className="mobile-menu-header">
                                    <img src="/assets/logo.svg" alt="Playbox" className="mobile-menu-logo" />
                                    <h2>Playbox Preschool</h2>
                                </div>

                                <div className="mobile-menu-links">
                                    {navLinks.map((link, i) => (
                                        <motion.a
                                            key={link.href}
                                            href={link.href}
                                            className="mobile-nav-link"
                                            custom={i}
                                            variants={linkVariants}
                                            initial="closed"
                                            animate="open"
                                            onClick={(e) => smoothScroll(e, link.href)}
                                        >
                                            <span className="mobile-link-dot" />
                                            {link.label}
                                        </motion.a>
                                    ))}
                                </div>

                                <motion.a
                                    href="https://forms.zohopublic.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="clay-btn clay-btn-primary mobile-enroll-btn"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    🎒 Enroll Now
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}
