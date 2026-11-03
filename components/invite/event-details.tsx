import { CalendarHeart, Clock, MapPin, Navigation, CalendarPlus } from 'lucide-react'
import { Reveal } from './reveal'
import { Toran } from './toran'

const VENUE = 'Ranchi Haveli Banquet Hall, Ring Road, Kanke, Ranchi'
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(VENUE)}&output=embed`
const CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  'Wedding of Priya & Shubham',
)}&dates=20270128T143000Z/20270128T183000Z&location=${encodeURIComponent(VENUE)}&details=${encodeURIComponent(
  'Join us to celebrate the wedding of Priya & Shubham.',
)}`

const DETAILS = [
  { icon: CalendarHeart, label: 'Date', value: 'Thursday, 28th January 2027' },
  { icon: Clock, label: 'Time', value: '8:00 PM onwards' },
  { icon: MapPin, label: 'Venue', value: 'Ranchi Haveli Banquet Hall', sub: 'Ring Road, Kanke, Ranchi' },
]

export function EventDetails() {
  return (
    <section className="relative bg-secondary/60 px-6 pt-36 pb-16 text-center">
      <Toran />
      <Reveal>
        <p className="text-sm tracking-[0.35em] text-gold uppercase">Save the date</p>
        <h2 className="mt-3 font-script text-6xl text-primary">Shubh Vivah</h2>
      </Reveal>

      <Reveal delay={150} className="mt-10">
        <ul className="flex flex-col gap-4">
          {DETAILS.map(({ icon: Icon, label, value, sub }) => (
            <li
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 text-left shadow-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm tracking-[0.25em] text-gold uppercase">{label}</p>
                <p className="text-xl leading-snug font-medium text-foreground">{value}</p>
                {sub && <p className="text-lg text-muted-foreground">{sub}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={250} className="mt-8">
        <div className="overflow-hidden rounded-2xl border-4 border-white shadow-md ring-1 ring-blush">
          <iframe
            src={MAP_EMBED}
            title="Map showing Ranchi Haveli Banquet Hall"
            className="h-56 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3.5 text-base text-primary-foreground shadow-md shadow-primary/25 transition-transform active:scale-95"
          >
            <Navigation className="size-4" aria-hidden="true" />
            Directions
          </a>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-3.5 text-base text-primary transition-transform active:scale-95"
          >
            <CalendarPlus className="size-4" aria-hidden="true" />
            Add to Calendar
          </a>
        </div>
      </Reveal>
    </section>
  )
}
