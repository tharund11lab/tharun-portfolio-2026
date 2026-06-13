import { useEffect, useRef } from 'react'
import { gsap } from '../lib/anim'
import { profile, principles } from '../data/content'

const STATEMENT = '4+ years turning ambiguous product ideas into production systems that serve millions.'

// Big Archivo statement scrubs word-by-word from faint → full ink;
// principle cards stagger in beneath, Swiss arrows and hairlines.
export default function About() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.about__statement .w', {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about__statement',
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 0.4,
        },
      })

      gsap.fromTo('.principle',
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1, y: 0,
          duration: 0.9, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.principles', start: 'top 82%', once: true },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="about" ref={rootRef}>
      <div className="wrap">
        <div className="shead">
          <span className="shead__num">01</span>
          <span className="shead__slash">/</span>
          <h2 className="shead__title">About</h2>
          <span className="shead__note">who / how / why</span>
        </div>

        <div className="about__grid">
          <p className="about__statement" aria-label={STATEMENT}>
            {STATEMENT.split(' ').map((w, i) => (
              <span className="w" key={i} aria-hidden="true">{w}{' '}</span>
            ))}
          </p>
          <p className="about__intro">{profile.intro}</p>
        </div>

        <div className="principles">
          {principles.map((p) => (
            <article className="principle" key={p.k}>
              <h3 className="principle__k">{p.k}</h3>
              <p className="principle__v">{p.v}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
