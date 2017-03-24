import Result from './result'

export default class ResultList {
  constructor() {
    this.$el = $('<ul class="result-list">')
    this.results = []
    this.audioContext = new AudioContext()
    this.setEventListeners()
  }

  setResults(results) {
    console.log('ahhh')
    this.results = results.map((text, i) => new Result({ text, audioContext: this.audioContext, id: i }))
    this.render()
  }

  setEventListeners() {
    this.$el.on('click', this.playResult.bind(this))
  }

  clear() {
    this.$el.empty()
  }

  playResult(event) {
    const id = $(event.target).data('id')
    const activeResult = this.results[id]
    this.results.forEach(result => result.stop())
    activeResult.play()
  }

  render() {
    this.clear()

    this.results.forEach(result => {
      this.$el.append(result.render())
    })

    return this.$el
  }
}
