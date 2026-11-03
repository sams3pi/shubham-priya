// Generative soft Indian-style music: a tanpura drone with a gentle
// santoor-like melody in Raag Bhupali (Sa Re Ga Pa Dha), synthesized with
// the Web Audio API so no audio file is needed.

const SA = 146.83 // D3

const RATIOS = {
  pa_low: 3 / 4,
  sa: 1,
  re: 9 / 8,
  ga: 5 / 4,
  pa: 3 / 2,
  dha: 5 / 3,
  sa_hi: 2,
  re_hi: 9 / 4,
  ga_hi: 5 / 2,
}

const MELODY_SCALE = [
  RATIOS.sa,
  RATIOS.re,
  RATIOS.ga,
  RATIOS.pa,
  RATIOS.dha,
  RATIOS.sa_hi,
  RATIOS.re_hi,
  RATIOS.ga_hi,
]

export class IndianMusic {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private reverb: ConvolverNode | null = null
  private timer: ReturnType<typeof setInterval> | null = null
  private nextDroneTime = 0
  private droneStep = 0
  private nextMelodyTime = 0
  private melodyIndex = 2
  private phraseRemaining = 0

  get isRunning() {
    return this.ctx?.state === 'running' && this.timer !== null
  }

  async start() {
    if (!this.ctx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new Ctx()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0
      this.reverb = this.ctx.createConvolver()
      this.reverb.buffer = this.createImpulse(3.5)
      const reverbGain = this.ctx.createGain()
      reverbGain.gain.value = 0.55
      this.reverb.connect(reverbGain).connect(this.master)
      this.master.connect(this.ctx.destination)
    }

    if (this.ctx.state === 'suspended') await this.ctx.resume()

    const now = this.ctx.currentTime
    this.master!.gain.cancelScheduledValues(now)
    this.master!.gain.setValueAtTime(this.master!.gain.value, now)
    this.master!.gain.linearRampToValueAtTime(0.32, now + 3)

    this.nextDroneTime = now + 0.1
    this.nextMelodyTime = now + 2.5
    if (this.timer) clearInterval(this.timer)
    this.timer = setInterval(() => this.schedule(), 100)
  }

  async stop() {
    if (!this.ctx || !this.master) return
    const now = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(0, now + 0.8)
    if (this.timer) clearInterval(this.timer)
    this.timer = null
    await new Promise((r) => setTimeout(r, 850))
    if (!this.timer) await this.ctx.suspend()
  }

  private schedule() {
    if (!this.ctx) return
    const horizon = this.ctx.currentTime + 0.4

    while (this.nextDroneTime < horizon) {
      const pattern = [RATIOS.pa_low, RATIOS.sa, RATIOS.sa, RATIOS.sa / 2]
      const ratio = pattern[this.droneStep % pattern.length]
      this.playTanpura(SA * ratio, this.nextDroneTime)
      this.droneStep++
      this.nextDroneTime += this.droneStep % 4 === 0 ? 1.6 : 1.1
    }

    while (this.nextMelodyTime < horizon) {
      this.playMelodyNote(this.nextMelodyTime)
    }
  }

  private playMelodyNote(time: number) {
    if (this.phraseRemaining <= 0) {
      this.phraseRemaining = 4 + Math.floor(Math.random() * 5)
      this.nextMelodyTime = time + 1.5 + Math.random() * 1.5
      return
    }

    const step = [-2, -1, -1, 1, 1, 2, 0][Math.floor(Math.random() * 7)]
    this.melodyIndex = Math.min(MELODY_SCALE.length - 1, Math.max(0, this.melodyIndex + step))
    const freq = SA * 2 * MELODY_SCALE[this.melodyIndex]

    this.playSantoor(freq, time, 0.11)
    if (Math.random() < 0.25) this.playSantoor(freq, time + 0.12, 0.06)

    this.phraseRemaining--
    const durations = [0.45, 0.6, 0.6, 0.9, 1.2]
    this.nextMelodyTime = time + durations[Math.floor(Math.random() * durations.length)]
  }

  private playTanpura(freq: number, time: number) {
    const ctx = this.ctx!
    const out = ctx.createGain()
    out.gain.setValueAtTime(0, time)
    out.gain.linearRampToValueAtTime(0.09, time + 0.05)
    out.gain.exponentialRampToValueAtTime(0.0008, time + 4.5)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2200, time)
    filter.frequency.exponentialRampToValueAtTime(500, time + 3.5)
    filter.Q.value = 3

    for (const detune of [-4, 0, 5]) {
      const osc = ctx.createOscillator()
      osc.type = 'sawtooth'
      osc.frequency.value = freq
      osc.detune.value = detune
      osc.connect(filter)
      osc.start(time)
      osc.stop(time + 4.6)
    }

    filter.connect(out)
    out.connect(this.master!)
    out.connect(this.reverb!)
  }

  private playSantoor(freq: number, time: number, level: number) {
    const ctx = this.ctx!
    const out = ctx.createGain()
    out.gain.setValueAtTime(0, time)
    out.gain.linearRampToValueAtTime(level, time + 0.005)
    out.gain.exponentialRampToValueAtTime(0.0005, time + 2.2)

    const partials: [number, number][] = [
      [1, 1],
      [2, 0.35],
      [3, 0.12],
      [4.2, 0.05],
    ]
    for (const [mult, amp] of partials) {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq * mult
      g.gain.setValueAtTime(amp, time)
      g.gain.exponentialRampToValueAtTime(0.001, time + 2.2 / mult)
      osc.connect(g).connect(out)
      osc.start(time)
      osc.stop(time + 2.3)
    }

    out.connect(this.master!)
    out.connect(this.reverb!)
  }

  private createImpulse(seconds: number) {
    const ctx = this.ctx!
    const length = ctx.sampleRate * seconds
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate)
    for (let c = 0; c < 2; c++) {
      const data = impulse.getChannelData(c)
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5)
      }
    }
    return impulse
  }
}
