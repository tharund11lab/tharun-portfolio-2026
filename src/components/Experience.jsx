import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/anim'
import { projects } from '../data/content'

// Each experience is a full page that slides in from the right, one by
// one, while the section is pinned — snapping so every role settles
// fully in view. Ghost index numbers parallax behind. Mobile stacks.
export default function Experience() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const total = projects.length

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current.querySelector('.exp__track-wrap'),
          pin: true,
          scrub: 0.6,
          snap: { snapTo: 1 / (total - 1), duration: 0.4, ease: 'power2.out' },
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`
            }
            setActive(Math.round(self.progress * (total - 1)))
          },
        },
      })

      // Ghost numbers drift opposite the track for depth
      gsap.utils.toArray('.exp-panel__bg').forEach((el) => {
        gsap.to(el, {
          xPercent: -14,
          ease: 'none',
          scrollTrigger: { containerAnimation: tween, trigger: el, scrub: true },
        })
      })
    })

    mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
      gsap.utils.toArray('.exp-panel').forEach((panel) => {
        gsap.fromTo(panel,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 85%', once: true },
          },
        )
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="section exp" id="experience" ref={rootRef}>
      <div className="exp__head wrap">
        <div className="shead">
          <span className="shead__num">02</span>
          <span className="shead__slash">/</span>
          <h2 className="shead__title">Experience</h2>
          <span className="shead__note">scroll — pages slide left</span>
        </div>
      </div>

      <div className="exp__track-wrap">
        <div className="exp__track" ref={trackRef}>
          {projects.map((p) => (
            <article className="exp-panel" key={p.id}>
              <span className="exp-panel__bg" aria-hidden="true">{p.index}</span>
              <div className="exp-panel__inner">
                <h3 className="exp-panel__company">{p.company}</h3>
                <p className="exp-panel__meta">{p.period} &nbsp;|&nbsp; {p.region}</p>
                <p className="exp-panel__project">{p.project}</p>
                <div className="exp-panel__story">
                  {p.narrative.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="exp-panel__stackwrap">
                  <p className="exp-panel__stacklabel">Tech Stack</p>
                  <div className="exp-panel__stack">
                    {p.stack.map((s) => (
                      <span className="tag" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="exp__progress">
          <span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <span className="exp__progress-bar"><span ref={barRef} /></span>
        </div>
      </div>
    </section>
  )
}
