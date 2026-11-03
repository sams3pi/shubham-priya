import Image from 'next/image'
import { Reveal } from './reveal'
import { Ornament } from './ornament'

export function InvitationMessage() {
  return (
    <section id="invitation" className="relative px-6 py-16 text-center">
      <Reveal>
        <p className="text-xs tracking-[0.35em] text-gold uppercase">With the blessings of the Almighty</p>
        <p className="mx-auto mt-6 max-w-xs text-lg leading-relaxed text-foreground">
          and our beloved elders, together with our families, we joyfully invite you to celebrate the
          sacred union of
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-10">
        <div className="relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-t-full border-4 border-white bg-card shadow-xl shadow-primary/15 ring-1 ring-blush">
          <Image
            src="/images/couple.png"
            alt="Watercolor illustration of the bride and groom under a floral mandap beside the sacred fire"
            width={768}
            height={1376}
            className="h-auto w-full"
            sizes="(max-width: 448px) 90vw, 352px"
          />
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-10">
        <h2 className="font-script text-5xl text-primary">Shubham</h2>
        <p className="my-1 text-sm tracking-[0.3em] text-gold uppercase">weds</p>
        <h2 className="font-script text-5xl text-primary">Priye</h2>
      </Reveal>

      <Reveal delay={250} className="mt-10">
        <Ornament />
        <p className="mx-auto mt-6 max-w-xs text-base leading-relaxed text-muted-foreground italic">
          As two souls take the seven sacred vows around the holy fire, we would be honoured to have
          you by our side to shower your love and blessings.
        </p>
      </Reveal>
    </section>
  )
}
