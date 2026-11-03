const STRANDS = [5, 7, 4, 8, 5, 9, 5, 8, 4, 7, 5]

export function Toran() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden" aria-hidden="true">
      <div className="h-2 bg-gradient-to-r from-gold/70 via-primary/60 to-gold/70" />
      <div className="flex justify-between px-2">
        {STRANDS.map((beads, i) => (
          <div
            key={i}
            className="toran-swing flex flex-col items-center"
            style={{ animationDelay: `${(i % 4) * 0.35}s` }}
          >
            {Array.from({ length: beads }, (_, b) => (
              <span
                key={b}
                className={`-mt-0.5 size-3.5 rounded-full shadow-sm ${
                  b % 2 === 0 ? 'bg-[#f2a93b]' : 'bg-[#e9739a]'
                }`}
              />
            ))}
            <span className="mt-0.5 size-2 rotate-45 bg-gold" />
          </div>
        ))}
      </div>
    </div>
  )
}
