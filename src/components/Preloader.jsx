import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/anim'

// Counter sweeps 0→100 with a cobalt progress bar, then the whole
// veil slides up and hands control to the hero timeline.
export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const numRef = useRef(null)
  const barRef = useRef(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(rootRef.current, { display: 'none' })
      doneRef.current?.()
      return
    }

    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => doneRef.current?.(),
    })

    tl.to(counter, {
      v: 100,
      duration: 1.7,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = Math.round(counter.v)
      },
    })
      .to(barRef.current, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
      .to(rootRef.current, {
        yPercent: -100,
        duration: 0.85,
        ease: 'power4.inOut',
      }, '+=0.15')
      .set(rootRef.current, { display: 'none' })

    return () => tl.kill()
  }, [])

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader__count">
        <span ref={numRef}>0</span>
        <sup>%</sup>
      </div>
      <p className="preloader__tag">
        Tharun Derangula — full-stack software engineer
      </p>
      <div className="preloader__bar" ref={barRef} />
    </div>
  )
}
