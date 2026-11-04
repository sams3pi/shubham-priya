import Image from 'next/image'

export function CouplePhotoBackdrop({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -left-4 top-6 w-28 opacity-20 sm:w-32">
        <Image
          src="/images/couple.png"
          alt=""
          width={260}
          height={420}
          sizes="(max-width: 430px) 112px, 128px"
          className="h-auto w-full rounded-[1.5rem] border border-white/60 bg-white/20 object-cover shadow-[0_10px_30px_rgba(194,85,122,0.08)] mix-blend-multiply"
        />
      </div>
      <div className="absolute -right-3 bottom-8 w-24 opacity-18 sm:w-28">
        <Image
          src="/images/couple.png"
          alt=""
          width={220}
          height={360}
          sizes="(max-width: 430px) 96px, 112px"
          className="h-auto w-full rounded-[1.4rem] border border-white/60 bg-white/20 object-cover shadow-[0_10px_30px_rgba(194,85,122,0.08)] mix-blend-multiply"
        />
      </div>
    </div>
  )
}
