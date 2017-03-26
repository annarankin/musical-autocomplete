import SearchInput from 'search_input'
import Renderer from 'renderer'

const globalAudioContext = new AudioContext()

export const globalAnalyser = globalAudioContext.createAnalyser()
window.globalAnalyser = globalAnalyser

globalAnalyser.fftSize = 256

var frequencyData = new Uint8Array(globalAnalyser.frequencyBinCount);


var $visContainer = $('<div class="viz-container">')
$('#main').append($visContainer)
var vizDivs = []

frequencyData.forEach((int, i) => {
  const $vizDiv = $('<div class="viz">')
  $visContainer.append($vizDiv)
  vizDivs.push($vizDiv)
})

function renderFrame() {
  requestAnimationFrame(renderFrame)
  globalAnalyser.getByteFrequencyData(frequencyData)
  vizDivs.forEach(($div, i) => {
    $div.height(frequencyData[i] / 2)
  })
}

renderFrame()

new Renderer({ $parentEl: $('#main'), audioContext: globalAudioContext }).render()
new SearchInput({ $parentEl: $('#main'), audioContext: globalAudioContext }).render()
