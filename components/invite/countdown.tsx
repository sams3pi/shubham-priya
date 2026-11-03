'use client'

import { useEffect, useState } from 'react'
import { Reveal } from './reveal'

const WEDDING_TIME = new Date('2027-01-28T20:00:00+05:30').getTime()

function getRemaining() {
  const diff = Math.max(0, WEDDING_TIME - Date.now())
  return {
    Days: Math.floor(diff / 86_400_000),
    Hours: Math.floor((diff / 3_600_000) % 24),
    Minutes: Math.floor((diff / 60_000) % 60),
    Seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null)

  useEffect(() => {
    setRemaining(getRemaining())
    const id = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="px-6 py-16 text-center">
      <Reveal>
        <p className="text-xs tracking-[0.35em] text-gold uppercase">Counting down to forever</p>
        <h2 className="mt-3 font-script text-5xl text-primary">The Big Day</h2>
      </Reveal>

      <Reveal delay={150} className="mt-8">
        <div className="grid grid-cols-4 gap-2" role="timer" aria-live="off">
          {(['Days', 'Hours', 'Minutes', 'Seconds'] as const).map((unit) => (
            <div
              key={unit}
              className="flex flex-col items-center rounded-2xl border border-border bg-card py-4 shadow-sm"
            >
              <span className="text-3xl font-medium text-primary tabular-nums">
                {remaining ? String(remaining[unit]).padStart(2, '0') : '--'}
              </span>
              <span className="mt-1 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
