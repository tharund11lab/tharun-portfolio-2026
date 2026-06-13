import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../lib/anim'

// Hero backdrop: a dot terrain breathing in sine waves, warm gray ink
// tinted cobalt at the crests, with gentle pointer parallax.
// Custom shader keeps it at one draw call; normal blending suits paper.
const VERT = /* glsl */ `
  uniform float uTime;
  varying float vElev;
  void main() {
    vec3 p = position;
    float e = sin(p.x * 0.32 + uTime * 0.55) * 0.85
            + cos(p.y * 0.24 + uTime * 0.4) * 0.85
            + sin((p.x + p.y) * 0.12 + uTime * 0.28) * 0.6;
    p.z += e;
    vElev = e;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (1.9 + vElev * 0.7) * (28.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = /* glsl */ `
  varying float vElev;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 ink = vec3(0.56, 0.55, 0.51);
    vec3 vermillion = vec3(0.90, 0.22, 0.12);
    vec3 col = mix(ink, vermillion, smoothstep(0.3, 2.0, vElev));
    float a = smoothstep(0.5, 0.12, d) * 0.55;
    gl_FragColor = vec4(col, a);
  }
`

export default function ThreeField() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const mount = mountRef.current

    // No WebGL (blocked, ancient GPU, headless): skip the backdrop
    // rather than letting the constructor throw and unmount the app.
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55, mount.clientWidth / mount.clientHeight, 0.1, 100,
    )
    camera.position.set(0, -7.5, 7)
    camera.lookAt(0, 2, 0)

    const COLS = 130
    const ROWS = 80
    const positions = new Float32Array(COLS * ROWS * 3)
    let i = 0
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        positions[i++] = (x / (COLS - 1) - 0.5) * 46
        positions[i++] = (y / (ROWS - 1) - 0.5) * 30
        positions[i++] = 0
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
    })

    const points = new THREE.Points(geo, mat)
    points.rotation.x = -0.45
    scene.add(points)

    const pointer = { x: 0, y: 0 }
    const onPointer = (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let raf
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(mount)

    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      mat.uniforms.uTime.value = clock.getElapsedTime()
      camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.04
      camera.position.z += (-pointer.y * 0.6 + 7 - camera.position.z) * 0.04
      camera.lookAt(0, 2, 0)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="hero__canvas" ref={mountRef} aria-hidden="true" />
}
