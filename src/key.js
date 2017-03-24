import Beep from 'beep'
import $ from 'jquery'

export default class Key {
  constructor(keyCode, noteInfo, audioContext, $parentEl) {
    this.keyCode = keyCode
    this.name = noteInfo.name
    this.$el = $(`<h1 class="key">${this.name}</h1>`)
    this.$parentEl = $parentEl
    this.beep = new Beep(audioContext, noteInfo.frequency)
    this.pressed = false
  }

  activate(event) {
    if (event.keyCode === this.keyCode && !this.pressed) {
      this.pressed = true
      this.beep.play()
      this.$el.addClass('active')
    }
  }
  deactivate(event) {
    if (event.keyCode === this.keyCode) {
      this.pressed = false
      this.$el.removeClass('active')
    }
  }

  render() {
    $(window).on('keydown', this.activate.bind(this))
    $(window).on('keyup', this.deactivate.bind(this))
    $(this.$parentEl).append(this.$el)
  }
}
