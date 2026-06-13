import { lazy, Suspense, useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { profile } from '../data/content'

const ThreeField = lazy(() => import('./ThreeField'))

export default function Hero({ ready }) {
  const rootRef = useRef(null)
  const tiltRef = useRef(null)

  // Entrance — fires once the preloader hands off.
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('.hero__kicker, .hero__sub, .hero__tagline, .hero__ctas, .hero__figure, .hero__scroll', {
          visibility: 'visible',
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.hero__figure',
        { autoAlpha: 0, y: 56, rotate: -2 },
        { autoAlpha: 1, y: 0, rotate: 0, duration: 1.2 },
      )
        .fromTo('.hero__title .line > span',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, stagger: 0.1 }, '-=0.9')
        .fromTo('.hero__kicker', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.7')
        .fromTo('.hero__sub', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.55')
        .fromTo('.hero__tagline', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo('.hero__ctas', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.55')
        .fromTo('.hero__scroll', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, '-=0.4')

      // Content drifts up + fades as you scroll out of the hero
      gsap.to('.hero__grid', {
        yPercent: -10,
        autoAlpha: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'bottom 92%',
          end: 'bottom 35%',
          scrub: true,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [ready])

  // Photo tilt: card leans toward the pointer, photo counter-parallaxes
  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover)').matches) return
    const card = tiltRef.current
    const photo = card.querySelector('.hero__photo')
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    const px = gsap.quickTo(photo, 'xPercent', { duration: 0.6, ease: 'power3.out' })
    const py = gsap.quickTo(photo, 'yPercent', { duration: 0.6, ease: 'power3.out' })
    gsap.set(card, { transformPerspective: 700 })

    const move = (e) => {
      const r = card.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      rx(-ny * 8); ry(nx * 8)
      px(-nx * 3); py(-ny * 3)
    }
    const leave = () => { rx(0); ry(0); px(0); py(0) }
    card.addEventListener('mousemove', move)
    card.addEventListener('mouseleave', leave)
    return () => {
      card.removeEventListener('mousemove', move)
      card.removeEventListener('mouseleave', leave)
    }
  }, [])

  const [firstName, lastName] = profile.name.split(' ')

  return (
    <section id="top" ref={rootRef}>
      <div className="hero">
        <Suspense fallback={null}>
          <ThreeField />
        </Suspense>

        <div className="hero__grid">
          <div className="hero__half">
            <figure className="hero__figure" style={{ visibility: 'hidden' }}>
              <div className="hero__photo-wrap" ref={tiltRef} data-cursor="hello">
                <img className="hero__photo" src="/profile.jpg" alt={profile.name} />
              </div>
              <span className="hero__badge">Full-Stack Engineer • AI &amp; Distributed Systems</span>
              <figcaption className="hero__caption">
                <span>{profile.name}</span>
                <span>{profile.location.split(',')[0]}</span>
              </figcaption>
            </figure>
          </div>

          <div className="hero__half">
            <div className="hero__copy">
              <p className="hero__kicker" style={{ visibility: 'hidden' }}>
                Available for opportunities
              </p>
              <h1 className="hero__title">
                <span className="line"><span>{firstName}</span></span>
                <span className="line"><span>{lastName}<span className="dot">.</span></span></span>
              </h1>
              <p className="hero__sub" style={{ visibility: 'hidden' }}>
                Full-Stack Software Engineer at <strong>Walmart Global Tech</strong>
              </p>
              <p className="hero__tagline" style={{ visibility: 'hidden' }}>{profile.tagline}</p>
              <div className="hero__ctas" style={{ visibility: 'hidden' }}>
                <a className="btn btn--solid" href="#experience"><span>View my work ↓</span></a>
                <a className="btn btn--line" href="/Tharun_Derangula_Fullstack_Resume.pdf" download>
                  <span>Download résumé</span>
                </a>
                <a className="btn btn--line" href={`mailto:${profile.email}`}><span>Email</span></a>
              </div>
            </div>
          </div>
        </div>
        <span className="hero__scroll" style={{ visibility: 'hidden' }}>scroll</span>
      </div>
    </section>
  )
}
