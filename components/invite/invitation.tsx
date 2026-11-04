'use client'

import { useRef, useState, useEffect } from 'react'
import { EnvelopeIntro } from './envelope-intro'
import { FallingPetals } from './falling-petals'
import { MusicToggle } from './music-toggle'
import { Hero } from './hero'
import { InvitationMessage } from './invitation-message'
import { EventDetails } from './event-details'
import { Closing } from './closing'
import { MandalaDivider } from './mandala-divider'
import { SevenVows } from './seven-vows'
import { ScratchCard } from './scratch-card'
import { Reveal } from './reveal'

export function Invitation() {
  const [opened, setOpened] = useState(false)
  const [playing, setPlaying] = useState(false)
  const musicRef = useRef<HTMLAudioElement | null>(null)

  // Initialize the audio object
  const getMusic = () => {
    if (!musicRef.current) {
      // Points to the file in your public folder (public/song.mp3)
      musicRef.current = new Audio('/song.mp3')
      musicRef.current.loop = true // Loops the song automatically
    }
    return musicRef.current
  }

  const handleOpen = async () => {
    setOpened(true)
    try {
      const music = getMusic()
      await music.play()
      setPlaying(true)
    } catch {
      // Browsers sometimes block autoplay; handle gracefully
      setPlaying(false)
    }
  }

  const toggleMusic = () => {
    const music = getMusic()
    if (playing) {
      music.pause()
      setPlaying(false)
    } else {
      music.play()
      setPlaying(true)
    }
  }

  // Cleanup music when component unmounts
  useEffect(() => {
    return () => {
      if (musicRef.current) {
        musicRef.current.pause()
        musicRef.current.currentTime = 0
      }
    }
  }, [])

  return (
    <>
      <EnvelopeIntro opened={opened} onOpen={handleOpen} />
      <FallingPetals />
      <main
        className="relative mx-auto min-h-dvh w-full max-w-md overflow-x-hidden bg-background shadow-[0_0_60px_rgba(194,85,122,0.08)] floral-frame"
        aria-hidden={!opened}
      >
        <Hero />
        <InvitationMessage />
        <MandalaDivider caption="Two hearts, one sacred flame" />
        <Reveal>
          <p className="px-6 pt-6 text-center text-sm tracking-[0.35em] text-gold uppercase">Save the date</p>
        </Reveal>
        <div className="px-6 pt-2 pb-2">
          <ScratchCard>
            <div className="flex flex-col items-center px-6 py-8">
              <p className="text-lg tracking-[0.3em] text-muted-foreground uppercase">Thursday</p>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-xl tracking-widest text-gold uppercase">Jan</span>
                <span className="border-x border-blush px-4 font-serif text-7xl leading-none font-semibold text-primary">
                  28
                </span>
                <span className="text-xl tracking-widest text-gold">2027</span>
              </div>
              <p className="mt-3 text-lg tracking-[0.2em] text-foreground">8:00 PM</p>
            </div>
          </ScratchCard>
        </div>
        <SevenVows />
        <EventDetails />
        <MandalaDivider />
        <Closing />
      </main>
      {opened && <MusicToggle playing={playing} onToggle={toggleMusic} />}
    </>
  )
}