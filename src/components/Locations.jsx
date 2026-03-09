import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiPhone, FiMapPin, FiStar, FiBook, FiSun, FiHeart } from 'react-icons/fi'

const locations = [
    {
        id: 'dwarkadas',
        name: 'Dwarkadas',
        address: 'Near Dwarkadas Circle, Jaipur',
        phone: '+91 9216946252',
        mapSrc: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3559.97025152209!2d75.774631475437!3d26.840898476690082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDUwJzI3LjIiTiA3NcKwNDYnMzcuOSJF!5e0!3m2!1sen!2sin!4v1773046214483!5m2!1sen!2sin',
        mapLink: 'https://www.google.com/maps/search/?api=1&query=Playbox%20Preschool%20Dwarkadas%20Circle%2C%20Jaipur',
        icon: FiStar,
        color: '#ff7eb3'
    },
    {
        id: 'ramvihar',
        name: 'Ram Vihar',
        address: 'Ram Vihar Colony, Jaipur',
        phone: '+91 9216946252',
        mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.038398199224!2d75.73524357518811!3d26.87052110047928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5c792dd4479%3A0xf9404d4d04fe07f0!2sPlaybox%20Preschool%20(Swarn%20Branch)!5e0!3m2!1sen!2sin!4v1773046307375!5m2!1sen!2sin',
        mapLink: 'https://maps.app.goo.gl/43P7Dw6VRdcjdca67',
        icon: FiBook,
        color: '#758cff'
    },
    {
        id: 'shyamnagar',
        name: 'Shyam Nagar',
        address: 'Shyam Nagar, Jaipur',
        phone: '+91 9216946252',
        mapSrc: 'https://www.google.com/maps?q=26.8929422,75.7731688&z=16&output=embed',
        mapLink: 'https://maps.app.goo.gl/aF4SE9TCSBjZUcfv9',
        icon: FiSun,
        color: '#ffb347'
    },
    {
        id: 'tonkroad',
        name: 'Tonk Road',
        address: 'Tonk Road, Jaipur',
        phone: '+91 9216946252',
        mapSrc: 'https://www.google.com/maps?q=26.8562331,75.7948937&z=16&output=embed',
        mapLink: 'https://maps.app.goo.gl/iFZ6t1K8ndk9PD7QA',
        icon: FiHeart,
        color: '#47ffb3'
    },
]

function buildGoogleMapsUrl(location) {
    if (location.mapLink) return location.mapLink
    const query = encodeURIComponent(`${location.name}, ${location.address}`)
    return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export default function Locations() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
    const [activeLoc, setActiveLoc] = useState(locations[0])
    const activeMapLink = buildGoogleMapsUrl(activeLoc)

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
                            const isActive = activeLoc.id === loc.id
                            const IconComp = loc.icon

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
                                    <div
                                        className="loc-list-icon-wrapper"
                                        style={{ background: isActive ? loc.color : 'var(--clay-bg)' }}
                                    >
                                        <IconComp size={28} color={isActive ? 'white' : loc.color} />
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
                            >
                                {/* Decorative blob */}
                                <div className="loc-decorative-blob" style={{ background: activeLoc.color }}></div>

                                <div className="loc-preview-header">
                                    <div>
                                        <h2 className="loc-preview-name">{activeLoc.name}</h2>
                                        <p className="loc-preview-address">
                                            <FiMapPin color={activeLoc.color} /> {activeLoc.address}
                                        </p>
                                    </div>
                                    <div className="loc-preview-icon-wrapper" style={{ background: activeLoc.color }}>
                                        {(() => { const IC = activeLoc.icon; return <IC size={40} color="white" /> })()}
                                    </div>
                                </div>

                                {/* ACTION BUTTON */}
                                <div className="loc-action-buttons">
                                    <a href={`tel:${activeLoc.phone}`} className="clay-btn loc-action-btn">
                                        <FiPhone size={18} /> <span>{activeLoc.phone}</span>
                                    </a>
                                </div>

                                {/* Map */}
                                <div className="loc-map-container clay-card">
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
                                    <a
                                        href={activeMapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="loc-map-overlay"
                                        aria-label={`Open ${activeLoc.name} in Google Maps`}
                                    >
                                        <span className="loc-map-overlay-badge">Open in Google Maps</span>
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    )
}
