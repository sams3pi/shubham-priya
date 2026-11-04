'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { Music } from 'lucide-react'

const BURST = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2
  const distance = 140 + ((i * 47) % 120)
  return {
    tx: `${Math.cos(angle) * distance}px`,
    ty: `${Math.sin(angle) * distance - 60}px`,
    spin: `${(i % 2 ? 1 : -1) * (180 + i * 20)}deg`,
    size: 10 + (i % 4) * 3,
    delay: `${300 + (i % 5) * 60}ms`,
    color: ['#f4b6c8', '#f9d3de', '#e8cf9a', '#fde4ea'][i % 4],
  }
})

function DoorArt() {
  return (
    <>
      <div className="absolute inset-x-0 top-0">
        <Image
          src="/images/floral-top.png"
          alt=""
          width={1408}
          height={768}
          priority
          className="fade-bottom h-auto w-[160%] max-w-none -translate-x-[18.75%] mix-blend-multiply"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 rotate-180">
        <Image
          src="/images/floral-top.png"
          alt=""
          width={1408}
          height={768}
          className="fade-bottom h-auto w-[160%] max-w-none -translate-x-[18.75%] opacity-80 mix-blend-multiply"
        />
      </div>
      <div className="absolute inset-3 rounded-[2rem] border border-gold/40" />
      <div className="absolute inset-5 rounded-[1.6rem] border border-blush" />
    </>
  )
}

export function EnvelopeIntro({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    if (!opened) return
    const id = setTimeout(() => setGone(true), 2600)
    return () => {
      clearTimeout(id)
      document.body.style.overflow = ''
    }
  }, [opened])

  useEffect(() => {
    if (opened) return
    const id = window.setTimeout(() => {
      onOpen()
    }, 10000)

    return () => window.clearTimeout(id)
  }, [opened, onOpen])

  if (gone) return null

  const doorBase =
    'absolute inset-y-0 w-1/2 overflow-hidden bg-background transition-transform duration-[1600ms] ease-[cubic-bezier(0.65,0,0.25,1)] [backface-visibility:hidden] delay-300'

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity delay-[1700ms] duration-700 [perspective:1400px] ${
        opened ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal={!opened}
      aria-label="Wedding invitation cover"
    >
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,#fde4ea_0%,#fbf9f5_70%)] transition-opacity duration-700 ${
          opened ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      <div
        className={`${doorBase} left-0 origin-left ${opened ? '[transform:rotateY(-110deg)]' : ''}`}
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 left-0 w-[200%]">
          <DoorArt />
        </div>
      </div>

      <div
        className={`${doorBase} right-0 origin-right ${opened ? '[transform:rotateY(110deg)]' : ''}`}
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 right-0 w-[200%]">
          <DoorArt />
        </div>
      </div>

      <div
        className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent transition-opacity duration-300 ${
          opened ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-500 ${
          opened ? 'scale-90 opacity-0 blur-sm' : 'scale-100 opacity-100'
        }`}
      >
        <p className="text-sm tracking-[0.35em] text-muted-foreground uppercase">You are invited</p>
        <p className="mt-2 text-xs tracking-[0.25em] text-gold uppercase">to the wedding of</p>

        <h1 className="mt-6 font-script text-7xl leading-tight text-primary">
          Priya
          <span className="heartbeat block py-1 font-serif text-4xl text-gold italic">&amp;</span>
          Shubham
        </h1>

        <p className="font-devanagari mt-5 text-2xl text-gold" lang="hi">
          {'शुभ विवाह'}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="seal-pulse relative mt-10 flex size-28 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 ring-4 ring-white transition-transform active:scale-90"
        >
          <span className="absolute inset-2 rounded-full border border-dashed border-white/60" aria-hidden="true" />
          <span className="font-script text-3xl leading-none">P &amp; S</span>
          <span className="mt-1 text-[11px] tracking-[0.25em] uppercase">Tap to open</span>
        </button>

        <p className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Music className="size-3.5" aria-hidden="true" />
          Best experienced with sound on
        </p>
      </div>

      {opened && (
        <div className="pointer-events-none absolute top-1/2 left-1/2" aria-hidden="true">
          {BURST.map((p, i) => (
            <span
              key={i}
              className="petal-burst absolute block"
              style={
                {
                  width: p.size,
                  height: p.size * 1.3,
                  backgroundColor: p.color,
                  borderRadius: '150% 0 150% 0',
                  '--tx': p.tx,
                  '--ty': p.ty,
                  '--spin': p.spin,
                  animationDelay: p.delay,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}
