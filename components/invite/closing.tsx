import Image from 'next/image'
import { Reveal } from './reveal'
import { Ornament } from './ornament'

export function Closing() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-48 text-center">
      <Reveal>
        <Ornament />
        <p className="mx-auto mt-8 max-w-xs text-xl leading-relaxed text-foreground">
          Your presence and blessings will make our celebration complete.
        </p>
        <p className="mt-8 text-xs tracking-[0.35em] text-gold uppercase">With love</p>
        <p className="mt-3 font-script text-5xl text-primary">Shubham &amp; Priye</p>
        <p className="mt-6 text-base text-muted-foreground italic">and families</p>
      </Reveal>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 rotate-180" aria-hidden="true">
        <Image
          src="/images/floral-top.png"
          alt=""
          width={1408}
          height={768}
          className="h-auto w-[150%] max-w-none -translate-x-[16.6%] mix-blend-multiply fade-bottom"
        />
      </div>
    </section>
  )
}
