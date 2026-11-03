import { Reveal } from './reveal'

const VOWS = [
  { title: 'Nourishment', text: 'To provide for and nourish each other, always.' },
  { title: 'Strength', text: 'To grow together in strength of body, mind and spirit.' },
  { title: 'Prosperity', text: 'To build a life of honest prosperity, side by side.' },
  { title: 'Happiness', text: 'To share every joy and every sorrow as one.' },
  { title: 'Family', text: 'To love, honour and care for both our families.' },
  { title: 'Harmony', text: 'To walk through every season of life in harmony.' },
  { title: 'Friendship', text: 'To remain lifelong companions and best friends.' },
]

export function SevenVows() {
  return (
    <section className="relative px-6 py-16 text-center" aria-labelledby="vows-title">
      <Reveal>
        <p className="text-sm tracking-[0.35em] text-gold uppercase">Saat Phere</p>
        <h2 id="vows-title" className="mt-3 font-script text-5xl text-primary">
          Seven Sacred Vows
        </h2>
        <p className="font-devanagari mt-3 text-lg text-gold" lang="hi">
          {'सात फेरे, सात वचन'}
        </p>
      </Reveal>

      <ol className="relative mx-auto mt-10 flex max-w-sm flex-col gap-5 text-left">
        <span
          className="absolute top-6 bottom-6 left-6 w-px bg-gradient-to-b from-blush via-primary/40 to-blush"
          aria-hidden="true"
        />
        {VOWS.map((vow, i) => (
          <Reveal key={vow.title} delay={i * 80}>
            <li className="relative flex items-center gap-4">
              <span
                className="vow-pulse relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-primary font-serif text-xl text-primary-foreground shadow-md shadow-primary/30"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
                <p className="text-lg font-semibold text-primary">{vow.title}</p>
                <p className="text-base leading-snug text-muted-foreground">{vow.text}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
