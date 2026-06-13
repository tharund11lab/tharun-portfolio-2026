import { useEffect, useRef } from 'react'
import { gsap } from '../lib/anim'
import { timeline, certifications } from '../data/content'

export default function Education() {
  const rootRef = useRef(null)
  const education = timeline.filter((t) => t.kind === 'edu')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.edu-card',
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: '.edu__grid', start: 'top 85%', once: true },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="education" ref={rootRef}>
      <div className="wrap">
        <div className="shead">
          <span className="shead__num">04</span>
          <span className="shead__slash">/</span>
          <h2 className="shead__title">Education</h2>
          <span className="shead__note">degrees / certifications</span>
        </div>

        <div className="edu__grid">
          <div className="edu-card">
            <p className="edu-card__label">Education</p>
            {education.map((e) => (
              <div className="edu-item" key={e.org}>
                <p className="edu-item__role">{e.role}</p>
                <p className="edu-item__org">{e.org} · {e.period}</p>
              </div>
            ))}
          </div>
          <div className="edu-card">
            <p className="edu-card__label">Certifications</p>
            <ul className="cert-list">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
