'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

const PETALS = Array.from({ length: 10 }, (_, i) => {
  const r = ((i * 9301 + 49297) % 233280) / 233280
  return {
    left: `${(i * 37 + 7) % 100}%`,
    size: 9 + Math.round(r * 8),
    duration: `${13 + (i % 5) * 2.5}s`,
    delay: `${-(i * 2.1)}s`,
    drift: `${(i % 2 === 0 ? 1 : -1) * (30 + r * 60)}px`,
    spin: `${(i % 3 === 0 ? -1 : 1) * (240 + r * 360)}deg`,
    color: i % 3 === 0 ? '#f9d3de' : i % 3 === 1 ? '#f4b6c8' : '#fde4ea',
  }
})

const FADE_START_SCREENS = 1.6
const FADE_END_SCREENS = 2.8

export function FallingPetals({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const screens = window.scrollY / window.innerHeight
      const t = (screens - FADE_START_SCREENS) / (FADE_END_SCREENS - FADE_START_SCREENS)
      el.style.opacity = String(Math.min(1, Math.max(0, 1 - t)) * 0.75)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={ref}
      className={`pointer-events-none fixed inset-0 z-40 mx-auto max-w-md overflow-hidden transition-opacity duration-500 ${
        active ? '' : 'invisible'
      }`}
      aria-hidden="true"
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal absolute -top-8 block"
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size * 1.3,
              backgroundColor: p.color,
              borderRadius: '150% 0 150% 0',
              opacity: 0,
              '--duration': p.duration,
              '--delay': p.delay,
              '--drift': p.drift,
              '--spin': p.spin,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
