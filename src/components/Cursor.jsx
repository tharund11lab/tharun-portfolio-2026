import { useEffect, useRef } from 'react'
import { gsap } from '../lib/anim'

// Cobalt dot follows the pointer exactly; the ring lags behind on a
// quickTo spring. Elements opt into the labeled state via [data-cursor].
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const move = (e) => {
      dotX(e.clientX); dotY(e.clientY)
      ringX(e.clientX); ringY(e.clientY)
    }

    const over = (e) => {
      const target = e.target.closest('a, button, [data-cursor]')
      if (target) {
        ring.classList.add('is-hover')
        labelRef.current.textContent = target.dataset.cursor || ''
      } else {
        ring.classList.remove('is-hover')
      }
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef}>
        <span className="cursor-label" ref={labelRef} />
      </div>
    </>
  )
}
