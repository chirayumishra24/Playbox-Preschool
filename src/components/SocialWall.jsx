import { motion } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa'

export default function SocialWall() {
  return (
    <section className="section social-wall-section" id="social">


      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="section-header">
          <motion.h2
            className="section-title text-gradient"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Connect With Us
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
          >
            Catch all the latest stories, events, and everyday magic on our social pages!
          </motion.p>
        </div>

        <div className="social-grid">
          {/* Instagram Embed */}
          <motion.div 
            className="social-card-wrapper ig-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="social-clay-frame">
              <div className="social-frame-header">
                <div className="social-icon-badge">
                  <FaInstagram />
                </div>
                <div>
                  <h3>Instagram</h3>
                  <p>@playboxpreschool</p>
                </div>
              </div>
              <div className="social-embed-container">
                {/* User provided Instagram embed script */}
                <iframe 
                  className="instagram-media instagram-media-rendered" 
                  id="instagram-embed-0" 
                  src="https://www.instagram.com/reel/DOgCaCiE6BT/embed" 
                  allowtransparency="true" 
                  allowFullScreen={true} 
                  frameBorder="0" 
                  height="500" 
                  scrolling="no" 
                  style={{ background: 'white', maxWidth: '100%', width: 'calc(100% - 2px)', borderRadius: '3px', border: '1px solid rgb(219, 219, 219)', boxShadow: 'none', display: 'block', margin: '0px', minWidth: '326px', padding: '0px' }}
                ></iframe>
                {/* Note: In a real environment, the embed.js script is needed if they use blockquote. Since we use iframe /embed directly, no script is strictly needed. */}
              </div>
            </div>
          </motion.div>

          {/* Second Instagram Embed */}
          <motion.div 
            className="social-card-wrapper ig-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="social-clay-frame">
              <div className="social-frame-header">
                <div className="social-icon-badge">
                  <FaInstagram />
                </div>
                <div>
                  <h3>Instagram</h3>
                  <p>@playboxpreschool</p>
                </div>
              </div>
              <div className="social-embed-container">
                <iframe 
                  className="instagram-media instagram-media-rendered" 
                  src="https://www.instagram.com/reel/DVqP2mhz-RY/embed" 
                  allowtransparency="true" 
                  allowFullScreen={true} 
                  frameBorder="0" 
                  height="500" 
                  scrolling="no" 
                  style={{ background: 'white', maxWidth: '100%', width: 'calc(100% - 2px)', borderRadius: '3px', border: '1px solid rgb(219, 219, 219)', boxShadow: 'none', display: 'block', margin: '0px', minWidth: '326px', padding: '0px' }}
                ></iframe>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
