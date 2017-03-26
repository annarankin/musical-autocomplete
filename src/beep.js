import { globalAnalyser } from './main'

export default class Beep {
  constructor(context, frequency) {
    this.context = context
    this.frequency = frequency
    this.generateOscillator()
  }

  generateOscillator() {
    var o = this.context.createOscillator()
    var g = this.context.createGain()

    o.frequency.value = this.frequency
    o.connect(g)
    g.connect(globalAnalyser)
    g.connect(this.context.destination)

    this.oscillator = o
    this.gain = g

    o.start()
    this.stop()
  }

  play() {
    this.start()
    this.stop()
  }

  start() {
    this.gain.gain.exponentialRampToValueAtTime(
      1, this.context.currentTime + 1
    )
  }

  stop() {
    this.gain.gain.exponentialRampToValueAtTime(
      0.00001, this.context.currentTime + 1
    )
  }
}
