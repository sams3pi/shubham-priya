import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Reveal } from './reveal'
import { Ornament } from './ornament'

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col items-center px-6 pt-6 pb-16 text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0" aria-hidden="true">
        <Image
          src="/images/floral-top.png"
          alt=""
          width={1408}
          height={768}
          priority
          className="fade-bottom h-auto w-[150%] max-w-none -translate-x-[16.6%] mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 mt-36 flex flex-col items-center">
        <Reveal>
          <div className="soft-float fade-radial mx-auto size-36 overflow-hidden">
            <Image
              src="/images/ganesha.png"
              alt="Lord Ganesha"
              width={1408}
              height={768}
              className="size-full scale-[1.9] object-cover mix-blend-multiply"
            />
          </div>
          <p className="font-devanagari mt-2 text-xl text-gold" lang="hi">
            {'॥ श्री गणेशाय नमः ॥'}
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-8">
          <p className="px-4 text-base leading-relaxed text-muted-foreground italic">
            {'"Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarva Karyeshu Sarvada"'}
          </p>
        </Reveal>

        <Reveal delay={300} className="mt-10">
          <p className="text-sm tracking-[0.35em] text-gold uppercase">The wedding of</p>
          <h2 className="mt-4 font-script text-8xl leading-none text-primary">Priya</h2>
          <p className="gold-shimmer heartbeat my-2 font-serif text-5xl italic">&amp;</p>
          <h2 className="font-script text-8xl leading-none text-primary">Shubham</h2>
        </Reveal>

        <Reveal delay={450} className="mt-10">
          <Ornament />
          <p className="mx-auto mt-4 max-w-xs text-2xl leading-snug text-foreground italic">
            request the pleasure of your company
          </p>
          <p className="mt-3 text-sm tracking-[0.3em] text-gold uppercase">Ranchi </p>
        </Reveal>
      </div>

      <a
        href="#invitation"
        className="relative z-10 mt-auto flex flex-col items-center gap-1 pt-12 text-xs tracking-[0.25em] text-muted-foreground uppercase"
      >
        Scroll
        <ChevronDown className="size-5 animate-bounce text-primary" aria-hidden="true" />
      </a>
    </section>
  )
}
