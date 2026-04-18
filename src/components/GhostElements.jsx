import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import all element images
import bus from '../../img/elements/bus.png'
import cat1 from '../../img/elements/cat1.png'
import child1 from '../../img/elements/child1.png'
import child2 from '../../img/elements/child2.png'
import child3 from '../../img/elements/child3.png'
import child4 from '../../img/elements/child4.png'
import child5 from '../../img/elements/child5.png'
import dog1 from '../../img/elements/dog1.png'
import dog2 from '../../img/elements/dog2.png'
import fruit from '../../img/elements/fruit.png'
import rocket from '../../img/elements/rocket.png'
import tree1 from '../../img/elements/tree1.png'
import tree2 from '../../img/elements/tree2.png'
import worm1 from '../../img/elements/worm1.png'
import worm2 from '../../img/elements/worm2.png'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ghost elements cover the FULL page using % positioning.
 * Each has a GSAP animation type: parallax, rotate, float, wobble, scale-pulse, drift.
 * Elements are repeated generously across all sections.
 */
const ghosts = [
  // ── Hero ──
  { src: rocket,  top: '1%',   left: '2%',    size: 95,  rotate: -18, anim: 'parallax' },
  { src: child2,  top: '2.5%', right: '3%',   size: 85,  rotate: 12,  anim: 'wobble' },
  { src: tree2,   top: '4%',   right: '6%',   size: 70,  rotate: 5,   anim: 'float' },

  // ── Marquee gap ──
  { src: fruit,   top: '6%',   left: '5%',    size: 60,  rotate: 15,  anim: 'scale-pulse' },

  // ── Features (Mission & Magic) ──
  { src: tree1,   top: '8%',   left: '1%',    size: 120, rotate: -5,  anim: 'parallax' },
  { src: cat1,    top: '10%',  right: '2%',   size: 80,  rotate: 8,   anim: 'float' },
  { src: child4,  top: '12%',  left: '3%',    size: 70,  rotate: -10, anim: 'wobble' },
  { src: fruit,   top: '14%',  right: '4%',   size: 60,  rotate: 20,  anim: 'drift' },
  { src: dog2,    top: '16%',  left: '2%',    size: 80,  rotate: 6,   anim: 'float' },
  { src: child1,  top: '18%',  right: '1%',   size: 75,  rotate: -8,  anim: 'parallax' },

  // ── Worm divider ──
  { src: worm1,   top: '19%',  left: '50%',   size: 220, rotate: 0,   anim: 'drift', isWorm: true },

  // ── Programs ──
  { src: dog1,    top: '21%',  right: '1%',   size: 90,  rotate: -10, anim: 'parallax', flip: true },
  { src: rocket,  top: '23%',  left: '2%',    size: 80,  rotate: 20,  anim: 'float' },
  { src: child3,  top: '25%',  right: '3%',   size: 75,  rotate: 5,   anim: 'wobble' },
  { src: tree2,   top: '27%',  left: '1%',    size: 90,  rotate: -3,  anim: 'scale-pulse' },

  // ── Gallery (Testimonies videos) ──
  { src: bus,     top: '29%',  right: '2%',   size: 105, rotate: -6,  anim: 'parallax' },
  { src: cat1,    top: '31%',  left: '2%',    size: 75,  rotate: 12,  anim: 'float' },
  { src: child5,  top: '33%',  right: '4%',   size: 70,  rotate: -5,  anim: 'wobble' },
  { src: fruit,   top: '35%',  left: '3%',    size: 55,  rotate: 18,  anim: 'drift' },
  { src: tree1,   top: '37%',  right: '1%',   size: 100, rotate: 3,   anim: 'parallax' },
  { src: dog2,    top: '39%',  left: '1%',    size: 85,  rotate: -8,  anim: 'float', flip: true },

  // ── ImageGallery (Gallery Moments) ──
  { src: child1,  top: '41%',  right: '2%',   size: 80,  rotate: -12, anim: 'wobble' },
  { src: rocket,  top: '43%',  left: '2%',    size: 75,  rotate: 15,  anim: 'scale-pulse' },
  { src: dog1,    top: '45%',  right: '3%',   size: 85,  rotate: 8,   anim: 'parallax' },
  { src: child2,  top: '47%',  left: '1%',    size: 80,  rotate: -6,  anim: 'float' },
  { src: bus,     top: '49%',  right: '2%',   size: 95,  rotate: 5,   anim: 'drift' },
  { src: fruit,   top: '51%',  left: '4%',    size: 55,  rotate: 22,  anim: 'wobble' },

  // ── Worm divider ──
  { src: worm2,   top: '52%',  left: '50%',   size: 220, rotate: 0,   anim: 'drift', isWorm: true },

  // ── Difference ──
  { src: tree2,   top: '54%',  left: '1%',    size: 95,  rotate: -5,  anim: 'parallax' },
  { src: child3,  top: '56%',  right: '2%',   size: 80,  rotate: 10,  anim: 'float' },
  { src: cat1,    top: '58%',  left: '3%',    size: 75,  rotate: -12, anim: 'wobble' },
  { src: dog2,    top: '60%',  right: '1%',   size: 85,  rotate: 6,   anim: 'scale-pulse', flip: true },
  { src: rocket,  top: '62%',  left: '2%',    size: 80,  rotate: 18,  anim: 'drift' },
  { src: child4,  top: '64%',  right: '3%',   size: 70,  rotate: -8,  anim: 'parallax' },

  // ── Mentors ──
  { src: tree1,   top: '66%',  left: '1%',    size: 110, rotate: 3,   anim: 'float' },
  { src: dog1,    top: '68%',  right: '2%',   size: 85,  rotate: -10, anim: 'wobble', flip: true },
  { src: fruit,   top: '69%',  left: '4%',    size: 55,  rotate: 15,  anim: 'scale-pulse' },

  // ── Media Coverage ──
  { src: child5,  top: '71%',  left: '2%',    size: 80,  rotate: 6,   anim: 'parallax' },
  { src: bus,     top: '73%',  right: '2%',   size: 100, rotate: -5,  anim: 'drift' },
  { src: cat1,    top: '75%',  left: '1%',    size: 75,  rotate: 10,  anim: 'float' },
  { src: child1,  top: '77%',  right: '3%',   size: 70,  rotate: -8,  anim: 'wobble' },

  // ── Worm divider ──
  { src: worm1,   top: '78%',  left: '50%',   size: 220, rotate: 0,   anim: 'drift', isWorm: true },

  // ── Testimonials (Google Reviews) ──
  { src: child2,  top: '79%',  left: '1%',    size: 80,  rotate: 10,  anim: 'parallax' },
  { src: tree2,   top: '81%',  right: '2%',   size: 90,  rotate: -5,  anim: 'float' },
  { src: dog2,    top: '83%',  left: '3%',    size: 80,  rotate: 8,   anim: 'scale-pulse', flip: true },
  { src: rocket,  top: '84%',  right: '1%',   size: 75,  rotate: 15,  anim: 'wobble' },

  // ── Locations ──
  { src: tree1,   top: '86%',  left: '1%',    size: 100, rotate: -5,  anim: 'parallax' },
  { src: child4,  top: '88%',  right: '2%',   size: 75,  rotate: 8,   anim: 'float' },
  { src: cat1,    top: '90%',  left: '2%',    size: 70,  rotate: -10, anim: 'drift' },
  { src: dog1,    top: '91%',  right: '3%',   size: 80,  rotate: 6,   anim: 'wobble' },

  // ── Social / CTA / Footer ──
  { src: bus,     top: '93%',  right: '2%',   size: 95,  rotate: -5,  anim: 'parallax', flip: true },
  { src: child3,  top: '94%',  left: '2%',    size: 75,  rotate: 12,  anim: 'float' },
  { src: fruit,   top: '95%',  right: '4%',   size: 55,  rotate: 20,  anim: 'scale-pulse' },
  { src: rocket,  top: '96%',  left: '1%',    size: 80,  rotate: -15, anim: 'drift' },
  { src: dog2,    top: '97%',  right: '2%',   size: 80,  rotate: 8,   anim: 'wobble', flip: true },
  { src: tree2,   top: '98%',  left: '3%',    size: 90,  rotate: -3,  anim: 'parallax' },
]

