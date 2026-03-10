import { useState, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'

// Lazy loaded components (below the fold)
const Features = lazy(() => import('./components/Features'))
const Programs = lazy(() => import('./components/Programs'))
const Testimonies = lazy(() => import('./components/Gallery'))
const ImageGallery = lazy(() => import('./components/ImageGallery'))
const Difference = lazy(() => import('./components/Difference'))
const Mentors = lazy(() => import('./components/Mentors'))
const MediaCoverage = lazy(() => import('./components/MediaCoverage'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Locations = lazy(() => import('./components/Locations'))
const CTA = lazy(() => import('./components/CTA'))
const Footer = lazy(() => import('./components/Footer'))
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
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {/* Preloader overlays on top — content renders underneath immediately */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* All content renders from the start so CSS media queries compute instantly */}
      <div style={{ visibility: preloaderDone ? 'visible' : 'hidden' }}>
        <CustomCursor />
        <ParallaxBackground />
        <Navbar />
        <Hero />
        <Marquee />
        
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
          <Features />
          <Programs />
          <Testimonies />
          <ImageGallery />
          <Difference />
          <Mentors />
          <MediaCoverage />
          <Testimonials />
          <Locations />
          <CTA />
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

export default App
