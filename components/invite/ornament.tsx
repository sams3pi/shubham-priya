export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/70" />
      <svg viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M12 2c1.2 3.2 3.3 5.3 6.5 6.5-3.2 1.2-5.3 3.3-6.5 6.5-1.2-3.2-3.3-5.3-6.5-6.5C8.7 7.3 10.8 5.2 12 2zm0 14c.6 1.6 1.6 2.6 3.2 3.2-1.6.6-2.6 1.6-3.2 3.2-.6-1.6-1.6-2.6-3.2-3.2 1.6-.6 2.6-1.6 3.2-3.2z" />
      </svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  )
}