export default function GhostElements() {
  const containerRef = useRef(null)

  // Disable on mobile for performance
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll('.ghost-element')
      if (!elements) return

      elements.forEach((el) => {
        const anim = el.dataset.anim
        const speed = parseFloat(el.dataset.speed) || 1

        // ── Scroll-linked parallax (all elements get some parallax) ──
        gsap.to(el, {
          y: () => -120 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })

        // ── Animation-specific GSAP tweens ──
        switch (anim) {
          case 'float':
            gsap.to(el, {
              y: '-=20',
              duration: 3 + Math.random() * 2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
            break

          case 'wobble':
            gsap.to(el, {
              rotation: '+=12',
              duration: 2.5 + Math.random() * 2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
            gsap.to(el, {
              y: '-=14',
              duration: 3.5 + Math.random(),
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
            break

          case 'scale-pulse':
            gsap.to(el, {
              scale: 1.15,
              duration: 2.8 + Math.random() * 1.5,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
            gsap.to(el, {
              y: '-=10',
              duration: 4 + Math.random(),
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
            break

          case 'drift':
            gsap.to(el, {
              x: '+=25',
              duration: 5 + Math.random() * 3,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
            gsap.to(el, {
              y: '-=12',
              duration: 3.5 + Math.random() * 2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
            break

          case 'parallax':
          default:
            // Pure parallax only — the scroll-linked tween above handles it
            gsap.to(el, {
              y: '-=16',
              duration: 4 + Math.random() * 2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
            })
            break
        }

        // ── Fade-in on scroll reveal ──
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.6 },
          {
            opacity: parseFloat(el.dataset.opacity) || 0.12,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="ghost-elements-container" ref={containerRef} aria-hidden="true">
      {ghosts.map((ghost, i) => {
        const style = {
          top: ghost.top,
          ...(ghost.left ? { left: ghost.left } : {}),
          ...(ghost.right ? { right: ghost.right } : {}),
          width: ghost.isWorm ? ghost.size * 1.5 : ghost.size,
          height: 'auto',
          transform: `rotate(${ghost.rotate}deg)${ghost.flip ? ' scaleX(-1)' : ''}`,
        }

        return (
          <img
            key={i}
            src={ghost.src}
            alt=""
            loading="lazy"
            draggable="false"
            className={`ghost-element ${ghost.isWorm ? 'ghost-worm' : ''}`}
            data-anim={ghost.anim}
            data-speed={0.5 + (i % 5) * 0.3}
            data-opacity={ghost.isWorm ? 0.08 : 0.12}
            style={style}
          />
        )
      })}
    </div>
  )
}
