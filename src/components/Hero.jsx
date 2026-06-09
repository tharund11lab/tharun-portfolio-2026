import { motion } from 'framer-motion'
import { useState } from 'react'
import { profile } from '../data/content'
import { EASE } from './motion'

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.07 * i, ease: EASE } }),
}

export default function Hero() {
  const [imgOk, setImgOk] = useState(true)

  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <motion.div
          className="hero-photo"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <div className="photo-frame">
            {imgOk
              ? <img src="/profile-picture-1.jpg" alt={profile.name} onError={() => setImgOk(false)} />
              : <div className="photo-fallback">{profile.initials}</div>}
          </div>
        </motion.div>

        <motion.div className="hero-lead" initial="hidden" animate="show">
          <motion.span className="label" custom={0} variants={rise}>
            <span className="idx">●</span> Available for Opportunities
          </motion.span>

          <motion.h1 className="hero-name" custom={1} variants={rise}>
            Tharun<br />Derangula<span className="accent">.</span>
          </motion.h1>

          <motion.p className="hero-role" custom={2} variants={rise}>
            Full-Stack Software Engineer at Walmart Global Tech
          </motion.p>

          <motion.p className="hero-statement" custom={3} variants={rise}>
            I build AI products and event-driven systems that stay
            <span className="accent"> calm under load</span> and ship them at Walmart scale.
          </motion.p>

          <motion.div className="hero-actions" custom={4} variants={rise}>
            <a className="btn btn-solid" href="#work">View My Work <span className="arr">↗</span></a>
            <a className="btn btn-line" href="/Tharun_Derangula_Fullstack_Resume.pdf" download="Tharun-Derangula-Resume.pdf">Download Resume</a>
            <a className="btn btn-line" href={`mailto:${profile.email}`}>Email</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
