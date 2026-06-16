import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'
import { profile } from '../data/content'

// Closer: “LET'S BUILD / SOMETHING.” — second row vermillion, lines
// mask-reveal on scroll. Email huge left, mono links right.
export default function Contact() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact__big .row > span',
        { yPercent: 115 },
        {
          yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%', once: true },
        },
      )
      gsap.fromTo('.contact__grid',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: rootRef.current, start: 'top 70%', once: true },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // Magnetic pull on the buttons
  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover)').matches) return
    const btns = rootRef.current.querySelectorAll('.contact__links a')
    const cleanups = [...btns].map((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' })
      const move = (e) => {
        const r = btn.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25)
      }
      const leave = () => xTo(0)
      btn.addEventListener('mousemove', move)
      btn.addEventListener('mouseleave', leave)
      return () => {
        btn.removeEventListener('mousemove', move)
        btn.removeEventListener('mouseleave', leave)
      }
    })
    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <>
      <section className="section contact" id="contact" ref={rootRef}>
        <div className="wrap">
          <div className="shead">
            <span className="shead__num">05</span>
            <span className="shead__slash">/</span>
            <h2 className="shead__title">Contact</h2>
            <span className="shead__note">{profile.status}</span>
          </div>

          <h2 className="contact__big" aria-label="Let's build something.">
            <span className="row" aria-hidden="true"><span>Let&rsquo;s build</span></span>
            <span className="row red" aria-hidden="true"><span>something.</span></span>
          </h2>

          <div className="contact__grid">
            <a className="contact__email" href={`mailto:${profile.email}`} data-cursor="email">
              {profile.email}
            </a>
            <div className="contact__links">
              {profile.links.filter((l) => l.label !== 'Email').map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                  {l.label} ↗
                </a>
              ))}
              <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}>{profile.phone}</a>
              <a href="/Tharun_Derangula_Fullstack_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↓</a>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer__inner">
          <span className="footnote">© {new Date().getFullYear()} {profile.name}</span>
          <span className="footnote">Swiss / Editorial · React · GSAP · Three.js</span>
        </div>
      </footer>
    </>
  )
}
