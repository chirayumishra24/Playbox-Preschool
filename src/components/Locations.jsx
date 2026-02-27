import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiPhone, FiMapPin, FiNavigation } from 'react-icons/fi'

const locations = [
    {
        id: 'dwarkadas',
        name: 'Dwarkadas',
        address: 'Near Dwarkadas Circle, Jaipur',
        phone: '+91 9876543210',
        mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.1!2d75.8!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzAwLjAiTiA3NcKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1611111111111',
        image: '/assets/icon1.png',
        color: '#ff7eb3'
    },
    {
        id: 'ramvihar',
        name: 'Ram Vihar',
        address: 'Ram Vihar Colony, Jaipur',
        phone: '+91 9876543211',
        mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.1!2d75.8!3d26.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ4JzAwLjAiTiA3NcKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1611111111112',
        image: '/assets/icon2.png',
        color: '#758cff'
    },
    {
        id: 'shyamnagar',
        name: 'Shyam Nagar',
        address: 'Shyam Nagar, Jaipur',
        phone: '+91 9876543212',
        mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d75.7!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzAwLjAiTiA3NcKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1611111111113',
        image: '/assets/icon3.png',
        color: '#ffb347'
    },
    {
        id: 'tonkroad',
        name: 'Tonk Road',
        address: 'Tonk Road, Jaipur',
        phone: '+91 9876543213',
        mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1!2d75.8!3d26.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ4JzAwLjAiTiA3NcKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1611111111114',
        image: '/assets/icon4.png',
        color: '#47ffb3'
    },
]

export default function Locations() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const [activeLoc, setActiveLoc] = useState(locations[0])

    return (
        <section className="section" id="locations" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        className="section-title text-gradient"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ type: 'spring', bounce: 0.5 }}
                    >
                        Find Us Near You
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Multiple interactive branches across Jaipur for your convenience.
                    </motion.p>
                </div>

                <div className="locations-interactive-layout">
                    {/* LEFT LIST */}
                    <div className="loc-list-wrapper">
                        {locations.map((loc, index) => {
                            const isActive = activeLoc.id === loc.id;

                            return (
                                <motion.div
                                    key={loc.id}
                                    className={`clay-card interactive-loc-btn ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveLoc(loc)}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: index * 0.1, type: 'spring' }}
                                    style={{
                                        padding: '1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        border: isActive ? `3px solid ${loc.color}` : '3px solid transparent',
                                        transform: isActive ? 'scale(1.02)' : 'scale(1)'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="loc-list-icon-wrapper" style={{ background: isActive ? loc.color : 'var(--clay-bg)' }}>
                                        <img src={loc.image} alt={loc.name} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--text-dark)' }}>{loc.name}</h3>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{loc.address}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* RIGHT PREVIEW */}
                    <div className="loc-preview-wrapper">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeLoc.id}
                                className="clay-card loc-preview-card"
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, y: -30 }}
                                transition={{ type: 'spring', bounce: 0.4 }}
                                style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
                            >
                                {/* Decorative blob */}
                                <div style={{
                                    position: 'absolute', top: '-50px', right: '-50px',
                                    width: '200px', height: '200px', borderRadius: '50%',
                                    background: activeLoc.color, opacity: 0.2, filter: 'blur(30px)'
                                }}></div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
                                    <div>
                                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                                            {activeLoc.name}
                                        </h2>
                                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                            <FiMapPin color={activeLoc.color} /> {activeLoc.address}
                                        </p>
                                    </div>
                                    <div className="loc-preview-icon-wrapper">
                                        <img src={activeLoc.image} alt={activeLoc.name} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
                                    <a href={`tel:${activeLoc.phone}`} className="clay-btn" style={{ padding: '0.8rem 1.5rem', flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                        <FiPhone /> {activeLoc.phone}
                                    </a>
                                    <a href={activeLoc.mapSrc} target="_blank" rel="noopener noreferrer" className="clay-btn clay-btn-primary" style={{ padding: '0.8rem 1.5rem', flex: 1, display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '1.1rem', background: activeLoc.color }}>
                                        <FiNavigation /> Get Directions
                                    </a>
                                </div>

                                {/* Mock Map Area */}
                                <div className="clay-card" style={{ flex: 1, minHeight: '250px', padding: '0', overflow: 'hidden', position: 'relative', zIndex: 2, border: '4px solid white' }}>
                                    <iframe
                                        src={activeLoc.mapSrc}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map of ${activeLoc.name}`}
                                    ></iframe>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
