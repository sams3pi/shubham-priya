import { Reveal } from './reveal'

const OUTER_PETALS = Array.from({ length: 16 }, (_, i) => i * 22.5)
const INNER_PETALS = Array.from({ length: 8 }, (_, i) => i * 45)
const DOTS = Array.from({ length: 24 }, (_, i) => i * 15)

function Mandala() {
  return (
    <svg viewBox="0 0 200 200" className="size-full" aria-hidden="true">
      <g className="spin-slow" style={{ transformOrigin: '100px 100px' }}>
        {OUTER_PETALS.map((deg) => (
          <path
            key={deg}
            d="M100 18 C110 40 110 55 100 68 C90 55 90 40 100 18Z"
            transform={`rotate(${deg} 100 100)`}
            className="fill-blush/50 stroke-primary/40"
            strokeWidth="0.8"
          />
        ))}
        {DOTS.map((deg) => (
          <circle key={deg} cx="100" cy="10" r="1.6" transform={`rotate(${deg} 100 100)`} className="fill-gold" />
        ))}
      </g>
      <g className="spin-slow-reverse" style={{ transformOrigin: '100px 100px' }}>
        <circle cx="100" cy="100" r="34" className="fill-none stroke-gold/60" strokeWidth="0.8" strokeDasharray="2 3" />
        {INNER_PETALS.map((deg) => (
          <path
            key={deg}
            d="M100 62 C106 74 106 82 100 90 C94 82 94 74 100 62Z"
            transform={`rotate(${deg} 100 100)`}
            className="fill-primary/25 stroke-primary/50"
            strokeWidth="0.8"
          />
        ))}
      </g>
    </svg>
  )
}

function Diya() {
  return (
    <svg viewBox="0 0 60 60" className="size-full overflow-visible" aria-hidden="true">
      <ellipse cx="30" cy="22" rx="10" ry="10" className="diya-glow fill-[#f7c873]/40" />
      <path
        className="diya-flame fill-[#f2a93b]"
        style={{ transformOrigin: '30px 34px' }}
        d="M30 12 C35 20 36 27 30 34 C24 27 25 20 30 12Z"
      />
      <path
        className="diya-flame fill-[#fff1c9]"
        style={{ transformOrigin: '30px 34px' }}
        d="M30 21 C32.5 25 33 29 30 33 C27 29 27.5 25 30 21Z"
      />
      <path d="M10 36 Q30 54 50 36 Q30 42 10 36Z" className="fill-gold" />
      <path d="M10 36 Q30 42 50 36" className="fill-none stroke-[#8f6c36]" strokeWidth="1" />
    </svg>
  )
}

export function MandalaDivider({ caption }: { caption?: string }) {
  return (
    <Reveal className="flex flex-col items-center py-10">
      <div className="relative size-40">
        <Mandala />
        <div className="absolute inset-0 m-auto size-14">
          <Diya />
        </div>
      </div>
      {caption && (
        <p className="mt-4 max-w-xs px-6 text-center text-lg text-muted-foreground italic">{caption}</p>
      )}
    </Reveal>
  )
}
