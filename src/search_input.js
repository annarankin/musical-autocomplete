import debounce from 'lodash/debounce'

import ResultList from './result_list'
import AutocompleteService from './autocomplete'

const fakeResults = ["where can i find", "where can i find it", "where can i find them", "where can i find one", "where can i find discontinued", "where can i find a job", "where can i find free", "where can i find my ip address"]

export default class SearchInput {
  constructor({ $parentEl }) {
    this.$parentEl = $parentEl
    this.$el = $('<input class="search">')
    this.list = new ResultList()
    this.setEventListeners()
    this.autocomplete = new AutocompleteService()
  }

  renderResults(results) {
    this.list.setResults(results)
  }

  setEventListeners() {
    this.$el.on('input', debounce(this.onChange.bind(this), 1500))
  }

  onChange(event) {
    // this.autocomplete.getSuggestions({ query: event.target.value }, this.renderResults.bind(this))
    this.renderResults(fakeResults.slice(0,5))
  }

  render() {
    this.$parentEl.append(this.$el)
    this.$parentEl.append(this.list.render())
  }
}
