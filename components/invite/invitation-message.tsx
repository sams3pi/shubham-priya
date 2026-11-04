import Image from 'next/image'
import { Reveal } from './reveal'
import { Ornament } from './ornament'

export function InvitationMessage() {
  return (
    <section id="invitation" className="relative px-6 py-16 text-center">
      <Reveal>
        <p className="text-sm tracking-[0.35em] text-gold uppercase">With the blessings of the Almighty</p>
        <p className="mx-auto mt-6 max-w-xs text-xl leading-relaxed text-foreground">
          and our beloved elders, together with our families, we joyfully invite you to celebrate the
          sacred union of
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-10">
        <div className="relative mx-auto w-full max-w-[22rem]">
          <div className="absolute -left-3 top-8 h-20 w-20 rounded-[1.5rem] border border-white/60 bg-white/40 p-1 shadow-[0_12px_30px_rgba(194,85,122,0.12)] backdrop-blur-[1px]" aria-hidden="true">
            <div className="h-full w-full overflow-hidden rounded-[1.2rem] bg-gradient-to-b from-[#fffafc] to-[#f7dfe7]">
              <Image
                src="/images/couple.png"
                alt=""
                width={300}
                height={420}
                className="h-full w-full object-cover opacity-35 grayscale-[0.15]"
              />
            </div>
          </div>
          <div className="absolute -right-2 bottom-8 h-16 w-16 rounded-[1.2rem] border border-white/60 bg-white/30 p-1 shadow-[0_10px_20px_rgba(194,85,122,0.08)] backdrop-blur-[1px]" aria-hidden="true">
            <div className="h-full w-full overflow-hidden rounded-[1rem] bg-gradient-to-b from-[#fffafc] to-[#f7dfe7]">
              <Image
                src="/images/couple.png"
                alt=""
                width={220}
                height={320}
                className="h-full w-full object-cover opacity-30 grayscale-[0.1]"
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2.25rem] border-4 border-white bg-gradient-to-b from-white via-[#fffafc] to-[#f9eef3] p-2 shadow-[0_16px_52px_rgba(194,85,122,0.14)] ring-1 ring-blush">
            <div className="absolute inset-x-6 top-0 h-20 rounded-b-[2rem] bg-gradient-to-b from-white/80 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-[#f8dfe8]/70 to-transparent" aria-hidden="true" />
            <Image
              src="/images/couple.png"
              alt="Watercolor illustration of the bride and groom under a floral mandap beside the sacred fire"
              width={768}
              height={1376}
              className="relative h-auto w-full rounded-[1.75rem] object-cover"
              sizes="(max-width: 448px) 90vw, 352px"
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-10">
        <h2 className="font-script text-6xl text-primary">Priya</h2>
        <p className="my-1 text-base tracking-[0.3em] text-gold uppercase">weds</p>
        <h2 className="font-script text-6xl text-primary">Shubham</h2>
      </Reveal>

      <Reveal delay={250} className="mt-10">
        <Ornament />
        <p className="mx-auto mt-6 max-w-xs text-base leading-relaxed text-muted-foreground italic">
          As two souls take the seven sacred vows around the holy fire, we would be honoured to have
          you by our side to shower your love and blessings.
        </p>
      </Reveal>

      {/* Couple Photo Backdrop for Mobile */}
      <div className="absolute inset-0 -z-10 hidden overflow-hidden rounded-[2rem] lg:block">
        <Image
          src="/images/couple.png"
          alt="Watercolor illustration of the bride and groom under a floral mandap beside the sacred fire"
          width={768}
          height={1376}
          className="absolute -top-24 -right-24 max-w-none rotate-[30deg] rounded-[2rem] opacity-10"
        />
      </div>
    </section>
  )
}
