'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Music } from 'lucide-react'

export function EnvelopeIntro({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [opened])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background px-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
        opened ? 'pointer-events-none -translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      role="dialog"
      aria-modal={!opened}
      aria-label="Wedding invitation cover"
    >
      <div className="absolute inset-x-0 top-0">
        <Image
          src="/images/floral-top.png"
          alt=""
          width={1408}
          height={768}
          priority
          className="h-auto w-[160%] max-w-none -translate-x-[18.75%] mix-blend-multiply fade-bottom"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 rotate-180">
        <Image
          src="/images/floral-top.png"
          alt=""
          width={1408}
          height={768}
          className="h-auto w-[160%] max-w-none -translate-x-[18.75%] opacity-80 mix-blend-multiply fade-bottom"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-sm tracking-[0.35em] text-muted-foreground uppercase">You are invited</p>
        <p className="mt-2 text-xs tracking-[0.25em] text-gold uppercase">to the wedding of</p>

        <h1 className="mt-6 font-script text-7xl leading-tight text-primary">
          Priya
          <span className="heartbeat block py-1 font-serif text-4xl text-gold italic">&amp;</span>
          Shubham
        </h1>

        <p className="mt-6 text-lg tracking-[0.2em] text-foreground">28 · 01 · 2027</p>

        <button
          type="button"
          onClick={onOpen}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary px-8 py-3.5 text-base tracking-wider text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95"
        >
          Open Invitation
        </button>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Music className="size-3.5" aria-hidden="true" />
          Best experienced with sound on
        </p>
      </div>
    </div>
  )
}
