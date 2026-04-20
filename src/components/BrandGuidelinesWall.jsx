import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';

export default function BrandGuidelinesWall() {
  return (
    <section className="section social-wall-section" id="brand-social-mockups">
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="section-header">
          <motion.h2
            className="section-title text-gradient"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Brand Guidelines Showcase
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
          >
            These are mockups demonstrating how future social media posts visually align with our new web brand guidelines.
          </motion.p>
        </div>

        <div className="scrapbook-container">
          {/* Scrapbook Polaroid 1 */}
          <motion.div 
            className="scrapbook-polaroid"
            style={{ rotate: -3 }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
          >
            <div className="scrapbook-tape" style={{ rotate: Array.from({length: 1}, () => -2 + Math.random() * 4)[0] + 'deg' }}></div>
            <div className="scrapbook-image-wrapper">
              <img src="/assets/scrapbook_real_1.png" alt="Kids playing" className="scrapbook-img" />
            </div>
            <div className="scrapbook-body">
              <h4 style={{ color: 'var(--color-primary)' }}>#CarefreeMotherhood</h4>
              <p>Where imagination takes flight! ✨ Every day is a new adventure in our hands-on creative corners.</p>
              <div className="scrapbook-footer-marks">
                <span>By playboxpreschool</span>
                <span className="scrapbook-emoji">🎨🧸</span>
              </div>
            </div>
          </motion.div>

          {/* Scrapbook Polaroid 2 */}
          <motion.div 
            className="scrapbook-polaroid"
            style={{ rotate: 4, marginTop: '2rem' }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.8, delay: 0.2 }}
          >
            <div className="scrapbook-tape" style={{ rotate: Array.from({length: 1}, () => -2 + Math.random() * 4)[0] + 'deg' }}></div>
            <div className="scrapbook-image-wrapper">
              <img src="/assets/scrapbook_real_2.png" alt="Creative time" className="scrapbook-img" />
            </div>
            <div className="scrapbook-body">
              <h4 style={{ color: '#ffbd00' }}>#PlayBasedLearning</h4>
              <p>Less screen time, more SCREAM time! (The happy kind 😂). Watch our little inventors building the future.</p>
              <div className="scrapbook-footer-marks">
                <span>By playboxpreschool</span>
                <span className="scrapbook-emoji">🚀💛</span>
              </div>
            </div>
          </motion.div>

           {/* Scrapbook Polaroid 3 */}
           <motion.div 
            className="scrapbook-polaroid"
            style={{ rotate: -2, marginTop: '4rem' }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 0.8, delay: 0.4 }}
          >
            <div className="scrapbook-tape" style={{ rotate: Array.from({length: 1}, () => -2 + Math.random() * 4)[0] + 'deg' }}></div>
            <div className="scrapbook-image-wrapper">
              <img src="/assets/scrapbook_real_3.png" alt="Preschool activities" className="scrapbook-img" />
            </div>
            <div className="scrapbook-body">
              <h4 style={{ color: '#4CAF50' }}>#PlayboxGenius</h4>
              <p>Exploring the world, one tiny step at a time! Building confidence and social skills in our safe environment.</p>
              <div className="scrapbook-footer-marks">
                <span>By playboxpreschool</span>
                <span className="scrapbook-emoji">🌿🌱</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
