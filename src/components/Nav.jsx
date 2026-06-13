import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

// Hides on scroll down, returns frosted on scroll up.
// Anchor clicks route through Lenis for eased travel.
export default function Nav({ lenis }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 140 && y > lastY.current)
      setScrolled(y > 30)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (!el) return
    if (lenis?.current) lenis.current.scrollTo(el, { duration: 1.4 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`nav${hidden ? ' is-hidden' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" onClick={(e) => go(e, '#top')}>
          {profile.name}
        </a>
        <nav className="nav__links">
          {LINKS.map((l) => (
            <a key={l.label} className="nav__link" href={l.href} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
