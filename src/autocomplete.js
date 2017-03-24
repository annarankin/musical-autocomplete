import $ from 'jquery'

export default class AutocompleteService {
  constructor() {
    this.url = 'https://api.cognitive.microsoft.com/bing/v5.0/suggestions/?q='
  }

  getSuggestions({ query }, callback) {
    const url = `${this.url}${query}`
    $.ajax({
      method: 'GET',
      url,
      headers: {
        'Ocp-Apim-Subscription-Key': '2c50a923dafb4c5fb21172118e064e30'
      }
    }).done((data) => {
      const { searchSuggestions } = data.suggestionGroups[0]
      const suggestions = searchSuggestions.map(suggestion => suggestion.displayText).slice(0,5)
      callback(suggestions)
    })
  }
}
