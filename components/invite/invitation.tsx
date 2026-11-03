'use client'

import { useRef, useState } from 'react'
import { IndianMusic } from '@/lib/indian-music'
import { EnvelopeIntro } from './envelope-intro'
import { FallingPetals } from './falling-petals'
import { MusicToggle } from './music-toggle'
import { Hero } from './hero'
import { InvitationMessage } from './invitation-message'
import { Countdown } from './countdown'
import { EventDetails } from './event-details'
import { Closing } from './closing'
import { MandalaDivider } from './mandala-divider'
import { SevenVows } from './seven-vows'

export function Invitation() {
  const [opened, setOpened] = useState(false)
  const [playing, setPlaying] = useState(false)
  const musicRef = useRef<IndianMusic | null>(null)

  const getMusic = () => {
    if (!musicRef.current) musicRef.current = new IndianMusic()
    return musicRef.current
  }

  const handleOpen = async () => {
    setOpened(true)
    try {
      await getMusic().start()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  const toggleMusic = async () => {
    const music = getMusic()
    if (playing) {
      setPlaying(false)
      await music.stop()
    } else {
      setPlaying(true)
      await music.start()
    }
  }

  return (
    <>
      <EnvelopeIntro opened={opened} onOpen={handleOpen} />
      <FallingPetals />
      <main
        className="relative mx-auto min-h-dvh w-full max-w-md overflow-x-hidden bg-background shadow-[0_0_60px_rgba(194,85,122,0.08)]"
        aria-hidden={!opened}
      >
        <Hero />
        <InvitationMessage />
        <MandalaDivider caption="Two hearts, one sacred flame" />
        <SevenVows />
        <EventDetails />
        <MandalaDivider />
        <Countdown />
        <Closing />
      </main>
      {opened && <MusicToggle playing={playing} onToggle={toggleMusic} />}
    </>
  )
}
