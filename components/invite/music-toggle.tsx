'use client'

import { Music, VolumeX } from 'lucide-react'

export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex size-12 items-center justify-center rounded-full border border-primary/20 bg-card/90 text-primary shadow-lg shadow-primary/20 backdrop-blur transition-transform active:scale-90"
    >
      {playing ? (
        <Music className="size-5 animate-[spin_6s_linear_infinite]" aria-hidden="true" />
      ) : (
        <VolumeX className="size-5" aria-hidden="true" />
      )}
    </button>
  )
}
