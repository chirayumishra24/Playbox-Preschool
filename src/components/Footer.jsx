import {
    FiFacebook,
    FiInstagram,
    FiLinkedin,
    FiYoutube,
    FiPhone,
    FiMail,
    FiMapPin,
    FiHeart,
    FiArrowUp,
} from 'react-icons/fi'

const socialLinks = [
    { icon: FiFacebook, label: 'Facebook', href: '#', color: '#1877F2' },
    { icon: FiInstagram, label: 'Instagram', href: '#', color: '#E4405F' },
    { icon: FiLinkedin, label: 'LinkedIn', href: '#', color: '#0A66C2' },
    { icon: FiYoutube, label: 'YouTube', href: '#', color: '#FF0000' },
]

const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Why Choose Us', href: '#features' },
    { label: 'Our Programs', href: '#programs' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Mentors', href: '#mentors' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Locations', href: '#locations' },
]

const programs = [
    { label: 'Play Group', href: '#programs' },
    { label: 'Nursery', href: '#programs' },
    { label: 'Junior KG', href: '#programs' },
    { label: 'Senior KG', href: '#programs' },
]

function smoothScroll(e, href) {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
        const navHeight = 100
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top, behavior: 'smooth' })
    }
}

function scrollToTop(e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="container">
                {/* Back to Top */}
                <div className="footer-top-btn-wrapper">
                    <button className="footer-top-btn clay-btn" onClick={scrollToTop} aria-label="Back to top">
                        <FiArrowUp size={20} />
                    </button>
                </div>

                <div className="footer-grid">
                    {/* About Column */}
                    <div className="footer-about">
                        <div className="footer-brand">
                            <img src="/assets/logo.svg" alt="Playbox Preschool" />
                            <div>
                                <h3>Playbox Preschool</h3>
                                <p className="footer-brand-sub">by Cambridge Court</p>
                            </div>
                        </div>
                        <p className="footer-desc">
                            Playbox Preschool provides a nurturing, creative, and joyful
                            early learning experience. We believe every child is unique and
                            deserves the best start in life.
                        </p>
                        <div className="footer-socials">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="social-icon"
                                    aria-label={social.label}
                                    style={{ '--social-hover-color': social.color }}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <div className="footer-links-list">
                            {quickLinks.map((link) => (
                                <a key={link.label} href={link.href} onClick={(e) => smoothScroll(e, link.href)}>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Programs */}
                    <div className="footer-column">
                        <h4>Programs</h4>
                        <div className="footer-links-list">
                            {programs.map((link) => (
                                <a key={link.label} href={link.href} onClick={(e) => smoothScroll(e, link.href)}>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="footer-column">
                        <h4>Contact Us</h4>
                        <div className="footer-links-list">
                            <a href="tel:+919876543210" className="footer-contact-item">
                                <FiPhone size={16} />
                                <span>+91 98765 43210</span>
                            </a>
                            <a href="mailto:info@playboxpreschool.com" className="footer-contact-item">
                                <FiMail size={16} />
                                <span>info@playboxpreschool.com</span>
                            </a>
                            <a href="#locations" className="footer-contact-item" onClick={(e) => smoothScroll(e, '#locations')}>
                                <FiMapPin size={16} />
                                <span>Multiple locations in Jaipur</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Playbox Preschool by Cambridge Court Group of Schools. All rights reserved.
                    </p>
                    <p className="footer-made-with">
                        Made with <FiHeart size={14} color="var(--color-primary)" /> for little learners
                    </p>
                </div>
            </div>
        </footer>
    )
}
