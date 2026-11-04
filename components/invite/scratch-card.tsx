'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

const BRUSH = 26
const REVEAL_AT = 0.5

function paintCover(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const { width, height } = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.scale(dpr, dpr)

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#e8a0b8')
  gradient.addColorStop(0.45, '#f6d0dc')
  gradient.addColorStop(0.55, '#f9dce5')
  gradient.addColorStop(1, '#d97d9c')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  for (let i = 0; i < 70; i++) {
    const x = (i * 97) % width
    const y = (i * 53) % height
    ctx.beginPath()
    ctx.arc(x, y, (i % 3) + 0.8, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.7)'
  ctx.lineWidth = 1.5
  ctx.setLineDash([4, 5])
  ctx.strokeRect(10, 10, width - 20, height - 20)
  ctx.setLineDash([])

  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '600 13px "Cormorant Garamond", Georgia, serif'
  ctx.fillText('S C R A T C H   T O   R E V E A L', width / 2, height / 2 + 30)
  ctx.font = '46px "Great Vibes", cursive'
  ctx.fillText('The Date', width / 2, height / 2 - 8)
}

export function ScratchCard({ children }: { children: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const last = useRef<{ x: number; y: number } | null>(null)
  const moves = useRef(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    document.fonts?.ready.then(() => paintCover(canvas))
    paintCover(canvas)
  }, [])

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let cleared = 0
    let sampled = 0
    for (let i = 3; i < data.length; i += 64) {
      sampled++
      if (data[i] === 0) cleared++
    }
    if (cleared / sampled > REVEAL_AT) {
      setRevealed(true)
      navigator.vibrate?.([30, 40, 60])
    }
  }, [])

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = BRUSH * 2
    ctx.beginPath()
    ctx.moveTo(last.current?.x ?? x, last.current?.y ?? y)
    ctx.lineTo(x, y)
    ctx.stroke()
    last.current = { x, y }
    if (++moves.current % 12 === 0) checkProgress()
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border-4 border-white bg-card shadow-lg ring-1 ring-blush">
      <div className={`transition-transform duration-700 ${revealed ? 'scale-100' : 'scale-95'}`}>{children}</div>

      {revealed && (
        <Sparkles
          className="sparkle-pop absolute top-4 right-4 size-6 text-gold"
          aria-hidden="true"
        />
      )}

      <canvas
        ref={canvasRef}
        aria-label="Scratch card covering the wedding date. Swipe to reveal."
        role="img"
        className={`absolute inset-0 size-full touch-none transition-opacity duration-700 ${
          revealed ? 'pointer-events-none opacity-0' : 'cursor-grab opacity-100'
        }`}
        onPointerDown={(e) => {
          drawing.current = true
          last.current = null
          e.currentTarget.setPointerCapture(e.pointerId)
          scratchAt(e.clientX, e.clientY)
        }}
        onPointerMove={(e) => drawing.current && scratchAt(e.clientX, e.clientY)}
        onPointerUp={() => {
          drawing.current = false
          last.current = null
          checkProgress()
        }}
        onPointerCancel={() => {
          drawing.current = false
          last.current = null
        }}
      />
    </div>
  )
}
