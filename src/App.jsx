import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Features from './components/Features'
import Programs from './components/Programs'
import Gallery from './components/Gallery'
import Mentors from './components/Mentors'
import Testimonials from './components/Testimonials'
import Locations from './components/Locations'
import CTA from './components/CTA'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 3000], [0, 400]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -600]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
      <motion.div
        className="clay-blob"
        style={{ position: 'absolute', top: '20%', left: '-5%', width: '400px', height: '400px', background: 'var(--color-primary)', opacity: 0.3, y: y1 }}
      />
      <motion.div
        className="clay-blob"
        style={{ position: 'absolute', top: '50%', right: '-10%', width: '600px', height: '600px', background: 'var(--color-secondary)', opacity: 0.2, y: y2 }}
      />
      <motion.div
        className="clay-blob"
        style={{ position: 'absolute', bottom: '-20%', left: '30%', width: '500px', height: '500px', background: 'var(--color-quaternary)', opacity: 0.25, y: y3 }}
      />
    </div>
  )
}

function App() {
  return (
    <>
      <CustomCursor />
      <ParallaxBackground />
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <Programs />
      <Gallery />
      <Mentors />
      <Testimonials />
      <Locations />
      <CTA />
      <Footer />
    </>
  )
}

export default App
