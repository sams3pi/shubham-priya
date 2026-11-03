import type { CSSProperties } from 'react'

const PETALS = Array.from({ length: 14 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const r = seed / 233280
  return {
    left: `${(i * 37 + 7) % 100}%`,
    size: 10 + Math.round(r * 10),
    duration: `${11 + (i % 5) * 2.5}s`,
    delay: `${-(i * 1.7)}s`,
    drift: `${(i % 2 === 0 ? 1 : -1) * (30 + r * 60)}px`,
    spin: `${(i % 3 === 0 ? -1 : 1) * (240 + r * 360)}deg`,
    color: i % 3 === 0 ? '#f9d3de' : i % 3 === 1 ? '#f4b6c8' : '#fde4ea',
  }
})

export function FallingPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
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
