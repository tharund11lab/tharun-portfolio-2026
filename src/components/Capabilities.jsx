import { useEffect, useRef } from 'react'
import { gsap } from '../lib/anim'
import { stackGroups } from '../data/content'

export default function Capabilities() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.cap-row').forEach((row) => {
        gsap.fromTo(row,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          },
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section section--alt" id="skills" ref={rootRef}>
      <div className="wrap">
        <div className="shead">
          <span className="shead__num">03</span>
          <span className="shead__slash">/</span>
          <h2 className="shead__title">Skills</h2>
          <span className="shead__note">languages → infra</span>
        </div>

        {stackGroups.map((g, i) => (
          <div className="cap-row" key={g.label}>
            <h3 className="cap-row__label">
              <sup>0{i + 1}</sup>
              {g.label}
            </h3>
            <div className="cap-row__items">
              {g.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
