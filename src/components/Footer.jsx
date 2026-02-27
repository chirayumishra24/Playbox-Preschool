import {
    FiFacebook,
    FiInstagram,
    FiLinkedin,
    FiYoutube,
    FiPhone,
    FiMail,
    FiMapPin,
    FiHeart,
} from 'react-icons/fi'

export default function Footer() {
    return (
        <footer className="footer" id="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <img src="/assets1/Logo-8C3-REcS.svg" alt="Playbox Preschool" style={{ height: '50px', borderRadius: '50%', background: 'white', padding: '5px' }} />
                            <div>
                                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)' }}>Playbox Preschool</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>by Cambridge Court</p>
                            </div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            Playbox Preschool provides a nurturing, creative, and joyful
                            early learning experience. We believe every child is unique.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-icon" aria-label="Facebook"><FiFacebook /></a>
                            <a href="#" className="social-icon" aria-label="Instagram"><FiInstagram /></a>
                            <a href="#" className="social-icon" aria-label="LinkedIn"><FiLinkedin /></a>
                            <a href="#" className="social-icon" aria-label="YouTube"><FiYoutube /></a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <a href="#home">Home</a>
                        <a href="#features">Why Choose Us</a>
                        <a href="#programs">Our Programs</a>
                        <a href="#gallery">Gallery</a>
                        <a href="#mentors">Mentors</a>
                        <a href="#locations">Locations</a>
                    </div>

                    <div className="footer-column">
                        <h4>Programs</h4>
                        <a href="#programs">Play Group</a>
                        <a href="#programs">Nursery</a>
                        <a href="#programs">Junior KG</a>
                        <a href="#programs">Senior KG</a>
                    </div>

                    <div className="footer-column">
                        <h4>Contact Us</h4>
                        <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FiPhone /> +91 98765 43210
                        </a>
                        <a href="mailto:info@playboxpreschool.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FiMail /> info@playboxpreschool.com
                        </a>
                        <a href="#locations" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FiMapPin /> Multiple locations in Jaipur
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Playbox Preschool by Cambridge Court Group of Schools. All rights reserved.
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '0.5rem' }}>
                        Made with <FiHeart size={14} color="var(--color-primary)" /> for little learners
                    </p>
                </div>
            </div>
        </footer>
    )
}
