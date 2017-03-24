import Beep from './beep'
import { byCharName } from './helpers'

export default class Result {
  constructor({ text, audioContext, id }) {
    this.chars = text.split('')
    this.$el = $(`<li data-id="${id}">${text}</li>`)
    this.beep = new Beep(audioContext, 440)
    this.timeouts = []
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
  }

  play() {
    this.$el.addClass('active')
    this.chars.forEach((char, i) => {
      const frequency = byCharName[char] || 440
      const id = setTimeout(() => this.beep.play({ frequency }), i * 200)
      this.timeouts.push(id)
    })
  }

  stop() {
    this.$el.removeClass('active')

    this.timeouts.forEach(id => clearTimeout(id))
    this.timeouts = []
  }

  render() {
    return this.$el
  }
}
