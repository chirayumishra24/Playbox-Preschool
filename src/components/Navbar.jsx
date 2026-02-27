import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const closeMenu = () => setMenuOpen(false)

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="navbar-inner">
                <a href="#home" className="navbar-brand" onClick={closeMenu}>
                    <img src="/assets1/Logo-8C3-REcS.svg" alt="Playbox Preschool Logo" />
                    <div className="navbar-brand-text">
                        <h1>Playbox Preschool</h1>
                        <p>by Cambridge Court</p>
                    </div>
                </a>

                <div className="navbar-links">
                    <a href="#home">Home</a>
                    <a href="#features">Why Us</a>
                    <a href="#programs">Programs</a>
                    <a href="#gallery">Gallery</a>
                    <a href="#mentors">Mentors</a>
                    <a href="#locations">Locations</a>
                    <a
                        href="https://forms.zohopublic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clay-btn clay-btn-primary"
                        style={{ padding: '0.6rem 1.2rem', fontSize: '1rem' }}
                    >
                        Enroll Now
                    </a>
                </div>

                <button
                    className="mobile-toggle clay-btn"
                    style={{ padding: '0.5rem', display: 'none' }}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, width: '100%', height: '100vh',
                        background: 'var(--clay-bg)', zIndex: 999,
                        display: menuOpen ? 'flex' : 'none',
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: '2rem'
                    }}
                >
                    <button
                        className="clay-btn"
                        style={{ position: 'absolute', top: '2rem', right: '2rem', padding: '0.5rem' }}
                        onClick={closeMenu}
                    >
                        <FiX size={24} />
                    </button>
                    <a href="#home" onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Home</a>
                    <a href="#features" onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Why Us</a>
                    <a href="#programs" onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Programs</a>
                    <a href="#gallery" onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gallery</a>
                    <a href="#mentors" onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Mentors</a>
                    <a href="#locations" onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Locations</a>
                    <a
                        href="https://forms.zohopublic.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="clay-btn clay-btn-primary"
                        onClick={closeMenu}
                    >
                        Enroll Now
                    </a>
                </div>
            </div>
        </nav>
    )
}
