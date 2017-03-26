export default class Renderer {
  constructor({ audioContext }) {
    this.audioContext = audioContext
    console.log(audioContext)
    // this.setUpAnalyser()
  }

  setUpAnalyser() {
    const analyser = this.audioContext.createAnalyser()
    this.audioContext.destination.connect(analyser)
  }

  render() {
    console.log('hi')
  }
}
