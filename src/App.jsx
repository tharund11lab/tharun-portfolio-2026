import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './lib/anim'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Capabilities from './components/Capabilities'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)
  const lenisRef = useRef(null)

  // Lenis smooth scroll driven by the GSAP ticker so ScrollTrigger
  // and the scroll position never disagree.
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Pinned sections change layout height — refresh after preloader exit.
  useEffect(() => {
    if (ready) ScrollTrigger.refresh()
  }, [ready])

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav lenis={lenisRef} />
      <main>
        <Hero ready={ready} />
        <About />
        <Experience />
        <Capabilities />
        <Education />
        <Contact />
      </main>
    </>
  )
}
